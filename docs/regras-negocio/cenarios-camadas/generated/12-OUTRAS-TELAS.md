# Camadas — Outras telas

**Inventário:** `12-OUTRAS-TELAS.md` · **Cenários:** 147

---

## RN-CONT-001 — Lista inicial

### CT-RN-CONT-001-F — Feliz: Lista inicial

**Camada:** Feliz · **Regra:** `RN-CONT-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Acesso pelo menu Continuações. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Abrir Continuações offline após visita anterior.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Carrega listas de **Sagas** e **Universos**; falha de rede → listas vazias sem quebrar a página. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-001-N — Negativo: Lista inicial — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-CONT-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Acesso pelo menu Continuações. |
| Passos | 1. Abrir o site e navegar até **Outras telas** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Carrega listas de **Sagas** e **Universos**; falha de rede → listas vazias sem quebrar a página. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-001-E — Exploratório: Lista inicial — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-CONT-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Acesso pelo menu Continuações. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Lista inicial.<br>**Contexto:** Página aberta sem detalhe selecionado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-CONT-002 — Detalhe de saga

### CT-RN-CONT-002-F — Feliz: Detalhe de saga

**Camada:** Feliz · **Regra:** `RN-CONT-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Saga válida no catálogo. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Clicar card de saga.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mostra timeline da saga; limpa seleção de universo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-002-N — Negativo: Detalhe de saga — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-CONT-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Saga válida no catálogo. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Saga válida no catálogo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-002-E — Exploratório: Detalhe de saga — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-CONT-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Saga válida no catálogo. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Detalhe de saga.<br>**Contexto:** Saga selecionada na navegação.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-CONT-003 — Detalhe de universo

### CT-RN-CONT-003-F — Feliz: Detalhe de universo

**Camada:** Feliz · **Regra:** `RN-CONT-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Universo válido. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Link de universo cinematográfico.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mostra universo; força visualização de universos; limpa saga. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-003-N — Negativo: Detalhe de universo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-CONT-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Universo válido. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Universo válido..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-003-E — Exploratório: Detalhe de universo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-CONT-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Universo válido. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Detalhe de universo.<br>**Contexto:** Universo selecionado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-CONT-004 — Abas na listagem

### CT-RN-CONT-004-F — Feliz: Abas na listagem

**Camada:** Feliz · **Regra:** `RN-CONT-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista carregada. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Clicar abas.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Alternar “Sagas” vs “Universos cinematográficos”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-004-N — Negativo: Abas na listagem — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-CONT-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Lista carregada. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Lista carregada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-004-E — Exploratório: Abas na listagem — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-CONT-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Lista carregada. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Abas na listagem.<br>**Contexto:** Sem detalhe aberto.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-CONT-005 — Card de saga

### CT-RN-CONT-005-F — Feliz: Card de saga

**Camada:** Feliz · **Regra:** `RN-CONT-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias sagas. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Ler card antes de entrar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Link para detalhe; mostra quantidade de filmes e preview de títulos. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-005-N — Negativo: Card de saga — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-CONT-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Várias sagas. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Várias sagas..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-005-E — Exploratório: Card de saga — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-CONT-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Várias sagas. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Card de saga.<br>**Contexto:** Preview na grade.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-CONT-006 — Card de universo

### CT-RN-CONT-006-F — Feliz: Card de universo

**Camada:** Feliz · **Regra:** `RN-CONT-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Universos com ordem. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Universo com filmes numerados.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Link para detalhe; preview numérico quando há ordem de obras. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-006-N — Negativo: Card de universo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-CONT-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Universos com ordem. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Universos com ordem..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-006-E — Exploratório: Card de universo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-CONT-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Universos com ordem. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Card de universo.<br>**Contexto:** Preview na grade.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-CONT-007 — Timeline da saga

### CT-RN-CONT-007-F — Feliz: Timeline da saga

