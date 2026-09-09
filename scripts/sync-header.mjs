#!/usr/bin/env node
/* =========================================================
   Bioforte — Sincroniza o cabeçalho compartilhado
   (partials/header.html) em todas as páginas HTML.

   Uso:  node scripts/sync-header.mjs
   - Substitui o <header> de cada página pelo componente.
   - Marca o item ativo conforme a página.
   - Injeta css/bioforte-header.css e js/bioforte-header.js.
   - Idempotente (executar de novo é seguro).
   ========================================================= */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const PARTIAL_PATH = join(ROOT, 'partials', 'header.html');
const PARTIAL = readFileSync(PARTIAL_PATH, 'utf8');

const SKIP = new Set([
  'footer.html',
  'google.html',
  'google1d6aab6188bd04a0.html',
  'emConstrucao.html',
]);

const ACTIVE = {
  'index.html': 'home',
  'header.html': 'home',
  // A Empresa
  'quemSomos.html': 'empresa',
  'nossoTime.html': 'empresa',
  'certificacoes.html': 'empresa',
  'depoimentoClientes.html': 'empresa',
  'duvidasFrequentes.html': 'conteudo',
  'areaCliente.html': 'cliente',
  'carreira.html': 'empresa',
  'indica_amigos.html': 'empresa',
  'contato.html': 'empresa',
  'mail-success.html': 'empresa',
  // Serviços
  'nossosServicos.html': 'servicos',
  'desinsetizacao.html': 'servicos',
  'desratizacao.html': 'servicos',
  'descupinizacao.html': 'servicos',
  'controleIntegradoDePragas.html': 'servicos',
  'controlePombos.html': 'servicos',
  'limpezaCaixaDAgua.html': 'servicos',
  'oxi-sanitizacao.html': 'servicos',
  // Pragas
  'pragas.html': 'pragas',
  'aranha-armadeira.html': 'pragas',
  'barata-americana.html': 'pragas',
  'barata-germanica.html': 'pragas',
  'carrapato.html': 'pragas',
  'cupim-madeira-seca.html': 'pragas',
  'escorpiao.html': 'pragas',
  'formiga-fantasma.html': 'pragas',
  'formiga-sauva.html': 'pragas',
  'mosca-domestica.html': 'pragas',
  'pulga.html': 'pragas',
  'pombo.html': 'pragas',
  'rato-camundongo.html': 'pragas',
  // Unidades
  'controle-de-pragas-franca.html': 'unidades',
  'controle-de-pragas-ribeirao-preto.html': 'unidades',
  'controle-de-pragas-uberaba.html': 'unidades',
  'controle-de-pragas-guarapuava.html': 'unidades',
  // Conteúdo
  'dicas.html': 'conteudo',
  'galeriaInstagram.html': 'conteudo',
  'treinamentoNr33.html': 'conteudo',
  'treinamentoNr35.html': 'conteudo',
};

function navKey(file) {
  if (ACTIVE[file]) return ACTIVE[file];
  if (/^guia-/.test(file)) return 'conteudo';
  return 'home';
}

function buildHeader(file, key) {
  const origin = file.replace(/\.html$/i, '');
  return PARTIAL
    .replace(/data-page-origin="__ORIGIN__"/g, `data-page-origin="${origin}"`)
    // item ativo (desktop e painel móvel)
    .replace(/(<li\s+class=")([^"]*)("\s+data-nav=")([^"]+)(")/g, (m, a, cls, b, k, c) => {
      return k === key ? `${a}is-active ${cls}${b}${k}${c}` : m;
    })
    .replace(/ data-navkey="[^"]+"/g, '')
    // aria-current descreve a página de destino, não apenas seu grupo.
    .replace(/<a\b[^>]*>/g, tag => {
      const href = tag.match(/href="([^"]+)"/);
      if (!href || /class="bf-(?:mobile-)?logo"/.test(tag)) return tag;
      const current = file === 'index.html' ? '/' : file;
      return href[1] === current ? tag.replace(/>$/, ' aria-current="page">') : tag;
    });
}

const HEADER_RE = /<header\b[^>]*>[\s\S]*?(?:<\/header>|(?=<!--\s*Start Breadcrumbs))/;
const CSS_LINK = 'css/bioforte-header.css';
const JS_SRC = 'js/bioforte-header.js';

const files = readdirSync(ROOT)
  .filter(f => /\.html$/i.test(f))
  .filter(f => !SKIP.has(f));

const updated = [];
const problems = [];

for (const file of files) {
  const path = join(ROOT, file);
  let content = readFileSync(path, 'utf8');

  const match = content.match(HEADER_RE);
  if (!match) {
    problems.push(`${file}: <header> não encontrado`);
    continue;
  }

  // limpa comentários de "Start/End Header" acumulados (idempotência)
  content = content
    .replace(/<!-- Componente compartilhado: partials\/header\.html \(via scripts\/sync-header\.mjs\) -->\s*/g, '')
    .replace(/<!--\s*Start\s+Header[\s\S]*?-->/gi, '')
    .replace(/<!--\s*\/?\s*End\s+Header[\s\S]*?-->/gi, '');

  const newHeader = buildHeader(file, navKey(file));
  content = content.replace(HEADER_RE, () => newHeader);

  if (!content.includes(CSS_LINK)) {
    content = content.replace(
      /<\/head>/i,
      `\t\t<link rel="stylesheet" href="${CSS_LINK}">\n\t</head>`
    );
  }
  if (!content.includes('css/bioforte-layout.css')) {
    content = content.replace(/<\/head>/i, '\t\t<link rel="stylesheet" href="css/bioforte-layout.css">\n\t</head>');
  }
  if (!content.includes(JS_SRC)) {
    content = content.replace(
      /<\/body>/i,
      `\t\t\t<script src="${JS_SRC}" type="text/javascript"></script>\n\t\t</body>`
    );
  }

  writeFileSync(path, content, 'utf8');
  updated.push(file);
}

console.log(`Header sincronizado em ${updated.length} páginas.`);
if (problems.length) {
  console.log('Problemas:');
  problems.forEach(p => console.log('  ' + p));
}
