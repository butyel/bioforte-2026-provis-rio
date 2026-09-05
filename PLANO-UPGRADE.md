# PLANO TÉCNICO — UPGRADE COMPLETO BIOFORTE
**Projeto:** bioforte.com.br (estático, HTML5 + Bootstrap + jQuery)
**Ambiente:** https://biofortecombr.vercel.app
**Data do plano:** 5 de setembro de 2026
**Regra:** apresentar o plano → aprovação → implementação fase a fase.

---

## 1. ARQUITETURA ATUAL

### Páginas (52 HTML)
- **Institucionais:** index (home), quemSomos, nossoTime, certificacoes, contato, carreira, areaCliente, depoimentoClientes, duvidasFrequentes, indica_amigos, area-atuacao, emConstrucao, mail-success
- **Serviços (7):** desinsetizacao, desratizacao, descupinizacao, controleIntegradoDePragas, controlePombos, limpezaCaixaDAgua, oxi-sanitizacao
- **Pragas (12):** aranha‑armadeira, barata‑americana, barata‑germanica, carrapato, cupim‑madeira‑seca, escorpiao, formiga‑fantasma, formiga‑sauva, mosca‑domestica, pulga, pombo, rato‑camundongo
- **Unidades (3):** controle‑de‑pragas‑franca/ribeirao‑preto/uberaba — **design referência (upgrade‑rp)**
- **Conteúdo:** dicas (hub), 8 guias (guia-…), galeriaInstagram, treinamentoNr33/35
- **Templates/fragmentos:** header.html, footer.html, google.html, google1d6aab6188bd04a0.html (verificação)

