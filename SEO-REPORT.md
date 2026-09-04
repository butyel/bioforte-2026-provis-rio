# Relatório de Otimização SEO — Bioforte

Data: 04/09/2026
Projeto: bioforte.com.br (site estático, GitHub repo `butyel/bioforte-2026-provis-rio`)
Produção Vercel: https://biofortecombr.vercel.app
Domínio canônico: https://www.bioforte.com.br/

## O que foi feito

### 1. Auditoria técnica (AUDITORIA-SEO.md)
Inventário completo dos 38 arquivos HTML, templates (header/footer carregados via AJAX),
falhas encontradas (lang="en", 6 H1s no index, alt vazio, jQuery duplicado, React em dev,
links quebrados, canonical/schema/OG inexistentes).

### 2. Backups
- Branch `backup-pre-seo` criada com o estado original do site.
- `company-data.json` criado com os dados institucionais confirmados (única fonte de verdade).

### 3. Cabeçalho (head) em todas as páginas
- `lang="pt-BR"` em todas as páginas (antes `en`).
- `<title>` e `<meta description>` únicos e otimizados por página.
- `link rel="canonical"` apontando para o domínio www (https://www.bioforte.com.br/...).
- Open Graph (og:title, og:description, og:url, og:image, og:locale pt_BR, og:site_name).
- Twitter Card (summary).
- `noindex, follow` em páginas utilitárias: areaCliente, mail-success, emConstrucao, google, header, footer.

### 4. Schema.org (JSON-LD) por página
- `Organization` (Bioforte Saneamento Ambiental) — dados reais (e-mail, telefone, área de atuação, horário, redes sociais).
- `LocalBusiness` para as unidades de Franca e Ribeirão Preto (endereços e telefones reais).
- `Service` para as 7 páginas de serviço (desinsetização, desratização, descupinização, controle integrado, pombos, caixa d'água, oxi-sanitização).
- `FAQPage` em duvidasFrequentes (4 perguntas/respostas reais da página).
- `BreadcrumbList` em todas as páginas internas.
- `ContactPage` em contato.
- Nenhuma informação inventada: Uberaba segue sem endereço (não vira LocalBusiness), sem CNPJ/geo (pendente da empresa).

### 5. Semântica e hierarquia de heading
- Exatamente 1 H1 visível por página (breadcrumb convertido de h2 para h1 nas páginas internas; index usa H1 sr-only + demais títulos de seção viraram h2).
- `<main id="main">` envolvendo o conteúdo principal nas 36 páginas públicas.
- Skip link "Pular para o conteúdo" em todas as páginas.
- `aria-label` no menu principal e nas listas de redes sociais.
- Removeu ~nesting HTML inválido `(<p><h2>...</h2></p>)` nas 7 páginas de serviço.
- Corrigiu 1 H1 por página em nossoTime (antes 2 H1s).

### 6. Imagens e acessibilidade
- `alt` descritivo em imagens de conteúdo (serviços, certificados, pragas, time, clientes, formas de pagamento, estrutura).
- `alt=""` explícito em ícones decorativos (imagens/icones) — padrão de acessibilidade correto.
- Logo com alt "Bioforte Controle de Pragas".
- Formulário de contato com labels ocultos (sr-only) associados aos campos.
- Newsletter com label associada, placeholder mantido.
- Removidos `alt="#"` e `alt="logo"` inúteis.

### 7. Performance (Core Web Vitals)
- Removida biblioteca jQuery duplicada (CDN no head) em todas as páginas — mantida a local.
- Removidos scripts React em dev (unpkg react.development.js) do index.

### 8. Correção de links e conteúdo
- `project-single.html` (404) nos projetos do index agora aponta para páginas reais.
- `imagesTrabalhos.html` (404) no breadcrumb de certificações corrigido.
- E-mails Uberaba padronizados para @bioforte.com.br (antes .com).
- Modal "Manejo de Abelha" adicionado no index (antes disparava para um modal inexistente).
- Texto "atende-lo (lá)" corrigido gramaticalmente.
- Copyright atualizado para 2026 e padronizado com o restante do site.

### 9. Sitemap e robots.txt
- `sitemap.xml`: 32 URLs indexáveis, domínio https://www.bioforte.com.br/.
- `robots.txt`: bloqueio de páginas utilitárias + referência ao sitemap.

### 10. CSS suplementar (sem alterar o design)
- Estilos espelho para `.section-title h2/h3` (seções que viraram h2 continuam idênticas).
- Estilo para `.breadcrumbs h1` (mesma aparência do h2 anterior).
- Skip-link, focus visible (#02843c) e scroll-margin — acessibilidade sem mudança de layout.

## Pendências (dependem da Bioforte)
- Substituir os formulários PHP (`mail/mail.php`, `mail/newslatter.php`) — Vercel não executa PHP.
  Sugestão: Formspree/Resend/Web3Forms.
- Informar CNPJ, endereço de Uberaba e coordenadas geográficas para enriquecer o schema.
- Gerar `og:image` 1200x630 otimizado.
- Otimizar/redimensionar imagens grandes em image/nr33 e image/nr35 (até 8 MB cada).
- Graves/verificar a tag `meta name="copyright" content="codeglim"` (template) nas páginas — pode ser removida.

## Valores de referência usados (reais)
- Franca: Rua João de Goes Conrado, 2525 - São José; (16) 3723-0808; WhatsApp (16) 97400-7842; comercialfranca@bioforte.com.br
- Ribeirão Preto: Rua João Nutti, 1135 - Jardim Paulistano; (16) 3635-2034; comercial@bioforte.com.br
- Uberaba: WhatsApp (34) 99298-6711; atendimentouberaba@bioforte.com.br
- E-mail geral: atendimento@bioforte.com.br
- Horário: Seg–Sex, 07:30–17:30
- "Mais de 20 anos de experiência"