#!/usr/bin/env node
/* =========================================================
   Bioforte — sincroniza o "site" com a fonte única (data/company.js)

   Uso:
     node scripts/sync-site.mjs            # staging (SITE_URL atual)
     node scripts/sync-site.mjs --env production

   O que faz:
   1. Re-escreve canonical / og:url / og:image / twitter:* / JSON-LD
      e o _next do formulário de carreira para SITE_URL.
   2. Gera sitemap.xml a partir dos arquivos .html reais (sem noindex).
   3. Gera robots.txt conforme ambiente (staging: Disallow tudo;
      produção: Allow + sitemap).
   ========================================================= */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const args = process.argv.slice(2);
const ENV = args.includes('--env') ? args[args.indexOf('--env') + 1] : 'staging';
const { SITE_URL, NOINDEX_PAGES } = await import('../data/company.js');

const STAGING_URLS = ['https://biofortecombr.vercel.app', 'https://www.bioforte.com.br'];

if (ENV === 'production') {
  console.log(`SETE SITE_URL para produção: ${SITE_URL} (edite data/company.js para isso).`);
}

/* ---------- 1. URL base em todas as páginas ---------- */
const htmlFiles = readdirSync(ROOT).filter((f) => f.endsWith('.html'));
let changed = 0;
for (const file of htmlFiles) {
  const path = join(ROOT, file);
  let content = readFileSync(path, 'utf8');
  let before = content;
  for (const oldUrl of STAGING_URLS) {
    if (oldUrl !== SITE_URL) content = content.split(oldUrl).join(SITE_URL);
  }
  content = content.split('href="https://bioforte.com.br/').join(`href="${SITE_URL}/`);
  if (content !== before) {
    writeFileSync(path, content, 'utf8');
    changed++;
  }
}
console.log(`URL base sincronizada em ${changed} páginas.`);

/* ---------- 2. Sitemap ---------- */
const priorities = {
  '/': 1.0,
  'nossosServicos.html': 0.9,
  'pragas.html': 0.9,
  'duvidasFrequentes.html': 0.8,
  'quemSomos.html': 0.8,
  'contato.html': 0.8,
  'dicas.html': 0.7,
};
const servicePages = ['desinsetizacao.html', 'desratizacao.html', 'descupinizacao.html', 'controleIntegradoDePragas.html', 'controlePombos.html', 'limpezaCaixaDAgua.html', 'oxi-sanitizacao.html'];
const unitHome = ['controle-de-pragas-franca.html', 'controle-de-pragas-ribeirao-preto.html', 'controle-de-pragas-uberaba.html', 'controle-de-pragas-guarapuava.html'];
const pestPages = ['aranha-armadeira.html', 'barata-americana.html', 'barata-germanica.html', 'carrapato.html', 'cupim-madeira-seca.html', 'escorpiao.html', 'formiga-fantasma.html', 'formiga-sauva.html', 'mosca-domestica.html', 'pulga.html', 'pombo.html', 'rato-camundongo.html'];
const guidePages = htmlFiles.filter((f) => f.startsWith('guia-'));

function priority(file) {
  if (file === 'index.html') return '1.0';
  if (servicePages.includes(file)) return '0.9';
  if (unitHome.includes(file)) return '0.9';
  if (pestPages.includes(file)) return '0.8';
  if (guidePages.includes(file)) return '0.6';
  return priorities[file] || '0.5';
}

function lastmodIso(file) {
  try {
    const st = statSync(join(ROOT, file));
    return st.mtime.toISOString().slice(0, 10);
  } catch {
    return '';
  }
}

const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
const order = ['index.html', ...servicePages, 'pragas.html', 'nossosServicos.html', 'duvidasFrequentes.html', 'dicas.html', ...unitHome, ...pestPages, ...guidePages, 'quemSomos.html', 'certificacoes.html', 'depoimentoClientes.html', 'carreira.html', 'contato.html'];
const seen = new Set();
for (const file of order) {
  if (seen.has(file)) continue;
  seen.add(file);
  if (NOINDEX_PAGES.has(file)) continue;
  const isRoot = file === 'index.html';
  const loc = isRoot ? `${SITE_URL}/` : `${SITE_URL}/${encodeURI(file)}`;
  const st = lastmodIso(file);
  lines.push('  <url>');
  lines.push(`    <loc>${loc}</loc>`);
  if (st) lines.push(`    <lastmod>${st}</lastmod>`);
  lines.push('    <changefreq>monthly</changefreq>');
  lines.push(`    <priority>${priority(file)}</priority>`);
  lines.push('  </url>');
}
lines.push('</urlset>');
writeFileSync(join(ROOT, 'sitemap.xml'), lines.join('\n') + '\n', 'utf8');
console.log(`sitemap.xml regenerado com ${seen.size} URLs (ambiente: ${SITE_URL}).`);

/* ---------- 3. robots.txt ---------- */
const robots =
  ENV === 'production'
    ? `User-agent: *
Allow: /
Disallow: /mail-success.html
Disallow: /emConstrucao.html
Disallow: /areaCliente.html

Sitemap: ${SITE_URL}/sitemap.xml
`
    : `# Ambiente de STAGING/desenvolvimento — bloqueado para indexação.
User-agent: *
Disallow: /

# Não publicar Sitemap (produção terá um com o domínio oficial).
`;
writeFileSync(join(ROOT, 'robots.txt'), robots, 'utf8');
console.log(`robots.txt regenerado para ambiente: ${ENV}.`);
console.log('\nRecomendações de produção (ver docs/lancamento-producao.md):');
console.log(' 1. data/company.js  → SITE_URL = https://www.bioforte.com.br');
console.log(' 2. node scripts/sync-site.mjs --env production');
console.log(' 3. vercel.json: remover regra X-Robots-Tag noindex (ou trocar o host).');