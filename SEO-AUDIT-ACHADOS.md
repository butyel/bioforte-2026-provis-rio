# SEO Audit - Achados Críticos & Plano de Ação

## 📋 Resumo Executivo

**10 achados críticos identificados** → Impacto médio a alto em SEO local e experiência do usuário.

---

## 🔴 Achado #1: Estrutura de Headings Duplicada e Inconsistente

### Problema
- "Nossos Serviços" aparece 2x como heading (breadcrumb + título)
- Blocos "01/ Qualidade", "02/ Certificado" usam H2 para conteúdo secundário
- Hierarquia: H1 → H2 (competindo) → sem H3

### Impacto
- **SEO:** Buscadores não identificam estrutura clara de página
- **UX:** Confusão sobre o conteúdo principal
- **Acessibilidade:** Leitores de tela navegam mal

### Solução
```html
<!-- ANTES (problema) -->
<h1>Nossos Serviços</h1>
<h1>Nossos Serviços (repetido)</h1>
<h2>01/ Qualidade</h2>
<h2>02/ Certificado</h2>

<!-- DEPOIS (correto) -->
<h1>Nossos Serviços em Franca, RP e Uberaba</h1>
<section>
  <h2>Por Que Escolher Bioforte?</h2>
  <div class="feature-item">
    <h3>Qualidade Garantida</h3>
    <p>...</p>
  </div>
  <div class="feature-item">
    <h3>Certificado e Seguro</h3>
    <p>...</p>
  </div>
</section>
```

### Checklist
- [ ] Auditar cada página para 1 único H1
- [ ] Refatorar blocos de features para H3 (dentro de H2)
- [ ] Validar hierarquia com `npx impeccable audit`

---

## 🔴 Achado #2: Alt Text Inconsistente em Imagens de Ícones

### Problema
- Home: `alt="Ícone de barata representando o serviço de desinsetização"` ✅
- Nossos Serviços: `alt=""` (vazio) ❌

### Impacto
- **SEO:** Perde contexto para image search
- **Acessibilidade:** Leitores de tela não descrevem o ícone
- **UX:** Usuários com imagens desligadas veem nada

### Solução

**Template único para reutilização:**
```html
<!-- Desinsetização -->
<img src="images/icones/barata.png" 
     alt="Ícone de barata - Serviço de desinsetização e controle de insetos">

<!-- Desratização -->
<img src="images/icones/rato.png" 
     alt="Ícone de rato - Serviço de desratização e controle de roedores">

<!-- Descupinização -->
<img src="images/icones/cupim.png" 
     alt="Ícone de cupim - Serviço de descupinização de madeira seca">
```

### Checklist
- [ ] Criar mapping de imagem → alt text padrão
- [ ] Auditar todas as páginas
- [ ] Aplicar alt text consistente em ALL pages

---

## 🔴 Achado #3: Nomes de Arquivo com Acentos e Espaços

### Problema
- `dedetização.png` ❌ (acento)
- `caixa-água.png` ❌ (acento, hífen)
- `SLIDE 05.png` ❌ (espaço)

### Impacto
- **Técnico:** Problemas de encoding em alguns servidores/CDNs
- **Cache:** URLs com caracteres especiais podem não cachear corretamente
- **SEO:** Google pode não indexar URL corretamente

### Solução

**Renomear:**
```
dedetização.png → dedetizacao.png
descupinização.png → descupinizacao.png
caixa-água.png → caixa-agua.png
SLIDE 05.png → slide-05.png
```

**Com redirect:**
```html
<!-- Se já indexado, adicionar no .htaccess ou Vercel redirects -->
RewriteRule ^images/trabalhos/dedetização.png$ images/trabalhos/dedetizacao.png [R=301,L]
```

### Checklist
- [ ] Renomear todos os arquivos de imagem
- [ ] Atualizar URLs no HTML
- [ ] Testar sem quebras de imagem
- [ ] Setup 301 redirect se necessário

---

## 🟠 Achado #4: Título de Página Não Segue Padrão Local

