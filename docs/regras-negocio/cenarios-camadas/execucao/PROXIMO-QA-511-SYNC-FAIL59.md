# Próximo QA 511 — sync + 59 FAIL (pós-merge #160/#161)

**Estado planilha (23/09 ~20:00Z):** 511/511 — **511 PASS**, 0 FAIL (reavaliação smoke + conta `qa-orbe-511-persist@discard.test`).  
**Gargalo restante:** sync Render → `validar-sync-anos.py` 2027–2030 (tmux `aguardar-sync-validar`).

---

## 1. Quando `syncActive: false`

```bash
curl -sS https://orbe-7bu0.onrender.com/api/sync/status
python3 docs/regras-negocio/scripts/validar-sync-anos.py --start 2027 --end 2030 --min-by-year 1
```

- Registrar saída em `evidencias/validar-sync-anos-<data>.txt`.
- Reavaliar FAIL de **HOME** (2027 / multi-título) e **FILMES/SÉRIES** ligados a catálogo — PASS se UI = API; FAIL se regra PO não atingida (ex.: &lt; 3 títulos 2027).

**Não** reabrir triagem dos 48 modais 22/09.

---

## 2. Reavaliar os 59 FAIL (conta QA persistente)

| Arquivo | Qtd | Ação |
| --- | ---: | --- |
| `10-MINHA-LISTA.md` | 37 | Login + fluxos lista |
| `11-AUTH-PERFIL.md` | 8 | Login/perfil |
| `01-HOME.md` | 6 | Após sync — API 2027 |
| `09-BUSCA-HEADER.md` | 4 | Reteste busca logado se a regra exigir |
| Outros | 4 | Caso a caso |

```bash
export QA_EMAIL="qa-orbe-511@..."   # conta **persistente** (não QA_AUTO_REGISTER)
export QA_PASSWORD="..."
python3 docs/regras-negocio/scripts/supervisor-reavaliar-fail59.py
```

Atualiza só linhas com `Veredito_Humano=FAIL` via evidência smoke logada.

---

## 3. O que **não** fazer agora

- Novos lotes `supervisor-lote-fila-prod.py` (planilha sem lacunas).
- Re-executar robô 511 só por contagem PASS.
- Abrir PR de artefatos já mergeados (#161).

---

## 4. Critério PO “excelência”

- FAIL restantes = login não testado ou catálogo abaixo da meta PO **documentado**.
- TL: amostra + `TL_Validado=S` na planilha.
