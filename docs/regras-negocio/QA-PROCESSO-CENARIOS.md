# Processo QA — Cenários de teste × 511 regras de negócio

**Versão:** 1.0 · **Data:** 2026-09-22  
**Objetivo:** garantir que **cada uma das 511 regras** (`RN-*`) tenha **ao menos 1 cenário de teste** elaborado por QA sênior, auditado por **TL QA sênior**, executável na **tela correta**, sem impedimentos ocultos, com critério claro de **teste manual/exploratório**.

---

## 1. Papéis

| Papel | Responsabilidade |
| --- | --- |
| **QA sênior (execução)** | Elaborar cenários na planilha oficial; mapear 1+ cenário por regra; executar smoke local quando possível; registrar impedimentos. |
| **QA sênior (revisor par)** | Revisar cenários de outro QA (clareza de passos, alinhamento à regra, testabilidade). |
| **TL QA sênior (auditor)** | Auditoria **cenário a cenário** ao final da cobertura; liberar ou devolver com ajuste; assinar cobertura das 511 regras. |

---

## 2. Artefatos oficiais

| Artefato | Uso |
| --- | --- |
| [`regras-negocio-qa.md`](./regras-negocio-qa.md) / [`regras-negocio-qa.csv`](./regras-negocio-qa.csv) | Fonte da verdade das **regras** (comportamento na tela). |
| [`cenarios-teste.csv`](./cenarios-teste.csv) | **Cenários** — uma ou mais linhas por `ID_Regra`. |
| [`QA-TL-AUDITORIA.md`](./QA-TL-AUDITORIA.md) | Checklist e critérios de aprovação do TL. |
| `scripts/validar-cobertura-cenarios.py` | Relatório: regras sem cenário, cenários sem regra, duplicatas. |

**Regra de ouro:** o cenário **não reescreve** a regra de negócio; ele **verifica** o que está em `Descrição` + `Resultado na tela` da regra, com passos reproduzíveis.

---

## 3. Fases do trabalho

### Fase A — Planejamento (TL + QAs)

1. Dividir as **12 telas** (`telas/01` … `12`) entre QAs (ver tabela abaixo).
2. Definir ambiente padrão: URL de homologação, contas (anônimo, explorador, admin se necessário), navegadores (Chrome + 1 mobile).
3. Congelar versão do inventário de regras (commit/tag do repositório).

### Fase B — Elaboração (QA sênior)

Para **cada** `RN-*` atribuída:

1. Ler a regra no Markdown (seção da tela + tabela da regra).
2. Preencher **ao menos uma linha** em `cenarios-teste.csv` (pode criar `CT-{ID}-02`, `03`… se precisar de variações).
3. Campos obrigatórios antes de marcar `Status_Elaboracao = Pronto para TL`:
   - `Titulo_Cenario`, `Objetivo`, `Pre_condicoes_TestE`, `Passos`, `Resultado_Esperado`, `Tipo_Testagem`, `Dados_Conta_Ambiente`.
4. Se não for possível testar: preencher `Impedimentos_Conhecidos` **e** escalar ao TL (não deixar em branco).
5. Marcar `Status_Elaboracao = Em revisão peer` → após par, `Pronto para TL`.

**Tipos de testagem**

| Tipo | Quando usar |
| --- | --- |
| **Funcional manual** | Passos determinísticos; resultado sim/não. |
| **Exploratório guiado** | Charter curto + tempo-box; hipóteses ligadas à regra; TL valida se o charter cobre o risco da regra. |
| **Regressão** | Regra já estável; cenário enxuto para pipeline manual periódico. |

### Fase C — Auditoria TL (cenário a cenário)

Somente quando **todas** as linhas da divisão estiverem `Pronto para TL`:

1. Rodar `python3 scripts/validar-cobertura-cenarios.py` → **0 regras sem cenário**.
2. Para **cada linha** do CSV, aplicar [`QA-TL-AUDITORIA.md`](./QA-TL-AUDITORIA.md) (seção 2).
3. Preencher `TL_Auditoria`, `TL_Comentario`, `TL_Data`.
4. Devolver ajustes com `Ajuste obrigatório` até ficar `Aprovado`.
5. Ao final: TL assina no registro de cobertura (seção 4).

### Fase D — Execução de testes (pós-auditoria)

Cenários aprovados entram no ciclo de execução (sprint/release). Bugs referenciam `ID_Cenario` + `ID_Regra`.

---

## 4. Registro de cobertura (TL assina)

| Campo | Valor |
| --- | --- |
| Inventário de regras (commit/tag) | `________________` |
| Planilha de cenários (commit/data) | `________________` |
| Total de regras | 511 |
| Regras com ≥1 cenário aprovado | `____` / 511 |
| Regras com impedimento aceito* | `____` (listar IDs) |
| TL QA sênior | `________________` |
| Data da auditoria final | `____/____/______` |

\* Impedimento aceito: TL documenta em `Impedimentos_Conhecidos` + ticket de produto/ambiente; cenário alternativo ou “não testável em HML” com evidência.

---

## 5. Divisão sugerida por tela (atribuição)

Contagem aproximada de regras por arquivo de tela (ordenar por `Arquivo` no CSV de regras):

| Responsável QA (preencher) | Arquivo / área | Qtd. regras (aprox.) |
| --- | --- | ---: |
| | `01-HOME` — Página inicial | 77 |
| | `02-FILMES` | 68 |
| | `03-SERIES` | 62 |
| | `04-ANIMES` | 20 |
| | `05-JOGOS` | 29 |
| | `06-PROMOCOES` | 35 |
| | `07-HOJE` | 24 |
| | `08-MODAIS` | 48 |
| | `09-BUSCA-HEADER` | 30 |
| | `10-MINHA-LISTA` | 39 |
| | `11-AUTH-PERFIL` | 30 |
| | `12-OUTRAS-TELAS` | 49 |
| | **Total** | **511** |

---

## 6. Modelo de cenário (referência rápida)

**Título:** verbo + objeto + condição (“Validar que visitante não vê Continuar assistindo”).

**Passos:** numerados; cada passo = uma ação observável na **tela** (navegar, clicar, rolar, ler texto).

**Resultado esperado:** copiável da coluna `Resultado na tela` da regra, refinado se necessário (sem contradizer a regra).

**Exploratório:** incluir charter (escopo, tempo, o que **não** testar), hipóteses e critério de “sessão suficiente” para a regra.

---

## 7. Comandos úteis

```bash
# Cobertura: regras sem cenário
python3 docs/regras-negocio/scripts/validar-cobertura-cenarios.py

# Saída esperada na auditoria final:
# OK: 511/511 regras com pelo menos 1 cenário na planilha.
```
