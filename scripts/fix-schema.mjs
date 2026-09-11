#!/usr/bin/env node
/* =========================================================
   Bioforte — correções de Schema.org / JSON-LD (P1)
   - Uberaba: @id do Service copiado de RP, telefones RP -> Uberaba
   - Franca: FAQ schema com telefone da unidade RP
   - guia-controle-de-pragas-uberaba-agro: telefone RP -> Uberaba
   - Breadcrumbs de unidades: "Home > Unidades > X" (remoto "Contato")
   - guia-dedetizacao-guarapuava-pr: alinhar FAQ schema com o visível
   - Garantir nó LocalBusiness de Guarapuava nas páginas corporativas
   ========================================================= */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const HOME = 'https://biofortecombr.vercel.app';

function read(f) { return readFileSync(join(ROOT, f), 'utf8'); }
function write(f, c) { writeFileSync(join(ROOT, f), c, 'utf8'); }
const applied = [];

/* ---- helpers ---- */
function replaceInFaqBlock(c, from, to) {
  let i = c.indexOf('"FAQPage"');
  if (i === -1) i = c.indexOf('"@type": "FAQPage"');
  if (i === -1) return c;
  const start = c.lastIndexOf('<script type="application/ld+json">', i);
  const s0 = start === -1 ? i : start;
  const end = c.indexOf('</script>', s0);
  if (end === -1) return c;
  const block = c.slice(s0, end);
  return c.slice(0, s0) + block.split(from).join(to) + c.slice(end);
}

/* ---- 1. Uberaba ---- */
let ub = read('controle-de-pragas-uberaba.html');
ub = ub.split(`${HOME}/controle-de-pragas-ribeirao-preto.html#service`).join(`${HOME}/controle-de-pragas-uberaba.html#service`);
ub = ub.split('"telephone":"+55-16-3635-2034"').join('"telephone":"+55-34-99298-6711"');
ub = replaceInFaqBlock(ub, '(16) 3635-2034', '(34) 99298-6711');
write('controle-de-pragas-uberaba.html', ub);
applied.push('Uberaba: @id service, telefone Organization/ServiceChannel e FAQ');

/* ---- 2. Franca: FAQ schema com telefone errado ---- */
let fr = read('controle-de-pragas-franca.html');
fr = replaceInFaqBlock(fr, 'a unidade de Franca fica na Rua João de Goes Conrado, 2525 - São José, com telefone (16) 3635-2034', 'a unidade de Franca fica na Rua João de Goes Conrado, 2525 - São José, com telefone (16) 3723-0808');
write('controle-de-pragas-franca.html', fr);
applied.push('Franca: FAQ schema com telefone correto da unidade');

/* ---- 3. guia-controle-de-pragas-uberaba-agro: telefone ---- */
let gu = read('guia-controle-de-pragas-uberaba-agro.html');
gu = gu.split('"telephone":"+55-16-3635-2034"').join('"telephone":"+55-34-99298-6711"');
write('guia-controle-de-pragas-uberaba-agro.html', gu);
applied.push('guia-controle-de-pragas-uberaba-agro: telefone da Organization');

/* ---- 4. Breadcrumbs de unidades ---- */
const BC_RE = /"name":\s*"Contato",\s*"item":\s*"https:\/\/biofortecombr\.vercel\.app\/contato\.html"/g;
for (const f of ['controle-de-pragas-franca.html', 'controle-de-pragas-ribeirao-preto.html', 'controle-de-pragas-uberaba.html']) {
  let c = read(f);
  const repl = `"name": "Unidades", "item": "${HOME}/controle-de-pragas-franca.html"`;
  c = c.replace(BC_RE, repl);
  write(f, c);
  applied.push(`${f}: breadcrumb Home > Unidades`);
}

/* ---- 5. guia-dedetizacao-guarapuava-pr: FAQ schema = visível ---- */
let gdg = read('guia-dedetizacao-guarapuava-pr.html');
const oldQ = /,\{"@type":"Question","name":"Dedetiza\u00e7\u00e3o residencial em Guarapuava \u00e9 comum\?"[\s\S]*?\}\]\}/;
const newQ = `,{"@type":"Question","name":"A dedetiza\u00e7\u00e3o \u00e9 segura para crian\u00e7as e pets?","acceptedAnswer":{"@type":"Answer","text":"Sim. Os produtos s\u00e3o registrados para uso profissional e a equipe orienta os cuidados antes e depois do tratamento."}}]}`;
const gdgBefore = gdg;
gdg = gdg.replace(oldQ, newQ);
if (gdg !== gdgBefore) {
  write('guia-dedetizacao-guarapuava-pr.html', gdg);
  applied.push('guia-dedetizacao-guarapuava-pr: FAQ schema alinhado ao visível');
} else {
  applied.push('guia-dedetizacao-guarapuava-pr: padrão do FAQ não casou (verificar)');
}

/* ---- 6. Garantir nó LocalBusiness Guarapuava nas páginas que listam unidades ---- */
function extractNode(c, idPart, minified) {
  const idx = c.indexOf(`#unidade-${idPart}`.replace('#', '#unidade-').slice(0, 0) + `#unidade-${idPart}`);
  return idx;
}
function extractNodeText(c, idAnchor) {
  const idx = c.indexOf(idAnchor);
  if (idx === -1) return null;
  const start = c.lastIndexOf('{', idx);
  if (start === -1) return null;
  let depth = 0;
  let k = start;
  while (k < c.length) {
    if (c[k] === '{') depth++;
    else if (c[k] === '}') {
      depth--;
      if (depth === 0) return { text: c.slice(start, k + 1), start, end: k + 1 };
    }
    k++;
  }
  return null;
}

function asGuarapuava(nodeText) {
  let g = nodeText;
  g = g.split('#unidade-uberaba').join('#unidade-guarapuava');
  g = g.split('controle-de-pragas-uberaba.html').join('controle-de-pragas-guarapuava.html');
  g = g.split('"name": "Bioforte Uberaba"').join('"name": "Bioforte Guarapuava"');
  g = g.split('"name":"Bioforte Uberaba"').join('"name":"Bioforte Guarapuava"');
  g = g.split('"telephone": "+55-34-99298-6711"').join('"telephone": "+55-16-3723-0808"');
  g = g.split('"telephone":"+55-34-99298-6711"').join('"telephone":"+55-16-3723-0808"');
  g = g.split('atendimentouberaba@bioforte.com.br').join('atendimento@bioforte.com.br');
  g = g.split('(34) 99298-6711').join('(16) 3723-0808');
  g = g.split('Uberaba, MG, Brasil').join('Guarapuava, PR, Brasil');
  g = g.split('"addressLocality": "Uberaba"').join('"addressLocality": "Guarapuava"');
  g = g.split('"addressRegion": "MG"').join('"addressRegion": "PR"');
  g = g.split('"addressLocality":"Uberaba"').join('"addressLocality":"Guarapuava"');
  g = g.split('"addressRegion":"MG"').join('"addressRegion":"PR"');
  g = g.split('38055-440').join('');
  g = g.replace(/,\s*"streetAddress"\s*:\s*"[^"]*"/g, '');
  g = g.replace(/",\s*""/g, '"');
  return g;
}

for (const f of readdirSync(ROOT).filter((x) => x.endsWith('.html'))) {
  if (['header.html', 'footer.html'].includes(f)) continue;
  let c = read(f);
  if (!c.includes('#unidade-franca') || c.includes('#unidade-guarapuava')) continue;
  if (!c.includes('#unidade-uberaba')) continue;

  const node = extractNodeText(c, '#unidade-uberaba');
  if (!node) {
    applied.push(`${f}: não consegui localizar nó Uberaba para clonar`);
    continue;
  }
  const g = asGuarapuava(node.text);
  c = c.slice(0, node.end) + ',' + g + c.slice(node.end);
  write(f, c);
  applied.push(`${f}: adicionado nó LocalBusiness Guarapuava`);
}

console.log('Correções de schema aplicadas:');
applied.forEach((a) => console.log('  - ' + a));

/* ---- Validação final: todos os blocos ld+json devem ser JSON válido ---- */
console.log('\nValidando JSON-LD...');
let bad = 0;
for (const f of readdirSync(ROOT).filter((x) => x.endsWith('.html'))) {
  const c = read(f);
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(c))) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      console.log(`  INVALIDO: ${f} — ${e.message}`);
      bad++;
    }
  }
}
console.log(bad ? `\n${bad} blocos JSON-LD inválidos!` : 'Todos os blocos JSON-LD são válidos.');