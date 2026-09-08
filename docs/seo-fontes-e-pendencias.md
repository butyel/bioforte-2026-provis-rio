# SEO — Fontes e Pendências (10/09/2026)

Branch: `seo-lancamento-2026`. Trabalho local revisável, **sem publicação em produção**.

## O que foi implementado

### Conteúdo (P0)
- **desinsetizacao.html**: removida afirmação de que "dedetização não é mais usado", a lista de produtos com DDT, a citação sem fonte ("Dedetização o seu portal de busca") e o texto que descrevia o serviço "sem analisar o porquê da infestação". Nova estrutura: o que é, como funciona, quando é necessário, pragas/ambientes atendidos, segurança do serviço e como solicitar orçamento. Removida promessa de "resultado perfeito".
- **oxi-sanitizacao.html**: removidas promessas absolutas ("acabar definitivamente", "qualquer tipo de odor"), a menção genérica à FDA e a "Fonte: Wier". Novo texto delimita aplicações, exige ambiente desocupado, ventilação pré-reentrada e não apresenta o ozônio como purificador contínuo de ar. Title/description e JSON-LD Service revisados.

### Conteúdo (P1)
- **escorpiao.html** e guias: FAQ e textos alinhados — nenhum produto químico isolado elimina integralmente a população; prioridade a manejo ambiental, vedação, prevenção e atendimento médico imediato em caso de acidente. Adicionado "Limites do controle químico" e "Em caso de acidente" no guia de prevenção.
- **guia-sinais-de-cupim-em-casa.html**: diferenciados cupins de madeira seca (serragem, orifícios, som oco) e subterrâneos (túneis de terra); orientação revisada sobre movimentação de móveis (evitar arrastar antes da avaliação).
- **guia-quando-fazer-higienizacao-caixa-dagua.html** e FAQ de `duvidasFrequentes`: recomendação alinhada ao Ministério da Saúde (pelo menos a cada 6 meses e quando necessário, sem apresentar como lei nacional universal).
- Guias curtos expandidos com seções práticas (erros comuns, prevenção passo a passo, quando chamar profissional): baratas, ratos, formigas, quando chamar dedetizador, pombos, escorpiões e identificação de escorpiões.
- Removida a afirmação sem comprovação sobre "quatro anos de vida sem abelhas" no modal e no card da home.

### Home e semântica
- H1 estável "Controle de pragas para residências e empresas"; animação "Soluções em …" mantida como texto complementar (`aria-live`, dimensões preservadas, `prefers-reduced-motion` existente).
- Título/descrição da home: "Bioforte | Controle de Pragas e Dedetização".
- Títulos revisados para evitar listas de 4 cidades e repetição de município (escorpiões, carrapatos, ratos). Cidades: "Dedetização em Franca…", "…em Ribeirão Preto…", "…em Uberaba…", "…em Guarapuava…". "Dúvidas sobre Dedetização e Controle de Pragas".
- Textos naturais: "Ratos e Camundongos", "Depoimentos de Clientes", "Saiba mais sobre nosso atendimento".
- Removidos preconnect duplicado e o link de stylesheet `href="#" id="tromas"` (resíduo sem uso; o seletor de tema não existe no HTML).
- Corrigidos atributos `data-event`/`data-page-origin` duplicados no link do modal de abelhas.

### SEO local e dados estruturados
- `controle-de-pragas-franca.html`: `Service.@id` apontava para `…-ribeirao-preto.html#service` → corrigido; `servicePhone` (Ribeirão) → `(+55-16-3723-0808)` como `ContactPoint`; `Organization.telephone` da página de Franca corrigido para o telefone de Franca; `serviceUrl` aponta para a página local dedicada.
- URLs de unidades no JSON-LD (`LocalBusiness`) apontando para `contato.html` → páginas dedicadas (`controle-de-pragas-franca/ribeirao-preto/uberaba.html`) em 35+ arquivos.
- Guarapuava: rótulo "Área de atendimento" (em vez de "Endereço"), iframe do mapa identificado como "Área de atendimento – Guarapuava e região"; rótulos "SEO Local" substituídos por categorias editoriais ("Guia · Guarapuava/PR", "Prevenção no Centro-Sul do Paraná", "Atendimento em Franca", "Indústrias e Agronegócio").

