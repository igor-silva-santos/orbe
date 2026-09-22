# Camadas — Modais

**Inventário:** `08-MODAIS.md` · **Cenários:** 144

---

## RN-MODAL-001 — Só abre com mídia válida

### CT-RN-MODAL-001-F — Feliz: Só abre com mídia válida

**Camada:** Feliz · **Regra:** `RN-MODAL-001` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Clique em card de mídia suportada. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Abrir filme, série, anime e jogo a partir de cards.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Overlay e conteúdo aparecem; tipos não suportados não abrem modal. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-001-N — Negativo: Só abre com mídia válida — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-001` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Clique em card de mídia suportada. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Clique em card de mídia suportada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-001-E — Exploratório: Só abre com mídia válida — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-001` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Clique em card de mídia suportada. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Só abre com mídia válida.<br>**Contexto:** O modal de detalhe exige tipo e obra reconhecidos.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-002 — Fechar ao mudar de página

### CT-RN-MODAL-002-F — Feliz: Fechar ao mudar de página

**Camada:** Feliz · **Regra:** `RN-MODAL-002` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto; clicar link do menu ou digitar outra URL interna. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Com modal aberto, ir para Filmes pelo header.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Modal fecha; a nova página carrega normalmente (sem “voltar” extra inesperado). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-002-N — Negativo: Fechar ao mudar de página — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-002` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modal aberto; clicar link do menu ou digitar outra URL interna. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modal aberto; clicar link do menu ou digitar outra URL interna..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-002-E — Exploratório: Fechar ao mudar de página — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-002` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modal aberto; clicar link do menu ou digitar outra URL interna. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Fechar ao mudar de página.<br>**Contexto:** Se o usuário vai para outra página do site com o modal aberto.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-003 — Detalhes ao abrir

### CT-RN-MODAL-003-F — Feliz: Detalhes ao abrir

**Camada:** Feliz · **Regra:** `RN-MODAL-003` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Abrir modal pela primeira vez para um título. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Abrir modal e comparar dados com o card.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Breve loading; depois sinopse, elenco, links etc. mais completos que no card. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-003-N — Negativo: Detalhes ao abrir — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-003` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Abrir modal pela primeira vez para um título. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Abrir modal pela primeira vez para um título..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-003-E — Exploratório: Detalhes ao abrir — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-003` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Abrir modal pela primeira vez para um título. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Detalhes ao abrir.<br>**Contexto:** Ao abrir, a tela busca informações completas da obra.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-004 — Falha ao buscar detalhes

### CT-RN-MODAL-004-F — Feliz: Falha ao buscar detalhes

**Camada:** Feliz · **Regra:** `RN-MODAL-004` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede instável ou título problemático. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Simular offline após abrir modal.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Modal ainda mostra o que já vinha do card; raramente tela de erro se não houver nenhum dado. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-004-N — Negativo: Falha ao buscar detalhes — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-MODAL-004` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Rede instável ou título problemático. |
| Passos | 1. Abrir o site e navegar até **Modais** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Modal ainda mostra o que já vinha do card; raramente tela de erro se não houver nenhum dado. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-004-E — Exploratório: Falha ao buscar detalhes — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-004` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Rede instável ou título problemático. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Falha ao buscar detalhes.<br>**Contexto:** Se a busca de detalhes falhar.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-005 — Botão voltar do navegador

### CT-RN-MODAL-005-F — Feliz: Botão voltar do navegador

**Camada:** Feliz · **Regra:** `RN-MODAL-005` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto em desktop/mobile. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Abrir modal → botão voltar do navegador.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Fechar pelo X, clique fora ou Esc pode voltar uma entrada no histórico; botão “voltar” do browser fecha o modal. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-005-N — Negativo: Botão voltar do navegador — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-MODAL-005` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modal aberto em desktop/mobile. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-005-E — Exploratório: Botão voltar do navegador — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-005` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modal aberto em desktop/mobile. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Botão voltar do navegador.<br>**Contexto:** O modal participa do histórico do navegador.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-006 — Rolagem da página de fundo