**Camada:** Feliz · **Regra:** `RN-CONT-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Saga com filmes. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Abrir saga longa (ex. franquia).<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Linha do tempo cronológica; texto introdutório da saga se existir. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-007-N — Negativo: Timeline da saga — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-CONT-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Saga com filmes. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Saga com filmes..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-007-E — Exploratório: Timeline da saga — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-CONT-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Saga com filmes. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Timeline da saga.<br>**Contexto:** Detalhe aberto.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-CONT-008 — Detalhe do universo

### CT-RN-CONT-008-F — Feliz: Detalhe do universo

**Camada:** Feliz · **Regra:** `RN-CONT-008` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Universo com filmes e séries. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Universo compartilhado conhecido.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Contagens, faixa de anos, descrição, timeline filme+série. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-008-N — Negativo: Detalhe do universo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-CONT-008` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Universo com filmes e séries. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Universo com filmes e séries..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-008-E — Exploratório: Detalhe do universo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-CONT-008` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Universo com filmes e séries. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Detalhe do universo.<br>**Contexto:** Visão mista.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-CONT-009 — Abrir obra

### CT-RN-CONT-009-F — Feliz: Abrir obra

**Camada:** Feliz · **Regra:** `RN-CONT-009` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item filme ou série. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Clicar filme na timeline.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Abre modal de detalhe com informações mínimas até carregar o restante. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-009-N — Negativo: Abrir obra — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-CONT-009` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Item filme ou série. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Item filme ou série..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-009-E — Exploratório: Abrir obra — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-CONT-009` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Item filme ou série. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Abrir obra.<br>**Contexto:** Clique em item da timeline.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-CONT-010 — Sem conteúdo

### CT-RN-CONT-010-F — Feliz: Sem conteúdo

**Camada:** Feliz · **Regra:** `RN-CONT-010` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Zero sagas/universos. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Ambiente vazio.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mensagem orientando que dados podem depender de sincronização do catálogo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-010-N — Negativo: Sem conteúdo — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-CONT-010` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Zero sagas/universos. |
| Passos | 1. Abrir o site e navegar até **Outras telas** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Mensagem orientando que dados podem depender de sincronização do catálogo. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-010-E — Exploratório: Sem conteúdo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-CONT-010` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Zero sagas/universos. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Sem conteúdo.<br>**Contexto:** Catálogo vazio.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-CONT-011 — Voltar à lista

### CT-RN-CONT-011-F — Feliz: Voltar à lista

**Camada:** Feliz · **Regra:** `RN-CONT-011` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Detalhe de saga ou universo. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Voltar pelo link.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Link “Todas as sagas” / “Todos os universos” retorna à listagem geral. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-011-N — Negativo: Voltar à lista — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-CONT-011` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Detalhe de saga ou universo. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Detalhe de saga ou universo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-011-E — Exploratório: Voltar à lista — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-CONT-011` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Detalhe de saga ou universo. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Voltar à lista.<br>**Contexto:** Do detalhe.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-CONT-020 — Abas no modal

### CT-RN-CONT-020-F — Feliz: Abas no modal

**Camada:** Feliz · **Regra:** `RN-CONT-020` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Abrir filme de saga → abas.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mesmas regras das abas RN-MODAL-090 a RN-MODAL-092 (continuação/universo sob demanda). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-020-N — Negativo: Abas no modal — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-CONT-020` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modal aberto. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modal aberto..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-CONT-020-E — Exploratório: Abas no modal — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-CONT-020` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modal aberto. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Abas no modal.<br>**Contexto:** Detalhe de filme/série com franquia.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-DEV-001 — Empresa inválida

### CT-RN-DEV-001-F — Feliz: Empresa inválida

**Camada:** Feliz · **Regra:** `RN-DEV-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Link quebrado ou id inexistente. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Abrir link de desenvolvedora inválido.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mensagem de erro sem carregamento infinito. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-001-N — Negativo: Empresa inválida — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-DEV-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Link quebrado ou id inexistente. |
| Passos | 1. Abrir o site e navegar até **Outras telas** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Mensagem de erro sem carregamento infinito. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-001-E — Exploratório: Empresa inválida — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-DEV-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Link quebrado ou id inexistente. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Empresa inválida.<br>**Contexto:** Endereço ou identificador incorreto.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-DEV-002 — Lista paginada

### CT-RN-DEV-002-F — Feliz: Lista paginada

**Camada:** Feliz · **Regra:** `RN-DEV-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Empresa com muitos jogos. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Empresa grande (Nintendo etc.).<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Primeira leva (~24 jogos); indicador de mais páginas. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-002-N — Negativo: Lista paginada — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-DEV-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Empresa com muitos jogos. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Empresa com muitos jogos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-002-E — Exploratório: Lista paginada — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-DEV-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Empresa com muitos jogos. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Lista paginada.<br>**Contexto:** Catálogo de jogos da empresa.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-DEV-003 — Scroll infinito

### CT-RN-DEV-003-F — Feliz: Scroll infinito

**Camada:** Feliz · **Regra:** `RN-DEV-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | `hasMore` verdadeiro. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Rolar até carregar 2ª página.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Próxima página carrega automaticamente ao aproximar do fim (~200px). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-003-N — Negativo: Scroll infinito — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-DEV-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: `hasMore` verdadeiro. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: `hasMore` verdadeiro..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-003-E — Exploratório: Scroll infinito — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-DEV-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | `hasMore` verdadeiro. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Scroll infinito.<br>**Contexto:** Usuário rola até o fim.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-DEV-004 — Título da página

### CT-RN-DEV-004-F — Feliz: Título da página

**Camada:** Feliz · **Regra:** `RN-DEV-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resposta com nome. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Empresa sem nome na resposta.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cabeçalho com nome da desenvolvedora ou fallback “Desenvolvedora”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-004-N — Negativo: Título da página — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-DEV-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Resposta com nome. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Resposta com nome..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-004-E — Exploratório: Título da página — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-DEV-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Resposta com nome. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Título da página.<br>**Contexto:** Nome da empresa.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-DEV-005 — Texto informativo

### CT-RN-DEV-005-F — Feliz: Texto informativo

**Camada:** Feliz · **Regra:** `RN-DEV-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página aberta. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Ler subtítulo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Copy informa a fonte do catálogo de jogos e que rolar carrega mais títulos. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-005-N — Negativo: Texto informativo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-DEV-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página aberta. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página aberta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-005-E — Exploratório: Texto informativo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-DEV-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página aberta. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Texto informativo.<br>**Contexto:** Origem dos dados.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-DEV-006 — Grid de jogos

### CT-RN-DEV-006-F — Feliz: Grid de jogos

**Camada:** Feliz · **Regra:** `RN-DEV-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogos listados. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Favoritar jogo da grid.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cada jogo é card padrão com ações de lista/favorito. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-006-N — Negativo: Grid de jogos — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-DEV-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogos listados. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Jogos listados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-006-E — Exploratório: Grid de jogos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-DEV-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogos listados. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Grid de jogos.<br>**Contexto:** Cards na página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-DEV-007 — Entrada pelo modal

### CT-RN-DEV-007-F — Feliz: Entrada pelo modal

**Camada:** Feliz · **Regra:** `RN-DEV-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal de jogo aberto. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Jogo → link dev → validar URL.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Link da desenvolvedora leva a esta página. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-007-N — Negativo: Entrada pelo modal — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-DEV-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modal de jogo aberto. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modal de jogo aberto..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-DEV-007-E — Exploratório: Entrada pelo modal — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-DEV-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modal de jogo aberto. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Entrada pelo modal.<br>**Contexto:** Link no detalhe do jogo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-DUB-001 — Carregar créditos

### CT-RN-DUB-001-F — Feliz: Carregar créditos

**Camada:** Feliz · **Regra:** `RN-DUB-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | ID válido. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Dublador conhecido PT-BR.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Nome, foto e obras dubladas. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-DUB-001-N — Negativo: Carregar créditos — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-DUB-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: ID válido. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: ID válido..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-DUB-001-E — Exploratório: Carregar créditos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-DUB-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | ID válido. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Carregar créditos.<br>**Contexto:** Página do dublador.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-DUB-002 — Rótulo de idioma

### CT-RN-DUB-002-F — Feliz: Rótulo de idioma

**Camada:** Feliz · **Regra:** `RN-DUB-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Metadado de idioma. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Comparar dublador BR vs seiyuu.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Português → “Dublagem em português”; japonês → “Voz original”; outro → texto genérico. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-DUB-002-N — Negativo: Rótulo de idioma — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-DUB-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Metadado de idioma. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Metadado de idioma..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-DUB-002-E — Exploratório: Rótulo de idioma — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-DUB-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Metadado de idioma. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Rótulo de idioma.<br>**Contexto:** Contexto da carreira.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-DUB-003 — Tipos na filmografia

