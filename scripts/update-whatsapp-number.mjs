#!/usr/bin/env node
/* =========================================================
   Bioforte — Atualiza o número/WhatsApp em todo o site.
   Novo único WhatsApp: (16) 3723-0808 → 551637230808
   Substitui o antigo 5516974007842 / (16) 97400-7842
   Uso: node scripts/update-whatsapp-number.mjs
   ========================================================= */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

const targets = readdirSync(ROOT)
  .filter(f => /\.html$/i.test(f))
  .map(f => join(ROOT, f));
targets.push(join(ROOT, 'partials', 'header.html'));

const replacements = [
  ['5516974007842', '551637230808'],
  ['(16) 97400 - 7842', '(16) 3723 - 0808'],
  ['(16) 97400-7842', '(16) 3723-0808'],
];

let changed = 0;
for (const file of targets) {
  try {
    let content = readFileSync(file, 'utf8');
    const before = content;
    for (const [from, to] of replacements) {
      content = content.split(from).join(to);
    }
    if (content !== before) {
      writeFileSync(file, content, 'utf8');
      changed++;
    }
  } catch (err) {
    console.log('erro:', file, err.message);
  }
}
console.log(`Número atualizado em ${changed} arquivo(s).`);