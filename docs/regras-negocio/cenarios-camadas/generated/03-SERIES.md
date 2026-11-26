# Camadas — Séries

**Inventário:** `03-SERIES.md` · **Cenários:** 186

---

## RN-SERIES-001 — Conteúdo na primeira abertura

### CT-RN-SERIES-001-F — Feliz: Conteúdo na primeira abertura

**Camada:** Feliz · **Regra:** `RN-SERIES-001` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Site acessível; catálogo com séries. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Abrir Séries em aba nova.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grade e selects visíveis (ou vazio amigável). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-001-N — Negativo: Conteúdo na primeira abertura — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-SERIES-001` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Site acessível; catálogo com séries. |
| Passos | 1. Abrir o site e navegar até **Séries** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Grade e selects visíveis (ou vazio amigável). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-001-E — Exploratório: Conteúdo na primeira abertura — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-001` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Site acessível; catálogo com séries. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Conteúdo na primeira abertura.<br>**Contexto:** Listagem e opções de filtro já vêm na abertura da página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-002 — Atualização gradual

### CT-RN-SERIES-002-F — Feliz: Atualização gradual

**Camada:** Feliz · **Regra:** `RN-SERIES-002` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo alterado recentemente. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Alterar série de teste.<br>3. Aguardar.<br>4. Recarregar.<br>5. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Recarregar após alguns minutos pode mostrar novidades. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-002-N — Negativo: Atualização gradual — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-002` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo alterado recentemente. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Catálogo alterado recentemente..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-002-E — Exploratório: Atualização gradual — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-002` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo alterado recentemente. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Atualização gradual.<br>**Contexto:** Mudanças no catálogo podem demorar alguns minutos para refletir após atualização em massa.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-003 — Falha no carregamento inicial

### CT-RN-SERIES-003-F — Feliz: Falha no carregamento inicial

**Camada:** Feliz · **Regra:** `RN-SERIES-003` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo indisponível na abertura. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Simular falha na abertura.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Página abre; grade vazia; filtros vazios possíveis. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-003-N — Negativo: Falha no carregamento inicial — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-SERIES-003` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo indisponível na abertura. |
| Passos | 1. Abrir o site e navegar até **Séries** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Página abre; grade vazia; filtros vazios possíveis. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-003-E — Exploratório: Falha no carregamento inicial — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-003` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo indisponível na abertura. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Falha no carregamento inicial.<br>**Contexto:** Indisponibilidade temporária não quebra a rota.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-004 — Texto do cabeçalho

### CT-RN-SERIES-004-F — Feliz: Texto do cabeçalho

**Camada:** Feliz · **Regra:** `RN-SERIES-004` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário em Séries. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Ler cabeçalho.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Título **Séries** e descrição sobre universo de séries. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-004-N — Negativo: Texto do cabeçalho — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-004` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário em Séries. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário em Séries..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-004-E — Exploratório: Texto do cabeçalho — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-004` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário em Séries. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Texto do cabeçalho.<br>**Contexto:** Copy fixa da área.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-005 — Gaveta O que vem aí

### CT-RN-SERIES-005-F — Feliz: Gaveta O que vem aí

**Camada:** Feliz · **Regra:** `RN-SERIES-005` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resumo de eventos com séries em **próximos**. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Ambiente com séries futuras.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seção **O que vem aí** acima dos filtros. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-005-N — Negativo: Gaveta O que vem aí — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-005` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Resumo de eventos com séries em **próximos**. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Resumo de eventos com séries em **próximos**..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-005-E — Exploratório: Gaveta O que vem aí — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-005` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Resumo de eventos com séries em **próximos**. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Gaveta O que vem aí.<br>**Contexto:** Estreias futuras de séries em carrossel horizontal.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-006 — Sem gaveta Em cartaz

### CT-RN-SERIES-006-F — Feliz: Sem gaveta Em cartaz

**Camada:** Feliz · **Regra:** `RN-SERIES-006` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Destaques recentes de séries existem no resumo. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Abrir Séries com dados de destaque.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Bloco **Em cartaz** **ausente**; só **O que vem aí** + filtros + grade. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-006-N — Negativo: Sem gaveta Em cartaz — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-SERIES-006` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Destaques recentes de séries existem no resumo. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-006-E — Exploratório: Sem gaveta Em cartaz — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-006` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Destaques recentes de séries existem no resumo. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Sem gaveta Em cartaz.<br>**Contexto:** Diferente da página Filmes, **não** há bloco **Em cartaz** para séries.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-007 — Ações na gaveta

### CT-RN-SERIES-007-F — Feliz: Ações na gaveta

**Camada:** Feliz · **Regra:** `RN-SERIES-007` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gaveta visível. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Favoritar na gaveta.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Interações refletem na conta logada. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-007-N — Negativo: Ações na gaveta — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-007` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Gaveta visível. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Gaveta visível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-007-E — Exploratório: Ações na gaveta — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-007` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Gaveta visível. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Ações na gaveta.<br>**Contexto:** Menu ⋮ e favoritos iguais à grade.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-008 — Gaveta após a página

