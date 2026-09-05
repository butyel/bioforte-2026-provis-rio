# Bioforte - Design System & Strategy

## Paleta de Cores

### Primária
- **Verde Bioforte:** `#02843c` (brand, CTAs, ênfase)
- **Verde Escuro:** `#1a5c3f` (hover, active states)
- **Verde Claro:** `#e8f4f0` (backgrounds, cards)

### Neutras
- **Texto Primário:** `#1a1a1a` (não #000, mais quente)
- **Texto Secundário:** `#666666` (subheadings, captions)
- **Fundo:** `#ffffff` (limpo)
- **Fundo Secundário:** `#f5f5f5` (seções alternadas)

### Semânticas
- **Sucesso:** `#10b981` (green-accent)
- **Alerta:** `#f59e0b` (amber)
- **Erro:** `#ef4444` (red)

## Tipografia

### Hierarquia
- **H1:** 48px / 700 / 1.2 line-height (hero, seção principal)
- **H2:** 36px / 700 / 1.3 (section titles)
- **H3:** 24px / 600 / 1.4 (subsections)
- **H4:** 18px / 600 / 1.4 (card titles)
- **Body:** 16px / 400 / 1.6 (padrão)
- **Small:** 14px / 400 / 1.5 (captions, meta)

### Font Family
- **Todas:** Roboto (já em uso)
- Weights: 300 (light), 400 (regular), 600 (semibold), 700 (bold)

## Espaçamento & Layout

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

### Grid
- 12-column grid
- Gutter: 24px
- Container max-width: 1200px

### Seção Padding
- Vertical: 64px (desktop), 48px (tablet), 32px (mobile)
- Horizontal: 24px

## Componentes

### Botão
- **Primary:** Verde (#02843c), branco texto, 12px padding vertical, 24px horizontal
- **Hover:** Verde escuro (#1a5c3f), shadow subtle
- **Border-radius:** 4px (limpo, não rounded)
- **Font-weight:** 600

### Cards
- **Background:** #ffffff
- **Border:** 1px solid #e0e0e0
- **Border-radius:** 8px
- **Padding:** 24px
- **Shadow:** 0 1px 3px rgba(0,0,0,0.1) (sutil)
- Sem nesting

### Input/Form
- **Border:** 1px solid #cccccc
- **Focus:** Border #02843c, shadow #02843c 0 0 0 3px rgba(...)
- **Padding:** 12px 16px
- **Font:** 16px (prevenir zoom mobile)

## Padrões de Layout

### Hero Section
- Full-width background image
- Overlay escuro (opcional, para legibilidade)
- CTA primária em baixo/centro
- Altura: 60vh (desktop), 50vh (tablet), 40vh (mobile)

### Services Grid
- 3 colunas (desktop), 2 colunas (tablet), 1 coluna (mobile)
- Cards com ícone 48px, título, descrição
- Sem duplicação de ícones
- Hover: shadow aumenta, verde accent na borda top

### Testimonials Carousel
- Imagem 80px circular (avatar)
- Quote, nome, título
- Background suave (#f5f5f5)
- Sem setas — usar dots navigation

### Footer
- 4 colunas (desktop)
- Links organizados por categoria
- Copyright em baixo
- Redes sociais em destaque

## Responsividade

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Comportamentos
- Stack vertical em mobile
- Fontes menores (16px base → 14px em mobile)
- Padding reduzido em mobile
- Nav collapsa em hamburger menu (< 768px)

## Animações & Easing

### Transições Padrão
- Duração: 200ms (hover), 300ms (página)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (smooth, não bounce)

### Micro-interações
- Hover button: cor muda, shadow sutil
- Hover link: underline, cor verde
- Loading: fade-in gradual (não piscada)

## Accessibility

### Contraste
- Texto sobre fundo: min 4.5:1 (WCAG AA)
- Verde #02843c sobre branco: 5.1:1 ✓

### Texto
- Sem justify align
- Max line-length: 60-80 caracteres para legibilidade
- Alt-text em todas imagens

### Interatividade
- Focus outline visível (2px solid #02843c)
- Tap targets ≥ 48px
- Skip link no topo

## Status de Build
- **Approach:** Code-first (melhorias incrementais no código existente)
- **Ferramentas:** CSS puro, Bootstrap grid, sem novos frameworks
- **Prioridade:** Layout, spacing, cores, tipografia
