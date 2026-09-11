# Bioforte — Lançamento em Produção (checklist técnico)

O site roda hoje em STAGING no Vercel. Este documento centraliza o que fazer
no lançamento para o domínio oficial, sem quebrar SEO nem deixar vazar o ambiente de teste.

## Arquitetura de ambiente

| Item         | Staging (hoje)                      | Produção (futuro)            |
| ------------ | ----------------------------------- | --------------------------- |
| Domínio      | `https://biofortecombr.vercel.app`  | `https://www.bioforte.com.br`|
| Indexação    | `X-Robots-Tag: noindex, nofollow`   | indexar (remover regra)     |
| robots.txt   | `Disallow: /` (sem sitemap)         | `Allow: /` + sitemap        |
| Sitemap      | não publicado                       | `SITE_URL/sitemap.xml`      |

Tudo é controlado por UMA fonte única: **`data/company.js`** (`SITE_URL`).
`scripts/sync-site.mjs` reescreve canonical, og:url, JSON-LD, sitemap e robots.

## Passos no lançamento

1. **`data/company.js`**: alterar `export const SITE_URL = 'https://www.bioforte.com.br'`.
2. **Rodar** `node scripts/sync-site.mjs --env production`
   - reescreve canonical / og:url / og:image / twitter / JSON-LD / `_next` do formulário de carreira;
   - gera `sitemap.xml` com o domínio oficial;
   - gera `robots.txt` com `Allow` + sitemap.
3. **`vercel.json`**: remover a regra de header:
   ```json
   { "source": "/(.*)",
     "has": [ { "type": "host", "value": { "suf": ".vercel.app" } } ],
     "headers": [ { "key": "X-Robots-Tag", "value": "noindex, nofollow" } ] }
   ```
   (ou mantê-la apenas para hosts staging/preview e trocar as URLS).
4. **Deploy** em produção: `vercel --prod --yes --scope butyel95-4732s-projects`.
5. **Adicionar o domínio** em Vercel (Project → Domains) e subir DNS da Bioforte
   (apontar `www` para o Vercel). Não alterar DNS antes da estratégia de migração.
6. **Redirects 301** (antigas URLs `.html` → novas quando houver migração de rota).
7. **Search Console**: trocar propriedade correta, enviar sitemap, validar noindex removido.
8. **Validar**: Core Web Vitals, Schema, forms, LGPD/GTM.

## Formulários

- Newsletter: `index.html` envia para `/api/subscribe` (Vercel Function).
  - Envio de e-mail requer variáveis de ambiente no Vercel:
    - **Resend**: `RESEND_API_KEY` + `RESEND_FROM` (ex.: `Bioforte <site@bioforte.com.br>`)
    - **ou webhook**: `MAIL_WEBHOOK_URL` (recebe JSON `{to, subject, text}`)
    - `NEWSLETTER_EMAIL` (destinatário; padrão `atendimento@bioforte.com.br`)
  - Sem essas variáveis, a API responde `503 SERVICE_NOT_CONFIGURED` e o site
    orienta o visitante a falar no WhatsApp (nunca cai em silêncio).
- Carreira: usa `formsubmit.co/rh@bioforte.com.br` (serviço externo).
  - `_next` aponta para `mail-success.html` (domínio atual via `sync-site`).
  - Honeypot `_honey` adicionado. Ativar na conta formsubmit o primeiro e-mail de confirmação.

## Segredos (uma vez)

- A chave **Google Maps** exposta na página antiga `google.html` foi **removida do
  repositório** (página excluída). **REVOGAR manualmente** a chave no Google Cloud Console
  (procurar `AIzaSyDeiv...` nos projetos/credenciais) e emitir chave nova restrita ao domínio oficial.
- `scripts/sync-header.mjs`, `scripts/update-whatsapp-number.mjs` são internos (não publicados).
- Nenhum `.env` está no repositório; segredos vivem apenas em variáveis de ambiente do Vercel.

## Pendências de dados (confirmar com o cliente)

- Ano real de fundação × "mais de 30 anos" (hoje `quemSomos`/`certificacoes` dizem 2002).
- Endereço e telefone local oficial da unidade **Guarapuava/PR** (hoje usa o número central de Franca).
- WhatsApp oficial por unidade (RP usa o central).
- Coordenadas (lat/long) das unidades para o Schema `geo`.
- Google Business Profile das unidades.
- Métricas institucionais (clientes cadastrados/felizes — contadores incrementam via
  `js/contador_clientes.js` a cada 24h; validar se a prática deve continuar).
- Imagem OG oficial 1200×630 (hoje usamos a foto do hero como `og:image`).