### CT-RN-DUB-003-F — Feliz: Tipos na filmografia

**Camada:** Feliz · **Regra:** `RN-DUB-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Créditos variados. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Grid com anime e filme.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Pode incluir filme, série, anime e jogo com rótulo de tipo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-DUB-003-N — Negativo: Tipos na filmografia — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-DUB-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Créditos variados. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Créditos variados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-DUB-003-E — Exploratório: Tipos na filmografia — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-DUB-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Créditos variados. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Tipos na filmografia.<br>**Contexto:** Obras dubladas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-DUB-004 — Personagem no card

### CT-RN-DUB-004-F — Feliz: Personagem no card

**Camada:** Feliz · **Regra:** `RN-DUB-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Crédito com personagem. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Card “como {personagem}”.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Nome do personagem no card/poster. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-DUB-004-N — Negativo: Personagem no card — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-DUB-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Crédito com personagem. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Crédito com personagem..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-DUB-004-E — Exploratório: Personagem no card — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-DUB-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Crédito com personagem. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Personagem no card.<br>**Contexto:** Papel dublado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-DUB-005 — Abrir detalhe

### CT-RN-DUB-005-F — Feliz: Abrir detalhe

**Camada:** Feliz · **Regra:** `RN-DUB-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item na grid. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Clicar anime dublado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Modal abre para o tipo correto (filme, série, anime, jogo). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-DUB-005-N — Negativo: Abrir detalhe — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-DUB-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Item na grid. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Item na grid..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-DUB-005-E — Exploratório: Abrir detalhe — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-DUB-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Item na grid. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Abrir detalhe.<br>**Contexto:** Clique na obra.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-DUB-006 — Voltar para busca

### CT-RN-DUB-006-F — Feliz: Voltar para busca

**Camada:** Feliz · **Regra:** `RN-DUB-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Veio da overlay de busca. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Busca → dublador → voltar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Voltar reabre busca; **não** reabre modal de filme como na página pessoa. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-DUB-006-N — Negativo: Voltar para busca — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-DUB-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Veio da overlay de busca. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Veio da overlay de busca..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-DUB-006-E — Exploratório: Voltar para busca — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-DUB-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Veio da overlay de busca. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Voltar para busca.<br>**Contexto:** Contexto de busca.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-EVT-001 — Ano padrão

### CT-RN-EVT-001-F — Feliz: Ano padrão

**Camada:** Feliz · **Regra:** `RN-EVT-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página aberta. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Abrir eventos em setembro/2026.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ano atual selecionado; opções = ano atual e cinco anteriores. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-001-N — Negativo: Ano padrão — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-EVT-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página aberta. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página aberta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-001-E — Exploratório: Ano padrão — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-EVT-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página aberta. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Ano padrão.<br>**Contexto:** Seletor no topo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-EVT-002 — Carregar resumo

### CT-RN-EVT-002-F — Feliz: Carregar resumo

**Camada:** Feliz · **Regra:** `RN-EVT-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano escolhido. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Trocar ano.<br>3. Simular erro.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Lista de eventos do ano; erro → estado de falha sem dados. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-002-N — Negativo: Carregar resumo — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-EVT-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Ano escolhido. |
| Passos | 1. Abrir o site e navegar até **Outras telas** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Lista de eventos do ano; erro → estado de falha sem dados. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-002-E — Exploratório: Carregar resumo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-EVT-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Ano escolhido. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Carregar resumo.<br>**Contexto:** Troca de ano.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-EVT-003 — Só eventos com jogos

### CT-RN-EVT-003-F — Feliz: Só eventos com jogos

**Camada:** Feliz · **Regra:** `RN-EVT-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano com eventos vazios e cheios. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Ano com evento “sem jogos” oculto.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Evento só aparece se tiver pelo menos um jogo associado. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-003-N — Negativo: Só eventos com jogos — sem a condição exigida

**Camada:** Negativo · **Regra:** `RN-EVT-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Ano com eventos vazios e cheios. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Usar usuário, dado ou estado **sem** a condição da regra (ex.: não logado se a regra exige login).<br>3. Repetir a mesma ação do caminho feliz.<br>4. Verificar que o elemento/comportamento **não** aparece ou permanece desabilitado. |
| Resultado_Esperado | O resultado feliz **não** ocorre; a tela permanece coerente (sem vazamento indevido). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-003-E — Exploratório: Só eventos com jogos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-EVT-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Ano com eventos vazios e cheios. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Só eventos com jogos.<br>**Contexto:** Relevância.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-EVT-004 — Contador

### CT-RN-EVT-004-F — Feliz: Contador

**Camada:** Feliz · **Regra:** `RN-EVT-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano com eventos relevantes. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Contar cards vs badge.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Número de eventos exibidos naquele ano. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-004-N — Negativo: Contador — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-EVT-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Ano com eventos relevantes. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Ano com eventos relevantes..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-004-E — Exploratório: Contador — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-EVT-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Ano com eventos relevantes. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Contador.<br>**Contexto:** Badge no cabeçalho da lista.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-EVT-005 — Loading e erro

### CT-RN-EVT-005-F — Feliz: Loading e erro

**Camada:** Feliz · **Regra:** `RN-EVT-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede lenta ou falha. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Throttle e offline.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Esqueletos durante carga; mensagem/CTA em falha. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-005-N — Negativo: Loading e erro — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-EVT-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Rede lenta ou falha. |
| Passos | 1. Abrir o site e navegar até **Outras telas** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Esqueletos durante carga; mensagem/CTA em falha. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-005-E — Exploratório: Loading e erro — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-EVT-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Rede lenta ou falha. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Loading e erro.<br>**Contexto:** Estados intermediários.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-EVT-006 — Ano vazio

### CT-RN-EVT-006-F — Feliz: Ano vazio

**Camada:** Feliz · **Regra:** `RN-EVT-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano sem jogos em eventos. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Selecionar ano antigo vazio.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Sugestão para escolher outro ano. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-006-N — Negativo: Ano vazio — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-EVT-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Ano sem jogos em eventos. |
| Passos | 1. Abrir o site e navegar até **Outras telas** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Sugestão para escolher outro ano. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-006-E — Exploratório: Ano vazio — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-EVT-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Ano sem jogos em eventos. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Ano vazio.<br>**Contexto:** Nenhum evento relevante.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-EVT-007 — Jogos por evento

### CT-RN-EVT-007-F — Feliz: Jogos por evento

**Camada:** Feliz · **Regra:** `RN-EVT-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Evento com jogos. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Expandir/rolar evento E3 etc.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cada evento mostra jogos em cards com interações do usuário. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-007-N — Negativo: Jogos por evento — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-EVT-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Evento com jogos. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Evento com jogos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-EVT-007-E — Exploratório: Jogos por evento — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-EVT-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Evento com jogos. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Jogos por evento.<br>**Contexto:** Card de evento.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PERS-001 — Carregar créditos

### CT-RN-PERS-001-F — Feliz: Carregar créditos

**Camada:** Feliz · **Regra:** `RN-PERS-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | ID válido. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Abrir ator conhecido.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Nome, foto, biografia e filmografia carregam. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-001-N — Negativo: Carregar créditos — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PERS-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: ID válido. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: ID válido..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-001-E — Exploratório: Carregar créditos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PERS-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | ID válido. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Carregar créditos.<br>**Contexto:** Página da pessoa.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PERS-002 — Erro e loading

### CT-RN-PERS-002-F — Feliz: Erro e loading

**Camada:** Feliz · **Regra:** `RN-PERS-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Pessoa inexistente. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. URL com id inválido.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mensagem de erro ou texto de carregamento. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-002-N — Negativo: Erro e loading — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-PERS-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Pessoa inexistente. |
| Passos | 1. Abrir o site e navegar até **Outras telas** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Mensagem de erro ou texto de carregamento. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-002-E — Exploratório: Erro e loading — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PERS-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Pessoa inexistente. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Erro e loading.<br>**Contexto:** ID inválido ou falha.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PERS-003 — Perfil resumido

### CT-RN-PERS-003-F — Feliz: Perfil resumido

**Camada:** Feliz · **Regra:** `RN-PERS-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Pessoa com foto e bio longa. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Bio longa → “ver mais” se existir ou clamp.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Nome, foto, biografia truncada (~6 linhas). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-003-N — Negativo: Perfil resumido — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PERS-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Pessoa com foto e bio longa. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Pessoa com foto e bio longa..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-003-E — Exploratório: Perfil resumido — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PERS-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Pessoa com foto e bio longa. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Perfil resumido.<br>**Contexto:** Dados básicos.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PERS-004 — Filmografia

### CT-RN-PERS-004-F — Feliz: Filmografia

**Camada:** Feliz · **Regra:** `RN-PERS-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Créditos filmes e séries. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Clicar filme vs série.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cards clicáveis; personagem opcional exibido. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-004-N — Negativo: Filmografia — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PERS-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Créditos filmes e séries. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Créditos filmes e séries..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-004-E — Exploratório: Filmografia — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PERS-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Créditos filmes e séries. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Filmografia.<br>**Contexto:** Grid de obras.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PERS-005 — Abrir detalhe da obra

### CT-RN-PERS-005-F — Feliz: Abrir detalhe da obra

**Camada:** Feliz · **Regra:** `RN-PERS-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item listado. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Clicar poster na grid.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Modal de detalhe abre para filme ou série. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-005-N — Negativo: Abrir detalhe da obra — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PERS-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Item listado. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Item listado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-005-E — Exploratório: Abrir detalhe da obra — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PERS-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Item listado. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Abrir detalhe da obra.<br>**Contexto:** Clique na filmografia.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PERS-006 — Voltar para busca

### CT-RN-PERS-006-F — Feliz: Voltar para busca

**Camada:** Feliz · **Regra:** `RN-PERS-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Fluxo busca → pessoa. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. RN-HEADER-021 / RN-BUSCA-021.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Voltar reabre busca quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-006-N — Negativo: Voltar para busca — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PERS-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Fluxo busca → pessoa. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Fluxo busca → pessoa..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-006-E — Exploratório: Voltar para busca — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PERS-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Fluxo busca → pessoa. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Voltar para busca.<br>**Contexto:** Veio da busca global.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PERS-007 — Voltar para modal

### CT-RN-PERS-007-F — Feliz: Voltar para modal

**Camada:** Feliz · **Regra:** `RN-PERS-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Retorno guardado pelo site. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Filme → elenco → voltar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Voltar reabre modal do filme/série anterior. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-007-N — Negativo: Voltar para modal — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PERS-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Retorno guardado pelo site. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Retorno guardado pelo site..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-007-E — Exploratório: Voltar para modal — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PERS-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Retorno guardado pelo site. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Voltar para modal.<br>**Contexto:** Veio do elenco de filme/série.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PERS-008 — Voltar genérico

### CT-RN-PERS-008-F — Feliz: Voltar genérico

**Camada:** Feliz · **Regra:** `RN-PERS-008` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Entrada direta na URL. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Abrir pessoa em nova aba → voltar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Botão voltar do browser ou fallback para home. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-008-N — Negativo: Voltar genérico — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PERS-008` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Entrada direta na URL. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Entrada direta na URL..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PERS-008-E — Exploratório: Voltar genérico — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PERS-008` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Entrada direta na URL. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Voltar genérico.<br>**Contexto:** Sem contexto salvo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PREM-001 — Modo destaque inicial

### CT-RN-PREM-001-F — Feliz: Modo destaque inicial

**Camada:** Feliz · **Regra:** `RN-PREM-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeira visita à página. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Abrir prêmios sem mexer filtros.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Blocos com destaques da **última edição** por categoria. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-001-N — Negativo: Modo destaque inicial — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PREM-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Primeira visita à página. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Primeira visita à página..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-001-E — Exploratório: Modo destaque inicial — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PREM-001` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Primeira visita à página. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Modo destaque inicial.<br>**Contexto:** Filtros no padrão “todos”.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PREM-002 — Modo filtrado

### CT-RN-PREM-002-F — Feliz: Modo filtrado

**Camada:** Feliz · **Regra:** `RN-PREM-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Tipo, prêmio ou ano ≠ todos. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Escolher ano específico.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Lista paginada (48 itens por página) substitui visão de destaques. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-002-N — Negativo: Modo filtrado — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PREM-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Tipo, prêmio ou ano ≠ todos. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Tipo, prêmio ou ano ≠ todos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-002-E — Exploratório: Modo filtrado — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PREM-002` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Tipo, prêmio ou ano ≠ todos. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Modo filtrado.<br>**Contexto:** Qualquer filtro alterado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PREM-003 — Opções de filtro

### CT-RN-PREM-003-F — Feliz: Opções de filtro

**Camada:** Feliz · **Regra:** `RN-PREM-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página montada. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Abrir dropdowns de filtro.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Listas de nomes de prêmios e anos disponíveis nos seletores. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-003-N — Negativo: Opções de filtro — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PREM-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página montada. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página montada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-003-E — Exploratório: Opções de filtro — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PREM-003` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página montada. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Opções de filtro.<br>**Contexto:** Carregamento da página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PREM-004 — Reset de página

### CT-RN-PREM-004-F — Feliz: Reset de página

**Camada:** Feliz · **Regra:** `RN-PREM-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Estava na página 2+. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Paginar → mudar ano.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Volta para página 1 ao alterar filtro. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-004-N — Negativo: Reset de página — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PREM-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Estava na página 2+. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Estava na página 2+..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-004-E — Exploratório: Reset de página — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PREM-004` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Estava na página 2+. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Reset de página.<br>**Contexto:** Mudança de filtro.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PREM-005 — Seções por tipo

### CT-RN-PREM-005-F — Feliz: Seções por tipo

**Camada:** Feliz · **Regra:** `RN-PREM-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro tipo = todos. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Filtrar só animes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Até quatro blocos: filmes, séries, animes, jogos; filtrar tipo reduz a um bloco. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-005-N — Negativo: Seções por tipo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PREM-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro tipo = todos. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtro tipo = todos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-005-E — Exploratório: Seções por tipo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PREM-005` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro tipo = todos. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Seções por tipo.<br>**Contexto:** Modo destaque.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PREM-006 — Ver todos da premiação

### CT-RN-PREM-006-F — Feliz: Ver todos da premiação

**Camada:** Feliz · **Regra:** `RN-PREM-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card de destaque visível. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Clicar “ver todos” em um destaque.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Aplica filtros com nome/ano daquele prêmio e tipo da seção. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-006-N — Negativo: Ver todos da premiação — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PREM-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Card de destaque visível. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Card de destaque visível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-006-E — Exploratório: Ver todos da premiação — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PREM-006` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Card de destaque visível. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Ver todos da premiação.<br>**Contexto:** Botão em destaque.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PREM-007 — Paginação

### CT-RN-PREM-007-F — Feliz: Paginação

**Camada:** Feliz · **Regra:** `RN-PREM-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Muitos resultados. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Navegar páginas.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Anterior/próxima desabilitadas nos limites; texto “Página X de Y”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-007-N — Negativo: Paginação — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PREM-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Muitos resultados. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Muitos resultados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-007-E — Exploratório: Paginação — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PREM-007` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Muitos resultados. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Paginação.<br>**Contexto:** Modo filtrado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PREM-008 — Cards interativos

### CT-RN-PREM-008-F — Feliz: Cards interativos

**Camada:** Feliz · **Regra:** `RN-PREM-008` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado/anônimo. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Favoritar indicado logado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cards com mesmas ações de favorito/lista das outras páginas. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-008-N — Negativo: Cards interativos — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PREM-008` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado/anônimo. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado/anônimo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-008-E — Exploratório: Cards interativos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PREM-008` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado/anônimo. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Cards interativos.<br>**Contexto:** Obras indicadas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-PREM-009 — Nenhum resultado

### CT-RN-PREM-009-F — Feliz: Nenhum resultado

**Camada:** Feliz · **Regra:** `RN-PREM-009` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Zero prêmios no critério. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Ano + prêmio sem combinação.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mensagem pedindo ajustar filtros. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-009-N — Negativo: Nenhum resultado — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PREM-009` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Zero prêmios no critério. |
| Passos | 1. Abrir o site e navegar até **Outras telas**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Zero prêmios no critério..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PREM-009-E — Exploratório: Nenhum resultado — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PREM-009` · **Tela:** Outras telas

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Zero prêmios no critério. |
| Passos | **Charter (15 min)** — área: **Outras telas** · regra: Nenhum resultado.<br>**Contexto:** Filtro impossível.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |
