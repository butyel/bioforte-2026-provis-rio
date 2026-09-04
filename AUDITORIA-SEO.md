# Auditoria SEO — Site Bioforte (relatório interno)

Data: 2026-09-04
Site: https://www.bioforte.com.br/ | Repo: butyel/bioforte-2026-provis-rio

## 1. Páginas existentes (37 HTML + templates)
- Serviços (7): desinsetizacao, desratizacao, descupinizacao, controleIntegradoDePragas, controlePombos, limpezaCaixaDAgua, oxi-sanitizacao
- Pragas (12): aranha-armadeira, barata-americana, barata-germanica, carrapato, cupim-madeira-seca, escorpiao, formiga-fantasma, formiga-sauva, mosca-domestica, pulga, pombo, rato-camundongo
- Institucional (5): quemSomos, nossoTime, certificacoes, depoimentoClientes, carreira
- Outras (10): contato, duvidasFrequentes, nosossServicos, galeriaInstagram, treinamentoNr33, treinamentoNr35, indica_amigos, mail-success, emConstrucao, areaCliente, google
- Templates: header.html, footer.html (carregados via jQuery `$("#footer").load("footer.html")` em 32 páginas)

## 2. Problemas encontrados

### Técnico / SEO crítico
- 37 páginas com `lang="en"` (deveria ser pt-BR); apenas index tem pt-br
- Meta description vazia ou inexistente em todas as páginas
- Keywords placeholder ("SITE KEYWORDS HERE")
- Sem canonical, sem Open Graph, sem Twitter Cards
- Sem schema.org (Organization, LocalBusiness, Service, FAQPage, BreadcrumbList)
- Duplicação de títulos: barata-americana e barata-germanica ambos "Bioforte − Barata"; indica_amigos "Bioforte − Aranha Armadeira"; duvidasFrequentes "Em Desenvolvimento"; google "Document"
- Copyright placeholder "codeglim!" (template)

### Headings
- index.html possui 6 H1 (Nossos Serviços, Quem indica amigo é, Nossos Trabalhos, Nosso Time [comentado], Depoimentos, Nossos Parceiros)
- Páginas de serviço/pragas: SEM H1 — título só em `<h2>` de breadcrumbs e `<h2 class="tab-title">`
- HTML inválido: `<p class="text"><h2>...</h2></p>` (block dentro de p) em desinsetizacao
- nossoTime: 2 H1 (Time Administrativo + Time Operacional)

### Imagens
- `alt="logo"`, `alt="#"`, `alt=""` generalizados
- Sem width/height, sem loading lazy, sem decoding
- 20+ imagens em nr33/nr35 com 5–8 MB cada (impacto LCP/CLS e custo de banda)
- Sliders 1600x800 PNG (~1 MB cada)

### Scripts/performance
- index carrega React 16 em modo development (unpkg) — desnecessário, ~450KB render-blocking
- jQuery carregado 2x em várias páginas (CDN jquery-1.10.2 no head + local jquery.min.js no fim)
- Fontes Google Fonts sem preconnect
- Preloader removível (bloqueia primeira pintura)

### Links
- `project-single.html` referenciado no index (4x) — arquivo inexistente (404)
- Links de footer `mailto:comercialfranca@bioforte.com` e `mailto:comercial@bioforte.com` sem `.br` (texto visível tem .br)
- `target="blank"` em todos os links sociais (deveria ser `_blank` + rel noopener)
- Link "Manejo de Abelha" no index aponta para modal `#exampleModalScrollable` que não existe na página (só em nosossServicos, e lá o modal fala de Higienização de Reservatórios)

### Formulários (Fase 21/22)
- `action="mail/mail.php"` e `action="mail/newslatter.php"` — PHP não roda na Vercel → 404 ao enviar
- Inputs sem `<label>` (apenas placeholder) — falha de acessibilidade
- Newsletter com markup inválido (`method/action` em div, form sem label)

### Local SEO
- Unidades Franca (rua + tel + whats) e Ribeirão Preto (rua + tel + whats) completas
- Uberaba: apenas whatsapp + email (sem endereço) → não pode virar LocalBusiness completo
- Sem geo coordinates em nenhuma unidade

### Outros
- `copyright` "codeglim!" no head (marca de template)
- `google.html` e `emConstrucao.html` lixo/placeholder
- Footer carregado via AJAX (conteúdo NAP não está no HTML servido)
- Depoimentos reais presentes (E-E-A-T) mas sem schema Review/AggregateRating (não adicionar por segurança de dados)
- Hotjar tracking configurado com hjid real (5163276)

## 3. Dados confirmados (para schema — nada inventado)
- Nome entidade: Bioforte Saneamento Ambiental
- Franca: Rua João de Goes Conrado, 2525 - São Jose, Franca/SP · Tel (16) 3723-0808 · WhatsApp (16) 97400-7842 · comercialfranca@bioforte.com.br
- Ribeirão Preto: Rua João Nutti, 1135 - Jardim Paulistano, Ribeirão Preto/SP · Tel (16) 3635-2034 · comercial@bioforte.com.br
- Uberaba: WhatsApp (34) 99298-6711 · atendimentouberaba@bioforte.com[.br?] (divergente entre páginas — pendência)
- Horário: Segunda a Sexta 07:30–17:30
- Redes: facebook.com/biofortecontroledepragas, twitter.com/francabioforte, youtube (UCH39-FD6_s9X6mHQHEfzOMQ), instagram.com/bioforte_dedetizadora
- E-mail geral: atendimento@bioforte.com.br
- "Mais de 20 anos de experiência" (presente no rodapé/páginas)
- CNPJ: NÃO informado (pendência)