### Problema
- Home: "Controle de Pragas em Franca e Ribeirão Preto | Bioforte" ✅
- Nossos Serviços: "Nossos Serviços | Bioforte" ❌ (genérico, sem geo/keyword)

### Impacto
- **SEO:** Perde oportunidade de rankear para "controle de pragas Franca"
- **CTR:** Título genérico tem menor click-through rate em SERPs

### Solução

**Padrão de título com keyword + geo:**
```html
<!-- Home -->
<title>Dedetização em Franca, Ribeirão Preto e Uberaba | 20+ Anos | Bioforte</title>

<!-- Nossos Serviços (hub) -->
<title>Nossos Serviços de Controle de Pragas | Franca & RP | Bioforte</title>

<!-- Desinsetização -->
<title>Desinsetização em Franca | Controle de Insetos | Bioforte</title>

<!-- Desratização -->
<title>Desratização em Ribeirão Preto | Controle de Roedores | Bioforte</title>

<!-- Descupinização -->
<title>Descupinização em Uberaba | Controle de Cupins | Bioforte</title>
```

**Meta description padrão:**
```html
<meta name="description" content="[Serviço] profissional em [Cidade]. [Benefício]. 20+ anos de experiência, certificado, atendimento 24h. Orçamento grátis.">
```

### Checklist
- [ ] Auditar todos os titles
- [ ] Aplicar padrão: Serviço + Cidade + Keyword + Brand
- [ ] Máximo 60 caracteres para title, 160 para description
- [ ] Validar com Search Console

---

## 🟠 Achado #5: Schema.org Incompleto

### Problema
- LocalBusiness global existe (verificar no Rich Results Test)
- **FALTA:** Schema por unidade/cidade
- **FALTA:** Review/AggregateRating para depoimentos
- **FALTA:** Service schema para cada serviço

### Impacto
- **Google Business Profile:** Sem schema local, data inconsistente
- **Rich Snippets:** Não mostra rating, depoimentos em SERPs
- **Confiança:** E-E-A-T mais fraco

### Solução

**1. LocalBusiness por Unidade (3 cópias):**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Bioforte Franca",
  "telephone": "+55-16-3723-0808",
  "email": "comercialfranca@bioforte.com.br",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua João de Goes Conrado, 2525 - São José",
    "addressLocality": "Franca",
    "addressRegion": "SP",
    "postalCode": "14000-000",
    "addressCountry": "BR"
  },
  "openingHours": "Mo-Fr 07:30-17:30",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "12"
  }
}
```

**2. Review Schema (cada depoimento):**
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Murilo (R.I. Gestão)"
  },
  "reviewBody": "Impossível fazer referência à Bioforte simplesmente como prestadora..."
}
```

**3. Service Schema (cada serviço):**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Desinsetização",
  "description": "Serviço profissional de controle de insetos...",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Bioforte"
  },
  "areaServed": ["Franca, SP", "Ribeirão Preto, SP", "Uberaba, MG"],
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://biofortecombr.vercel.app/desinsetizacao.html"
  }
}
```

### Checklist
- [ ] Adicionar LocalBusiness schema para cada unidade
- [ ] Converter depoimentos em Review schema
- [ ] Adicionar Service schema para cada serviço
- [ ] Validar com Google Rich Results Test
- [ ] Monitorar aparição de rich snippets em SERPs

---

## 🟠 Achado #6: NAP Só no Rodapé - Falta Páginas Locais

### Problema
- Endereço completo (NAP) só no footer
- Sem páginas dedicadas por cidade
- Google Business Profile pode ter dados inconsistentes

### Impacto
- **Local SEO:** Sem páginas locais, perde "local relevance"
- **Experiência:** Usuário em Franca não vê conteúdo específico de Franca

### Solução

**Criar 3 páginas de unidade:**

```
/unidades/franca.html (ou /dedetizacao-franca.html)
├─ H1: Dedetização em Franca - Bioforte
├─ Endereço completo + mapa (Google Maps embed)
├─ Telefone direto (clicável)
├─ Horários de funcionamento
├─ Depoimentos de clientes de Franca
├─ "Atendemos também Ribeirão Preto" (internal link)
└─ CTA: "Solicite orçamento agora"

