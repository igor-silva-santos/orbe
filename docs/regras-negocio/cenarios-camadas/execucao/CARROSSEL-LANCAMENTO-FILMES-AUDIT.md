# Auditoria — carrossel de lançamento (Filmes)

**Produção (antes do relaxamento 22/09/2026):** `GET /api/homepage` → campo `filmes`.

## O que aparecia (snapshot)

- **51 títulos** no payload da home (passado ~90d + futuro até fim do mês seguinte).
- Listagem `/api/filmes?filtro=futuros` tinha **45** futuros; **36** não estavam no carrossel da home.

### Causas principais

| Camada | Efeito |
| --- | --- |
| Janela `lte: nextMonthEnd` | Estreias de nov/dez ficavam fora da query da home |
| `filmeCarouselBalancedWhereInput` | pop ≥ 15 / votos ≥ 20 |
| `filterFilmesAntecipacaoGate` | piso adaptativo de popularidade em futuros |
| `HOME_LAUNCH_MIN_RUNTIME` 40 min | curtas-metragem excluídas |
| `hasFichaMinimaAntecipacao` | sinopse ≥ 40 chars ou pop ≥ 35 |

### Exemplos que estavam só em `/filmes?filtro=futuros`

Vingadores: Doutor Destino, One Piece (nov/dez), Galinha Pintadinha: O Filme, Cinco Centímetros por Segundo, Bitter Valley, entre outros.

## Ajuste (PR carrossel relax)

- Horizonte futuro na home = **120 dias** (`ANTECIPACAO_HORIZON_DAYS`).
- Carrossel equilibrado: pop/votos **10+**; `localizacaoPtBr` no bloco de conteúdo.
- Antecipação: piso pop **5–18**, ficha mínima mais leve, **em cartaz/breve/pré-venda** ignoram piso de hype.
- Runtime mínimo **35 min** (curtas com flag cinema passam).

## Bug 2027 (year-tbd)

Estreias **só com ano** (`releaseDate` null, `releaseYear` 2027) vinham da rota `/filmes/year-tbd` com filtro **equilibrado** (excluía TBA). Navegação por mês em 2027 vazia não levava ao bloco TBA no fim do carrossel.

Correção: `yearTbd: true` na API + prefetch dos anos 2026–2033 + scroll para separador ao navegar.

Revalidar:

```bash
curl -sS "https://orbe-seven.vercel.app/api/filmes/year-tbd?year=2027" | jq 'length'
curl -sS "https://orbe-seven.vercel.app/api/homepage" | jq '.filmes | length'
```

## Validação 2027 em produção (23/09/2026)

**Conclusão PO:** ver só **janeiro/2027** com **um** filme **não é bug de carrossel** — a API já devolve o mesmo que a UI.

| Endpoint | Resultado |
| --- | --- |
| `GET /api/filmes/by-month?year=2027&month=1` | **1** título: *Angry Birds 3: O Filme* (`data_lancamento_confirmada: true`) |
| `GET /api/filmes/by-year?year=2027` | **1** título |
| `GET /api/filmes/year-tbd?year=2027` | **0** (nenhum TBA só-ano no banco) |
| Demais meses de 2027 | **0** títulos com data no intervalo |

O carrossel navega por mês e anexa bloco **year-tbd** no fim do ano; se a API não tem títulos, **não há o que renderizar** nos outros meses.

### O que fazer se o PO espera mais estreias em 2027

1. **Catálogo:** rodar sync TMDB para o período (ex.: `api` → `npm run sync:movies -- 2027-01-01 2027-12-31`) e republicar API.
2. **Curadoria:** títulos futuros distantes podem ser filtrados no sync (`isMovieRelevantForSync`) — revisar skips no log de sync, não só o front.
3. **QA:** cenários que pedem “vários títulos em 2027” podem ser **BLOQUEADO** com evidência de API (tabela acima) até o catálogo existir — ver [`QA-SUPERVISOR-IA.md`](./QA-SUPERVISOR-IA.md).
