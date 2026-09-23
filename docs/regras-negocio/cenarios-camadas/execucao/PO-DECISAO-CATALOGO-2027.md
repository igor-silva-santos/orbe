# Decisão PO — catálogo 2027+ (23/09/2026)

**Decisor:** Igor (PO)  
**Registrado por:** agente cloud (execução do checklist pós-#155)

## Decisão

| Pergunta | Resposta |
| --- | --- |
| **1 filme em `by-year` 2027 é aceitável para QA de carrossel?** | **Não** para cenários que exigem múltiplos títulos por mês/ano. |
| **É bug de front/carrossel?** | **Não** — UI segue API (ver `CARROSSEL-LANCAMENTO-FILMES-AUDIT.md` §2027). |
| **O que fazer?** | **Backend + sync TMDB** até esgotar discover/undated; QA marca **BLOQUEADO** só se API continuar vazia **após** sync dedicado 2027–2030 com código atualizado. |

## Ações técnicas (dev)

1. Merge **#155** + deploy Vercel (DEV-A11Y-01) — **feito** (deploy Production ~23/09 15:37 UTC).
2. **GitHub Actions** como única orquestração de sync/QA; Cloudflare worker **adiado**.
3. Após `syncActive: false`, rodar **Sync catálogo intervalo 2027–2030** (`includeUndated: true` no body).
4. API: discover **global** `primary_release` para períodos futuros + critério de qualidade relaxado só em `isFuturePeriodStart` (`api/src/syncMovies.ts`).

## Critério de “aceitável” pós-sync

- **Mínimo operacional:** `validar-sync-anos.py --start 2027 --end 2027 --min-by-year 1` → OK.
- **Meta QA carrossel:** `by-year` + `year-tbd` para 2027 **≥ 3** títulos *ou* evidência em log de sync de que TMDB não retorna mais IDs (documentar no pacote supervisor).