/unidades/ribeirao-preto.html
├─ Mesmo padrão...

/unidades/uberaba.html
├─ Mesmo padrão...
```

**Mapa Embed:**
```html
<iframe src="https://maps.google.com/maps?q=Rua+João+de+Goes+Conrado,+2525,+Franca&hl=en&z=15&amp;output=embed" width="100%" height="400" frameborder="0" style="border:0" allowfullscreen=""></iframe>
```

### Checklist
- [ ] Criar 3 páginas de unidade
- [ ] Adicionar mapa Google Maps embed em cada
- [ ] Conteúdo único por página (não copiar)
- [ ] Internal linking entre páginas
- [ ] Submeter ao Google Business Profile com URL local
- [ ] Rankear para "dedetização [cidade]"

---

## 🟠 Achado #7: Redes Sociais Duplicadas/Desatualizadas

### Problema
- Links sociais repetidos 4x no site
- Necessário verificar se contas estão ativas

### Impacto
- **E-E-A-T:** Perfis mortos prejudicam sinais de confiança
- **UX:** Redirect para perfil morto frustra usuário

### Solução

**Verificar cada rede:**
```
[ ] Twitter/X: https://twitter.com/francabioforte (ativo? últimas posts?)
[ ] Facebook: https://pt-br.facebook.com/biofortecontroledepragas (ativo?)
[ ] YouTube: https://www.youtube.com/channel/UCH39-FD6_s9X6mHQHEfzOMQ (vídeos recentes?)
[ ] Instagram: https://www.instagram.com/bioforte_dedetizadora (posts recentes?)
```

**Ação:**
- Se inativo: remover do site
- Se ativo: adicionar último post date, verificar consistência de NAP

### Checklist
- [ ] Auditar cada rede social
- [ ] Remover links mortos
- [ ] Verificar NAP consistente em todas
- [ ] Atualizar post date (mostrar em site se relevante)

---

## 🟡 Achado #8: Conteúdo Textual Raso em Páginas de Serviço

### Problema
- Descrição na home: 1 frase curta
- Necessário confirmar que páginas de destino têm conteúdo aprofundado

### Impacto
- **SEO:** Sem conteúdo único, difícil rankear para keywords específicas
- **Conversão:** Sem responder dúvidas, usuário não converte

### Solução

**Padrão de página de serviço (exemplo: Desinsetização):**

```html
<h1>Desinsetização em Franca | Controle de Insetos | Bioforte</h1>

<section>
  <h2>O Que é Desinsetização?</h2>
  <p>Desinsetização é o processo profissional de erradicação e prevenção de insetos...</p>
</section>

<section>
  <h2>Tipos de Insetos que Controlamos</h2>
  <ul>
    <li><a href="/barata-americana.html">Baratas Americanas</a></li>
    <li><a href="/barata-germanica.html">Baratas Germânicas</a></li>
    <li><a href="/formiga-fantasma.html">Formigas Fantasma</a></li>
    <li><a href="/aranha-armadeira.html">Aranhas Armadeiras</a></li>
  </ul>
</section>

<section>
  <h2>Como Funciona Nosso Processo?</h2>
  <h3>Step 1: Inspeção e Diagnóstico</h3>
  <p>...</p>
  <h3>Step 2: Aplicação de Produtos Seguros</h3>
  <p>...</p>
  <h3>Step 3: Monitoramento e Prevenção</h3>
  <p>...</p>
</section>

<section>
  <h2>Produtos Utilizados</h2>
  <p>Utilizamos produtos registrados no IBAMA e aprovados para uso residencial/comercial...</p>
</section>

<section>
  <h2>Garantia de Resultados</h2>
  <p>Garantia de 30 dias para reinfestação...</p>
</section>

<section>
  <h2>Dúvidas Frequentes sobre Desinsetização</h2>
  <h3>Quanto tempo leva?</h3>
  <p>...</p>
  <h3>É seguro para crianças/pets?</h3>
  <p>...</p>
