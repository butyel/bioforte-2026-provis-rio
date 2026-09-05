# Guia de Uso: Impeccable para Bioforte

## Instalação (Opcional - Para Uso Avançado)

Se quiser usar os comandos Impeccable completos no seu harness (Claude, Cursor, etc):

```bash
npx impeccable install
```

Isso vai:
1. Detectar seu harness (Claude, Cursor, GitHub Copilot, etc.)
2. Instalar a skill `/impeccable` 
3. Permitir comandos como `/impeccable audit`, `/impeccable polish`, etc.

## Comandos Úteis (Com ou Sem Skill)

### Detector CLI (sem skill necessária)
```bash
npx impeccable detect index.html
npx impeccable detect https://biofortecombr.vercel.app
npx impeccable detect --json . > report.json
```

Detecta:
- ✅ Gradientes roxo-azul (evitados)
- ✅ Bounce easing (evitado)
- ✅ Cards aninhados (evitado)
- ✅ Contraste insuficiente
- ✅ Touch targets pequenos
- ✅ Line lengths longos
- E mais 55 regras determinísticas

### Com Skill Instalada

```
/impeccable audit          # Checklist a11y + performance
/impeccable polish         # Limpeza final
/impeccable critique       # UX design review
/impeccable layout         # Refinar spacing/alignment
/impeccable typeset        # Tipografia
/impeccable colorize       # Cores estratégicas
/impeccable animate        # Adicionar motion
/impeccable harden         # Edge cases + i18n
```

## Estrutura Atual Documentada

```
PRODUCT.md    → Contexto, público, voz
DESIGN.md     → Sistema de design completo
css/impeccable-refinements.css → Variáveis + componentes
```

Qualquer IA (Claude, Cursor, etc.) lê esses arquivos e mantém consistência.

## Workflow para Melhorias Futuras

1. **Editar component** (ex: hero section)
   ```bash
   # No seu editor, abra o arquivo
   vim index.html
   ```

2. **Pedir ao AI para melhorar com Impeccable**
   ```
   /impeccable polish the hero section
   # ou
   /impeccable critique the testimonials
   ```

3. **Validar**
   ```bash
   npx impeccable detect index.html
   ```

4. **Commitar**
   ```bash
   git add -A
   git commit -m "Impeccable: refine [component]"
   git push origin main
   ```

## Paleta de Cores para Referência

```css
--color-primary: #02843c        /* Verde Bioforte */
--color-primary-dark: #1a5c3f   /* Hover/Active */
--color-primary-light: #e8f4f0  /* Background */
--color-text: #1a1a1a           /* Não preto puro */
--color-text-secondary: #666666 /* Subtítulos */
--color-bg: #ffffff             /* Limpo */
--color-bg-secondary: #f5f5f5   /* Alternado */
```

## Escala de Espaçamento

```css
--space-xs: 4px      /* Mínimo */
--space-sm: 8px      /* Pequeno */
--space-md: 16px     /* Padrão */
--space-lg: 24px     /* Grande */
--space-xl: 32px     /* Muito grande */
--space-2xl: 48px    /* Seção */
--space-3xl: 64px    /* Grande seção */
```

Use sempre múltiplos de 8px para manter grid harmônico.

## Checklist para Novas Páginas/Componentes

- [ ] Usar `--color-primary` (não hardcode #02843c)
- [ ] Spacing com `--space-*` (não px aleatórios)
- [ ] Buttons com `.btn` + `.btn.primary`
- [ ] Cards com `.single-services` (exemplo)
- [ ] Sem text-transform uppercase (legibilidade)
- [ ] Hover com `translate(-4px)` (não just color)
- [ ] Fontes: H1-H6 ou body (não sizes mistos)
- [ ] Testar com `npx impeccable detect`
- [ ] Mobile first: breakpoints 768px / 1024px

## Integração com GitHub Actions (Futuro)

Poderia adicionar checagem automática:

```yaml
# .github/workflows/impeccable.yml
name: Impeccable Design Audit
on: [push, pull_request]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npx impeccable detect . --json > report.json
      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          script: |
            // Ler report.json e comentar no PR
```

## Recursos

- **Documentação:** https://impeccable.style
- **GitHub:** https://github.com/pbakaus/impeccable
- **Demo:** https://impeccable.style/cases/neo-mirai (case study)

## Próximas Melhorias Sugeridas (Impeccable)

### 1. Hero Section
- CTA mais proeminente (botão grande em destaque)
- Texto com contraste melhorado (overlay ou text-shadow)
- Altura responsiva 60vh → 40vh mobile

### 2. Newsletter
- Input com focus state melhorado
- Checkbox labels com melhor spacing
- Button primário no final

### 3. Footer
- Links organizados em 4 colunas (desktop)
- Logo/copyright em baixo
- Redes sociais em coluna dedicada

### 4. Testimonials Carousel
- Avatar 80px circular (atualmente está ok)
- Quote com aspas estilizadas
- Dots navigation (sem setas)

### 5. Formulários
- Todos inputs 16px (prevenir zoom mobile)
- Focus outline `2px solid #02843c`
- Error states em vermelho

## Exemplo: Refinar um Componente

**Antes (genérico):**
```html
<div class="feature">
  <i class="fa fa-check"></i>
  <h3>Certificado</h3>
  <p>...</p>
</div>
```

**Depois (Impeccable):**
```html
<div class="features-single">
  <i class="fa fa-check"></i>
  <h2>02/ Certificado</h2>
  <p>...</p>
</div>
```

**CSS:**
```css
.features-single {
  padding: var(--space-xl);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-base);
}

.features-single:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
```

---

**Filosofia Impeccable:** Documentar, padronizar, validar — deixar a IA (e você) mais focada em design e menos em detalhes técnicos.