### CT-RN-SERIES-008-F — Feliz: Gaveta após a página

**Camada:** Feliz · **Regra:** `RN-SERIES-008` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página recém-aberta. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Observar ordem de carregamento.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Filtros/grade primeiro; gaveta em seguida se houver itens. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-008-N — Negativo: Gaveta após a página — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-008` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página recém-aberta. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página recém-aberta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-008-E — Exploratório: Gaveta após a página — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-008` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página recém-aberta. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Gaveta após a página.<br>**Contexto:** Carrossel editorial pode aparecer logo após o restante.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-009 — Sem atalhos Em Cartaz/Populares

### CT-RN-SERIES-009-F — Feliz: Sem atalhos Em Cartaz/Populares

**Camada:** Feliz · **Regra:** `RN-SERIES-009` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página Séries. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Confirmar ausência de atalhos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Apenas linha de filtros; nenhum botão **Populares**. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-009-N — Negativo: Sem atalhos Em Cartaz/Populares — sem a condição exigida

**Camada:** Negativo · **Regra:** `RN-SERIES-009` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página Séries. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Usar usuário, dado ou estado **sem** a condição da regra (ex.: não logado se a regra exige login).<br>3. Repetir a mesma ação do caminho feliz.<br>4. Verificar que o elemento/comportamento **não** aparece ou permanece desabilitado. |
| Resultado_Esperado | O resultado feliz **não** ocorre; a tela permanece coerente (sem vazamento indevido). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-009-E — Exploratório: Sem atalhos Em Cartaz/Populares — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-009` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página Séries. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Sem atalhos Em Cartaz/Populares.<br>**Contexto:** Curadoria por botões não existe; só selects.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-010 — Ordem alfabética padrão

### CT-RN-SERIES-010-F — Feliz: Ordem alfabética padrão

**Camada:** Feliz · **Regra:** `RN-SERIES-010` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Todos os filtros em “todos”. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Ler primeiros cards.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cards em ordem A–Z pelo título/nome exibido. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-010-N — Negativo: Ordem alfabética padrão — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-010` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Todos os filtros em “todos”. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Todos os filtros em “todos”..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-010-E — Exploratório: Ordem alfabética padrão — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-010` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Todos os filtros em “todos”. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Ordem alfabética padrão.<br>**Contexto:** Listagem ordenada por nome da série.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-011 — Ordenação por popularidade (catálogo)

### CT-RN-SERIES-011-F — Feliz: Ordenação por popularidade (catálogo)

**Camada:** Feliz · **Regra:** `RN-SERIES-011` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | — |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Confirmar que não há controle de popularidade na UI.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Usuário comum só vê ordem alfabética nesta página. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-011-N — Negativo: Ordenação por popularidade (catálogo) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-011` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: — |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: —.<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-011-E — Exploratório: Ordenação por popularidade (catálogo) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-011` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | — |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Ordenação por popularidade (catálogo).<br>**Contexto:** Modo “populares” existe no catálogo interno, mas **não** há botão na tela.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-012 — Gênero “Todos”

### CT-RN-SERIES-012-F — Feliz: Gênero “Todos”

**Camada:** Feliz · **Regra:** `RN-SERIES-012` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | **Todos os Gêneros**. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Resetar gênero.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grade ampla. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-012-N — Negativo: Gênero “Todos” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-012` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: **Todos os Gêneros**. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: **Todos os Gêneros**..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-012-E — Exploratório: Gênero “Todos” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-012` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | **Todos os Gêneros**. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Gênero “Todos”.<br>**Contexto:** Sem restrição de gênero.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-013 — Capitalização do gênero

### CT-RN-SERIES-013-F — Feliz: Capitalização do gênero

**Camada:** Feliz · **Regra:** `RN-SERIES-013` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gêneros listados. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Abrir select de gênero.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Label formatado (ex.: Action). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-013-N — Negativo: Capitalização do gênero — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-013` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Gêneros listados. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Gêneros listados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-013-E — Exploratório: Capitalização do gênero — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-013` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Gêneros listados. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Capitalização do gênero.<br>**Contexto:** Primeira letra maiúscula no dropdown.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-014 — Ano “Todos”

### CT-RN-SERIES-014-F — Feliz: Ano “Todos”

**Camada:** Feliz · **Regra:** `RN-SERIES-014` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | **Todos os Anos**. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Resetar ano.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Séries de vários anos. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-014-N — Negativo: Ano “Todos” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-014` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: **Todos os Anos**. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: **Todos os Anos**..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-014-E — Exploratório: Ano “Todos” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-014` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | **Todos os Anos**. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Ano “Todos”.<br>**Contexto:** Sem restrição de ano.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-015 — Filtro por ano de estreia

### CT-RN-SERIES-015-F — Feliz: Filtro por ano de estreia

**Camada:** Feliz · **Regra:** `RN-SERIES-015` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano 2022. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Filtrar ano e conferir detalhe.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só séries estreadas em 2022. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-015-N — Negativo: Filtro por ano de estreia — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-015` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Ano 2022. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Ano 2022..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-015-E — Exploratório: Filtro por ano de estreia — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-015` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Ano 2022. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Filtro por ano de estreia.<br>**Contexto:** Ano limita à **data de estreia** da série (primeiro episódio / estreia).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-016 — Filtro por mês de estreia

### CT-RN-SERIES-016-F — Feliz: Filtro por mês de estreia

**Camada:** Feliz · **Regra:** `RN-SERIES-016` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Março selecionado. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Combinar mês + ano.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Séries com estreia em março (com ano definido ou corrente). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-016-N — Negativo: Filtro por mês de estreia — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-016` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Março selecionado. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Março selecionado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-016-E — Exploratório: Filtro por mês de estreia — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-016` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Março selecionado. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Filtro por mês de estreia.<br>**Contexto:** Mês limita estreias daquele mês.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-017 — Mês sem ano

### CT-RN-SERIES-017-F — Feliz: Mês sem ano

**Camada:** Feliz · **Regra:** `RN-SERIES-017` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Setembro + todos os anos. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Filtrar mês atual.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Estreias de setembro do ano atual. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-017-N — Negativo: Mês sem ano — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-017` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Setembro + todos os anos. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Setembro + todos os anos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-017-E — Exploratório: Mês sem ano — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-017` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Setembro + todos os anos. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Mês sem ano.<br>**Contexto:** Mês sozinho usa ano corrente.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-018 — Meses em português

### CT-RN-SERIES-018-F — Feliz: Meses em português

**Camada:** Feliz · **Regra:** `RN-SERIES-018` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Select de mês. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Abrir filtro de mês.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Rótulos PT-BR corretos. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-018-N — Negativo: Meses em português — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-018` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Select de mês. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Select de mês..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-018-E — Exploratório: Meses em português — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-018` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Select de mês. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Meses em português.<br>**Contexto:** Janeiro–dezembro no select.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-019 — Filtro por plataforma

### CT-RN-SERIES-019-F — Feliz: Filtro por plataforma

**Camada:** Feliz · **Regra:** `RN-SERIES-019` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Netflix selecionada. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Filtrar plataforma.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só séries com Netflix nos metadados. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-019-N — Negativo: Filtro por plataforma — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-019` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Netflix selecionada. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Netflix selecionada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-019-E — Exploratório: Filtro por plataforma — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-019` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Netflix selecionada. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Filtro por plataforma.<br>**Contexto:** Restringe a séries com streaming na plataforma.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-020 — Filtro por status

### CT-RN-SERIES-020-F — Feliz: Filtro por status

**Camada:** Feliz · **Regra:** `RN-SERIES-020` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Status escolhido. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Filtrar status.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grade coerente com status no detalhe. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-020-N — Negativo: Filtro por status — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-020` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Status escolhido. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Status escolhido..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-020-E — Exploratório: Filtro por status — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-020` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Status escolhido. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Filtro por status.<br>**Contexto:** Status cadastral (ex.: em exibição, encerrada).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-021 — Sem recarga duplicada na abertura

### CT-RN-SERIES-021-F — Feliz: Sem recarga duplicada na abertura

**Camada:** Feliz · **Regra:** `RN-SERIES-021` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeira visita OK. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Abrir página e aguardar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Conteúdo estável até mudar filtro. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-021-N — Negativo: Sem recarga duplicada na abertura — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-021` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Primeira visita OK. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Primeira visita OK..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-021-E — Exploratório: Sem recarga duplicada na abertura — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-021` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Primeira visita OK. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Sem recarga duplicada na abertura.<br>**Contexto:** Abrir Séries não dispara segundo loading imediato.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-022 — Mudança de filtro recarrega

### CT-RN-SERIES-022-F — Feliz: Mudança de filtro recarrega

**Camada:** Feliz · **Regra:** `RN-SERIES-022` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Qualquer filtro mudado. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Trocar gênero.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Spinner + nova lista. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-022-N — Negativo: Mudança de filtro recarrega — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-022` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Qualquer filtro mudado. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Qualquer filtro mudado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-022-E — Exploratório: Mudança de filtro recarrega — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-022` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Qualquer filtro mudado. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Mudança de filtro recarrega.<br>**Contexto:** Alterar select atualiza grade.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-023 — Atualização após sync

### CT-RN-SERIES-023-F — Feliz: Atualização após sync

**Camada:** Feliz · **Regra:** `RN-SERIES-023` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sync em andamento. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Manter Séries aberta durante sync.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cards/contador mudam sem F5. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-023-N — Negativo: Atualização após sync — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-023` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Sync em andamento. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Sync em andamento..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-023-E — Exploratório: Atualização após sync — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-023` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Sync em andamento. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Atualização após sync.<br>**Contexto:** Sync do catálogo pode atualizar a grade com a página aberta.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-024 — Spinner ao filtrar

### CT-RN-SERIES-024-F — Feliz: Spinner ao filtrar

**Camada:** Feliz · **Regra:** `RN-SERIES-024` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro alterado. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Trocar filtro.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Spinner até concluir. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-024-N — Negativo: Spinner ao filtrar — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-024` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro alterado. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtro alterado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-024-E — Exploratório: Spinner ao filtrar — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-024` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro alterado. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Spinner ao filtrar.<br>**Contexto:** Loading central substitui grade.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-025 — Contador com total global

### CT-RN-SERIES-025-F — Feliz: Contador com total global

**Camada:** Feliz · **Regra:** `RN-SERIES-025` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | > ~48 séries no filtro. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Filtro amplo.<br>3. Ler contador.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Contador alto com subconjunto na grade. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-025-N — Negativo: Contador com total global — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-025` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: > ~48 séries no filtro. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: > ~48 séries no filtro..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-025-E — Exploratório: Contador com total global — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-025` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | > ~48 séries no filtro. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Contador com total global.<br>**Contexto:** “X séries encontradas” usa total lógico do filtro.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-026 — Contador em carregamento

### CT-RN-SERIES-026-F — Feliz: Contador em carregamento

**Camada:** Feliz · **Regra:** `RN-SERIES-026` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro recém-alterado. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Trocar filtro rapidamente.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Sem número antigo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-026-N — Negativo: Contador em carregamento — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-026` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro recém-alterado. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtro recém-alterado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-026-E — Exploratório: Contador em carregamento — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-026` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro recém-alterado. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Contador em carregamento.<br>**Contexto:** Texto **Carregando...** durante busca.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-027 — Grade responsiva

### CT-RN-SERIES-027-F — Feliz: Grade responsiva

**Camada:** Feliz · **Regra:** `RN-SERIES-027` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resultados > 0. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Redimensionar janela.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Layout adapta ao viewport. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-027-N — Negativo: Grade responsiva — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-027` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Resultados > 0. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Resultados > 0..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-027-E — Exploratório: Grade responsiva — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-027` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Resultados > 0. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Grade responsiva.<br>**Contexto:** 2–5 colunas; cards ~210px.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-028 — Nenhum resultado

### CT-RN-SERIES-028-F — Feliz: Nenhum resultado

**Camada:** Feliz · **Regra:** `RN-SERIES-028` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Combinação impossível. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Filtro restritivo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | **Nenhuma série encontrada** + dica de ajustar filtros. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-028-N — Negativo: Nenhum resultado — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-028` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Combinação impossível. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Combinação impossível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-028-E — Exploratório: Nenhum resultado — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-028` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Combinação impossível. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Nenhum resultado.<br>**Contexto:** Filtro sem match.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-029 — Falha ao recarregar

### CT-RN-SERIES-029-F — Feliz: Falha ao recarregar

**Camada:** Feliz · **Regra:** `RN-SERIES-029` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede off ao filtrar. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Cortar rede ao filtrar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grade pode zerar; sem crash. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-029-N — Negativo: Falha ao recarregar — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-SERIES-029` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Rede off ao filtrar. |
| Passos | 1. Abrir o site e navegar até **Séries** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Grade pode zerar; sem crash. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-029-E — Exploratório: Falha ao recarregar — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-029` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Rede off ao filtrar. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Falha ao recarregar.<br>**Contexto:** Erre de rede ao filtrar não derruba página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-030 — Listagem mais permissiva que a home

### CT-RN-SERIES-030-F — Feliz: Listagem mais permissiva que a home

**Camada:** Feliz · **Regra:** `RN-SERIES-030` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série marginal cadastrada. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Comparar mesmo título home vs Séries.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Aparece em Séries; pode faltar na home. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-030-N — Negativo: Listagem mais permissiva que a home — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-030` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série marginal cadastrada. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série marginal cadastrada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-030-E — Exploratório: Listagem mais permissiva que a home — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-030` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série marginal cadastrada. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Listagem mais permissiva que a home.<br>**Contexto:** A página Séries pode incluir séries “fracas” (poucos episódios, sem sinopse) que o carrossel Séries da **inicial** exclui.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-031 — Lote inicial na grade

### CT-RN-SERIES-031-F — Feliz: Lote inicial na grade

**Camada:** Feliz · **Regra:** `RN-SERIES-031` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro amplo. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Contar cards vs contador.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Dezenas de cards, contador pode ser maior. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-031-N — Negativo: Lote inicial na grade — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-031` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro amplo. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtro amplo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-031-E — Exploratório: Lote inicial na grade — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-031` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro amplo. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Lote inicial na grade.<br>**Contexto:** ~48 cards visíveis por vez sem “carregar mais”.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-032 — Cards com gêneros e streaming

### CT-RN-SERIES-032-F — Feliz: Cards com gêneros e streaming

**Camada:** Feliz · **Regra:** `RN-SERIES-032` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série com gêneros/plataformas. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Inspecionar card.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Texto/ícones no card. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-032-N — Negativo: Cards com gêneros e streaming — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-032` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série com gêneros/plataformas. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série com gêneros/plataformas..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-032-E — Exploratório: Cards com gêneros e streaming — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-032` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série com gêneros/plataformas. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Cards com gêneros e streaming.<br>**Contexto:** Informações aparecem quando cadastradas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-033 — Gêneros visíveis no card

### CT-RN-SERIES-033-F — Feliz: Gêneros visíveis no card

**Camada:** Feliz · **Regra:** `RN-SERIES-033` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série com gêneros. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Abrir card na grade.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Gêneros legíveis. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-033-N — Negativo: Gêneros visíveis no card — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-033` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série com gêneros. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série com gêneros..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-033-E — Exploratório: Gêneros visíveis no card — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-033` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série com gêneros. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Gêneros visíveis no card.<br>**Contexto:** Lista de gêneros no card quando existir.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-034 — Conteúdo pode demorar a refletir

### CT-RN-SERIES-034-F — Feliz: Conteúdo pode demorar a refletir

**Camada:** Feliz · **Regra:** `RN-SERIES-034` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Alteração recente. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Ver RN-SERIES-002.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Recarregar após intervalo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-034-N — Negativo: Conteúdo pode demorar a refletir — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-034` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Alteração recente. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Alteração recente..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-034-E — Exploratório: Conteúdo pode demorar a refletir — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-034` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Alteração recente. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Conteúdo pode demorar a refletir.<br>**Contexto:** Mesma lógica de atualização gradual do catálogo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-035 — Opções de filtro coerentes

### CT-RN-SERIES-035-F — Feliz: Opções de filtro coerentes

**Camada:** Feliz · **Regra:** `RN-SERIES-035` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo variado. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Abrir cada select.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Menus populados sem opções “vazias”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-035-N — Negativo: Opções de filtro coerentes — sem a condição exigida

**Camada:** Negativo · **Regra:** `RN-SERIES-035` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo variado. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Usar usuário, dado ou estado **sem** a condição da regra (ex.: não logado se a regra exige login).<br>3. Repetir a mesma ação do caminho feliz.<br>4. Verificar que o elemento/comportamento **não** aparece ou permanece desabilitado. |
| Resultado_Esperado | O resultado feliz **não** ocorre; a tela permanece coerente (sem vazamento indevido). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-035-E — Exploratório: Opções de filtro coerentes — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-035` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo variado. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Opções de filtro coerentes.<br>**Contexto:** Gêneros/status/plataformas só aparecem se há séries associadas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-036 — Anos de estreia no filtro

