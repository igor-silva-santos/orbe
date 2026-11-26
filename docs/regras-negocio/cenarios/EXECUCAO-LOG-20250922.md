# Log de execução — 22/09/2025

**Ambiente:** local (Playwright + dev server) e smoke HTTP na demo  
**Demo:** https://orbe-seven.vercel.app  
**Cenários documentados:** 511 em [`cenarios-teste.md`](../cenarios-teste.md) (cobertura 511/511 validada)

## Status do pacote QA

| Item | Status |
| --- | --- |
| Markdown `cenarios-teste.md` | Gerado (511 cenários) |
| CSV `cenarios-teste.csv` | Atualizado (`Status_Elaboracao` = Pronto para TL) |
| `cenarios/generated/*.md` | 12 arquivos por tela |
| Auditoria TL (`TL_Auditoria`) | **Pendente** em todas as linhas — execução manual completa ainda não iniciada em lote |
| Multitask `computerUse` | **Bloqueado** (cota do modelo do subagente) |

## Smoke HTTP — demo (22/09/2025)

| Rota | HTTP | Observação |
| --- | ---: | --- |
| `/` | 200 | |
| `/filmes` | 200 | |
| `/series` | 200 | |
| `/animes` | 200 | |
| `/jogos` | 200 | |
| `/hoje` | 200 | |

## Automação local

### Testes unitários (`npm test`)

- **44 pass / 1 fail** — falha em `parseMidiaReleaseDate` › prefere `nextAiringEpisode` futuro (`carousel-utils.test.ts`)

### E2E Playwright (`npm run test:e2e`)

| Teste | Resultado |
| --- | --- |
| `renderiza seções e controles principais` | **FAIL** — esperava 4 botões “Ver o que está em alta agora”, encontrou 1 |
| `links das seções levam às páginas dedicadas` | **PASS** |

**Resumo:** 1 pass / 1 fail (~32s, dev server local).

---

## Próximo lote manual (smoke por tela)

Executar o **1º cenário** de cada arquivo em `cenarios/generated/` (~12), conforme [`EXECUCAO-ROTEIRO.md`](./EXECUCAO-ROTEIRO.md).

## Colunas sugeridas na planilha

Preencher `Execucao_Resultado`, `Execucao_Data`, `Execucao_Evidencia` conforme roteiro.
