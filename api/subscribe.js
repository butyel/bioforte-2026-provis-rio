/* =========================================================
   Bioforte — API de assinatura da newsletter (/api/subscribe)
   Vercel Serverless Function (Node.js). Sem dependências.

   Proteções:
   - Honeypot: campo "comercial" precisa estar VAZIO.
   - Validação server-side do e-mail.
   - Rejeita envio vazio / campos malformados.
   - Rate limit básico por IP (em memória — para produção,
     configure o armazenamento distribuído; ver docs).

   Envio:
   - Provider A: Resend  (variáveis RESEND_API_KEY e RESEND_FROM)
   - Provider B: Webhook genérico (MAIL_WEBHOOK_URL, recebe JSON)
   - Se nenhum estiver configurado, responde 503 avisando que o
     serviço de e-mail ainda não foi configurado (dependency pendente).

   NUNCA insira credenciais reais aqui.
   ========================================================= */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_WAITERS = 240;
const rateMemory = new Map(); // simples; por instância (documentar)

function limited(ip) {
  const now = Date.now();
  const win = 60 * 1000;
  const hit = rateMemory.get(ip);
  if (!hit || now - hit.t > win) {
    rateMemory.set(ip, { t: now, n: 1 });
    return false;
  }
  hit.n += 1;
  if (hit.n > 5) return true;
  rateMemory.set(ip, hit);
  if (rateMemory.size > MAX_WAITERS) rateMemory.clear();
  return false;
}

function json(res, code, body) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function bodyToText(body) {
  const interests = [];
  if (body.updates) interests.push('Controle de Pragas');
  if (body.news) interests.push("Higienização de Caixa D'Água");
  if (body.reseller) interests.push('Descupinização');
  return (
    'Novo cadastro na newsletter do site Bioforte.\n\n' +
    `E-mail: ${String(body.email || '').trim()}\n` +
    `Interesse: ${interests.length ? interests.join(', ') : 'Geral'}\n` +
    `Página: ${body.page || 'index'}\n` +
    `Enviado em: ${new Date().toISOString()}`
  );
}

function sendViaResend(msgText, from, to, subject, key) {
  return new Promise((resolve, reject) => {
    const https = require('https');
    const payload = JSON.stringify({
      from,
      to: [to],
      subject,
      text: msgText,
    });
    const req = https.request(
      {
        host: 'api.resend.com',
        path: '/emails',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve({ status: res.statusCode, body: d }));
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function sendViaWebhook(msgText, webhookUrl, to, subject) {
  return new Promise((resolve, reject) => {
    const lib = webhookUrl.startsWith('http://') ? require('http') : require('https');
    const u = new URL(webhookUrl);
    const payload = JSON.stringify({ to, subject, text: msgText });
    const req = lib.request(
      {
        host: u.hostname,
        port: u.port,
        path: u.pathname + u.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve({ status: res.statusCode, body: d }));
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function collectBody(req) {
  return new Promise((resolve) => {
    if (typeof req.body === 'object' && req.body !== null) return resolve(req.body);
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); } catch { resolve(null); }
    });
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    json(res, 405, { ok: false, error: 'method_not_allowed' });
    return;
  }

  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '?').split(',')[0].trim();
  if (limited(ip)) {
    json(res, 429, { ok: false, error: 'rate_limited', message: 'Muitas tentativas em pouco tempo. Tente novamente em instantes.' });
    return;
  }

  let body = await collectBody(req);
  if (body === null) {
    json(res, 400, { ok: false, error: 'bad_request' });
    return;
  }

  /* honeypot: campo humano vazio */
  if (typeof body.comercial === 'string' && body.comercial.trim() !== '') {
    json(res, 200, { ok: true, honeypot: true }); // finge sucesso, descarta
    return;
  }

  const email = String(body.email || '').trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email) || email.length > 120) {
    json(res, 400, { ok: false, error: 'invalid_email' });
    return;
  }

  const allowed = ['updates', 'news', 'reseller'];
  for (const k of allowed) {
    if (body[k] !== undefined && String(body[k]) !== 'true' && String(body[k]) !== 'false' && String(body[k]) !== 'on') {
      json(res, 400, { ok: false, error: 'invalid_field' });
      return;
    }
  }

  const subject = 'Newsletter Bioforte — novo cadastro';
  const to = process.env.NEWSLETTER_EMAIL || 'atendimento@bioforte.com.br';
  const msgText = bodyToText(body);

  try {
    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM) {
      const r = await sendViaResend(msgText, process.env.RESEND_FROM, to, subject, process.env.RESEND_API_KEY);
      if (r.status >= 400) {
        json(res, 502, { ok: false, error: 'provider_error' });
        return;
      }
      json(res, 200, { ok: true });
      return;
    }

    if (process.env.MAIL_WEBHOOK_URL) {
      const r = await sendViaWebhook(msgText, process.env.MAIL_WEBHOOK_URL, to, subject);
      if (r.status >= 400) {
        json(res, 502, { ok: false, error: 'provider_error' });
        return;
      }
      json(res, 200, { ok: true });
      return;
    }

    /* Serviço de e-mail ainda não configurado (dependência pendente). */
    json(res, 503, {
      ok: false,
      error: 'SERVICE_NOT_CONFIGURED',
      message: 'O cadastro foi recebido, mas o envio de e-mail ainda não foi configurado. Use o WhatsApp para contato imediato.',
      whatsapp: 'https://api.whatsapp.com/send?l=pt&phone=551637230808',
    });
  } catch (err) {
    console.error('[api/subscribe] provider error:', err.message);
    json(res, 500, { ok: false, error: 'internal' });
  }
};