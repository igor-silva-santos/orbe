# Camadas — Jogos

**Inventário:** `05-JOGOS.md` · **Cenários:** 87

---

## RN-JOGOS-001 — Conteúdo na abertura

### CT-RN-JOGOS-001-F — Feliz: Conteúdo na abertura

**Camada:** Feliz · **Regra:** `RN-JOGOS-001` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo OK. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Abrir Jogos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cards e selects visíveis. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-001-N — Negativo: Conteúdo na abertura — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-001` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo OK. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Catálogo OK..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-001-E — Exploratório: Conteúdo na abertura — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-001` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo OK. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Conteúdo na abertura.<br>**Contexto:** Grade e filtros já vêm na abertura.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-002 — Falha na abertura

### CT-RN-JOGOS-002-F — Feliz: Falha na abertura

**Camada:** Feliz · **Regra:** `RN-JOGOS-002` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo down. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Simular falha inicial.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grade vazia; filtros vazios possíveis. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-002-N — Negativo: Falha na abertura — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-JOGOS-002` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo down. |
| Passos | 1. Abrir o site e navegar até **Jogos** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Grade vazia; filtros vazios possíveis. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-002-E — Exploratório: Falha na abertura — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-002` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo down. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Falha na abertura.<br>**Contexto:** Indisponibilidade não quebra a página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-003 — Sem recarga duplicada na abertura

### CT-RN-JOGOS-003-F — Feliz: Sem recarga duplicada na abertura

**Camada:** Feliz · **Regra:** `RN-JOGOS-003` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeira visita OK. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Abrir e aguardar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Estável até mudar filtro. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-003-N — Negativo: Sem recarga duplicada na abertura — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-003` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Primeira visita OK. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Primeira visita OK..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-003-E — Exploratório: Sem recarga duplicada na abertura — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-003` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Primeira visita OK. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Sem recarga duplicada na abertura.<br>**Contexto:** Abrir Jogos não dispara loading extra imediato após a primeira pintura.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-004 — Filtros aplicados

### CT-RN-JOGOS-004-F — Feliz: Filtros aplicados

**Camada:** Feliz · **Regra:** `RN-JOGOS-004` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Valores específicos selecionados. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Alterar cada filtro.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Lista coerente (ex.: só PlayStation). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-004-N — Negativo: Filtros aplicados — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-004` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Valores específicos selecionados. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Valores específicos selecionados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-004-E — Exploratório: Filtros aplicados — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-004` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Valores específicos selecionados. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Filtros aplicados.<br>**Contexto:** Gênero, plataforma, modo de jogo, ano e mês restringem a grade.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-005 — Mês sem ano explícito

### CT-RN-JOGOS-005-F — Feliz: Mês sem ano explícito

**Camada:** Feliz · **Regra:** `RN-JOGOS-005` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Março + todos os anos. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Filtrar mês atual.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Jogos lançados em março do ano atual. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-005-N — Negativo: Mês sem ano explícito — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-005` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Março + todos os anos. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Março + todos os anos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-005-E — Exploratório: Mês sem ano explícito — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-005` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Março + todos os anos. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Mês sem ano explícito.<br>**Contexto:** Só mês selecionado usa o **ano corrente** para lançamentos daquele mês.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-006 — Mês com ano

### CT-RN-JOGOS-006-F — Feliz: Mês com ano

**Camada:** Feliz · **Regra:** `RN-JOGOS-006` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Junho 2023. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Combinar mês e ano.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só lançamentos de jun/2023. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-006-N — Negativo: Mês com ano — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-006` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Junho 2023. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Junho 2023..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-006-E — Exploratório: Mês com ano — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-006` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Junho 2023. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Mês com ano.<br>**Contexto:** Mês + ano restringem ao intervalo daquele mês/ano.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-007 — Ordem alfabética

### CT-RN-JOGOS-007-F — Feliz: Ordem alfabética

