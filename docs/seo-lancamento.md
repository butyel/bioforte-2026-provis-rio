# SEO — Plano de Lançamento (10/09/2026)

Guia operacional para publicar o site da Bioforte em ambiente de produção **sem riscos** e validar SEO. Este repositório é 100% estático (HTML/CSS/JS) publicada no Vercel.

## 1. Ambientes

| Ambiente | Host | Indexabilidade |
| --- | --- | --- |
| Preview / deploy de teste | `biofortecom-<hash>-butyel95-4732s-projects.vercel.app` | `X-Robots-Tag: noindex, nofollow` (via `vercel.json`) |
| Produção atual (alias) | `https://biofortecombr.vercel.app` | indexável (nenhum noindex aplicado) |
| Domínio oficial (futuro) | `https://www.bioforte.com.br` | indexável; configurar canonical/og no domínio oficial |

A regra de noindex usa o sufixo de host da equipe (`butyel95-4732s-projects.vercel.app`), que existe em previews e NÃO existe no alias de produção. Ao adicionar domínio personalizado, nenhuma alteração extra é necessária para produção (o noindex continua limitado a previews).

> Nunca publicar em produção com `emoji`/estágio incorreto nesta entrega: **este branch ainda não é o lançamento**.

## 2. Antes de publicar (testes recomendados)

1. **Previews**: fazer um deploy de preview e confirmar via `curl -I` que os headers trazem `X-Robots-Tag: noindex, nofollow` e que `/index.html` responde 308 → `/`.
2. **Produção (somente após liberação)**: verificar na alias que as páginas **não** trazem noindex e que HTML inicial tem canonical/og corretos.
3. **Crawl local** (já gerado): `docs/seo-auditoria-depois.csv`. Conferir zero links internos quebrados e JSON-LD parseável.
4. **Semântica**: conferir que cada página tem um H1 único e relevante; breadcrumbs visíveis; FAQ e guias acessíveis por teclado.
5. **Mobile + teclado**: menu mobile, acordeões de FAQ, âncoras internas (links `#…`) e o botão flutuante do WhatsApp (não sobrepor conteúdo; foco visível).
6. **Analytics**: validar primeiro acesso e clique imediato no container GTM-5PJ9NKS; conferir `data-event` (clicar não prova envio). Já corrigidos atributos duplicados no modal.
7. **Lighthouse**: medir home, uma unidade, um serviço, uma praga e um guia em mobile/desktop. Referências: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 (p75, campo). Sem dados de campo → registrar "não medido".

## 3. Publicação

1. `git checkout main` (ou branch aprovada) e merge da review.
2. `node scripts/sync-header.mjs` antes do deploy (os cabeçalhos são compartilhados pelos partials).
3. `vercel --prod --yes` na raiz do repo.
4. Após o build, conferir:
   - `https://biofortecombr.vercel.app/` → 200, sem noindex;
   - `/index.html` → 308 para `/`;
   - previsão antiga `/area-atuacao.html` e `/indica_amigos.html` → 404 real;
   - `/sitemap.xml` contém apenas URLs públicas canônicas.
5. Se for usar domínio próprio: atachar o domínio, atualizar canonical, `og:url` e entidades para o domínio oficial, atualizar o sitemap e revalidar headers por host. **Não redirecionar o preview para o site antigo** e **não deixar links que impeçam testar o preview**.

## 4. Rollback

- Manter o commit anterior do `main` marcado. Um deploy anterior da Vercel pode ser re-promovido (`vercel promote <deployment-url>`).
- Se o problema for no `vercel.json`: remover o `redirects`/`headers` e redeploy sem essa mudança.

## 5. Pós-lançamento (monitoramento)

- Enviar `sitemap.xml` ao Google Search Console (propriedade correta por domínio).
- Inspecionar as URLs prioritárias (home, cidade, serviços e guias) e solicitar indexação das alteradas.
- Acompanhar por landing page: consultas, cliques e contatos (WhatsApp/tel/formulário).
- Revisar indexação de `/index.html` após o redirect (o Search Console mostrará como `/`).
- Não usar métricas inventadas: relatar apenas dados reais do Search Console/GA.

## 6. Pendências bloqueantes antes do lançamento oficial

- Confirmação dos dados de contato de Guarapuava (central x local) e endereço físico (se houver).
- Validação documental de CEVS/CRBio/razão social e da alegação "30 anos".
- Documentação técnica/responsável do equipamento de ozônio (se for manter o serviço).
- Medição de Lighthouse/CWV com dados reais.