### CT-RN-SERIES-036-F — Feliz: Anos de estreia no filtro

**Camada:** Feliz · **Regra:** `RN-SERIES-036` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias temporadas. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Série antiga com ep novo: filtrar ano de estreia.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ano no filtro = ano de estreia, não de episódio recente. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-036-N — Negativo: Anos de estreia no filtro — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-036` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Várias temporadas. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Várias temporadas..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-036-E — Exploratório: Anos de estreia no filtro — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-036` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Várias temporadas. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Anos de estreia no filtro.<br>**Contexto:** Anos derivados da data de **estreia** da série.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-037 — Status em português

### CT-RN-SERIES-037-F — Feliz: Status em português

**Camada:** Feliz · **Regra:** `RN-SERIES-037` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Status variados. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Abrir status.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Texto PT no dropdown. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-037-N — Negativo: Status em português — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-037` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Status variados. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Status variados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-037-E — Exploratório: Status em português — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-037` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Status variados. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Status em português.<br>**Contexto:** Labels traduzidos no select quando possível.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-038 — Home exige qualidade mínima

### CT-RN-SERIES-038-F — Feliz: Home exige qualidade mínima

**Camada:** Feliz · **Regra:** `RN-SERIES-038` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série fraca vs forte. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Comparar presença home vs página.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Forte na home e Séries; fraca só em Séries. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-038-N — Negativo: Home exige qualidade mínima — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-038` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série fraca vs forte. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série fraca vs forte..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-038-E — Exploratório: Home exige qualidade mínima — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-038` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série fraca vs forte. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Home exige qualidade mínima.<br>**Contexto:** Carrossel da inicial só mostra séries com pôster, sinopse, engajamento e nota mínima quando há muitos votos.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-039 — Home exige ≥ 2 episódios

