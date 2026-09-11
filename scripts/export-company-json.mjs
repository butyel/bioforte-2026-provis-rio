#!/usr/bin/env node
/* Regenera company-data.json a partir da fonte única data/company.js. */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const { SITE_URL, SITE_NAME, LEGAL_NAME, CONTACT, SOCIAL, UNITS, HOURS_SCHEMA, BRAND_FOUNDING } = await import('../data/company.js');

const data = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logoBioforte.png`,
  email: CONTACT.email,
  telephone: CONTACT.phoneTel,
  description: `Empresa de controle de pragas urbanas e saneamento ambiental com ${BRAND_FOUNDING.experienceLabel} de experiência, atuando em Franca, Ribeirão Preto, Uberaba e Guarapuava.`,
  foundingDate: BRAND_FOUNDING.sinceYear ? String(BRAND_FOUNDING.sinceYear) : '',
  sameAs: SOCIAL.map((s) => s.url),
  areaServed: UNITS.map((u) => `${u.city}, ${u.state}, Brasil`),
  openingHours: HOURS_SCHEMA,
  units: UNITS,
};
writeFileSync(join(ROOT, 'company-data.json'), JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('company-data.json regenerado a partir de data/company.js.');