/* =========================================================
   Bioforte — FONTE ÚNICA DE DADOS (build-time)
   =========================================================
   Regra de uso:
   - NUNCA duplicar telefone, endereço ou e-mail no HTML.
   - Os textos devem ser gerados/injetados a partir deste arquivo.
   - scripts/sync-site.mjs usa SITE_URL para canonical, og:url,
     JSON-LD, sitemap.xml e robots.txt — não edite estes por página.

   AMBIENTE:
   - STAGING (atual): https://biofortecombr.vercel.app
   - PRODUÇÃO (futuro): https://www.bioforte.com.br
   Para entrar em produção:
     node scripts/sync-site.mjs --env production
   ========================================================= */

export const SITE_URL = 'https://biofortecombr.vercel.app';

export const SITE_NAME = 'Bioforte Saneamento Ambiental';
export const LEGAL_NAME = 'Bioforte Controle de Pragas';
export const SITE_DESCRIPTION =
  'Bioforte: dedetização (desinsetização), desratização, descupinização e controle integrado de pragas em Franca, Ribeirão Preto, Uberaba e Guarapuava. Equipe certificada e produtos registrados.';

/* CONFIRMAR COM O CLIENTE — divergência encontrada no repositório:
   - Diversas páginas declaram "mais de 30 anos de experiência";
   - quemSomos/certificacoes declaram fundação em 2002.
   Mantemos os dois registros abaixo para decisão oficial numa única fonte. */
export const BRAND_FOUNDING = {
  experienceLabel: 'mais de 30 anos', // CONFIRMAR COM O CLIENTE
  sinceYear: 2002, // CONFIRMAR COM O CLIENTE (usado apenas em quemSomos/certificacoes hoje)
};

export const HOURS_TEXT = 'Segunda a sexta, das 07h30 às 17h30; sábado das 07h30 às 12h00';
export const HOURS_SCHEMA = 'Mo-Fr 07:30-17:30, Sa 07:30-12:00';

export const CONTACT = {
  phoneDisplay: '(16) 3723-0808',
  phoneTel: '+551637230808',
  whatsapp: 'https://api.whatsapp.com/send?l=pt&phone=551637230808',
  email: 'atendimento@bioforte.com.br',
};

export const SOCIAL = [
  { label: 'Facebook', url: 'https://pt-br.facebook.com/biofortecontroledepragas/' },
  { label: 'Twitter/X', url: 'https://twitter.com/francabioforte' },
  { label: 'YouTube', url: 'https://www.youtube.com/channel/UCH39-FD6_s9X6mHQHEfzOMQ' },
  { label: 'Instagram', url: 'https://www.instagram.com/biofortededetizadora/' },
];

/* Geo e Google Business Profile: deixados como null até confirmação —
   nunca inventar coordenadas. */
export const UNITS = [
  {
    key: 'franca',
    name: 'Bioforte Franca Saneamento Ambiental',
    city: 'Franca',
    state: 'SP',
    address: 'Rua João de Goes Conrado, 2525 - São José',
    cep: '',
    phone: '(16) 3723-0808',
    whatsapp: '(16) 3723-0808',
    email: 'comercialfranca@bioforte.com.br',
    url: `${SITE_URL}/controle-de-pragas-franca.html`,
    latitude: null,
    longitude: null,
    googleBusinessProfile: null,
  },
  {
    key: 'ribeirao-preto',
    name: 'Bioforte Ribeirão Preto',
    city: 'Ribeirão Preto',
    state: 'SP',
    address: 'Rua João Nutti, 1135 - Jardim Paulistano',
    cep: '',
    phone: '(16) 3635-2034',
    whatsapp: '(16) 3723-0808', // central — CONFIRMAR COM O CLIENTE
    email: 'comercial@bioforte.com.br',
    url: `${SITE_URL}/controle-de-pragas-ribeirao-preto.html`,
    latitude: null,
    longitude: null,
    googleBusinessProfile: null,
  },
  {
    key: 'uberaba',
    name: 'Bioforte Uberaba',
    city: 'Uberaba',
    state: 'MG',
    address: 'R. Aracajú, 145 - Santa Marta',
    cep: '38055-440',
    phone: '(34) 99298-6711',
    whatsapp: '(34) 99298-6711',
    email: 'atendimentouberaba@bioforte.com.br',
    url: `${SITE_URL}/controle-de-pragas-uberaba.html`,
    latitude: null,
    longitude: null,
    googleBusinessProfile: null,
  },
  {
    key: 'guarapuava',
    name: 'Bioforte Guarapuava',
    city: 'Guarapuava',
    state: 'PR',
    /* CONFIRMAR COM O CLIENTE: endereço e telefone local de Guarapuava.
       Hoje o site usa o número central (Franca, DDD 16). */
    address: null, // CONFIRMAR COM O CLIENTE
    cep: null,
    phone: '(16) 3723-0808', // central — CONFIRMAR COM O CLIENTE
    whatsapp: '(16) 3723-0808', // central — CONFIRMAR COM O CLIENTE
    email: 'atendimento@bioforte.com.br',
    url: `${SITE_URL}/controle-de-pragas-guarapuava.html`,
    latitude: null,
    longitude: null,
    googleBusinessProfile: null,
  },
];

/* Páginas que não devem entrar no sitemap nem ser indexadas. */
export const NOINDEX_PAGES = new Set([
  'areaCliente.html',
  'emConstrucao.html',
  'footer.html',
  'google.html',
  'google1d6aab6188bd04a0.html',
  'header.html',
  'mail-success.html',
]);