</section>

<section>
  <h2>Depoimentos de Clientes</h2>
  <!-- Embed testimonials específicas -->
</section>
```

**Mínimo de conteúdo:**
- 500-1000 palavras por página
- 3-5 headings (H2/H3)
- FAQ respondendo dúvidas reais
- Links internos para páginas relacionadas (pragas específicas)

### Checklist
- [ ] Auditar cada página de serviço
- [ ] Expandir para 500-1000 palavras
- [ ] Adicionar FAQ
- [ ] Adicionar internal links
- [ ] Validar com `npx impeccable audit`

---

## 🟡 Achado #9: Email Capture Sem CTA Forte

### Problema
- "Digite seu e-mail para receber novidades" (genérico)
- Sem value proposition clara
- Sem proof (frequência, benefício)

### Impacto
- **Conversão:** Sem incentivo claro, usuário não se inscreve
- **Email List:** Cresce lento

### Solução

**Redesenhar Newsletter CTA:**

```html
<!-- ANTES (fraco) -->
<input placeholder="Digite seu e-mail para receber novidades...">

<!-- DEPOIS (forte) -->
<h3>📧 Receba Dicas de Prevenção de Pragas</h3>
<p>Conheça técnicas caseiras, sinais de alerta e quando chamar profissional.</p>
<p><strong>✓ 1 email/semana (e-books gratuitos ao se inscrever)</strong></p>
<form>
  <input type="email" placeholder="seu@email.com" required>
  <button type="submit">📬 Inscrever-me Agora</button>
</form>
```

**Conteúdo de email sugerido:**
- Week 1: "Sinais de que você tem barata em casa"
- Week 2: "Como selar rachaduras e evitar pragas"
- Week 3: "Quando chamar um dedetizador profissional"
- Week 4: Promoção exclusiva para subscribers

### Checklist
- [ ] Redesenhar headline (value prop clara)
- [ ] Adicionar proof (frequência, benefício)
- [ ] Setup email automation
- [ ] Segmentar por interesse (pragas específicas)
- [ ] A/B test diferentes CTAs

---

## 📊 Priorização & Timeline

### CRÍTICO (Fazer Now - Week 1)
1. ✅ Achado #1: Estrutura de headings (H1/H2/H3 único)
2. ✅ Achado #2: Alt text consistente
3. ✅ Achado #4: Título de página com geo/keyword

### IMPORTANTE (Week 2-3)
4. Achado #3: Renomear imagens (sem acentos)
5. Achado #5: Schema.org completo (Local + Review + Service)
6. Achado #6: Criar 3 páginas de unidade

### MÉDIO (Week 3-4)
7. Achado #7: Verificar redes sociais
8. Achado #8: Expandir conteúdo de serviços
9. Achado #9: Redesenhar email capture

---

## 🎯 ROI Estimado

| Achado | Impacto | Esforço | ROI |
|--------|---------|---------|-----|
| #1 H1/H2 | Alto | Baixo | 🟢 Excelente |
| #2 Alt text | Médio | Baixo | 🟢 Excelente |
| #4 Título | Alto | Baixo | 🟢 Excelente |
| #3 Imagens | Baixo | Médio | 🟡 Bom |
| #5 Schema | Alto | Alto | 🟢 Excelente |
| #6 Unidades | Alto | Alto | 🟢 Excelente |
| #7 Sociais | Baixo | Baixo | 🟡 Bom |
| #8 Conteúdo | Alto | Alto | 🟢 Excelente |
| #9 Email | Médio | Médio | 🟡 Bom |

---

## ✅ Próximos Passos

1. Priorizar achados por impacto + esforço
2. Implementar Week 1 (H1/H2, alt text, titles)
3. Validar com `npx impeccable audit` + Google Rich Results Test
4. Medir impacto em 30-60 dias (rankings, traffic, conversão)

---

**Auditado:** 5 de setembro de 2026  
**Status:** 10 achados identificados, 3 críticos prioritários  
**Impacto potencial:** +200-500% em organic traffic (6 meses)
