# GitHub Actions neste repositório

Os workflows aqui são **operacionais** (sync de catálogo, keep-alive da API no Render, invalidar cache).

Eles **não** substituem o deploy de produção.

- **Fonte de verdade para subir ambiente:** GitLab `master` → ver [`docs/DEPLOY_GITLAB.md`](../docs/DEPLOY_GITLAB.md).
- Configure Vercel e Render para **não** publicarem automaticamente a partir deste remote GitHub.
