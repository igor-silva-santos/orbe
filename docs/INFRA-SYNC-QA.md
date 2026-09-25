# Infra — sync de catálogo e QA 511

**Decisão (PO, 2026-09-23):** usar **GitHub Actions** como orquestrador oficial. **Cloudflare Worker** fica opcional (keep-alive leve) até o deploy/KV estar verde — não bloquear sync nem QA nele.

## Fonte da verdade

| Responsabilidade | Onde | Secrets / vars |
| --- | --- | --- |
| Disparar sync por ano ou intervalo | `.github/workflows/sync-catalog-year.yml`, `sync-catalog-range.yml` | `ORBE_API_URL`, `SYNC_SECRET` |
| Keep-alive durante sync longo no Render | Loop no próprio workflow (`curl /api/health` + poll `/api/sync/status`) | — |
| Rodar robô 511 + E2E prod + pacote supervisor | `.github/workflows/qa-robo-e2e-511.yml` | opcional `QA_*` |
| Trigger sem `gh` (agente/PO) | Commit em `ops/sync-triggers/*.json` | — |
| Smoke pós-sync | `docs/regras-negocio/scripts/validar-sync-anos.py` | `--base` Vercel ou API |

## Por que não depender só do Cloudflare hoje

- Worker em `ops/render_sync_watch_worker.js` exige **KV + deploy** (`orbe-render-sync-watch`); falhas de tipo/deploy já impediram confiar no cron.
- Actions já tem **secrets**, **logs auditáveis** e **sequência 2027→2030** no mesmo job.
- O worker continua útil depois: cron a cada 5 min só quando `watching=1`, sem manter PC ligado.

Quando CF estiver estável: POST `/start` no worker **após** `run-sync-all` (opcional), mas o workflow de range **não** deve depender disso.

## Por que 2027 pode mostrar poucos filmes

1. **Concorrência:** só um `run-sync-all` por vez no Render. Se outro sync (ex. backfill 2002) estava ativo, o job de 2027–2030 recebia **409** — o workflow antigo tratava isso como sucesso sem rodar o ano (corrigido em `sync-catalog-range.yml`).
2. **TMDB:** discover com `release_date` **BR** e tipo cinema para 2027 ainda traz poucos títulos com data confirmada; 2028+ costuma vir **0** até a TMDB encher o calendário.
3. **Validação:** `by-year` conta filmes com data no ano; `year-tbd` conta TBA. Rodada bem-sucedida **não** garante dezenas de cards em 2028 — garante que o sync **daquele ano** terminou.

Para re-disparar 2027–2030:

```bash
# Opção A: workflow_dispatch no GitHub (Sync catálogo intervalo de anos)
# Opção B: atualizar ops/sync-triggers/2027-2030.json e push
```

## Admin no site (sem rota de “virar admin”)

O papel `admin` **não** é promovido pela UI. Para você (único operador):

1. No **Render** (API), defina `ORBE_ADMIN_EMAILS` com o e-mail da sua conta Orbe (ex.: `voce@gmail.com`). Vários e-mails: separados por vírgula.
2. Cadastre-se ou faça login com esse e-mail no site. Na próxima requisição o banco recebe `role=admin`.
3. No perfil aparece **Painel de sincronização** (`/admin`) — último sync, ao vivo, GitHub e histórico.

Opcional no Render: `GITHUB_ACTIONS_READ_TOKEN` (PAT só leitura de Actions) se o repo for privado.

Alternativa manual (sem env): `UPDATE "User" SET role = 'admin' WHERE email = '...';` no Supabase.

## Checklist “infra OK” antes de avisar o PO

- [ ] `GET https://orbe-7bu0.onrender.com/api/sync/status` → `syncActive: false` (ou job do range em execução com fase esperada)
- [ ] Último run verde de **Sync catálogo intervalo de anos** (ou ano isolado)
- [ ] `python3 docs/regras-negocio/scripts/validar-sync-anos.py --start 2027 --end 2030` (ajustar `--min-by-year` conforme expectativa TMDB)
- [ ] Front em produção com SuperModal `role="dialog"` (deploy Vercel após merge)
- [ ] Workflow **QA — Robô 511 + E2E produção** disponível na `master`

Ver também: `docs/regras-negocio/cenarios-camadas/execucao/RUNBOOK-IA-AUTONOMA-511.md`.