### CT-RN-SERIES-039-F — Feliz: Home exige ≥ 2 episódios

**Camada:** Feliz · **Regra:** `RN-SERIES-039` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série 1 ep. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Comparar contagens.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente na home; pode estar em Séries. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-039-N — Negativo: Home exige ≥ 2 episódios — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-SERIES-039` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série 1 ep. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-039-E — Exploratório: Home exige ≥ 2 episódios — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-039` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série 1 ep. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Home exige ≥ 2 episódios.<br>**Contexto:** Carrossel inicial ignora séries com um único episódio cadastrado (salvo exceções de carrossel mensal).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-040 — Home exige pôster e sinopse

### CT-RN-SERIES-040-F — Feliz: Home exige pôster e sinopse

**Camada:** Feliz · **Regra:** `RN-SERIES-040` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série sem sinopse. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Mesmo título duas telas.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente na home; pode listar em Séries. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-040-N — Negativo: Home exige pôster e sinopse — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-SERIES-040` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série sem sinopse. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-040-E — Exploratório: Home exige pôster e sinopse — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-040` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série sem sinopse. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Home exige pôster e sinopse.<br>**Contexto:** Campos obrigatórios no carrossel da home.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-041 — Engajamento na home

### CT-RN-SERIES-041-F — Feliz: Engajamento na home