**Camada:** Feliz · **Regra:** `RN-JOGOS-007` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtros em todos. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Ler primeiros títulos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | A–Z nos primeiros cards. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-007-N — Negativo: Ordem alfabética — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-007` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtros em todos. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtros em todos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-007-E — Exploratório: Ordem alfabética — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-007` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtros em todos. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Ordem alfabética.<br>**Contexto:** Sem controle “populares” na UI, ordem por nome do jogo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-008 — Popularidade (catálogo interno)

### CT-RN-JOGOS-008-F — Feliz: Popularidade (catálogo interno)

**Camada:** Feliz · **Regra:** `RN-JOGOS-008` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | — |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Confirmar ausência de atalho Populares.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Usuário só vê ordem alfabética aqui. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-008-N — Negativo: Popularidade (catálogo interno) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-008` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: — |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: —.<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-008-E — Exploratório: Popularidade (catálogo interno) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-008` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | — |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Popularidade (catálogo interno).<br>**Contexto:** Modo “populares” existe no catálogo, **sem** botão nesta página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-009 — Listagem mais permissiva que destaques

### CT-RN-JOGOS-009-F — Feliz: Listagem mais permissiva que destaques

**Camada:** Feliz · **Regra:** `RN-JOGOS-009` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo obscuro. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Comparar mesma busca.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Visível em Jogos; ausente em Em Alta. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-009-N — Negativo: Listagem mais permissiva que destaques — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-JOGOS-009` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogo obscuro. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-009-E — Exploratório: Listagem mais permissiva que destaques — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-009` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogo obscuro. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Listagem mais permissiva que destaques.<br>**Contexto:** Jogos “fracos” (pouco hype/nota) podem aparecer em Jogos mas **não** em **Em Alta** ou algumas faixas da home.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-010 — Lote inicial na grade

### CT-RN-JOGOS-010-F — Feliz: Lote inicial na grade

**Camada:** Feliz · **Regra:** `RN-JOGOS-010` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo grande. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Contar cards vs contador.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Até ~48 cards; contador segue cards visíveis (como Animes). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-010-N — Negativo: Lote inicial na grade — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-010` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo grande. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Catálogo grande..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-010-E — Exploratório: Lote inicial na grade — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-010` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo grande. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Lote inicial na grade.<br>**Contexto:** ~dezenas de cards visíveis; sem “carregar mais”.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-011 — Gaveta O que vem aí

### CT-RN-JOGOS-011-F — Feliz: Gaveta O que vem aí

**Camada:** Feliz · **Regra:** `RN-JOGOS-011` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resumo com **próximos jogos**. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Ambiente com jogos futuros.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seção **O que vem aí** acima dos filtros. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-011-N — Negativo: Gaveta O que vem aí — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-011` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Resumo com **próximos jogos**. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Resumo com **próximos jogos**..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-011-E — Exploratório: Gaveta O que vem aí — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-011` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Resumo com **próximos jogos**. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Gaveta O que vem aí.<br>**Contexto:** Próximos lançamentos de jogos em carrossel.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-012 — Gaveta Eventos recentes

### CT-RN-JOGOS-012-F — Feliz: Gaveta Eventos recentes

**Camada:** Feliz · **Regra:** `RN-JOGOS-012` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resumo com **eventos recentes**. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Ambiente com eventos no resumo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seção **Eventos recentes** com cards de evento empilhados. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-012-N — Negativo: Gaveta Eventos recentes — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-012` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Resumo com **eventos recentes**. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Resumo com **eventos recentes**..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-012-E — Exploratório: Gaveta Eventos recentes — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-012` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Resumo com **eventos recentes**. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Gaveta Eventos recentes.<br>**Contexto:** Destaques de eventos de games (ex.: State of Play, Nintendo Direct).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-013 — Loading, contador e vazio

### CT-RN-JOGOS-013-F — Feliz: Loading, contador e vazio

**Camada:** Feliz · **Regra:** `RN-JOGOS-013` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro vazio ou OK. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Filtro impossível e amplo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Comportamento igual padrão Animes. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-013-N — Negativo: Loading, contador e vazio — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-JOGOS-013` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro vazio ou OK. |
| Passos | 1. Abrir o site e navegar até **Jogos** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Comportamento igual padrão Animes. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-013-E — Exploratório: Loading, contador e vazio — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-013` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro vazio ou OK. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Loading, contador e vazio.<br>**Contexto:** Spinner ao filtrar; contador = quantidade na grade; empty **Nenhum jogo encontrado**.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-014 — Atualização após sync

### CT-RN-JOGOS-014-F — Feliz: Atualização após sync

**Camada:** Feliz · **Regra:** `RN-JOGOS-014` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sync em andamento. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Manter Jogos aberta.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cards mudam sem F5. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-014-N — Negativo: Atualização após sync — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-014` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Sync em andamento. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Sync em andamento..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-014-E — Exploratório: Atualização após sync — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-014` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Sync em andamento. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Atualização após sync.<br>**Contexto:** Sync pode atualizar grade com página aberta.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-015 — Opções de filtro

### CT-RN-JOGOS-015-F — Feliz: Opções de filtro

**Camada:** Feliz · **Regra:** `RN-JOGOS-015` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo variado. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Abrir cada select.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Menus populados coerentemente. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-015-N — Negativo: Opções de filtro — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-015` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo variado. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Catálogo variado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-015-E — Exploratório: Opções de filtro — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-015` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo variado. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Opções de filtro.<br>**Contexto:** Gêneros, plataformas, modos e anos refletem jogos cadastrados; anos decrescentes.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-016 — Preço Steam no detalhe/card

### CT-RN-JOGOS-016-F — Feliz: Preço Steam no detalhe/card

**Camada:** Feliz · **Regra:** `RN-JOGOS-016` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo com Steam cadastrado. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Abrir jogo Steam conhecido.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Preço BRL ou indicador de carregamento no detalhe/card conforme produto. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-016-N — Negativo: Preço Steam no detalhe/card — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-016` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogo com Steam cadastrado. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Jogo com Steam cadastrado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-016-E — Exploratório: Preço Steam no detalhe/card — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-016` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogo com Steam cadastrado. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Preço Steam no detalhe/card.<br>**Contexto:** Quando o jogo tem página na Steam, preço em reais pode aparecer após carregar (não instantâneo na grade).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-017 — Redirect para Promoções

### CT-RN-JOGOS-017-F — Feliz: Redirect para Promoções

**Camada:** Feliz · **Regra:** `RN-JOGOS-017` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário acessa **/jogos-em-alta**. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Digitar URL legada.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Navegador vai para **Promoções**, aba **Em Alta**. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-017-N — Negativo: Redirect para Promoções — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-017` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário acessa **/jogos-em-alta**. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário acessa **/jogos-em-alta**..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-017-E — Exploratório: Redirect para Promoções — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-017` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário acessa **/jogos-em-alta**. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Redirect para Promoções.<br>**Contexto:** URL antiga não tem conteúdo próprio.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-018 — Menu do site

### CT-RN-JOGOS-018-F — Feliz: Menu do site

**Camada:** Feliz · **Regra:** `RN-JOGOS-018` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Menu visível. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Clicar item de menu.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Clique abre Promoções na aba Em Alta. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-018-N — Negativo: Menu do site — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-018` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Menu visível. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Menu visível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-018-E — Exploratório: Menu do site — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-018` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Menu visível. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Menu do site.<br>**Contexto:** Atalho **Jogos em Alta** no cabeçalho/rodapé aponta para o mesmo destino.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-019 — Quem entra no ranking

### CT-RN-JOGOS-019-F — Feliz: Quem entra no ranking

**Camada:** Feliz · **Regra:** `RN-JOGOS-019` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo lançado há meses sem destaque. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Comparar jogo antigo vs lançamento recente.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente do **Top da Semana**. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-019-N — Negativo: Quem entra no ranking — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-JOGOS-019` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogo lançado há meses sem destaque. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-019-E — Exploratório: Quem entra no ranking — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-019` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogo lançado há meses sem destaque. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Quem entra no ranking.<br>**Contexto:** Destaques semanais priorizam jogos recentes ou com hype/nota mínima; jogos antigos sem interesse ficam de fora.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-020 — Top da Semana

### CT-RN-JOGOS-020-F — Feliz: Top da Semana

**Camada:** Feliz · **Regra:** `RN-JOGOS-020` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Pool de destaques não vazio. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Contar cards e badges.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seção **Top da Semana** aberta por padrão. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-020-N — Negativo: Top da Semana — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-JOGOS-020` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Pool de destaques não vazio. |
| Passos | 1. Abrir o site e navegar até **Jogos** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Seção **Top da Semana** aberta por padrão. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-020-E — Exploratório: Top da Semana — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-020` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Pool de destaques não vazio. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Top da Semana.<br>**Contexto:** Até **12** jogos em grade; os **três primeiros** com badge **#1**, **#2**, **#3**.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-021 — Mais jogados na Steam

### CT-RN-JOGOS-021-F — Feliz: Mais jogados na Steam

**Camada:** Feliz · **Regra:** `RN-JOGOS-021` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogos Steam com pico de jogadores. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Ambiente com dados Steam.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seção **Mais jogados na Steam** com carrossel. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-021-N — Negativo: Mais jogados na Steam — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-021` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogos Steam com pico de jogadores. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Jogos Steam com pico de jogadores..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-021-E — Exploratório: Mais jogados na Steam — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-021` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogos Steam com pico de jogadores. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Mais jogados na Steam.<br>**Contexto:** Faixa horizontal só se houver dados de jogadores simultâneos.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-022 — Promoções Steam (dados)

### CT-RN-JOGOS-022-F — Feliz: Promoções Steam (dados)

**Camada:** Feliz · **Regra:** `RN-JOGOS-022` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogos com desconto alto na Steam. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Comparar jogo em promo Steam entre abas.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Verificar ofertas na aba **Promoções** / carrossel catálogo Steam. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-022-N — Negativo: Promoções Steam (dados) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-022` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogos com desconto alto na Steam. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Jogos com desconto alto na Steam..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-022-E — Exploratório: Promoções Steam (dados) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-022` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogos com desconto alto na Steam. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Promoções Steam (dados).<br>**Contexto:** Descontos Steam fortes entram no pacote de dados de Em Alta; **não** há seção separada dedicada na UI atual (ofertas Steam aparecem principalmente na aba Promoções).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-023 — Por plataforma

### CT-RN-JOGOS-023-F — Feliz: Por plataforma

**Camada:** Feliz · **Regra:** `RN-JOGOS-023` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogos multiplataforma. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Ler seções por plataforma.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Switch só no bloco Nintendo, etc. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-023-N — Negativo: Por plataforma — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-JOGOS-023` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogos multiplataforma. |
| Passos | 1. Abrir o site e navegar até **Jogos** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Switch só no bloco Nintendo, etc. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-023-E — Exploratório: Por plataforma — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-023` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogos multiplataforma. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Por plataforma.<br>**Contexto:** Blocos PC → Xbox → PlayStation → Nintendo; até **8** jogos por bloco; bloco vazio mostra mensagem amigável.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-024 — Por modo de jogo

### CT-RN-JOGOS-024-F — Feliz: Por modo de jogo

**Camada:** Feliz · **Regra:** `RN-JOGOS-024` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogos co-op. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Achar jogo co-op conhecido.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Título listado em **Cooperativo** quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-024-N — Negativo: Por modo de jogo — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-JOGOS-024` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogos co-op. |
| Passos | 1. Abrir o site e navegar até **Jogos** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Título listado em **Cooperativo** quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-024-E — Exploratório: Por modo de jogo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-024` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogos co-op. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Por modo de jogo.<br>**Contexto:** Multijogador, cooperativo, um jogador — até 8 jogos; bloco vazio com texto explicativo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-025 — Por categoria (gênero)

### CT-RN-JOGOS-025-F — Feliz: Por categoria (gênero)

**Camada:** Feliz · **Regra:** `RN-JOGOS-025` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gênero com 1 só jogo. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Contar seções de gênero.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Gênero singleton **não** vira seção. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-025-N — Negativo: Por categoria (gênero) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-025` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Gênero com 1 só jogo. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Gênero com 1 só jogo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-025-E — Exploratório: Por categoria (gênero) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-025` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Gênero com 1 só jogo. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Por categoria (gênero).<br>**Contexto:** Até **6** gêneros com **pelo menos 2** jogos; até 8 jogos por gênero.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-026 — Semana e métrica (modo completo)

### CT-RN-JOGOS-026-F — Feliz: Semana e métrica (modo completo)

**Camada:** Feliz · **Regra:** `RN-JOGOS-026` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Abrir Em Alta em contexto que mostra cabeçalho longo (se existir rota dedicada futura). |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Abrir `/promocoes?tab=em-alta`.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Na aba Promoções (**compact**), semana/métrica longa **oculta**; banner de promoções visível. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-026-N — Negativo: Semana e métrica (modo completo) — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-JOGOS-026` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Abrir Em Alta em contexto que mostra cabeçalho longo (se existir rota dedicada futura). |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-026-E — Exploratório: Semana e métrica (modo completo) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-026` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Abrir Em Alta em contexto que mostra cabeçalho longo (se existir rota dedicada futura). |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Semana e métrica (modo completo).<br>**Contexto:** Fora do modo compacto da aba Promoções, texto indica semana corrente e fontes (Steam + IGDB ou só IGDB).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-027 — Modo compacto na aba Promoções

### CT-RN-JOGOS-027-F — Feliz: Modo compacto na aba Promoções

**Camada:** Feliz · **Regra:** `RN-JOGOS-027` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba **Em Alta** em Promoções. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Abrir aba Em Alta.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Banner “Ofertas ao vivo…” + link **Ver promoções ao vivo**; grade compacta. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-027-N — Negativo: Modo compacto na aba Promoções — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-027` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Aba **Em Alta** em Promoções. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Aba **Em Alta** em Promoções..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-027-E — Exploratório: Modo compacto na aba Promoções — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-027` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Aba **Em Alta** em Promoções. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Modo compacto na aba Promoções.<br>**Contexto:** Dentro de Promoções, Em Alta usa layout resumido: skeleton de 6 cards, banner para **Promoções ao vivo**, sem bloco grande de semana/métrica.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-028 — Erro ao carregar

### CT-RN-JOGOS-028-F — Feliz: Erro ao carregar

**Camada:** Feliz · **Regra:** `RN-JOGOS-028` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo/indisponibilidade simulada. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Simular falha.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mensagem **Não foi possível carregar os jogos em alta.** |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-028-N — Negativo: Erro ao carregar — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-JOGOS-028` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo/indisponibilidade simulada. |
| Passos | 1. Abrir o site e navegar até **Jogos** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Mensagem **Não foi possível carregar os jogos em alta.** |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-028-E — Exploratório: Erro ao carregar — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-028` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo/indisponibilidade simulada. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Erro ao carregar.<br>**Contexto:** Falha ao montar Em Alta.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-JOGOS-029 — Conteúdo estável por sessão

### CT-RN-JOGOS-029-F — Feliz: Conteúdo estável por sessão

**Camada:** Feliz · **Regra:** `RN-JOGOS-029` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba aberta. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Ficar na aba.<br>3. Depois F5.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mesmos blocos durante navegação curta; recarregar pode atualizar. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-029-N — Negativo: Conteúdo estável por sessão — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-JOGOS-029` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Aba aberta. |
| Passos | 1. Abrir o site e navegar até **Jogos**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Aba aberta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-JOGOS-029-E — Exploratório: Conteúdo estável por sessão — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-JOGOS-029` · **Tela:** Jogos

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Aba aberta. |
| Passos | **Charter (15 min)** — área: **Jogos** · regra: Conteúdo estável por sessão.<br>**Contexto:** Lista Em Alta não muda a cada segundo; atualiza ao reabrir aba/página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |
