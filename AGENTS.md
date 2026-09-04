# Regras do projeto

## Workflow obrigatório (a cada alteração)
1. Sempre fazer as alterações na pasta local `C:\Users\Raphael Fernandes\Desktop\bioforte.com.br`.
2. Sempre commitar e dar push no GitHub: `git add -A; git commit -m "..."; git push origin main`.
3. Sempre fazer deploy na Vercel em produção: `vercel --prod --yes`.

## Repositório
- GitHub: `butyel/bioforte-2026-provis-rio` (branch `main`).
- Origin: `https://github.com/butyel/bioforte-2026-provis-rio.git`.

## Deploy
- Ambiente oficial de exibição: **Vercel** → `https://biofortecombr.vercel.app` (projeto `bioforte.com.br`, equipe `butyel95-4732s-projects`).
- Tudo que estiver neste repositório é estático e publicado inteiro no Vercel (arquivos `.html`, `css/`, etc.).
- O domínio `www.bioforte.com.br` (hospedagem Apache) **está fora de uso** — não tentar deploy nele nem alterar DNS.
- `.vercelignore` bloqueia de subir para o Vercel arquivos internos: `SEO-REPORT-FASE02.md`, `AUDITORIA-SEO.md`, `SEO-REPORT.md`, `company-data.json`, `.htaccess`.
- A GitHub Action `.github/workflows/main.yml` (deploy FTP) **não funciona** (secrets `ftp_host`/`ftp_user`/`ftp_password` ausentes) e deve ser ignorada.
- O GitHub Pages ativo em `https://butyel.github.io/bioforte-2026-provis-rio/` é opcional/cópia — pode ser desativado.