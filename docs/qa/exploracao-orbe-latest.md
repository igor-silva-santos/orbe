# Exploração Orbe — relatório automatizado

Gerado: 2026-09-25T02:50:34.459Z
Base: https://orbe-seven.vercel.app

## Resumo

- **Total de achados:** 19
- **Críticos:** 0
- **Altos:** 2
- **Médios:** 7

## Por área

### SHELL-HEADER-FOOTER-ESTATICAS

Rotas visitadas: 9 · Issues: 2

| Sev | Rota | Passo | Tipo | Mensagem |
| --- | --- | --- | --- | --- |
| low | / | runtime | observation | Unrecognized feature: 'web-share'. |
| low | / | runtime | observation | No available adapters. |

### HOME

Rotas visitadas: 1 · Issues: 4

| Sev | Rota | Passo | Tipo | Mensagem |
| --- | --- | --- | --- | --- |
| medium | / | home supermodal filme | slow | Ação levou 16355ms (limite 15000ms) |
| medium | / | home supermodal filme | interaction | locator.click: Timeout 15000ms exceeded.
Call log:
[2m  - waiting for locator('#filmes').locator('div.cursor-pointer'). |
| low | / | runtime | observation | Unrecognized feature: 'web-share'. |
| low | / | runtime | observation | No available adapters. |

### CATALOGOS

Rotas visitadas: 4 · Issues: 4

| Sev | Rota | Passo | Tipo | Mensagem |
| --- | --- | --- | --- | --- |
| medium | /filmes | supermodal | interaction | Clique no card não abriu SuperModal |
| medium | /filmes | supermodal | interaction | Clique no card não abriu SuperModal |
| low | /filmes | runtime | observation | Unrecognized feature: 'web-share'. |
| low | /filmes | runtime | observation | No available adapters. |

### PROMOCOES

Rotas visitadas: 3 · Issues: 2

| Sev | Rota | Passo | Tipo | Mensagem |
| --- | --- | --- | --- | --- |
| low | /promocoes | runtime | observation | Unrecognized feature: 'web-share'. |
| low | /promocoes | runtime | observation | No available adapters. |

### HOJE-CONTINUACOES-OUTRAS

Rotas visitadas: 11 · Issues: 4

| Sev | Rota | Passo | Tipo | Mensagem |
| --- | --- | --- | --- | --- |
| low | /hoje | runtime | observation | Unrecognized feature: 'web-share'. |
| low | /hoje | runtime | observation | No available adapters. |
| high | /hoje | supermodal | missing_ui | Nenhum card clicável com poster encontrado |
| medium | /hoje | /hoje | slow | Ação levou 22969ms (limite 20000ms) |

### MODAIS-BUSCA-GLOBAL

Rotas visitadas: 4 · Issues: 3

| Sev | Rota | Passo | Tipo | Mensagem |
| --- | --- | --- | --- | --- |
| medium | global | supermodal | interaction | Clique no card não abriu SuperModal |
| medium | global | supermodal | interaction | Clique no card não abriu SuperModal |
| high | global | busca categorias + query | slow | Ação levou 69805ms (limite 30000ms) |