### CT-RN-MODAL-006-F — Feliz: Rolagem da página de fundo

**Camada:** Feliz · **Regra:** `RN-MODAL-006` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal visível. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Tentar rolar a listagem com modal aberto.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | A página atrás não rola (scroll bloqueado); ao fechar, rolagem normal volta. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-006-N — Negativo: Rolagem da página de fundo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-006` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modal visível. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modal visível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-006-E — Exploratório: Rolagem da página de fundo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-006` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modal visível. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Rolagem da página de fundo.<br>**Contexto:** Enquanto o modal está aberto.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-007 — Clique fora fecha

### CT-RN-MODAL-007-F — Feliz: Clique fora fecha

**Camada:** Feliz · **Regra:** `RN-MODAL-007` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Clicar no backdrop.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Modal fecha. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-007-N — Negativo: Clique fora fecha — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-MODAL-007` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modal aberto. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-007-E — Exploratório: Clique fora fecha — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-007` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modal aberto. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Clique fora fecha.<br>**Contexto:** Clicar na área escura fora do card.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-008 — Tecla Esc fecha

### CT-RN-MODAL-008-F — Feliz: Tecla Esc fecha

**Camada:** Feliz · **Regra:** `RN-MODAL-008` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto (desktop). |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Pressionar Esc.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Esc fecha o modal. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-008-N — Negativo: Tecla Esc fecha — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-008` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modal aberto (desktop). |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modal aberto (desktop)..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-008-E — Exploratório: Tecla Esc fecha — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-008` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modal aberto (desktop). |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Tecla Esc fecha.<br>**Contexto:** Teclado com foco na página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-009 — Premiações no topo

### CT-RN-MODAL-009-F — Feliz: Premiações no topo

**Camada:** Feliz · **Regra:** `RN-MODAL-009` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme/série/etc. com lista de premiações. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Abrir título premiado conhecido.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Bloco de prêmios acima do restante do conteúdo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-009-N — Negativo: Premiações no topo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-009` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme/série/etc. com lista de premiações. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme/série/etc. com lista de premiações..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-009-E — Exploratório: Premiações no topo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-009` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme/série/etc. com lista de premiações. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Premiações no topo.<br>**Contexto:** Obra com prêmios cadastrados.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-010 — Modo edição (administrador)

### CT-RN-MODAL-010-F — Feliz: Modo edição (administrador)

**Camada:** Feliz · **Regra:** `RN-MODAL-010` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário admin; modal aberto. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Logar como admin vs usuário normal.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Botão de editar visível; alterna para formulários de curadoria; visitante/usuário comum não vê editar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-010-N — Negativo: Modo edição (administrador) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-010` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário admin; modal aberto. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário admin; modal aberto..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-010-E — Exploratório: Modo edição (administrador) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-010` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário admin; modal aberto. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Modo edição (administrador).<br>**Contexto:** Conta com perfil administrador.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-011 — Conteúdo por tipo

### CT-RN-MODAL-011-F — Feliz: Conteúdo por tipo

**Camada:** Feliz · **Regra:** `RN-MODAL-011` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Abrir os quatro tipos. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Quatro modais distintos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Filme, série, anime e jogo mostram blocos adequados (streaming, temporadas, plataformas, etc.). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-011-N — Negativo: Conteúdo por tipo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-011` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Abrir os quatro tipos. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Abrir os quatro tipos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-011-E — Exploratório: Conteúdo por tipo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-011` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Abrir os quatro tipos. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Conteúdo por tipo.<br>**Contexto:** Cada tipo de mídia tem layout próprio.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-012 — Carregando detalhes

### CT-RN-MODAL-012-F — Feliz: Carregando detalhes

**Camada:** Feliz · **Regra:** `RN-MODAL-012` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede lenta. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Throttle ao abrir modal.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Indicador de carregamento com mensagem fixa. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-012-N — Negativo: Carregando detalhes — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-012` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Rede lenta. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Rede lenta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-012-E — Exploratório: Carregando detalhes — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-012` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Rede lenta. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Carregando detalhes.<br>**Contexto:** Entre abrir e receber dados completos.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-013 — Busca fecha ao abrir detalhe

### CT-RN-MODAL-013-F — Feliz: Busca fecha ao abrir detalhe

**Camada:** Feliz · **Regra:** `RN-MODAL-013` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Overlay de busca visível. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Buscar título → clicar resultado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Busca fecha; modal de detalhe fica por cima. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-013-N — Negativo: Busca fecha ao abrir detalhe — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-013` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Overlay de busca visível. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Overlay de busca visível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-013-E — Exploratório: Busca fecha ao abrir detalhe — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-013` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Overlay de busca visível. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Busca fecha ao abrir detalhe.<br>**Contexto:** Busca global aberta; usuário abre um card.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-020 — Exige login

### CT-RN-MODAL-020-F — Feliz: Exige login

**Camada:** Feliz · **Regra:** `RN-MODAL-020` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário **não** logado. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Anônimo → tentar adicionar evento.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mensagem de erro (toast); submodal de calendário fecha. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-020-N — Negativo: Exige login — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-MODAL-020` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário **não** logado. |
| Passos | 1. Abrir o site e navegar até **Modais** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Mensagem de erro (toast); submodal de calendário fecha. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-020-E — Exploratório: Exige login — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-020` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário **não** logado. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Exige login.<br>**Contexto:** Adicionar ao calendário pessoal.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-021 — Opções por tipo

### CT-RN-MODAL-021-F — Feliz: Opções por tipo

**Camada:** Feliz · **Regra:** `RN-MODAL-021` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado; modal de cada tipo. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Percorrer fluxo calendário em filme e anime.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Filme: estreia e/ou sessão de cinema (data, hora, local). Anime: estreia e/ou lembretes semanais. Série e jogo: estreia única. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-021-N — Negativo: Opções por tipo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-021` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado; modal de cada tipo. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado; modal de cada tipo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-021-E — Exploratório: Opções por tipo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-021` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado; modal de cada tipo. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Opções por tipo.<br>**Contexto:** Tipos de evento variam conforme filme, anime, série ou jogo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-022 — Lembretes semanais (anime/série)

### CT-RN-MODAL-022-F — Feliz: Lembretes semanais (anime/série)

**Camada:** Feliz · **Regra:** `RN-MODAL-022` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado; escolher recorrência semanal. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Criar série de lembretes e conferir quantidade.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Vários eventos espaçados (~7 dias), conforme quantidade de episódios informada ou padrão (~12). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-022-N — Negativo: Lembretes semanais (anime/série) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-022` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado; escolher recorrência semanal. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado; escolher recorrência semanal..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-022-E — Exploratório: Lembretes semanais (anime/série) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-022` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado; escolher recorrência semanal. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Lembretes semanais (anime/série).<br>**Contexto:** Opção recorrente para anime ou série.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-023 — Estreia sem data

### CT-RN-MODAL-023-F — Feliz: Estreia sem data

**Camada:** Feliz · **Regra:** `RN-MODAL-023` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Obra sem data de estreia. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Título sem data → “lançamento”.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Aviso; nada é salvo; modal fecha. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-023-N — Negativo: Estreia sem data — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-023` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Obra sem data de estreia. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Obra sem data de estreia..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-023-E — Exploratório: Estreia sem data — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-023` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Obra sem data de estreia. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Estreia sem data.<br>**Contexto:** Evento de lançamento sem data conhecida.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-024 — Ingresso de cinema

### CT-RN-MODAL-024-F — Feliz: Ingresso de cinema

**Camada:** Feliz · **Regra:** `RN-MODAL-024` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com formulário de cinema preenchido. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Preencher e salvar sessão.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Evento com data, hora e local informados. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-024-N — Negativo: Ingresso de cinema — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-024` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme com formulário de cinema preenchido. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme com formulário de cinema preenchido..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-024-E — Exploratório: Ingresso de cinema — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-024` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme com formulário de cinema preenchido. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Ingresso de cinema.<br>**Contexto:** Evento tipo sessão/ingresso.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-025 — Confirmação de salvamento

### CT-RN-MODAL-025-F — Feliz: Confirmação de salvamento

**Camada:** Feliz · **Regra:** `RN-MODAL-025` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado; dados completos. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Salvar evento válido e inválido.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Toast de sucesso ou erro após tentativa de salvar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-025-N — Negativo: Confirmação de salvamento — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-MODAL-025` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado; dados completos. |
| Passos | 1. Abrir o site e navegar até **Modais** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Toast de sucesso ou erro após tentativa de salvar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-025-E — Exploratório: Confirmação de salvamento — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-025` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado; dados completos. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Confirmação de salvamento.<br>**Contexto:** Eventos válidos enviados.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-026 — Botão calendário em filme futuro

### CT-RN-MODAL-026-F — Feliz: Botão calendário em filme futuro

**Camada:** Feliz · **Regra:** `RN-MODAL-026` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com estreia **futura** vs já lançado. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Filme futuro vs lançado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Botão visível só enquanto a estreia ainda não passou. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-026-N — Negativo: Botão calendário em filme futuro — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-026` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme com estreia **futura** vs já lançado. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme com estreia **futura** vs já lançado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-026-E — Exploratório: Botão calendário em filme futuro — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-026` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme com estreia **futura** vs já lançado. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Botão calendário em filme futuro.<br>**Contexto:** Botão “Adicionar ao Calendário” no filme.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-030 — Abrir pelo card

### CT-RN-MODAL-030-F — Feliz: Abrir pelo card

**Camada:** Feliz · **Regra:** `RN-MODAL-030` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card de mídia já lançada. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Título futuro vs lançado → botão “Já assisti/joguei”.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Abre modal de avaliação; desabilitado se a obra ainda não lançou. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-030-N — Negativo: Abrir pelo card — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-030` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Card de mídia já lançada. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Card de mídia já lançada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-030-E — Exploratório: Abrir pelo card — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-030` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Card de mídia já lançada. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Abrir pelo card.<br>**Contexto:** Atalho no card, não pelo menu genérico de lista.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-031 — Marca como assistido/jogado

### CT-RN-MODAL-031-F — Feliz: Marca como assistido/jogado

**Camada:** Feliz · **Regra:** `RN-MODAL-031` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado; modal de rating aberto. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Avaliar jogo e conferir status na lista.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Status passa a “assistido” (inclusive para jogos). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-031-N — Negativo: Marca como assistido/jogado — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-031` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado; modal de rating aberto. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado; modal de rating aberto..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-031-E — Exploratório: Marca como assistido/jogado — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-031` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado; modal de rating aberto. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Marca como assistido/jogado.<br>**Contexto:** Após enviar avaliação.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-032 — Campos da avaliação

### CT-RN-MODAL-032-F — Feliz: Campos da avaliação

**Camada:** Feliz · **Regra:** `RN-MODAL-032` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal aberto. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Enviar com e sem comentário.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Opções do tipo gostei / amei / não gostei; campo de texto opcional. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-032-N — Negativo: Campos da avaliação — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-032` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modal aberto. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modal aberto..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-032-E — Exploratório: Campos da avaliação — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-032` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modal aberto. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Campos da avaliação.<br>**Contexto:** Usuário escolhe sentimento e comentário opcional.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-033 — Login obrigatório

### CT-RN-MODAL-033-F — Feliz: Login obrigatório

**Camada:** Feliz · **Regra:** `RN-MODAL-033` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Não logado. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Anônimo → avaliar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Toast de aviso; modal fecha sem salvar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-033-N — Negativo: Login obrigatório — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-033` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Não logado. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Não logado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-033-E — Exploratório: Login obrigatório — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-033` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Não logado. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Login obrigatório.<br>**Contexto:** Tentativa sem sessão.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-040 — Título e pôster

### CT-RN-MODAL-040-F — Feliz: Título e pôster

**Camada:** Feliz · **Regra:** `RN-MODAL-040` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com título/pôster alternativos no catálogo. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Comparar com listagem.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Título e arte coerentes com curadoria do site. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-040-N — Negativo: Título e pôster — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-040` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme com título/pôster alternativos no catálogo. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme com título/pôster alternativos no catálogo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-040-E — Exploratório: Título e pôster — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-040` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme com título/pôster alternativos no catálogo. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Título e pôster.<br>**Contexto:** Exibição prioriza textos e imagens curados quando existirem.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-041 — Onde assistir

### CT-RN-MODAL-041-F — Feliz: Onde assistir

**Camada:** Feliz · **Regra:** `RN-MODAL-041` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com e sem provedores. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Filme só cinema vs só streaming.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Lista de serviços (sem duplicatas óbvias); se nada conhecido, texto “Desconhecido”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-041-N — Negativo: Onde assistir — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-041` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme com e sem provedores. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme com e sem provedores..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-041-E — Exploratório: Onde assistir — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-041` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme com e sem provedores. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Onde assistir.<br>**Contexto:** Provedores de streaming e cinema.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-042 — Ingresso

### CT-RN-MODAL-042-F — Feliz: Ingresso

**Camada:** Feliz · **Regra:** `RN-MODAL-042` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme em cartaz, pré-venda ou com sessões. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Filme em cartaz com/sem sessões.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Botão de ingresso conforme disponibilidade; compra habilitada só quando há sessões confirmadas. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-042-N — Negativo: Ingresso — sem a condição exigida

**Camada:** Negativo · **Regra:** `RN-MODAL-042` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme em cartaz, pré-venda ou com sessões. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Usar usuário, dado ou estado **sem** a condição da regra (ex.: não logado se a regra exige login).<br>3. Repetir a mesma ação do caminho feliz.<br>4. Verificar que o elemento/comportamento **não** aparece ou permanece desabilitado. |
| Resultado_Esperado | O resultado feliz **não** ocorre; a tela permanece coerente (sem vazamento indevido). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-042-E — Exploratório: Ingresso — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-042` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme em cartaz, pré-venda ou com sessões. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Ingresso.<br>**Contexto:** Compra ou sessões de cinema.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-043 — Trailer

### CT-RN-MODAL-043-F — Feliz: Trailer

**Camada:** Feliz · **Regra:** `RN-MODAL-043` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com trailer oficial e alternativos. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Abrir filme com vários vídeos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Prioriza trailer oficial; senão primeiro trailer; senão outro vídeo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-043-N — Negativo: Trailer — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-043` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme com trailer oficial e alternativos. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme com trailer oficial e alternativos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-043-E — Exploratório: Trailer — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-043` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme com trailer oficial e alternativos. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Trailer.<br>**Contexto:** Vídeos disponíveis para o filme.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-044 — Elenco → página da pessoa

### CT-RN-MODAL-044-F — Feliz: Elenco → página da pessoa

**Camada:** Feliz · **Regra:** `RN-MODAL-044` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Elenco listado. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Clicar nome no elenco → voltar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Vai para página da pessoa; modal de filme fecha; ao voltar, fluxo de retorno pode reabrir o filme (quando aplicável). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-044-N — Negativo: Elenco → página da pessoa — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-044` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Elenco listado. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Elenco listado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-044-E — Exploratório: Elenco → página da pessoa — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-044` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Elenco listado. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Elenco → página da pessoa.<br>**Contexto:** Clique em ator/equipe.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-045 — Continuações no filme

### CT-RN-MODAL-045-F — Feliz: Continuações no filme

**Camada:** Feliz · **Regra:** `RN-MODAL-045` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com sequências ou universo. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Filme de franquia conhecida.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Aba “Continuação” e/ou “Universo” com obras relacionadas. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-045-N — Negativo: Continuações no filme — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-045` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme com sequências ou universo. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme com sequências ou universo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-045-E — Exploratório: Continuações no filme — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-045` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme com sequências ou universo. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Continuações no filme.<br>**Contexto:** Abas extras no modal.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-050 — Onde assistir

### CT-RN-MODAL-050-F — Feliz: Onde assistir

**Camada:** Feliz · **Regra:** `RN-MODAL-050` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série com vários provedores. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Inspecionar bloco streaming.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Lista deduplicada de serviços. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-050-N — Negativo: Onde assistir — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-050` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série com vários provedores. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série com vários provedores..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-050-E — Exploratório: Onde assistir — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-050` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série com vários provedores. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Onde assistir.<br>**Contexto:** Mescla fontes de plataforma de streaming.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-051 — Elenco → pessoa

### CT-RN-MODAL-051-F — Feliz: Elenco → pessoa

**Camada:** Feliz · **Regra:** `RN-MODAL-051` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Elenco presente. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Clicar ator.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Navega para a página da pessoa; ao voltar, o modal da série pode reabrir quando o site guardou esse retorno. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-051-N — Negativo: Elenco → pessoa — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-051` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Elenco presente. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Elenco presente..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-051-E — Exploratório: Elenco → pessoa — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-051` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Elenco presente. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Elenco → pessoa.<br>**Contexto:** Mesmo padrão do filme.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-052 — Calendário na série

### CT-RN-MODAL-052-F — Feliz: Calendário na série

**Camada:** Feliz · **Regra:** `RN-MODAL-052` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modal de série aberto. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Procurar botão calendário na série.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Não há botão dedicado igual ao de filme futuro; calendário pode existir por outros fluxos conforme produto. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-052-N — Negativo: Calendário na série — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-052` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modal de série aberto. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modal de série aberto..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-052-E — Exploratório: Calendário na série — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-052` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modal de série aberto. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Calendário na série.<br>**Contexto:** Botão explícito de calendário na UI de série.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-053 — Continuações

### CT-RN-MODAL-053-F — Feliz: Continuações

**Camada:** Feliz · **Regra:** `RN-MODAL-053` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série ligada a universo compartilhado. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Série MCU/DCEU etc.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Abas de continuação/universo como no filme. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-053-N — Negativo: Continuações — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-053` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série ligada a universo compartilhado. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série ligada a universo compartilhado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-053-E — Exploratório: Continuações — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-053` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série ligada a universo compartilhado. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Continuações.<br>**Contexto:** Abas de franquia/universo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-060 — Sinopse legível

### CT-RN-MODAL-060-F — Feliz: Sinopse legível

**Camada:** Feliz · **Regra:** `RN-MODAL-060` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com sinopse rica ou vazia. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Abrir anime cuja sinopse venha com formatação na origem.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Texto limpo; se ausente, “(não informado)”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-060-N — Negativo: Sinopse legível — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-MODAL-060` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anime com sinopse rica ou vazia. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-060-E — Exploratório: Sinopse legível — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-060` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anime com sinopse rica ou vazia. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Sinopse legível.<br>**Contexto:** Texto da sinopse sem códigos ou formatação estranha visíveis.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-061 — Fixar na semana

### CT-RN-MODAL-061-F — Feliz: Fixar na semana

**Camada:** Feliz · **Regra:** `RN-MODAL-061` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta autenticada. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Logar.<br>3. Fixar e desfixar.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Botão “Fixar na semana” / “Na sua semana” alterna destaque pessoal da semana. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-061-N — Negativo: Fixar na semana — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-061` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Conta autenticada. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Conta autenticada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-061-E — Exploratório: Fixar na semana — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-061` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Conta autenticada. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Fixar na semana.<br>**Contexto:** Usuário logado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-062 — Plataformas

### CT-RN-MODAL-062-F — Feliz: Plataformas

**Camada:** Feliz · **Regra:** `RN-MODAL-062` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias plataformas incl. Crunchyroll. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Card de anime multi-plataforma.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Lista por nome; Crunchyroll pode mostrar só ícone. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-062-N — Negativo: Plataformas — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-062` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Várias plataformas incl. Crunchyroll. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Várias plataformas incl. Crunchyroll..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-062-E — Exploratório: Plataformas — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-062` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Várias plataformas incl. Crunchyroll. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Plataformas.<br>**Contexto:** Onde assistir o anime.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-063 — Personagem e dublador

### CT-RN-MODAL-063-F — Feliz: Personagem e dublador

**Camada:** Feliz · **Regra:** `RN-MODAL-063` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com dublagem BR. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Anime dublado → link dublador.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Alternar JP/PT-BR; link para página do dublador fecha o modal. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-063-N — Negativo: Personagem e dublador — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-063` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anime com dublagem BR. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Anime com dublagem BR..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-063-E — Exploratório: Personagem e dublador — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-063` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anime com dublagem BR. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Personagem e dublador.<br>**Contexto:** Elenco de voz JP e PT-BR quando existir.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-064 — Rankings

### CT-RN-MODAL-064-F — Feliz: Rankings

**Camada:** Feliz · **Regra:** `RN-MODAL-064` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com muitos rankings. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Anime popular em várias listas.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Até **6** entradas visíveis, com rótulos traduzidos. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-064-N — Negativo: Rankings — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-064` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anime com muitos rankings. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Anime com muitos rankings..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-064-E — Exploratório: Rankings — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-064` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anime com muitos rankings. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Rankings.<br>**Contexto:** Listas de popularidade/classificação.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-070 — Requisitos de PC

### CT-RN-MODAL-070-F — Feliz: Requisitos de PC

**Camada:** Feliz · **Regra:** `RN-MODAL-070` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo PC com requisitos vs console-only. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Jogo Steam vs exclusivo console.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Drawer ou bloco de requisitos mínimos/recomendados só quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-070-N — Negativo: Requisitos de PC — abaixo do limite

**Camada:** Negativo · **Regra:** `RN-MODAL-070` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogo PC com requisitos vs console-only. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Reproduzir a ação com valor **abaixo do mínimo** (ex.: menos caracteres, nota/duração insuficiente).<br>3. Observar bloqueio, ausência do efeito ou mensagem de validação.<br>4. Confirmar que o sistema **não** aplica o benefício do caminho feliz. |
| Resultado_Esperado | Comportamento de bloqueio ou ausência do resultado feliz: validação visível, item oculto ou ação não executada — sem erro de interface. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-070-E — Exploratório: Requisitos de PC — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-070` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogo PC com requisitos vs console-only. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Requisitos de PC.<br>**Contexto:** Jogo de PC/Steam com requisitos cadastrados.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-071 — Desenvolvedora

### CT-RN-MODAL-071-F — Feliz: Desenvolvedora

**Camada:** Feliz · **Regra:** `RN-MODAL-071` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo com empresa cadastrada. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Clicar link da empresa.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Link para página da desenvolvedora. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-071-N — Negativo: Desenvolvedora — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-071` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogo com empresa cadastrada. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Jogo com empresa cadastrada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-071-E — Exploratório: Desenvolvedora — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-071` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogo com empresa cadastrada. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Desenvolvedora.<br>**Contexto:** Nome da desenvolvedora/publicadora.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-072 — Preço Steam

### CT-RN-MODAL-072-F — Feliz: Preço Steam

**Camada:** Feliz · **Regra:** `RN-MODAL-072` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo com ID Steam ou preço. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Jogo com página Steam ativa.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Exibe preço Steam no bloco de informações quando houver dado. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-072-N — Negativo: Preço Steam — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-072` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogo com ID Steam ou preço. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Jogo com ID Steam ou preço..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-072-E — Exploratório: Preço Steam — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-072` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogo com ID Steam ou preço. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Preço Steam.<br>**Contexto:** Dados de loja quando disponíveis.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-080 — Salvar alterações de filme

### CT-RN-MODAL-080-F — Feliz: Salvar alterações de filme

**Camada:** Feliz · **Regra:** `RN-MODAL-080` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Campos curados editados. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Admin edita título curado → salvar → reabrir.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Salvar persiste título, sinopse, pôster etc.; usuário vê dados atualizados ao reabrir. |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-080-N — Negativo: Salvar alterações de filme — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-080` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Campos curados editados. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Campos curados editados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-080-E — Exploratório: Salvar alterações de filme — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-080` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Campos curados editados. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Salvar alterações de filme.<br>**Contexto:** Admin em modo edição.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-081 — Cancelar edição

### CT-RN-MODAL-081-F — Feliz: Cancelar edição

**Camada:** Feliz · **Regra:** `RN-MODAL-081` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo edição ativo. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Editar → cancelar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Volta à visualização; dados na tela permanecem os anteriores ao save. |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-081-N — Negativo: Cancelar edição — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-081` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modo edição ativo. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modo edição ativo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-081-E — Exploratório: Cancelar edição — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-081` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modo edição ativo. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Cancelar edição.<br>**Contexto:** Admin cancela sem salvar.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-082 — Tipos editáveis

### CT-RN-MODAL-082-F — Feliz: Tipos editáveis

**Camada:** Feliz · **Regra:** `RN-MODAL-082` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta admin. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Alternar tipos em modo edição.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Formulários para filme, série, anime e jogo; outros tipos mostram indisponível. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-082-N — Negativo: Tipos editáveis — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-MODAL-082` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Conta admin. |
| Passos | 1. Abrir o site e navegar até **Modais** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Formulários para filme, série, anime e jogo; outros tipos mostram indisponível. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-082-E — Exploratório: Tipos editáveis — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-082` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Conta admin. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Tipos editáveis.<br>**Contexto:** Admin tenta editar cada tipo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-090 — Carregar sob demanda

### CT-RN-MODAL-090-F — Feliz: Carregar sob demanda

**Camada:** Feliz · **Regra:** `RN-MODAL-090` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme/série com franquia. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Abrir aba Continuação em filme de saga.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Conteúdo das abas carrega ao exibir (pode haver loading breve). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-090-N — Negativo: Carregar sob demanda — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-090` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme/série com franquia. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme/série com franquia..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-090-E — Exploratório: Carregar sob demanda — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-090` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme/série com franquia. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Carregar sob demanda.<br>**Contexto:** Abas de continuação/universo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-091 — Ocultar se vazio

### CT-RN-MODAL-091-F — Feliz: Ocultar se vazio

**Camada:** Feliz · **Regra:** `RN-MODAL-091` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Título isolado. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Filme standalone.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Nenhuma aba extra de continuações. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-091-N — Negativo: Ocultar se vazio — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-MODAL-091` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Título isolado. |
| Passos | 1. Abrir o site e navegar até **Modais** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Nenhuma aba extra de continuações. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-091-E — Exploratório: Ocultar se vazio — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-091` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Título isolado. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Ocultar se vazio.<br>**Contexto:** Obra sem sequência nem universo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-MODAL-092 — Abas dinâmicas

### CT-RN-MODAL-092-F — Feliz: Abas dinâmicas

**Camada:** Feliz · **Regra:** `RN-MODAL-092` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Só sequência, só universo, ou ambos. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Comparar filme sequel vs spin-off universo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Aba padrão “Continuação” se houver sequência; senão “Universo”; só abas com conteúdo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-092-N — Negativo: Abas dinâmicas — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-MODAL-092` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Só sequência, só universo, ou ambos. |
| Passos | 1. Abrir o site e navegar até **Modais**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Só sequência, só universo, ou ambos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-MODAL-092-E — Exploratório: Abas dinâmicas — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-MODAL-092` · **Tela:** Modais

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Só sequência, só universo, ou ambos. |
| Passos | **Charter (15 min)** — área: **Modais** · regra: Abas dinâmicas.<br>**Contexto:** Obra com sequência e/ou universo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |
