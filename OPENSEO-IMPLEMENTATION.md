# OpenSEO + Bioforte - Guia de Implementação Prático

## 🎯 Setup Inicial (30 minutos)

### Step 1: Criar Conta OpenSEO

1. Acesse https://openseo.so
2. Sign up (gratuito)
3. Criar conta com email
4. Verificar email

### Step 2: Conectar DataForSEO API

OpenSEO precisa de DataForSEO para dados de SEO:

1. Acesse https://dataseo.com (use link de referência do OpenSEO)
2. Criar conta DataForSEO
3. Gerar API key
4. Copiar para OpenSEO settings

**Custo:** ~$0 no primeiro mês (trial), depois ~$50-200/mês conforme uso

### Step 3: Adicionar Site

1. Em OpenSEO, clique "Add Site"
2. URL: https://biofortecombr.vercel.app
3. Local: Brazil (ou multi-local: Franca, RP, Uberaba)
4. Iniciar audit

---

## 🔍 Audit Inicial (1-2 horas)

### O que OpenSEO vai detectar

#### ✅ Pontos Positivos Esperados
- Schema.org implementado (LocalBusiness, WebSite)
- Meta tags presentes
- Mobile responsive (com Impeccable!)
- SSL/HTTPS ✓
- Structured data para depoimentos

#### ⚠️ Problemas Prováveis

**1. Meta Descriptions Genéricas**
```html
<!-- PROBLEMA -->
<meta name="description" content="Dedetização, desinsetização, desratização... equipe certificada...">

<!-- SOLUÇÃO -->
<meta name="description" content="Dedetização profissional em Franca, RP e Uberaba. 20+ anos, certificado. Orçamento grátis. Atendimento 24h.">
```

**2. Falta de H1 Tag Visível**
```html
<!-- PROBLEMA: H1 está em sr-only -->
<h1 class="sr-only">Controle de Pragas...</h1>

<!-- SOLUÇÃO: Adicionar H1 visível no hero ou principal -->
<h1>Dedetização e Controle de Pragas em Franca</h1>
```

**3. Title Tags Não-Otimizados**
```html
<!-- PROBLEMA -->
<title>Controle de Pragas em Franca e Ribeirão Preto | Bioforte</title>

<!-- SOLUÇÃO (com keyword) -->
<title>Dedetização em Franca & Ribeirão Preto | 20+ Anos | Bioforte</title>
```

**4. Falta de Schema para Services**
```json
<!-- ADICIONAR para cada serviço -->
{
  "@context": "https://schema.org/",
  "@type": "Service",
  "name": "Desinsetização",
  "description": "Serviço profissional de controle de insetos...",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Bioforte"
  },
  "areaServed": ["Franca, SP", "Ribeirão Preto, SP", "Uberaba, MG"]
}
```

**5. Falta de Internal Linking**
```html
<!-- PROBLEMA: Links genéricos -->
<a href="/desinsetizacao.html">Clique aqui</a>

<!-- SOLUÇÃO: Anchor text descritivo -->
<a href="/desinsetizacao.html">Saiba mais sobre desinsetização</a>
```

---

## 🎯 Keyword Research (2-3 horas)

### Step 1: Gerar Keywords no OpenSEO

1. Clique "Keyword Research"
2. Seed keywords:
   - dedetização
   - controle de pragas
   - desratização
   - descupinização
   - desinsetização

3. Local: Brazil (Franca, Ribeirão Preto, Uberaba)
4. Gerar relatório

### Step 2: Analisar Keywords

OpenSEO vai mostrar:
- Search volume (buscas/mês)
- Competição (easy/medium/hard)
- Custo por clique (CPC)
- Intenção (transacional, informacional)

### Step 3: Priorizar Top 50 Keywords

**Tier 1: High Priority (Implementar Week 1)**
```
dedetização Franca               (Alto volume, local)
controle pragas Franca           (Alto volume, local)
desinsetização Ribeirão Preto    (Alto volume, local)
desratização                     (Alto volume, genérico)
descupinização                   (Médio volume, genérico)
```

**Tier 2: Medium Priority (Week 2-3)**
```
controle integrado pragas        (Médio volume)
higienização caixa água          (Médio volume)
rato em casa                      (Alto volume, informational)
como eliminar baratas            (Alto volume, informational)
```

**Tier 3: Low Priority (Month 2+)**
```
manejo abelhas                   (Baixo volume, específico)
oxi-sanitização                  (Baixo volume, específico)
controle pombos                  (Baixo volume, específico)
```

### Step 4: Mapear Keywords → Páginas

```
Página                          Keywords Alvo
─────────────────────────────────────────────────
index.html (home)               controle pragas, dedetização
desinsetizacao.html             desinsetização, controle insetos
desratizacao.html               desratização, rato em casa
descupinizacao.html             descupinização, cupim
controleIntegradoDePragas.html  controle integrado pragas
limpezaCaixaDAgua.html          higienização caixa água, limpeza caixa
```

---

## ✍️ SEO Optimization Tasks (1-2 semanas)

### Task 1: Otimizar Meta Tags

**Para cada página:**

```html
<!-- HOME -->
<title>Dedetização em Franca, RP e Uberaba | 20+ Anos | Bioforte</title>
<meta name="description" content="Dedetização profissional. 20 anos de experiência. Controle integrado de pragas. Certificado. Orçamento grátis.">

<!-- DESINSETIZAÇÃO -->
<title>Desinsetização em Franca | Controle de Insetos | Bioforte</title>
<meta name="description" content="Desinsetização profissional em Franca. Baratas, formigas, aranhas. Equipe certificada. Sem produtos tóxicos.">

<!-- DESRATIZAÇÃO -->
<title>Desratização em Ribeirão Preto | Controle de Roedores | Bioforte</title>
<meta name="description" content="Desratização eficaz. Ratos, camundongos, ratazanas. Franca, RP, Uberaba. Atendimento 24h.">
```

**Dicas:**
- Include keyword principal no title (primeiras 60 caracteres)
- Description com CTA (Orçamento grátis, Atendimento 24h)
- Máximo 160 caracteres para description
- Único por página (não copiar)

### Task 2: Estruturar Headings

**Pattern para cada página service:**

```html
<!-- H1: Único, visível, com keyword -->
<h1>Desinsetização Profissional em Franca</h1>

<!-- H2: Subtópicos principais -->
<h2>O que é Desinsetização?</h2>
<p>...</p>

<h2>Tipos de Insetos que Controlamos</h2>
<ul>
  <li>Baratas</li>
  <li>Formigas</li>
  <li>Aranhas</li>
</ul>

<h2>Processo de Desinsetização</h2>
<p>...</p>

<h2>Orçamento Grátis</h2>
<p>...</p>

<!-- H3: Detalhes dentro de H2 -->
<h2>Processo de Desinsetização</h2>
<h3>Step 1: Inspeção</h3>
<h3>Step 2: Tratamento</h3>
<h3>Step 3: Monitoramento</h3>
```

### Task 3: Adicionar Schema Markup

```json
<!-- Para HOME -->
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Bioforte",
  "description": "Empresa de dedetização e saneamento ambiental",
  "url": "https://biofortecombr.vercel.app",
  "logo": "https://biofortecombr.vercel.app/images/logoBioforte.png",
  "telephone": "+55-16-3723-0808",
  "email": "atendimento@bioforte.com.br",
  "areaServed": ["Franca, SP", "Ribeirão Preto, SP", "Uberaba, MG"],
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Rua João de Goes Conrado, 2525 - São José",
      "addressLocality": "Franca",
      "addressRegion": "SP",
      "postalCode": "14000-000",
      "addressCountry": "BR"
    }
  ],
  "openingHours": "Mo-Fr 07:30-17:30",
  "serviceArea": {
    "@type": "GeoShape",
    "box": "Franca, Ribeirão Preto, Uberaba"
  },
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://biofortecombr.vercel.app/contato.html"
    },
    "name": "Request Free Quote"
  }
}
```

### Task 4: Melhorar Internal Linking

**Estratégia:**

```html
<!-- Home → Services -->
<a href="/desinsetizacao.html">Desinsetização profissional</a>
<a href="/desratizacao.html">Desratização de roedores</a>
<a href="/descupinizacao.html">Descupinização garantida</a>

<!-- Service Page → Related Services -->
<!-- Em desinsetizacao.html -->
<section>
  <h3>Outros Serviços Relacionados</h3>
  <ul>
    <li><a href="/desratizacao.html">Também fazemos desratização</a></li>
    <li><a href="/descupinizacao.html">E descupinização</a></li>
    <li><a href="/controleIntegradoDePragas.html">Controle integrado completo</a></li>
  </ul>
</section>

<!-- Service Page → FAQ/Blog posts -->
<!-- Em duvidasFrequentes.html -->
<h3>Como eliminar baratas?</h3>
<p>Veja nosso serviço de <a href="/desinsetizacao.html">desinsetização</a>...</p>
```

### Task 5: Core Web Vitals Optimization

**Medir:** https://pagespeed.web.dev

```
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1
```

**Melhorias:**
1. Lazy load images
2. Minify CSS/JS
3. Compress images
4. Cache estático (Vercel já faz)
5. Remover render-blocking resources

---

## 📊 Setup Rank Tracking (1 hora)

### No OpenSEO:

1. Clique "Rank Tracking"
2. Add keywords (top 20)
3. Set location: Franca, SP
4. Frequência: Daily/Weekly
5. Alerts: Se ranking cair > 3 posições

### Keywords para Rastrear:

```
dedetização Franca
controle pragas Franca
desinsetização Ribeirão Preto
desratização
descupinização
controle integrado pragas
```

### Monitoring Dashboard:

OpenSEO vai mostrar:
- Posição atual
- Histórico (gráfico)
- Tendência (up/down/stable)
- Comparação com concorrentes

---

## 🏆 Competitor Analysis (1-2 horas)

### Concorrentes Locais a Analisar:

1. **Terrapraga** (se existe)
2. **Desinsetizadora Local XYZ**
3. **Empresa de Dedetização RP**
4. **Google Maps competitors** (busque "dedetização Franca")

### O que Analisar:

1. Keywords que rankam
2. Backlinks (quem linka para eles)
3. Content strategy (quantas páginas, tópicos)
4. Gaps (keywords que eles não cobrem)

**Exemplo Gap:**
```
Concorrente rankea: "dedetização"
Concorrente NÃO rankea: "dedetização + covid safe", "dedetização ecológica"
Bioforte pode: Criar página sobre "Dedetização Segura e Ecológica"
```

---

## 📈 Timeline & Milestones

### Week 1
- [ ] Setup OpenSEO (30 min)
- [ ] Adicionar site (30 min)
- [ ] Audit inicial (1-2 horas)
- [ ] Keyword research (2-3 horas)
- **Deliverable:** Top 50 keywords + audit report

### Week 2-3
- [ ] Otimizar meta tags (4-6 horas)
- [ ] Refinar headings (2-3 horas)
- [ ] Adicionar schema markup (2-3 horas)
- [ ] Melhorar internal linking (2 horas)
- [ ] Setup rank tracking (1 hora)
- **Deliverable:** Site otimizado + tracking ativo

### Week 4+
- [ ] Monitorar rankings (15 min/dia)
- [ ] Análise semanal (1 hora)
- [ ] Iterações de otimização
- [ ] Content expansion (blog posts)
- **Deliverable:** Aumentar organic traffic

---

## 💰 Custos Reais

### Opção 1: OpenSEO Hosted
- **OpenSEO:** $10/month
- **DataForSEO API:** $50-200/month (conforme uso)
- **Total:** $60-210/month

### Opção 2: OpenSEO Self-Hosted
- **OpenSEO:** Grátis (você hospeda)
- **DataForSEO API:** $50-200/month
- **Hosting (Cloudflare):** Grátis
- **Total:** $50-200/month

### ROI Esperado
- Custo: $60-210/month
- Leads: 20-40/month (6 meses)
- Valor por lead: R$ 100-200 (orçamento)
- **Receita adicional:** R$ 2.000-8.000/month
- **ROI:** 900-13.000% (sim, rápido!)

---

## 🎯 Checklist de Implementação

- [ ] Conta OpenSEO criada
- [ ] DataForSEO API key conectada
- [ ] Site adicionado
- [ ] Audit inicial rodado
- [ ] Top 50 keywords identificadas
- [ ] Keywords mapeadas para páginas
- [ ] Meta tags otimizadas
- [ ] Headings estruturados
- [ ] Schema markup adicionado
- [ ] Internal linking melhorado
- [ ] Rank tracking setup
- [ ] Competitor analysis concluída
- [ ] Core Web Vitals otimizados
- [ ] Primeira semana de monitoramento

---

**Tempo total:** 1-2 semanas (8-16 horas)  
**Custo:** $60-210/month (ou $0 self-hosted + tempo)  
**ROI:** 900-13.000% em 6 meses