**Camada:** Feliz · **Regra:** `RN-SERIES-041` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série obscura. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Buscar série obscura.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só na listagem Séries. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-041-N — Negativo: Engajamento na home — abaixo do limite

**Camada:** Negativo · **Regra:** `RN-SERIES-041` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série obscura. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Reproduzir a ação com valor **abaixo do mínimo** (ex.: menos caracteres, nota/duração insuficiente).<br>3. Observar bloqueio, ausência do efeito ou mensagem de validação.<br>4. Confirmar que o sistema **não** aplica o benefício do caminho feliz. |
| Resultado_Esperado | Comportamento de bloqueio ou ausência do resultado feliz: validação visível, item oculto ou ação não executada — sem erro de interface. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-041-E — Exploratório: Engajamento na home — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-041` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série obscura. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Engajamento na home.<br>**Contexto:** Popularidade ou volume de votos mínimo no carrossel.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-042 — Nota mínima na home

### CT-RN-SERIES-042-F — Feliz: Nota mínima na home

**Camada:** Feliz · **Regra:** `RN-SERIES-042` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série mal avaliada popular. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Comparar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Listagem Séries pode ainda mostrar. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-042-N — Negativo: Nota mínima na home — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-042` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série mal avaliada popular. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série mal avaliada popular..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-042-E — Exploratório: Nota mínima na home — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-042` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série mal avaliada popular. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Nota mínima na home.<br>**Contexto:** Muitos votos + nota baixa excluídos do carrossel.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-043 — Estreias planejadas no carrossel mensal

### CT-RN-SERIES-043-F — Feliz: Estreias planejadas no carrossel mensal

**Camada:** Feliz · **Regra:** `RN-SERIES-043` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série Planned futura. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Validar na home e em Séries.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Pode aparecer na home por mês; em Séries aparece se cadastrada. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-043-N — Negativo: Estreias planejadas no carrossel mensal — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-043` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série Planned futura. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série Planned futura..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-043-E — Exploratório: Estreias planejadas no carrossel mensal — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-043` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série Planned futura. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Estreias planejadas no carrossel mensal.<br>**Contexto:** Modo timeline da home pode incluir séries “planejadas” com critério mais flexível.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-044 — Data do episódio na timeline home

### CT-RN-SERIES-044-F — Feliz: Data do episódio na timeline home

**Camada:** Feliz · **Regra:** `RN-SERIES-044` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série com ep semanal. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Série em exibição: home vs filtro mês em Séries.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Card na home alinhado ao ep; em Séries filtro mês usa estreia da série. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-044-N — Negativo: Data do episódio na timeline home — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-044` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série com ep semanal. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série com ep semanal..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-044-E — Exploratório: Data do episódio na timeline home — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-044` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série com ep semanal. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Data do episódio na timeline home.<br>**Contexto:** Posição no carrossel da home usa **próximo episódio**, não só estreia da série.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-045 — Ordem no carrossel mensal

### CT-RN-SERIES-045-F — Feliz: Ordem no carrossel mensal

**Camada:** Feliz · **Regra:** `RN-SERIES-045` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mesmo mês. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Comparar ordem home vs Séries filtrada.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ordens diferentes entre telas. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-045-N — Negativo: Ordem no carrossel mensal — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-045` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Mesmo mês. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Mesmo mês..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-045-E — Exploratório: Ordem no carrossel mensal — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-045` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Mesmo mês. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Ordem no carrossel mensal.<br>**Contexto:** Ordem na home por data de exibição/episódio; em Séries ordem alfabética (padrão).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-046 — Carrossel por ano (home)

### CT-RN-SERIES-046-F — Feliz: Carrossel por ano (home)

**Camada:** Feliz · **Regra:** `RN-SERIES-046` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano específico. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Filtrar ano em Séries.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Home: slides; Séries: grade filtrada. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-046-N — Negativo: Carrossel por ano (home) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-046` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Ano específico. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Ano específico..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-046-E — Exploratório: Carrossel por ano (home) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-046` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Ano específico. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Carrossel por ano (home).<br>**Contexto:** Navegação por ano no carrossel da inicial; em Séries use filtro de ano.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-047 — Ano sem dia confirmado (home)

### CT-RN-SERIES-047-F — Feliz: Ano sem dia confirmado (home)

**Camada:** Feliz · **Regra:** `RN-SERIES-047` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série TBA. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Comparar home vs detalhe em Séries.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Detalhe pode mostrar incerteza; sem separador TBD aqui. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-047-N — Negativo: Ano sem dia confirmado (home) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-047` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série TBA. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série TBA..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-047-E — Exploratório: Ano sem dia confirmado (home) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-047` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série TBA. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Ano sem dia confirmado (home).<br>**Contexto:** Blocos TBD existem na home; em Séries use status/detalhe.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-048 — Contexto de temporadas na home

### CT-RN-SERIES-048-F — Feliz: Contexto de temporadas na home

**Camada:** Feliz · **Regra:** `RN-SERIES-048` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Nova temporada distante. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Caso com nova temp.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Home posiciona por ep; Séries filtra por estreia original se ano/mês de estreia. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-048-N — Negativo: Contexto de temporadas na home — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-048` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Nova temporada distante. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Nova temporada distante..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-048-E — Exploratório: Contexto de temporadas na home — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-048` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Nova temporada distante. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Contexto de temporadas na home.<br>**Contexto:** Cards do carrossel podem considerar datas de temporadas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-049 — Formato do card home vs grade

### CT-RN-SERIES-049-F — Feliz: Formato do card home vs grade

**Camada:** Feliz · **Regra:** `RN-SERIES-049` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mesma série. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Abrir card home vs card Séries.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Detalhes extras no carrossel home. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-049-N — Negativo: Formato do card home vs grade — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-049` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Mesma série. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Mesma série..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-049-E — Exploratório: Formato do card home vs grade — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-049` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Mesma série. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Formato do card home vs grade.<br>**Contexto:** Campos visuais podem diferir levemente (próximo ep, contagem).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-050 — Limite de itens no carrossel home

### CT-RN-SERIES-050-F — Feliz: Limite de itens no carrossel home

**Camada:** Feliz · **Regra:** `RN-SERIES-050` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo grande. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Contar visíveis em cada superfície.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Home não lista tudo; Séries lista muito mais via filtros. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-050-N — Negativo: Limite de itens no carrossel home — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-050` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo grande. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Catálogo grande..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-050-E — Exploratório: Limite de itens no carrossel home — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-050` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo grande. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Limite de itens no carrossel home.<br>**Contexto:** Faixa horizontal da home mostra subconjunto curado (~dezenas/centenas internas); Séries pagina ~48 visíveis.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-051 — Detalhe pelo card

### CT-RN-SERIES-051-F — Feliz: Detalhe pelo card

**Camada:** Feliz · **Regra:** `RN-SERIES-051` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card na grade/gaveta. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Clicar card.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Sinopse, temporadas, links. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-051-N — Negativo: Detalhe pelo card — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-051` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Card na grade/gaveta. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Card na grade/gaveta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-051-E — Exploratório: Detalhe pelo card — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-051` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Card na grade/gaveta. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Detalhe pelo card.<br>**Contexto:** Clique abre modal/página de detalhe.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-052 — Episódios por temporada

### CT-RN-SERIES-052-F — Feliz: Episódios por temporada

**Camada:** Feliz · **Regra:** `RN-SERIES-052` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série com temporadas. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Abrir detalhe → temporada.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Episódios visíveis no detalhe. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-052-N — Negativo: Episódios por temporada — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-052` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série com temporadas. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série com temporadas..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-052-E — Exploratório: Episódios por temporada — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-052` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série com temporadas. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Episódios por temporada.<br>**Contexto:** Lista de episódios acessível no fluxo de detalhe (não na grade).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-053 — Sem edição pública

### CT-RN-SERIES-053-F — Feliz: Sem edição pública

**Camada:** Feliz · **Regra:** `RN-SERIES-053` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário comum. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Inspecionar página.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Sem controles de admin em Séries. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-053-N — Negativo: Sem edição pública — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-053` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário comum. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário comum..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-053-E — Exploratório: Sem edição pública — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-053` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário comum. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Sem edição pública.<br>**Contexto:** Cadastro alterado só por equipe interna.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-054 — Filtros habilitados

### CT-RN-SERIES-054-F — Feliz: Filtros habilitados

**Camada:** Feliz · **Regra:** `RN-SERIES-054` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Uso normal. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Usar filtros.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Todos clicáveis. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-054-N — Negativo: Filtros habilitados — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-054` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Uso normal. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Uso normal..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-054-E — Exploratório: Filtros habilitados — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-054` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Uso normal. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Filtros habilitados.<br>**Contexto:** Selects não ficam permanentemente desabilitados.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-055 — Contador coerente

### CT-RN-SERIES-055-F — Feliz: Contador coerente

**Camada:** Feliz · **Regra:** `RN-SERIES-055` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro ativo. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Anotar contador + amostra.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Número faz sentido com busca manual por título. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-055-N — Negativo: Contador coerente — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-055` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro ativo. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtro ativo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-055-E — Exploratório: Contador coerente — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-055` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro ativo. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Contador coerente.<br>**Contexto:** Total exibido alinhado ao filtro aplicado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-056 — Recarregar reseta filtros

### CT-RN-SERIES-056-F — Feliz: Recarregar reseta filtros

**Camada:** Feliz · **Regra:** `RN-SERIES-056` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtros alterados. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. F5 após filtrar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Selects e lista padrão após reload. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-056-N — Negativo: Recarregar reseta filtros — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-056` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtros alterados. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtros alterados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-056-E — Exploratório: Recarregar reseta filtros — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-056` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtros alterados. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Recarregar reseta filtros.<br>**Contexto:** F5 volta ao estado inicial da página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-057 — Listagem ampla sem filtro

### CT-RN-SERIES-057-F — Feliz: Listagem ampla sem filtro

**Camada:** Feliz · **Regra:** `RN-SERIES-057` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo populado. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Abrir Séries padrão.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grade com títulos variados. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-057-N — Negativo: Listagem ampla sem filtro — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-057` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo populado. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Catálogo populado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-057-E — Exploratório: Listagem ampla sem filtro — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-057` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo populado. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Listagem ampla sem filtro.<br>**Contexto:** Abrir Séries sem filtros mostra séries diversas do catálogo (paginadas).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-058 — Gêneros só com séries

### CT-RN-SERIES-058-F — Feliz: Gêneros só com séries

**Camada:** Feliz · **Regra:** `RN-SERIES-058` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gênero órfão. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Revisar lista de gêneros.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente no select. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-058-N — Negativo: Gêneros só com séries — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-SERIES-058` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Gênero órfão. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-058-E — Exploratório: Gêneros só com séries — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-058` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Gênero órfão. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Gêneros só com séries.<br>**Contexto:** Gênero sem nenhuma série não aparece no menu.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-059 — Plataformas só com séries

### CT-RN-SERIES-059-F — Feliz: Plataformas só com séries

**Camada:** Feliz · **Regra:** `RN-SERIES-059` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Plataforma sem séries. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Abrir plataformas.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente no select. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-059-N — Negativo: Plataformas só com séries — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-SERIES-059` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Plataforma sem séries. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-059-E — Exploratório: Plataformas só com séries — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-059` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Plataforma sem séries. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Plataformas só com séries.<br>**Contexto:** Mesma regra para streaming.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-060 — Erro total na listagem

### CT-RN-SERIES-060-F — Feliz: Erro total na listagem

**Camada:** Feliz · **Regra:** `RN-SERIES-060` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo indisponível ao filtrar. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Simular indisponibilidade.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Empty ou mensagem; página intacta. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-060-N — Negativo: Erro total na listagem — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-SERIES-060` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo indisponível ao filtrar. |
| Passos | 1. Abrir o site e navegar até **Séries** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Empty ou mensagem; página intacta. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-060-E — Exploratório: Erro total na listagem — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-060` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo indisponível ao filtrar. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Erro total na listagem.<br>**Contexto:** Falha grave ao montar lista mostra estado vazio/erro amigável, não tela branca.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-061 — Erro nos filtros

### CT-RN-SERIES-061-F — Feliz: Erro nos filtros

**Camada:** Feliz · **Regra:** `RN-SERIES-061` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Falha na abertura. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Abrir com catálogo down.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ver RN-SERIES-003. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-061-N — Negativo: Erro nos filtros — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-SERIES-061` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Falha na abertura. |
| Passos | 1. Abrir o site e navegar até **Séries** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Ver RN-SERIES-003. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-061-E — Exploratório: Erro nos filtros — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-061` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Falha na abertura. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Erro nos filtros.<br>**Contexto:** Se opções de filtro não carregarem, selects podem ficar vazios mas página abre.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-SERIES-062 — Série planejada na listagem

### CT-RN-SERIES-062-F — Feliz: Série planejada na listagem

**Camada:** Feliz · **Regra:** `RN-SERIES-062` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série Planned. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Buscar estreia futura.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Card visível; etiqueta **Em breve** quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-062-N — Negativo: Série planejada na listagem — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-SERIES-062` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série Planned. |
| Passos | 1. Abrir o site e navegar até **Séries**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série Planned..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-SERIES-062-E — Exploratório: Série planejada na listagem — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-SERIES-062` · **Tela:** Séries

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série Planned. |
| Passos | **Charter (15 min)** — área: **Séries** · regra: Série planejada na listagem.<br>**Contexto:** Séries futuras “planejadas” podem aparecer na grade se cadastradas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |
