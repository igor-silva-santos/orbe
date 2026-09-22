# Cenários — Animes

**Arquivo inventário:** `04-ANIMES.md`

---

## CT-RN-ANIMES-001-01 — Validar: Conteúdo na abertura

**ID_Regra:** `RN-ANIMES-001` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo acessível. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Abrir Animes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Cards e selects visíveis após carregar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-002-01 — Validar: Falha na abertura

**ID_Regra:** `RN-ANIMES-002` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Falha simulada. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Ambiente com catálogo indisponível na abertura.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade vazia; filtros vazios; página utilizável. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-003-01 — Validar: Texto do cabeçalho

**ID_Regra:** `RN-ANIMES-003` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário em Animes. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Ler cabeçalho.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | **Animes** + texto sobre temporadas e clássicos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-004-01 — Validar: Gaveta O que vem aí

**ID_Regra:** `RN-ANIMES-004` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resumo com **próximos animes**. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Ambiente com estreias futuras.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Seção **O que vem aí** acima dos filtros. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-005-01 — Validar: Opções dos filtros

**ID_Regra:** `RN-ANIMES-005` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo populado. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Abrir cada select e comparar com títulos conhecidos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Dropdowns preenchidos; gêneros em ordem alfabética; anos do mais recente ao mais antigo; status com rótulo em português quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-006-01 — Validar: Valor “Todos”

**ID_Regra:** `RN-ANIMES-006` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Todos em todos os selects. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Resetar filtros.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Grade ampla. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-007-01 — Validar: Recarga ao mudar filtro e na hidratação

**ID_Regra:** `RN-ANIMES-007` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página recém-aberta ou filtro alterado. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Abrir Animes observando loading.<br>3. Depois trocar gênero.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Spinner possível logo após abrir; novo spinner ao mudar filtro. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-008-01 — Validar: Atualização após sync

**ID_Regra:** `RN-ANIMES-008` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sync disparada. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Manter Animes aberta durante sync.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Lista muda sem F5. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-009-01 — Validar: Contador = cards da página atual

**ID_Regra:** `RN-ANIMES-009` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mais de ~48 animes para o filtro. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Filtro amplo.<br>3. Comparar contador com total esperado manualmente.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Contador pode mostrar até ~48 enquanto existem mais no catálogo. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-010-01 — Validar: Grade, loading e vazio

**ID_Regra:** `RN-ANIMES-010` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro impossível ou resultados OK. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Testar filtro vazio e filtro amplo.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | **Nenhum anime encontrado** + dica; ou 2–5 colunas de cards ~210px. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-011-01 — Validar: Lote inicial sem “carregar mais”

**ID_Regra:** `RN-ANIMES-011` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo grande. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Contar cards com filtros abertos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | ~48 cards visíveis; sem paginação na UI. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-012-01 — Validar: Exclusão de adulto explícito

**ID_Regra:** `RN-ANIMES-012` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime adulto no catálogo. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Buscar título adulto conhecido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ausente em Animes. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-013-01 — Validar: Tags sensíveis ocultas

**ID_Regra:** `RN-ANIMES-013` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com tag bloqueada. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Validar título de teste com tag sensível.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Não aparece na grade pública. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-014-01 — Validar: Filtros combinados

**ID_Regra:** `RN-ANIMES-014` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Vários filtros ativos. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Combinar gênero + ano + formato.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só animes que atendem **todos** os critérios. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-015-01 — Validar: Ordem alfabética padrão

**ID_Regra:** `RN-ANIMES-015` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtros em todos. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Ler primeiros títulos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ordem A–Z aproximada pelos primeiros cards. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-016-01 — Validar: Listagem vs home / Hoje

**ID_Regra:** `RN-ANIMES-016` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime marginal (baixa popularidade, fora de temporada). |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Comparar mesmo anime nas três áreas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Pode aparecer em Animes e faltar na home/Hoje streaming. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-017-01 — Validar: Conteúdo pode demorar a atualizar

**ID_Regra:** `RN-ANIMES-017` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Cadastro alterado. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Alterar anime de teste.<br>3. Recarregar.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Novidades após reload. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-018-01 — Validar: Metadados de filtro completos

**ID_Regra:** `RN-ANIMES-018` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo variado. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Percorrer formatos/fontes.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Sem opções “fantasma” no menu. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-019-01 — Validar: Detalhe ao vivo

**ID_Regra:** `RN-ANIMES-019` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card qualquer. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Clicar card.<br>3. Testar título removido.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Modal/página de detalhe; id inválido não abre conteúdo quebrado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-ANIMES-020-01 — Validar: Próximo episódio (detalhe/agenda)

**ID_Regra:** `RN-ANIMES-020` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime em exibição semanal. |
| Passos | 1. Abrir o site e navegar até **Animes** (conforme a regra).<br>2. Anime em temporada corrente.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Contagem ou data de próximo ep no card/detalhe. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |
