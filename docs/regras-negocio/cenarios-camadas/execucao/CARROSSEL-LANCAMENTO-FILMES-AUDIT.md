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
