# Camadas — Hoje

**Inventário:** `07-HOJE.md` · **Cenários:** 72

---

## RN-HOJE-001 — Conteúdo após abrir a página

### CT-RN-HOJE-001-F — Feliz: Conteúdo após abrir a página

**Camada:** Feliz · **Regra:** `RN-HOJE-001` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Acesso normal à página Hoje. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Abrir Hoje com rede normal.<br>3. Observar transição skeleton → conteúdo.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Breve estado de carregamento (esqueletos/cards cinza) e, em seguida, faixas preenchidas ou mensagens de vazio/erro. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-001-N — Negativo: Conteúdo após abrir a página — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-HOJE-001` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Acesso normal à página Hoje. |
| Passos | 1. Abrir o site e navegar até **Hoje** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Breve estado de carregamento (esqueletos/cards cinza) e, em seguida, faixas preenchidas ou mensagens de vazio/erro. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-001-E — Exploratório: Conteúdo após abrir a página — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-001` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Acesso normal à página Hoje. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Conteúdo após abrir a página.<br>**Contexto:** Os cards não vêm “prontos” no primeiro instante; a página busca os destaques ao abrir.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-002 — Data do dia

### CT-RN-HOJE-002-F — Feliz: Data do dia

**Camada:** Feliz · **Regra:** `RN-HOJE-002` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página carregada com sucesso. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Comparar data exibida com o relógio do sistema.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Linha com ícone de calendário e data por extenso (pt-BR), coerente com o dia de teste. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-002-N — Negativo: Data do dia — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-002` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página carregada com sucesso. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página carregada com sucesso..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-002-E — Exploratório: Data do dia — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-002` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página carregada com sucesso. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Data do dia.<br>**Contexto:** A página mostra a data atual em português, junto ao título.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-003 — Ligar/desligar blocos

### CT-RN-HOJE-003-F — Feliz: Ligar/desligar blocos

**Camada:** Feliz · **Regra:** `RN-HOJE-003` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mesmo navegador/dispositivo. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Desmarcar “Em cartaz nos cinemas”.<br>3. F5 → faixa não aparece.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Interruptores ou checkboxes por seção; ao recarregar, as seções desmarcadas continuam ocultas. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-003-N — Negativo: Ligar/desligar blocos — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOJE-003` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Mesmo navegador/dispositivo. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-003-E — Exploratório: Ligar/desligar blocos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-003` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Mesmo navegador/dispositivo. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Ligar/desligar blocos.<br>**Contexto:** O usuário escolhe quais faixas aparecem; a escolha fica salva no navegador.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-004 — Pelo menos uma seção

### CT-RN-HOJE-004-F — Feliz: Pelo menos uma seção

**Camada:** Feliz · **Regra:** `RN-HOJE-004` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resta apenas uma seção marcada. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Desmarcar cinco seções.<br>3. Na sexta tentativa, a última permanece ligada.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Tentativa de desmarcar a última é ignorada; continua uma seção ativa. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-004-N — Negativo: Pelo menos uma seção — sem a condição exigida

**Camada:** Negativo · **Regra:** `RN-HOJE-004` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Resta apenas uma seção marcada. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Usar usuário, dado ou estado **sem** a condição da regra (ex.: não logado se a regra exige login).<br>3. Repetir a mesma ação do caminho feliz.<br>4. Verificar que o elemento/comportamento **não** aparece ou permanece desabilitado. |
| Resultado_Esperado | O resultado feliz **não** ocorre; a tela permanece coerente (sem vazamento indevido). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-004-E — Exploratório: Pelo menos uma seção — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-004` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Resta apenas uma seção marcada. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Pelo menos uma seção.<br>**Contexto:** Não é possível desativar todas as seções de uma vez.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-005 — Ordem fixa das faixas

### CT-RN-HOJE-005-F — Feliz: Ordem fixa das faixas

**Camada:** Feliz · **Regra:** `RN-HOJE-005` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias seções habilitadas com conteúdo. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Habilitar todas.<br>3. Rolar e conferir ordem dos títulos das faixas.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Sempre, de cima para baixo: cinema → estreias da semana → filmes no streaming → séries no streaming → animes em exibição → jogos em destaque (só as habilitadas e com itens). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-005-N — Negativo: Ordem fixa das faixas — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-005` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Várias seções habilitadas com conteúdo. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Várias seções habilitadas com conteúdo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-005-E — Exploratório: Ordem fixa das faixas — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-005` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Várias seções habilitadas com conteúdo. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Ordem fixa das faixas.<br>**Contexto:** A ordem vertical dos blocos não muda conforme preferências.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-006 — Faixa sem itens some

### CT-RN-HOJE-006-F — Feliz: Faixa sem itens some

**Camada:** Feliz · **Regra:** `RN-HOJE-006` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Seção habilitada sem destaques naquele dia. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Ambiente ou dia em que uma faixa específica vem vazia.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Nenhum título de faixa vazio; bloco inteiro ausente. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-006-N — Negativo: Faixa sem itens some — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-HOJE-006` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Seção habilitada sem destaques naquele dia. |
| Passos | 1. Abrir o site e navegar até **Hoje** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Nenhum título de faixa vazio; bloco inteiro ausente. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-006-E — Exploratório: Faixa sem itens some — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-006` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Seção habilitada sem destaques naquele dia. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Faixa sem itens some.<br>**Contexto:** Seção ligada mas sem títulos para mostrar não ocupa espaço.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-007 — Nada para mostrar

### CT-RN-HOJE-007-F — Feliz: Nada para mostrar

**Camada:** Feliz · **Regra:** `RN-HOJE-007` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtros de seção deixam zero cards visíveis. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Desmarcar seções que tinham conteúdo até só restarem vazias ou desligar todas as que exibem cards.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mensagem “Nenhum destaque disponível para os filtros selecionados.” |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-007-N — Negativo: Nada para mostrar — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-007` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtros de seção deixam zero cards visíveis. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtros de seção deixam zero cards visíveis..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-007-E — Exploratório: Nada para mostrar — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-007` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtros de seção deixam zero cards visíveis. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Nada para mostrar.<br>**Contexto:** Todas as faixas visíveis estão vazias, ou o usuário desligou tudo que tinha conteúdo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-008 — Erro ao carregar

### CT-RN-HOJE-008-F — Feliz: Erro ao carregar

**Camada:** Feliz · **Regra:** `RN-HOJE-008` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Simular falha de rede ou indisponibilidade do serviço. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Bloquear rede após abrir a página ou usar ambiente offline.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mensagem do tipo “Não foi possível carregar o conteúdo de hoje.” |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-008-N — Negativo: Erro ao carregar — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-HOJE-008` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Simular falha de rede ou indisponibilidade do serviço. |
| Passos | 1. Abrir o site e navegar até **Hoje** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Mensagem do tipo “Não foi possível carregar o conteúdo de hoje.” |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-008-E — Exploratório: Erro ao carregar — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-008` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Simular falha de rede ou indisponibilidade do serviço. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Erro ao carregar.<br>**Contexto:** Se os destaques não puderem ser obtidos.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-009 — Esqueletos no carregamento

### CT-RN-HOJE-009-F — Feliz: Esqueletos no carregamento

**Camada:** Feliz · **Regra:** `RN-HOJE-009` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeiro acesso ou rede lenta. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Throttle de rede e recarregar Hoje.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grade com vários placeholders de card (cerca de oito). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-009-N — Negativo: Esqueletos no carregamento — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-009` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Primeiro acesso ou rede lenta. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Primeiro acesso ou rede lenta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-009-E — Exploratório: Esqueletos no carregamento — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-009` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Primeiro acesso ou rede lenta. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Esqueletos no carregamento.<br>**Contexto:** Enquanto aguarda os dados.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-010 — Cards iguais ao resto do site

### CT-RN-HOJE-010-F — Feliz: Cards iguais ao resto do site

**Camada:** Feliz · **Regra:** `RN-HOJE-010` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário logado; itens visíveis em uma faixa. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Logar.<br>3. Favoritar um filme em “Em cartaz” e conferir em outra tela.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Favoritar, listas e demais ações do card funcionam como em Filmes/Séries/Animes/Jogos. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-010-N — Negativo: Cards iguais ao resto do site — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-010` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário logado; itens visíveis em uma faixa. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário logado; itens visíveis em uma faixa..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-010-E — Exploratório: Cards iguais ao resto do site — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-010` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário logado; itens visíveis em uma faixa. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Cards iguais ao resto do site.<br>**Contexto:** Interações nos cards seguem o mesmo padrão das listagens.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-011 — Janela “esta semana”

### CT-RN-HOJE-011-F — Feliz: Janela “esta semana”

**Camada:** Feliz · **Regra:** `RN-HOJE-011` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Títulos com datas conhecidas (estreia ou episódio). |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Comparar filme estreando há 8 dias vs filme estreando ontem na faixa de streaming.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Obra lançada há mais de uma semana tende a não liderar o pool “esta semana”; pode aparecer só se faltar conteúdo recente. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-011-N — Negativo: Janela “esta semana” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-011` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Títulos com datas conhecidas (estreia ou episódio). |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Títulos com datas conhecidas (estreia ou episódio)..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-011-E — Exploratório: Janela “esta semana” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-011` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Títulos com datas conhecidas (estreia ou episódio). |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Janela “esta semana”.<br>**Contexto:** Destaques de streaming e animes priorizam o que teve lançamento ou episódio nos **últimos 7 dias**.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-012 — Em cartaz nos cinemas

### CT-RN-HOJE-012-F — Feliz: Em cartaz nos cinemas

**Camada:** Feliz · **Regra:** `RN-HOJE-012` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo com filme em cartaz e filme só em streaming. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Contar cards na faixa cinema.<br>3. Validar que só entram “em cartaz”.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Até **12** filmes; foco em popularidade entre os em cartaz; obras de baixa qualidade editorial ou mal localizadas tendem a ficar de fora. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-012-N — Negativo: Em cartaz nos cinemas — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOJE-012` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo com filme em cartaz e filme só em streaming. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-012-E — Exploratório: Em cartaz nos cinemas — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-012` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo com filme em cartaz e filme só em streaming. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Em cartaz nos cinemas.<br>**Contexto:** Filmes marcados como em exibição comercial no momento.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-013 — Estreias da semana

### CT-RN-HOJE-013-F — Feliz: Estreias da semana

**Camada:** Feliz · **Regra:** `RN-HOJE-013` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com estreia BR na semana vs fora da semana. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Cruzar com calendário de estreias BR.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Até **24** títulos; cards de estreia da semana podem exibir etiqueta de destaque de estreia. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-013-N — Negativo: Estreias da semana — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOJE-013` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme com estreia BR na semana vs fora da semana. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-013-E — Exploratório: Estreias da semana — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-013` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme com estreia BR na semana vs fora da semana. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Estreias da semana.<br>**Contexto:** Filmes estreando na **semana civil brasileira** corrente.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-014 — Etiquetas em filmes

### CT-RN-HOJE-014-F — Feliz: Etiquetas em filmes

**Camada:** Feliz · **Regra:** `RN-HOJE-014` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme estreando na semana vs filme futuro aguardado. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Inspecionar pills nos cards de estreias e estreias futuras.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Estreia da semana tem prioridade sobre “mais esperado” no mesmo card. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-014-N — Negativo: Etiquetas em filmes — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-014` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme estreando na semana vs filme futuro aguardado. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme estreando na semana vs filme futuro aguardado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-014-E — Exploratório: Etiquetas em filmes — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-014` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme estreando na semana vs filme futuro aguardado. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Etiquetas em filmes.<br>**Contexto:** Alguns filmes ganham destaque visual (estreia da semana ou “mais esperado”).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-015 — Filmes no streaming esta semana

### CT-RN-HOJE-015-F — Feliz: Filmes no streaming esta semana

**Camada:** Feliz · **Regra:** `RN-HOJE-015` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Pool semanal com menos de 12 títulos. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Dia com poucos lançamentos streaming.<br>3. Ver se lista completa até 12.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Até **12** filmes; se faltarem lançamentos recentes, entram títulos populares em streaming para completar, sem duplicar o mesmo filme. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-015-N — Negativo: Filmes no streaming esta semana — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-015` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Pool semanal com menos de 12 títulos. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Pool semanal com menos de 12 títulos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-015-E — Exploratório: Filmes no streaming esta semana — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-015` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Pool semanal com menos de 12 títulos. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Filmes no streaming esta semana.<br>**Contexto:** Filmes disponíveis em streaming, não em cartaz, com preferência por lançamentos na última semana.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-016 — Séries no streaming esta semana

### CT-RN-HOJE-016-F — Feliz: Séries no streaming esta semana

**Camada:** Feliz · **Regra:** `RN-HOJE-016` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série sem episódio na semana mas popular. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Série semanal com ep ontem vs série parada há meses.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Até **12** séries; mescla recentes + fallback. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-016-N — Negativo: Séries no streaming esta semana — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-016` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série sem episódio na semana mas popular. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série sem episódio na semana mas popular..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-016-E — Exploratório: Séries no streaming esta semana — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-016` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série sem episódio na semana mas popular. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Séries no streaming esta semana.<br>**Contexto:** Séries com episódio ou estreia recente na última semana, ou fallback por popularidade.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-017 — Animes em exibição (prioridade)

### CT-RN-HOJE-017-F — Feliz: Animes em exibição (prioridade)

**Camada:** Feliz · **Regra:** `RN-HOJE-017` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime em exibição sem ep na semana. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Anime com ep recente vs anime em hiato.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Preferência por quem teve episódio nos últimos 7 dias; ordenação por popularidade e nota. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-017-N — Negativo: Animes em exibição (prioridade) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-017` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anime em exibição sem ep na semana. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Anime em exibição sem ep na semana..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-017-E — Exploratório: Animes em exibição (prioridade) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-017` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anime em exibição sem ep na semana. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Animes em exibição (prioridade).<br>**Contexto:** Animes **em lançamento** que exibiram episódio na última semana.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-018 — Animes — completar lista

### CT-RN-HOJE-018-F — Feliz: Animes — completar lista

**Camada:** Feliz · **Regra:** `RN-HOJE-018` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Poucos episódios recentes no catálogo. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Conferir contagem máxima em dia “fraco” de episódios.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Até **12** animes no total, sem repetir o mesmo título. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-018-N — Negativo: Animes — completar lista — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-018` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Poucos episódios recentes no catálogo. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Poucos episódios recentes no catálogo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-018-E — Exploratório: Animes — completar lista — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-018` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Poucos episódios recentes no catálogo. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Animes — completar lista.<br>**Contexto:** Se poucos animes tiveram episódio na semana, a lista completa com outros em exibição ou a estrear.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-019 — Jogos em destaque

### CT-RN-HOJE-019-F — Feliz: Jogos em destaque

**Camada:** Feliz · **Regra:** `RN-HOJE-019` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo com jogos fracos e fortes. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Contar faixa.<br>3. Comparar com página Jogos.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Até **8** jogos; jogos sem sinal de qualidade tendem a ficar de fora. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-019-N — Negativo: Jogos em destaque — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOJE-019` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo com jogos fracos e fortes. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-019-E — Exploratório: Jogos em destaque — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-019` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo com jogos fracos e fortes. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Jogos em destaque.<br>**Contexto:** Jogos com maior expectativa ou nota entre os elegíveis.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-020 — Animes mais exigentes que a listagem

### CT-RN-HOJE-020-F — Feliz: Animes mais exigentes que a listagem

**Camada:** Feliz · **Regra:** `RN-HOJE-020` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com nota/popularidade baixa. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Mesmo título em Animes vs Hoje.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente na faixa de animes de Hoje; pode existir na página Animes do menu. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-020-N — Negativo: Animes mais exigentes que a listagem — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOJE-020` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anime com nota/popularidade baixa. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-020-E — Exploratório: Animes mais exigentes que a listagem — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-020` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anime com nota/popularidade baixa. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Animes mais exigentes que a listagem.<br>**Contexto:** Alguns animes marginais aparecem na listagem geral de animes mas não em Hoje.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-021 — Textos de sinopse

### CT-RN-HOJE-021-F — Feliz: Textos de sinopse

**Camada:** Feliz · **Regra:** `RN-HOJE-021` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Abrir detalhe do mesmo título em Hoje e em Filmes. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Abrir modal do filme em Hoje e na listagem Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mesmo texto de sinopse para a mesma obra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-021-N — Negativo: Textos de sinopse — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-021` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Abrir detalhe do mesmo título em Hoje e em Filmes. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Abrir detalhe do mesmo título em Hoje e em Filmes..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-021-E — Exploratório: Textos de sinopse — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-021` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Abrir detalhe do mesmo título em Hoje e em Filmes. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Textos de sinopse.<br>**Contexto:** Sinopses exibidas são as já cadastradas no catálogo (sem tradução instantânea na hora da visita).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-022 — Atualização dos destaques

### CT-RN-HOJE-022-F — Feliz: Atualização dos destaques

**Camada:** Feliz · **Regra:** `RN-HOJE-022` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Duas visitas no mesmo dia. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Comparar Hoje de manhã e tarde (mesmo dia).<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Listas podem permanecer estáveis por várias horas até o site atualizar o pacote de “hoje”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-022-N — Negativo: Atualização dos destaques — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-022` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Duas visitas no mesmo dia. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Duas visitas no mesmo dia..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-022-E — Exploratório: Atualização dos destaques — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-022` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Duas visitas no mesmo dia. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Atualização dos destaques.<br>**Contexto:** O conjunto de títulos do dia não muda a cada segundo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-023 — Falha grave no servidor

### CT-RN-HOJE-023-F — Feliz: Falha grave no servidor

**Camada:** Feliz · **Regra:** `RN-HOJE-023` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Serviço indisponível. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Ambiente de teste com serviço fora.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mesma mensagem de erro de RN-HOJE-008; usuário não vê faixas parciais “quebradas”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-023-N — Negativo: Falha grave no servidor — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-HOJE-023` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Serviço indisponível. |
| Passos | 1. Abrir o site e navegar até **Hoje** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Mesma mensagem de erro de RN-HOJE-008; usuário não vê faixas parciais “quebradas”. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-023-E — Exploratório: Falha grave no servidor — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-023` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Serviço indisponível. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Falha grave no servidor.<br>**Contexto:** Erro interno ao montar os destaques.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOJE-024 — Seções batem com a tela

### CT-RN-HOJE-024-F — Feliz: Seções batem com a tela

**Camada:** Feliz · **Regra:** `RN-HOJE-024` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página carregada com sucesso. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Conferir títulos das faixas com a tabela abaixo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seis tipos possíveis: data, estreias da semana, cinema, três faixas streaming (filmes/séries/animes), jogos — conforme preferências e conteúdo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-024-N — Negativo: Seções batem com a tela — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOJE-024` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página carregada com sucesso. |
| Passos | 1. Abrir o site e navegar até **Hoje**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página carregada com sucesso..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOJE-024-E — Exploratório: Seções batem com a tela — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOJE-024` · **Tela:** Hoje

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página carregada com sucesso. |
| Passos | **Charter (15 min)** — área: **Hoje** · regra: Seções batem com a tela.<br>**Contexto:** Cada faixa visível corresponde a um bloco de destaques (data do dia + listas por tema).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |
