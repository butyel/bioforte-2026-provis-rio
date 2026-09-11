#!/usr/bin/env node
/* =========================================================
   Bioforte — correções mecânicas em massa (HTML)
   Aplicado por auditoria; idempotente. Roda via:
     node scripts/apply-hygiene.mjs
   ========================================================= */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const files = readdirSync(ROOT).filter((f) => f.endsWith('.html'));
const log = [];
function edit(file, fn, label) {
  const path = join(ROOT, file);
  const before = readFileSync(path, 'utf8');
  const after = fn(before);
  if (after !== before) {
    writeFileSync(path, after, 'utf8');
    log.push(`${file}: ${label}`);
  }
}

/* 1. Remover <meta name="keywords"> */
const KEYWORDS_RE = /<meta\s+name=["']keywords["']\s+content=["'][^"]*["']\s*\/?>\s*/gi;
for (const f of files) edit(f, (c) => c.replace(KEYWORDS_RE, ''), 'removido meta keywords');

/* 2. Remover <meta name="copyright" ... codeglim ...> */
const COPYRIGHT_RE = /<meta\s+name=["']copyright["'][^>]*codeglim[^>]*>\s*/gi;
for (const f of files) edit(f, (c) => c.replace(COPYRIGHT_RE, ''), 'removido meta copyright codeglim');

/* 3. Remover links de skin2..skin8 comentados */
const SKINS_RE = /[\t ]*<!--<link rel="stylesheet" href="css\/skin\/skin[2-8]\.css">-->\s*/g;
for (const f of files) edit(f, (c) => c.replace(SKINS_RE, ''), 'removido comentarios de skins 2-8');

/* 4. Remover o bloco do preloader */
const PRELOADER_RE = /<!--\s*INICIO DO PRELOADER\s*-->[\s\S]*?<!--\s*FIM DO PRELOADER\s*-->\s*/g;
for (const f of files) edit(f, (c) => c.replace(PRELOADER_RE, ''), 'removido preloader');

/* 5. Remover scripts legados do tema */
const LEGACY_SCRIPTS = [
  'js/jquery.min.js',
  'js/bootstrap.min.js',
  'js/modernizr.min.js',
  'js/tromas.js',
  'js/theme-plugins.js',
  'js/main.js',
  'js/mascara.min.js',
  'js/instafeed.js',
];
for (const f of files) {
  edit(f, (c) => {
    let out = c;
    for (const s of LEGACY_SCRIPTS) {
      out = out.replace(new RegExp(`[\\t ]*<script\\s+src=["']${s.replace(/\./g, '\\.')}["'][^>]*></script>\\s*`, 'g'), '');
    }
    return out;
  }, 'removido scripts legados');
}

/* 6. Injeta js/bioforte-core.js antes de </body> (uma vez) */
for (const f of files) {
  edit(f, (c) => {
    if (c.includes('js/bioforte-core.js')) return c;
    return c.replace(/<\/body>/i, '\t\t\t<script src="js/bioforte-core.js"></script>\n\t\t</body>');
  }, 'injetado bioforte-core.js');
}

/* 7. Remover bloco do modal "Manejo de Abelha" (morto, sem trigger) */
const MODAL_RE = /<!--\s*Modal Manejo de Abelha\s*-->[\s\S]*?<!--\/?\s*End Modal Manejo de Abelha\s*-->\s*/g;
for (const f of files) edit(f, (c) => c.replace(MODAL_RE, ''), 'removido modal morto');

/* 8. style="width: 150; height: 100px;" -> px */
for (const f of files) edit(f, (c) => c.replace(/width:\s*(100|150)\s*;/g, 'width: $1px;'), 'corrigido width sem unidade');

/* 9. Imagens de pragas com extensão errada (.jpg/.jpeg -> .png) */
const PRAGA_EXT_MAP = [
  ['rato-camundongo.jpg', 'rato-camundongo.png'],
  ['formiga-fantasma.jpg', 'formiga-fantasma.png'],
  ['aranha-armadeira.jpg', 'aranha-armadeira.png'],
  ['pulga.jpg', 'pulga.png'],
  ['carrapato.jpg', 'carrapato.png'],
  ['mosca-domestica.jpg', 'mosca-domestica.png'],
  ['pombo.jpeg', 'pombo.png'],
];
for (const f of files) {
  edit(f, (c) => {
    let out = c;
    for (const [from, to] of PRAGA_EXT_MAP) out = out.split(from).join(to);
    return out;
  }, 'corrigido extensao imagens pragas');
}

/* 11. carreira: _next -> domínio único + honeypot + sem _captcha:false */
edit('carreira.html', (c) => {
  let out = c;
  out = out.replace('https://bioforte.com.br/mail-success.html', 'https://biofortecombr.vercel.app/mail-success.html');
  out = out.replace(
    '<!--Desativa o captcha da pagina-->\n\t\t\t\t\t\t\t\t\t<input type="hidden" name="_captcha" value="false">',
    '<!--Honeypot: campo invisivel que bots preenchem-->\n\t\t\t\t\t\t\t\t\t<input type="text" name="_honey" value="" style="display:none" tabindex="-1" autocomplete="off">'
  );
  return out;
}, 'form carreira: _next, honeypot, captcha');

/* 12. quemSomos: link quebrado nossoTime.html -> carreira.html */
edit('quemSomos.html', (c) => {
  return c.replace(
    'href="nossoTime.html">Conhe',
    'href="carreira.html">Venha fazer parte do nosso time <i class="fa fa-angle-right" aria-hidden="true"></i></a></p>\n\t\t\t\t\t<p><a class="bio-text-link" href="contato.html">Conhe'
  );
}, 'corrigido link nossoTime');

/* 13. skip-link sem alvo em páginas utilitárias */
edit('emConstrucao.html', (c) => c.replace('href="#main"', 'href="#coming-soon"'), 'skip-link -> #coming-soon');
edit('mail-success.html', (c) => c.replace('<section class="success section page">', '<section id="main" class="success section page">'), 'id=main em mail-success');

/* 14. WhatsApp labels apontando para contato.html -> wa.me */
const WA_LINK = 'https://api.whatsapp.com/send?l=pt&phone=551637230808';
const WA_REPLACEMENTS = [
  { re: /<a class="bf-cta" href="contato\.html"[^>]*>Fale no WhatsApp[^<]*<\/a>/g, to: `<a class="bf-cta" href="${WA_LINK}" target="_blank" rel="noopener">Fale no WhatsApp</a>` },
  { re: /<a class="bf-cta" href="contato\.html"[^>]*>Falar com a Bioforte[^<]*<\/a>/g, to: `<a class="bf-cta" href="${WA_LINK}" target="_blank" rel="noopener">Falar com a Bioforte</a>` },
  { re: /<a class="service-hero-btn service-hero-btn--outline"[^>]*href="contato\.html"[^>]*>Fale no WhatsApp[^<]*<\/a>/g, to: `<a class="bio-hero-btn bio-hero-btn--outline" href="${WA_LINK}" target="_blank" rel="noopener">Fale no WhatsApp</a>` },
];
// fallback genérico: âncoras em pest/serviço/locais que dizem "Fale no WhatsApp" e apontam para contato.html
for (const f of files) {
  edit(f, (c) => {
    let out = c.replace(/href="contato\.html"[^>]*>\s*Fale no WhatsApp\s*<\/a>/g, (m) => {
      const prev = out.indexOf(m) > 0 ? out[out.indexOf(m) - 1] : '';
      return `href="${WA_LINK}" target="_blank" rel="noopener">Fale no WhatsApp</a>`;
    });
    out = out.replace(/href="contato\.html"[^>]*>\s*Falar com a Bioforte\s*<\/a>/g, (m) => {
      return `href="${WA_LINK}" target="_blank" rel="noopener">Falar com a Bioforte</a>`;
    });
    return out;
  }, 'whatsapp cta -> wa.me');
}

console.log('\nResumo das alterações:');
for (const line of log) console.log('  ' + line);
console.log(`\nTotal: ${log.length} mudanças aplicadas.`);