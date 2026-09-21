# GitHub Actions neste repositório

Os workflows aqui são **legado/auxiliar** (sync, keep-alive, cache).

- **Deploy e sync oficiais:** GitLab → [`docs/DEPLOY_GITLAB.md`](../docs/DEPLOY_GITLAB.md) (`ORBE_OPS_ACTION=resume` no pipeline manual).
- **Não** dispare **Sync All** aqui se o processo do projeto é GitLab-first.
- Vercel/Render **não** devem publicar por push neste remote GitHub.
