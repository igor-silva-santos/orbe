# Runbook — IA autônoma (sync → QA → supervisor)

Objetivo: o agente executa esta ordem **sem supervisão do PO**, e só avisa o Igor quando o checklist final estiver **verde** ou **BLOQUEADO** com evidência.

**Produção:** https://orbe-seven.vercel.app · API: https://orbe-7bu0.onrender.com

---

## 0. Pré-requisitos

- Plugin **Atlassian** no Cursor (só se precisar Jira; opcional neste fluxo).
- Secrets no GitHub: `SYNC_SECRET`, `ORBE_API_URL` (opcional, default Render).
- **Não** configurar MCP Jira manual se o plugin não estiver — não bloqueia sync/QA.

---

## 1. Sync de catálogo (anos alvo)

1. Ver status: `curl -sS https://orbe-7bu0.onrender.com/api/sync/status`
2. Se `syncActive: true` e **não** for o job desejado → aguardar `syncActive: false` (não disparar outro `run-sync-all`).
3. Disparar intervalo:
   - Push em `ops/sync-triggers/<nome>.json` com `start_year` / `end_year`, **ou**
   - `workflow_dispatch` **Sync catálogo intervalo de anos** (2027–2030, `force_first_year: true` no 1º ano).
4. Acompanhar até `syncActive: false` (logs Actions ou poll status).

Documentação de infra: `docs/INFRA-SYNC-QA.md`.

---

## 2. Validar dados (smoke)

```bash
python3 docs/regras-negocio/scripts/validar-sync-anos.py --start 2027 --end 2030 --min-by-year 1
```

- Falha em 2028–2030 com `by-year=0` pode ser **aceitável** se TMDB não tiver datas BR — registrar em nota do pacote supervisor, não inventar títulos.
- Falha em 2027 com `by-year=0` após sync → **BLOQUEADO** (investigar 409, checkpoint, logs Render).

Opcional carrossel vs API:

```bash
python3 docs/regras-negocio/scripts/auditar-filmes-vs-carrossel.py
```

---

## 3. Deploy front (se mudou modal/a11y ou carrossel)

- Merge na `master` → Vercel deploy automático.
- Confirmar em prod: SuperModal com `role="dialog"` e `aria-modal="true"`.

---

## 4. E2E produção

```bash
cd frontend && npm ci && npx playwright install chromium
PLAYWRIGHT_BASE_URL=https://orbe-seven.vercel.app npm run test:e2e:prod
```

Ou workflow **QA — Robô 511 + E2E produção** (recomendado para artefato único).

---

## 5. Robô 511 (pré-triagem)

```bash
export QA_AUTO_REGISTER=1   # conta descartável
python3 docs/regras-negocio/scripts/executar-feliz-excelencia-todos.py
```

Saída: `docs/regras-negocio/cenarios-camadas/execucao/metricas-reais-511/`.

Modais: abrir **card** (não link “Filmes”); assert `.super-modal-content` e/ou `role=dialog`.

---

## 6. Pacote para supervisor IA

```bash
python3 docs/regras-negocio/scripts/gerar-fila-supervisor-qa.py
python3 docs/regras-negocio/scripts/montar-pacote-supervisor-qa.py
```

Entregar ao chat supervisor: `pacote-supervisor-qa.json`, `PROMPT-SUPERVISOR-IA.md`, `supervisor-fila-qa.json`.

---

## 7. Avisar o PO (“manda o robô/supervisor”)

Enviar mensagem **somente** quando:

| Critério | OK? |
| --- | --- |
| Sync do intervalo pedido terminou (`syncActive: false`) | |
| Smoke `validar-sync-anos` conforme expectativa documentada | |
| E2E prod verde (incl. `/filmes` + modal) | |
| Robô rodou; métricas CSV atualizado | |
| Pacote supervisor gerado | |
| Infra: Actions como orquestrador (ver `INFRA-SYNC-QA.md`) | |

Texto sugerido para o Igor:

> Infra e runbook prontos. Sync 2027–2030 [status]. E2E prod OK. Robô 511 gerou métricas novas. Pacote em `execucao/pacote-supervisor-qa.json`. Pode mandar o **supervisor IA** + rodada E2E/QA humana.

Se algo falhou: indicar **BLOQUEADO** + link do run Actions + trecho de `/api/sync/status`.

---

## 8. O que a IA **não** faz sozinha

- Marcar os **511** `Veredito_Humano` finais (supervisor + TL).
- Alterar secrets ou TMDB keys.
- Configurar MCP Atlassian manualmente.
