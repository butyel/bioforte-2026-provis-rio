# 🔍 DIAGNÓSTICO: POR QUE O DEPLOY "NÃO ALTERA" O SITE

**Data:** 5 de setembro de 2026  
**Status:** Deploy funcionando ✅ | Domínio apontando para outro host ❌

---

## 🧪 RESULTADO DA INVESTIGAÇÃO

### O Deploy do Vercel FUNCIONA 100%

O site estático está **atualizado e no ar**:
```
✅ https://biofortecombr.vercel.app
   • Deploy mais recente: biofortecom-rb44uop31 (Ready, produção)
   • GTM-5PJ9NKS presente
   • css/style.min.css + impeccable-refinements.min.css (CSS minificado)
   • theme-color, canonical atualizados
   • 8 artigos de dicas, 3 páginas locais, hub de atuação
   • Arquivo de verificação Google presente
```

### O domínio `bioforte.com.br` NÃO aponta para o Vercel ❌

```
https://bioforte.com.br      → Title: "Bioforte − Home" (OUTRO site!)
https://www.bioforte.com.br  → Title: "Bioforte − Home" (OUTRO site!)
```

O que esse domínio serve:
- ❌ Não tem GTM-5PJ9NKS
- ❌ Não tem css/style.min.css (usa style.css)
- ❌ Não tem canonical para o Vercel
- ✅ Tem title "Bioforte − Home" → é o **sitev2 (React)**, não o nosso deploy

### Configuração DNS do domínio (Vercel)

```
Domínio bioforte.com.br — adicionado ao Vercel em 05/09/2026
Nameservers ATUAIS:  barbara.ns.cloudflare.com / joel.ns.cloudflare.com  ☓
Nameservers DESEJADOS (Vercel):  ns1.vercel-dns.com / ns2.vercel-dns.com

⚠️ Vercel: "This Domain is not configured properly"
```

O domínio está gerenciado no **Cloudflare** e resolve para outro host (o "Bioforte − Home"). É por isso que **as mudanças do deploy não aparecem** quando o site é aberto por `bioforte.com.br`.

---

## ✅ POR QUE ISSO ACONTECE

| Onde você olha | O que é | Está atualizado? |
|---|---|---|
| `biofortecombr.vercel.app` | Nosso site estático (Vercel) | ✅ **SIM — tudo novo** |
| `bioforte.com.br` | Sitev2 React ("Bioforte − Home") | ❌ Não é o nosso deploy |
| `www.bioforte.com.br` | Sitev2 React ("Bioforte − Home") | ❌ Não é o nosso deploy |

O domínio público **não está conectado** ao projeto Vercel — ele resolve via Cloudflare para o sitev2.

---

## 🚀 O QUE FAZER PARA O DOMÍNIO MOSTRAR O SITE NOVO

### Opção A — Apontar `bioforte.com.br` para o Vercel (recomendado)

No painel DNS do **Cloudflare** (zona `bioforte.com.br`), criar/alterar:

1. **Registro A** para o domínio raiz:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   Proxied: DNS only (cinza)
   ```
2. **Registro CNAME** para www:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   Proxied: DNS only (cinza)
   ```
3. Aguardar propagação (alguns minutos a algumas horas).
4. No Vercel, o domínio será "verified" automaticamente.

> ⚠️ **Atenção:** essa opção **substitui o site que hoje está no domínio** (o "Bioforte − Home" / sitev2). Só fazer se a intenção for publicar o site estático Vercel como o oficial.

### Opção B — Continuar usando o sitev2 React no domínio

Nesse caso, o repositório atual (estático do Vercel) **não controla o domínio**. As mudanças de conteúdo/design precisam ser feitas **no projeto React** que publica em `bioforte.com.br`.

---

## 📋 SITUAÇÃO ATUAL DO PROJETO

| Item | Status |
|---|---|
| Git push (GitHub main) | ✅ `ddfd0fa` — up-to-date |
| Deploy Vercel produção | ✅ Ready (rb44uop31) |
| Site atualizado no Vercel | ✅ verificado no ar |
| Domínio no projeto Vercel | ✅ `bioforte.com.br` adicionado |
| DNS apontando para Vercel | ❌ Pendente (Cloudflare) |
| Onde o público abre hoje | `bioforte.com.br` → sitev2 |

---

## 🔗 Links úteis
- Vercel domain config: https://vercel.link/domain-configuration
- Nosso site atualizado: https://biofortecombr.vercel.app
- GitHub: https://github.com/butyel/bioforte-2026-provis-rio