### Tecnologia
- Bootstrap 3 + tema Tromas (style.css / theme-plugins.css / skin1)
- CSS moderno: impeccable-refinements + upgrade-rp (páginas de unidades)
- JS: jQuery + theme-plugins + main + upgrade-rp (interações leves)
- **Emojis existentes:** 🤝 em carreira.html (direto); entidades emoji (&#128028; &#128000; &#129410; etc.) nos 3 cards/páginas de unidade — **a remover**.

### SEO/Infra
- 45+ URLs no sitemap · robots.txt ok · canonical Vercel ok · GTM-5PJ9NKS · JSON-LD (Organization/Service/LocalBusiness/FAQPage/Article) · vercel.json (headers+cache) · Cloudflare detém DNS do domínio (fora do escopo do código).

---

## 2. ARQUITETURA PROPOSTA

```
HOME (conversão + navegação por pragas)
├─ PragmaHub /pragas  (Central de Pragas: busca + filtros + cards)
│   └─ Páginas individuais de praga (12, novo template reutilizável)
├─ FAQHub /duvidas-frequentes (Central FAQ: busca + categorias + accordion + hash)
├─ ContentHub /dicas-e-guias (Central de conteúdo: filtros + cards)
│   └─ 15 artigos (GuideArticleTemplate)
├─ Central de Atuação (área-atuacao) ✓ já existe
└─ Serviços (7) ✓ existentes
```

### Variação de URL
- **Manter** URLs atuais das 12 pragas (não quebrar indexação) e SERVICES.
- **Criar:** `/pragas` (hub), `/duvidas-frequentes` (novo alias da página existente duvidasFrequentes.html), `/dicas-e-guias` (evolução de dicas.html — manter alias antigo para não quebrar), artigos individuais `/guia-…` (padrão já usado).

---

## 3. NOVAS ROTAS / ARQUIVOS

| Rota | Arquivo | Origem |
|---|---|---|
| `/pragas` | pragas.html (novo) | HUB central de pragas |
| `/duvidas-frequentes` | duvidasFrequentes.html (reescrita) | central FAQ |
| `/dicas-e-guias` | dicas.html (reescrita) → novo `/dicas` alias | central de conteúdo |
| 15 artigos | guia-***.html | GuideArticleTemplate |
| Páginas de praga (12) | mantêm nome, novo interior | PestPageTemplate |

---

## 4. COMPONENTES NOVOS REUTILIZÁVEIS

Arquivos compartilhados (CSS/JS) para evitar duplicação:
- `css/bioforte-system.css` — design system de componentes (cards, FAQ accordion, sticky nav, badges, CTA, busca/filtros, timeline, checklist)
- `js/bioforte-system.js` — interações (accordion, busca, filtros, sticky anchor nav, reveal, hash-aware FAQ)

Componentes conceituais (marcações CSS reutilizáveis):
1. `PestCard` (card de praga p/ home e hub)
2. `PestPageTemplate` (12 páginas: hero+anchor nav+seções+FAQ)
3. `FAQAccordion` + `FAQSearch` (busca dinâmica + hash `#slug-pergunta`)
4. `GuideCard` + `GuideArticleTemplate` (artigos)
5. `Breadcrumb` (consistente)
6. `StickySectionNavigation` (âncora sticky no desktop / scroll horizontal no mobile)
7. `ContextualCTA` (CTAs por contexto: encontrou praga/proteção empresarial)
8. `RelatedContent` / `RelatedPests` (links automáticos relacionados)
9. `RiskBadge` (baixo/moderado/alto — com Linguagem técnica, sem alarmismo)
10. `PreventionChecklist` (checklist de prevenção)
11. `PestSearch` (busca+filtros do hub)

> Nenhuma biblioteca nova. Tudo em CSS/jQuery+nativo leve para preservar CWV.

---

## 5. ARQUIVOS QUE SERÃO ALTERADOS / CRIADOS

**Alterar (interior, mantendo URL/identidade):**
- index.html (novo bloco "Qual problema você precisa resolver?" + CTAs contextuais)
- 12 páginas de praga (novo PestPageTemplate visual — mantém slug/title/meta/schema)
- duvidasFrequentes.html (central FAQ 40+ com busca/categorias/accordion/hash)
- dicas.html (central de conteúdo com filtros/cards de artigo + 15 guias)
- header/menu (mega menus PRAGAS e CONTEÚDOS; item já criado "Conteúdo" e "Unidades" serão evoluídos)
- sitemap.xml (novas rotas)
- **remoção de todos os emojis**: carreira.html (🤝) e entidades emoji nas 3 páginas de unidades → substituir por ícones (Font Awesome, já carregado) ou SVG inline leve.

**Criar:**
- pragas.html (hub)
- 15 artigos (guia-***.html) com Article+FAQ schema
- css/bioforte-system.css, js/bioforte-system.js
- (componentes compartilhados)

**NÃO alterar:** serviços (7), unidades (já upgrade), área-atuacao, institucionais, footer templates — apenas linkagem.

---

## 6. RISCO & MITIGAÇÃO

| Risco | Mitigação |
|---|---|
| Quebrar SEO/URLs existentes | Mantém slugs/titles/canonicals; muda só interior visual + conteúdo |
| Páginas fartas → CWV | 1 CSS+JS compartilhados pequenos; sem libs; lazy nas imagens; `prefers-reduced-motion` |
| Conteúdo duplicado no hub/páginas | Conteúdo por página único; hub = síntese + links (não duplica texto full) |
| Emojis removidos → perda visual | Troca por ícones Font Awesome (já no tema) ou SVG; testar hover/responsive |
| FAQPage schema sem conteúdo visível | Só aplicar FAQPage com perguntas visíveis (regra mantida) |
| Menu muito grande | Mega menus colapsáveis; mobile hambúrguer mantido; ordem priorizada |
| Erros de encoding em acentos | Processar com Node (UTF-8), validação de mojibake pós-edição |
| Deploy/regressão | Validação por fase (build, links, JSON-LD, mojibake, amostras mobile) |

---

## 7. ORDEM DE IMPLEMENTAÇÃO (FASES)

| Fase | Entrega | Validação |
|---|---|---|
| **F01** | Home: bloco "Qual problema você precisa resolver?" (10 cards) + CTAs contextuais + limpeza de emojis | links, mobile, mojibake |
| **F02** | Central de Pragas `/pragas` (busca + filtros + PestCards) | filtros funcionais, SEO |
| **F03** | `css/js/bioforte-system` + PestPageTemplate (12 páginas) | hero/âncoras/FAQ/CTA |
| **F04** | Central FAQ `/duvidas-frequentes` (40+, busca, categorias, hash) | accordion, hash |
| **F05** | FAQ por praga incorporado nas 12 páginas | perguntas reais p/ praga |
| **F06** | Central de Dicas e Guias `/dicas-e-guias` (filtros + GuideCards) | filtros |
| **F07** | 15 artigos iniciais (GuideArticleTemplate, Article+FAQ schema) | Article schema, E-E-A-T |
| **F08** | Links internos automáticos (RelatedPests/RelatedContent em praias/artigos) | zero quebrados |
| **F09** | Schema final (Organization/LocalBusiness/WebPage/Service/Article/FAQPage) | Rich Results Test |
| **F10** | Validação final: sitemap, robots, mobile 320-1440, CWV, relatório antes/depois, deploy | PSI |

---

## 8. REGRAS DE CONTEÚDO & GEO

- Responder sempre: O que é? Por que acontece? Como identificar? Riscos? Como prevenir? Quando procurar ajuda?
- Respostas diretas, listas, tabelas, definições — otimizadas para AI Overviews / ChatGPT / Gemini / Perplexity.
- E-E-A-T: autor responsável técnico, data, linguagem técnica responsável (sem alarmismo).
- Nada de conteúdo genérico, keyword stuffing ou dados falsos.
- Mapa/contexto local (Franca, Ribeirão Preto, Uberaba) quando relevante.

---

## 9. LINKS INTERNOS

Cada página de praga → pragas relacionadas + serviço relacionado + 2 guias + FAQ + contato.
Cada artigo → pragas relacionadas + serviços + FAQ + outro artigo + CTA.
Home → pragas (hub), serviços, dicas, unidades.

---

## 10. EMOJIS — REGRA DE REMOÇÃO

- **Alvo atual detectado:**
  - carreira.html: `🤝` (handshake)
  - controle-de-pragas-{franca,ribeirao-preto,uberaba}.html: entidades `&#128028; &#128000; &#129410; &#128027; &#128025; &#129431; &#128036; &#128375; &#128737; &#128167; &#10052;` (usadas nos cards de pragas/diagnóstico/serviços)
- **Estratégia:** substituir por ícones Font Awesome (já carregado no tema: fa-bug, fa-…), ou SVG inline leve quando não houver FA correspondente. Manter layout/responsive/hover.
- **Prevenção:** nas novas páginas (hub, artigos, template de praga) uso exclusivo de ícones FA/SVG — nenhum emoji.
- **Garantia:** scan automatizado pós-edição (caracteres Unicode emoji + entidades decimais &##) = 0.

---

## 11. VALIDAÇÃO POR FASE (padrão)

- Build local (abre arquivos) sem erros.
- Links ativos quebrados = 0 · âncoras sem alvo = 0.
- JSON-LD parseável (Node) · sem mojibake · 1 H1 por página · dashboards.
- Metadados (title/desc/canonical/OG) preservados ou melhorados.
- Amostras mobile (320/375/390/414/768/1024/1440) sem overflow.
- Deploy após cada fase: `vercel --prod --yes` + commit/push.

---

**Status:** Plano apresentado — aguardando aprovação para iniciar a FASE 01.