### Ambiente/consolidação
- `vercel.json`: redirect permanente `/index.html → /`; header `X-Robots-Tag: noindex,nofollow` para **previews** (host contendo `butyel95-4732s-projects.vercel.app`), sem atingir o alias de produção `biofortecombr.vercel.app`.
- Navegação interna (menu, logo, rodapé) atualizada de `index.html` para `/`.
- `robots.txt`: `/areaCliente.html` liberado para o crawler ler o `noindex` (login público; dados privados seguem sob autenticação).

## Fontes consultadas
- Google: "Noindex e necessidade de permitir rastreamento" — https://developers.google.com/search/docs/crawling-indexing/block-indexing
- Google: "Consolidação de URLs" — https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google: fim dos rich results de FAQ e nota sobre llms.txt — https://developers.google.com/search/updates
- Core Web Vitals — https://web.dev/articles/vitals
- Paraná: Ações de controle e prevenção dos acidentes com escorpiões — https://www.parana.pr.gov.br/Pagina/Acoes-de-controle-e-prevencao-dos-acidentes-com-escorpioes
- Ministério da Saúde: limpeza de reservatórios — https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/emergencia-em-saude-publica/folder-limpeza-e-desinfeccao-de-caixa-dagua-e-reservatorios-de-agua-pos-enchente
- EPA: geradores de ozônio em ambientes internos (parâmetro internacional; não é norma brasileira nem avaliação do equipamento da Bioforte) — https://www.epa.gov/indoor-air-quality-iaq/ozone-generators-are-sold-air-cleaners

## Pendências — exigem confirmação da empresa (não inventar)
1. **Guarapuava**: confirmar se `(16) 3723-0808` é central ou telefone local; há referência anterior do cliente a `(42) 99803-1744`, mas isso não é confirmação atual. Enquanto não houver endereço físico confirmado, o site usa "Área de atendimento" (feito) e não apresenta a instalação como endereço físico.
2. **Razão social / legalName**: confirmar razão social real da pessoa jurídica (o projeto usa "Bioforte Saneamento Ambiental" e "Bioforte Controle de Pragas" como marketing). Não trocar o nome comercial sem registro documental.
3. **CEVS/CRBio**: os números exibidos no rodapé ("N° CEVS 35430218-812-000018-1-3", "352620004-812-000015-1-1", "CRBio 130.421/01-D") precisam ser validados com a documentação da empresa antes do lançamento.
4. **Oxi-sanitização**: conferir documentação do equipamento e responsável técnico; o que não puder ser comprovado não vira promessa pública.
5. **Telefones por unidade**: unicidade entre topbar, footer, JSON-LD e FAQs (foi corrigido na página de Franca; revisar Ribeirão/Uberaba em novas verificações de plano).
6. **"30 anos de experiência"**: citado no site; confirmar data de fundação/registro antes de manter em comunicações verificáveis.
7. **GTM-5PJ9NKS**: container mantido; fluxo de consentimento e triggers não são audíveis pelo repositório. Testar primeiro acesso, clique imediato e navegação por teclado antes de adicionar listeners. `data-event` existe, mas não comprova envio; `generate_lead` só deve ser disparado após confirmação real de envio do formulário.
8. **Sitemap lastmod**: várias entradas usam 2026-01-15. Recomenda-se verificar histórico real e atualizar apenas por mudança substantiva, ou omitir a data. Pendência de revisão manual.
9. **Lighthouse / CWV**: não medido neste ambiente. Ver docs/seo-lancamento.md para instruções de medição antes do lançamento.
10. **Article.image e autoria**: guias usam a logo como imagem do artigo. Sem banco de imagens editoriais no repositório, manteve-se a logo; pendência: incluir autoria/data visíveis e imagem editorial real quando disponível.

## Itens verificados como oportunidade (não falha)
- FAQPage mantido (útil aos usuários), sem dependência de rich result.
- Múltiplos H1 na home: "Nosso Time" é seção comentada no HTML (não renderiza). H1 da home agora estável.
- `theme-plugins.js` (~313 KB): auditado; não removido para preservar menus/acordeões/galerias. Otimização é oportunidade, não falha.