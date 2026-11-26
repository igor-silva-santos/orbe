# Camadas — Promoções

**Inventário:** `06-PROMOCOES.md` · **Cenários:** 105

---

## RN-PROMO-001 — Aba pela URL

### CT-RN-PROMO-001-F — Feliz: Aba pela URL

**Camada:** Feliz · **Regra:** `RN-PROMO-001` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | `/promocoes`, `/promocoes?tab=promocoes`, `/promocoes?tab=em-alta`. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Abrir cada URL.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Padrão **Jogos de Graça**; `promocoes` → aba Promoções; `em-alta` → Em Alta. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-001-N — Negativo: Aba pela URL — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-001` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: `/promocoes`, `/promocoes?tab=promocoes`, `/promocoes?tab=em-alta`. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: `/promocoes`, `/promocoes?tab=promocoes`, `/promocoes?tab=em-alta`..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-001-E — Exploratório: Aba pela URL — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-001` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | `/promocoes`, `/promocoes?tab=promocoes`, `/promocoes?tab=em-alta`. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Aba pela URL.<br>**Contexto:** Endereço define aba inicial.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-002 — Shell da página

### CT-RN-PROMO-002-F — Feliz: Shell da página

**Camada:** Feliz · **Regra:** `RN-PROMO-002` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeira visita. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Abrir Promoções com rede lenta.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Layout visível; conteúdo das abas grátis/promo preenche depois. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-002-N — Negativo: Shell da página — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-002` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Primeira visita. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Primeira visita..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-002-E — Exploratório: Shell da página — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-002` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Primeira visita. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Shell da página.<br>**Contexto:** Estrutura (hero, abas) aparece mesmo antes das ofertas terminarem de carregar.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-003 — Três abas

### CT-RN-PROMO-003-F — Feliz: Três abas

**Camada:** Feliz · **Regra:** `RN-PROMO-003` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página carregada. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Clicar cada aba.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Alternar abas muda conteúdo principal. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-003-N — Negativo: Três abas — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-003` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página carregada. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página carregada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-003-E — Exploratório: Três abas — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-003` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página carregada. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Três abas.<br>**Contexto:** Grátis, Promoções, Em Alta com ícones distintos.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-004 — Em Alta sem ofertas de loja

### CT-RN-PROMO-004-F — Feliz: Em Alta sem ofertas de loja

**Camada:** Feliz · **Regra:** `RN-PROMO-004` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba **Em Alta** ativa. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Abrir Em Alta.<br>3. Observar ausência de grids de oferta.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só blocos de jogos em alta; sem skeleton de 12 cards de deal (salvo loading interno de Em Alta). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-004-N — Negativo: Em Alta sem ofertas de loja — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-004` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Aba **Em Alta** ativa. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Aba **Em Alta** ativa..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-004-E — Exploratório: Em Alta sem ofertas de loja — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-004` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Aba **Em Alta** ativa. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Em Alta sem ofertas de loja.<br>**Contexto:** Aba **Em Alta** não carrega jogos grátis/promoções de lojas externas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-005 — Carregar sob demanda

### CT-RN-PROMO-005-F — Feliz: Carregar sob demanda

**Camada:** Feliz · **Regra:** `RN-PROMO-005` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Abrir direto em Promoções sem passar por Grátis. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Entrar direto `?tab=promocoes`.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Promoções carrega ao selecionar aba; Grátis pode não ter sido buscado ainda. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-005-N — Negativo: Carregar sob demanda — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-005` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Abrir direto em Promoções sem passar por Grátis. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Abrir direto em Promoções sem passar por Grátis..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-005-E — Exploratório: Carregar sob demanda — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-005` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Abrir direto em Promoções sem passar por Grátis. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Carregar sob demanda.<br>**Contexto:** Cada aba de ofertas busca dados na **primeira** vez que o usuário entra nela.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-006 — Várias lojas — grátis

### CT-RN-PROMO-006-F — Feliz: Várias lojas — grátis

**Camada:** Feliz · **Regra:** `RN-PROMO-006` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Grátis carregada. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Ler rodapé após load.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cards de lojas diferentes; rodapé lista fontes com contagem. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-006-N — Negativo: Várias lojas — grátis — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-006` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Aba Grátis carregada. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Aba Grátis carregada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-006-E — Exploratório: Várias lojas — grátis — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-006` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Aba Grátis carregada. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Várias lojas — grátis.<br>**Contexto:** Jogos de graça agregam Epic, giveaways, Steam, itch.io, etc.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-007 — Várias lojas — promo pagas

### CT-RN-PROMO-007-F — Feliz: Várias lojas — promo pagas

**Camada:** Feliz · **Regra:** `RN-PROMO-007` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Promoções. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Abrir aba Promoções.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ofertas misturadas; ordenação **Popularidade** por padrão. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-007-N — Negativo: Várias lojas — promo pagas — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-007` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Aba Promoções. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Aba Promoções..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-007-E — Exploratório: Várias lojas — promo pagas — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-007` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Aba Promoções. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Várias lojas — promo pagas.<br>**Contexto:** Promoções pagas combinam várias lojas; ordem padrão prioriza “melhor deal”.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-008 — Catálogo Orbe na Steam

### CT-RN-PROMO-008-F — Feliz: Catálogo Orbe na Steam

**Camada:** Feliz · **Regra:** `RN-PROMO-008` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogos Orbe em promo Steam. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Aba Promoções com catálogo populado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seção **Promoções na Steam (catálogo)** com carrossel horizontal. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-008-N — Negativo: Catálogo Orbe na Steam — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-008` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogos Orbe em promo Steam. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Jogos Orbe em promo Steam..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-008-E — Exploratório: Catálogo Orbe na Steam — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-008` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogos Orbe em promo Steam. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Catálogo Orbe na Steam.<br>**Contexto:** Jogos já catalogados no site com desconto na Steam aparecem em faixa dedicada.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-009 — Atualização periódica

### CT-RN-PROMO-009-F — Feliz: Atualização periódica

**Camada:** Feliz · **Regra:** `RN-PROMO-009` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba grátis ou promo. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Clicar **Atualizar agora** duas vezes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Horário **Última atualização** muda após atualizar. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-009-N — Negativo: Atualização periódica — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-009` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Aba grátis ou promo. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Aba grátis ou promo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-009-E — Exploratório: Atualização periódica — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-009` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Aba grátis ou promo. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Atualização periódica.<br>**Contexto:** Ofertas são atualizadas em intervalo curto; botão **Atualizar agora** força nova busca.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-010 — Alerta de fontes indisponíveis

### CT-RN-PROMO-010-F — Feliz: Alerta de fontes indisponíveis

**Camada:** Feliz · **Regra:** `RN-PROMO-010` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Fonte externa down no ambiente. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Simular/induzir falha de fonte.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Banner listando lojas com falha. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-010-N — Negativo: Alerta de fontes indisponíveis — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-PROMO-010` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Fonte externa down no ambiente. |
| Passos | 1. Abrir o site e navegar até **Promoções** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Banner listando lojas com falha. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-010-E — Exploratório: Alerta de fontes indisponíveis — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-010` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Fonte externa down no ambiente. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Alerta de fontes indisponíveis.<br>**Contexto:** Se alguma loja falhar, banner âmbar ou vermelho avisa que a lista pode estar incompleta.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-011 — Sem detalhes técnicos internos

### CT-RN-PROMO-011-F — Feliz: Sem detalhes técnicos internos

**Camada:** Feliz · **Regra:** `RN-PROMO-011` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Qualquer aba de oferta. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Inspecionar UI.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Nenhum painel “debug” na interface. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-011-N — Negativo: Sem detalhes técnicos internos — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-011` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Qualquer aba de oferta. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Qualquer aba de oferta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-011-E — Exploratório: Sem detalhes técnicos internos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-011` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Qualquer aba de oferta. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Sem detalhes técnicos internos.<br>**Contexto:** Usuário não vê metadados de diagnóstico — só ofertas, contadores e alertas amigáveis.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-012 — Conteúdo da aba Grátis

### CT-RN-PROMO-012-F — Feliz: Conteúdo da aba Grátis

**Camada:** Feliz · **Regra:** `RN-PROMO-012` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Grátis carregado. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Percorrer aba Grátis.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seções **Estão de graça** e **São de graça**; chips de plataforma. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-012-N — Negativo: Conteúdo da aba Grátis — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-012` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Grátis carregado. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Grátis carregado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-012-E — Exploratório: Conteúdo da aba Grátis — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-012` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Grátis carregado. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Conteúdo da aba Grátis.<br>**Contexto:** Temporários, permanentes e lista unificada para contagem.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-013 — Paginação de promoções pagas

### CT-RN-PROMO-013-F — Feliz: Paginação de promoções pagas

**Camada:** Feliz · **Regra:** `RN-PROMO-013` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Muitas promoções ao vivo. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Clicar até sumir botão.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Botão **Carregar mais promoções** aumenta grid. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-013-N — Negativo: Paginação de promoções pagas — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-013` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Muitas promoções ao vivo. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Muitas promoções ao vivo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-013-E — Exploratório: Paginação de promoções pagas — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-013` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Muitas promoções ao vivo. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Paginação de promoções pagas.<br>**Contexto:** Primeira leva ~48 ofertas; **Carregar mais** traz o restante quando existir.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-014 — Preços em reais

### CT-RN-PROMO-014-F — Feliz: Preços em reais

**Camada:** Feliz · **Regra:** `RN-PROMO-014` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ofertas em dólar. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Ler rodapé e cards.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Preço BRL nos cards; linha USD/BRL no rodapé. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-014-N — Negativo: Preços em reais — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-014` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Ofertas em dólar. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Ofertas em dólar..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-014-E — Exploratório: Preços em reais — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-014` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Ofertas em dólar. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Preços em reais.<br>**Contexto:** Quando aplicável, valores convertidos; rodapé pode mostrar taxa USD/BRL e hora da cotação.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-015 — Temporário vs permanente

### CT-RN-PROMO-015-F — Feliz: Temporário vs permanente

**Camada:** Feliz · **Regra:** `RN-PROMO-015` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Deals de ambos tipos. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Ler subtítulos das seções.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Duas seções com textos explicativos diferentes. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-015-N — Negativo: Temporário vs permanente — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-015` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Deals de ambos tipos. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Deals de ambos tipos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-015-E — Exploratório: Temporário vs permanente — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-015` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Deals de ambos tipos. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Temporário vs permanente.<br>**Contexto:** **Estão de graça** = promo 100% por tempo limitado; **São de graça** = F2P ou sempre zero.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-016 — Ordenação padrão grátis

### CT-RN-PROMO-016-F — Feliz: Ordenação padrão grátis

**Camada:** Feliz · **Regra:** `RN-PROMO-016` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Grátis. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Trocar ordenação.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Select de ordenação; mudar reordena temporários. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-016-N — Negativo: Ordenação padrão grátis — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-016` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Aba Grátis. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Aba Grátis..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-016-E — Exploratório: Ordenação padrão grátis — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-016` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Aba Grátis. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Ordenação padrão grátis.<br>**Contexto:** Temporários por **Acaba primeiro**; permanentes por título quando essa ordenação não se aplica.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-017 — Filtro por plataforma/loja

### CT-RN-PROMO-017-F — Feliz: Filtro por plataforma/loja

**Camada:** Feliz · **Regra:** `RN-PROMO-017` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtrar e atualizar. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Filtrar Steam.<br>3. Atualizar se vazio.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Chip some ou volta para **Todas**. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-017-N — Negativo: Filtro por plataforma/loja — sem a condição exigida

**Camada:** Negativo · **Regra:** `RN-PROMO-017` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtrar e atualizar. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Usar usuário, dado ou estado **sem** a condição da regra (ex.: não logado se a regra exige login).<br>3. Repetir a mesma ação do caminho feliz.<br>4. Verificar que o elemento/comportamento **não** aparece ou permanece desabilitado. |
| Resultado_Esperado | O resultado feliz **não** ocorre; a tela permanece coerente (sem vazamento indevido). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-017-E — Exploratório: Filtro por plataforma/loja — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-017` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtrar e atualizar. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Filtro por plataforma/loja.<br>**Contexto:** Chips só aparecem para lojas que têm oferta no momento; filtro ativo some se a loja deixar de ter itens.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-018 — Busca por título

### CT-RN-PROMO-018-F — Feliz: Busca por título

**Camada:** Feliz · **Regra:** `RN-PROMO-018` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Texto parcial do título. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Buscar substring.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grid reduzido. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-018-N — Negativo: Busca por título — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-018` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Texto parcial do título. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Texto parcial do título..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-018-E — Exploratório: Busca por título — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-018` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Texto parcial do título. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Busca por título.<br>**Contexto:** Campo **Buscar jogo...** filtra temporários, permanentes e destaques (case insensitive).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-019 — Destaques itch.io e EA App

### CT-RN-PROMO-019-F — Feliz: Destaques itch.io e EA App

**Camada:** Feliz · **Regra:** `RN-PROMO-019` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Deals nessas lojas. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Confirmar que itch não repete no grid principal.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seções **Grátis na itch.io** / **Grátis na EA** (ou equivalente). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-019-N — Negativo: Destaques itch.io e EA App — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-019` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Deals nessas lojas. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Deals nessas lojas..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-019-E — Exploratório: Destaques itch.io e EA App — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-019` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Deals nessas lojas. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Destaques itch.io e EA App.<br>**Contexto:** Com filtro **Todas** e sem busca, ofertas itch.io e EA App podem aparecer em seções colapsáveis próprias, removidas do bloco principal para não duplicar.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-020 — Agrupamento por loja

### CT-RN-PROMO-020-F — Feliz: Agrupamento por loja

**Camada:** Feliz · **Regra:** `RN-PROMO-020` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias lojas. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Ver aba Grátis com muitas fontes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Subtítulos EPIC, STEAM, etc., cada um com grid. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-020-N — Negativo: Agrupamento por loja — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-020` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Várias lojas. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Várias lojas..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-020-E — Exploratório: Agrupamento por loja — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-020` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Várias lojas. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Agrupamento por loja.<br>**Contexto:** Com **Todas** plataformas, lista principal agrupa subtítulos por loja (uppercase).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-021 — Contador na aba Grátis

### CT-RN-PROMO-021-F — Feliz: Contador na aba Grátis

**Camada:** Feliz · **Regra:** `RN-PROMO-021` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Busca ativa. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Buscar título raro.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Badge diminui. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-021-N — Negativo: Contador na aba Grátis — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-021` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Busca ativa. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Busca ativa..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-021-E — Exploratório: Contador na aba Grátis — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-021` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Busca ativa. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Contador na aba Grátis.<br>**Contexto:** Número ao lado do nome da aba reflete ofertas grátis **após** filtro de plataforma e busca.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-022 — Vazio grátis

### CT-RN-PROMO-022-F — Feliz: Vazio grátis

**Camada:** Feliz · **Regra:** `RN-PROMO-022` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista filtrada vazia. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Filtrar loja sem giveaways.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mensagens específicas por seção. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-022-N — Negativo: Vazio grátis — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-PROMO-022` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Lista filtrada vazia. |
| Passos | 1. Abrir o site e navegar até **Promoções** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Mensagens específicas por seção. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-022-E — Exploratório: Vazio grátis — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-022` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Lista filtrada vazia. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Vazio grátis.<br>**Contexto:** Sem temporários ou sem permanentes.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-023 — Ordenação padrão promo

### CT-RN-PROMO-023-F — Feliz: Ordenação padrão promo

**Camada:** Feliz · **Regra:** `RN-PROMO-023` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Promoções. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Usar select de ordenação.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Trocar para **Maior desconto** reordena grid. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-023-N — Negativo: Ordenação padrão promo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-023` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Aba Promoções. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Aba Promoções..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-023-E — Exploratório: Ordenação padrão promo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-023` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Aba Promoções. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Ordenação padrão promo.<br>**Contexto:** **Popularidade** (melhor avaliação de deal).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-024 — Faixa catálogo Steam

### CT-RN-PROMO-024-F — Feliz: Faixa catálogo Steam

**Camada:** Feliz · **Regra:** `RN-PROMO-024` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Pelo menos um jogo Orbe em promo na Steam. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Abrir Promoções com catálogo em promo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seção com link **Ver aba Em Alta →**. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-024-N — Negativo: Faixa catálogo Steam — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-024` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Pelo menos um jogo Orbe em promo na Steam. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Pelo menos um jogo Orbe em promo na Steam..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-024-E — Exploratório: Faixa catálogo Steam — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-024` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Pelo menos um jogo Orbe em promo na Steam. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Faixa catálogo Steam.<br>**Contexto:** Carrossel no topo quando há jogos do catálogo Orbe em desconto na Steam.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-025 — Carregar mais

### CT-RN-PROMO-025-F — Feliz: Carregar mais

**Camada:** Feliz · **Regra:** `RN-PROMO-025` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | >48 promoções. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Buscar título → botão ausente.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | **Carregar mais promoções** append cards; com busca o botão some. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-025-N — Negativo: Carregar mais — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-025` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: >48 promoções. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: >48 promoções..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-025-E — Exploratório: Carregar mais — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-025` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | >48 promoções. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Carregar mais.<br>**Contexto:** Botão só com filtro **Todas**, sem busca, e quando ainda há páginas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-026 — Contador aba Promoções

### CT-RN-PROMO-026-F — Feliz: Contador aba Promoções

**Camada:** Feliz · **Regra:** `RN-PROMO-026` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro plataforma. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Filtrar Epic.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Número atualiza. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-026-N — Negativo: Contador aba Promoções — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-026` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro plataforma. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtro plataforma..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-026-E — Exploratório: Contador aba Promoções — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-026` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro plataforma. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Contador aba Promoções.<br>**Contexto:** Badge = ofertas ao vivo filtradas + itens do carrossel catálogo Steam filtrados.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-027 — Wishlist Steam (em breve)

### CT-RN-PROMO-027-F — Feliz: Wishlist Steam (em breve)

**Camada:** Feliz · **Regra:** `RN-PROMO-027` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Aba Promoções visível. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Ler bloco no topo da aba.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Texto **Lista de desejos Steam (em breve)**. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-027-N — Negativo: Wishlist Steam (em breve) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-027` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Aba Promoções visível. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Aba Promoções visível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-027-E — Exploratório: Wishlist Steam (em breve) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-027` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Aba Promoções visível. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Wishlist Steam (em breve).<br>**Contexto:** Caixa tracejada informativa, **sem** botão funcional de login Steam.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-028 — Em Alta embutido

### CT-RN-PROMO-028-F — Feliz: Em Alta embutido

**Camada:** Feliz · **Regra:** `RN-PROMO-028` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Tab `em-alta`. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Abrir aba Em Alta.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ver regras RN-JOGOS-019–029 em `05-JOGOS.md`. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-028-N — Negativo: Em Alta embutido — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-028` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Tab `em-alta`. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Tab `em-alta`..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-028-E — Exploratório: Em Alta embutido — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-028` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Tab `em-alta`. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Em Alta embutido.<br>**Contexto:** Mesmo conteúdo de jogos em alta (Top da Semana, Steam, plataformas…) em modo compacto + banner para promoções.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-029 — Bookmark antigo

### CT-RN-PROMO-029-F — Feliz: Bookmark antigo

**Camada:** Feliz · **Regra:** `RN-PROMO-029` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | URL legada. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Acessar URL antiga.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Endereço final `?tab=em-alta`. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-029-N — Negativo: Bookmark antigo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-029` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: URL legada. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: URL legada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-029-E — Exploratório: Bookmark antigo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-029` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | URL legada. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Bookmark antigo.<br>**Contexto:** `/jogos-em-alta` redireciona para esta aba.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-030 — Atualizar agora

### CT-RN-PROMO-030-F — Feliz: Atualizar agora

**Camada:** Feliz · **Regra:** `RN-PROMO-030` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Botão no hero. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Clicar em Grátis vs Em Alta.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Spinner no ícone; horário atualiza (abas de deal). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-030-N — Negativo: Atualizar agora — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-030` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Botão no hero. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Botão no hero..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-030-E — Exploratório: Atualizar agora — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-030` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Botão no hero. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Atualizar agora.<br>**Contexto:** Recarrega aba ativa **Grátis** ou **Promoções**; **Em Alta** não usa este botão para ofertas de loja.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-031 — Erro global de ofertas

### CT-RN-PROMO-031-F — Feliz: Erro global de ofertas

**Camada:** Feliz · **Regra:** `RN-PROMO-031` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Indisponibilidade. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Simular falha.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | **Não foi possível carregar promoções e jogos grátis.** + **Tentar novamente**. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-031-N — Negativo: Erro global de ofertas — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-PROMO-031` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Indisponibilidade. |
| Passos | 1. Abrir o site e navegar até **Promoções** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | **Não foi possível carregar promoções e jogos grátis.** + **Tentar novamente**. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-031-E — Exploratório: Erro global de ofertas — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-031` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Indisponibilidade. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Erro global de ofertas.<br>**Contexto:** Falha ao buscar grátis/promo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-032 — Skeleton inicial

### CT-RN-PROMO-032-F — Feliz: Skeleton inicial

**Camada:** Feliz · **Regra:** `RN-PROMO-032` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede lenta, aba ≠ Em Alta. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Throttle + abrir Promoções.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Skeleton antes dos cards reais. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-032-N — Negativo: Skeleton inicial — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-032` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Rede lenta, aba ≠ Em Alta. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Rede lenta, aba ≠ Em Alta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-032-E — Exploratório: Skeleton inicial — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-032` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Rede lenta, aba ≠ Em Alta. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Skeleton inicial.<br>**Contexto:** Primeira carga de Grátis/Promo mostra 12 placeholders shimmer.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-033 — Banner de degradação

### CT-RN-PROMO-033-F — Feliz: Banner de degradação

**Camada:** Feliz · **Regra:** `RN-PROMO-033` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Fontes parciais down. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Ambiente degradado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Banner âmbar/vermelho. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-033-N — Negativo: Banner de degradação — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-PROMO-033` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Fontes parciais down. |
| Passos | 1. Abrir o site e navegar até **Promoções** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Banner âmbar/vermelho. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-033-E — Exploratório: Banner de degradação — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-033` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Fontes parciais down. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Banner de degradação.<br>**Contexto:** Mesmo RN-PROMO-010 — lista fontes com falha.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-034 — Rodapé de fontes

### CT-RN-PROMO-034-F — Feliz: Rodapé de fontes

**Camada:** Feliz · **Regra:** `RN-PROMO-034` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Após load grátis/promo. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Comparar com quantidade visível.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Linha **Fontes:** Epic (n), Steam (n)… |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-034-N — Negativo: Rodapé de fontes — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-PROMO-034` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Após load grátis/promo. |
| Passos | 1. Abrir o site e navegar até **Promoções** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Linha **Fontes:** Epic (n), Steam (n)… |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-034-E — Exploratório: Rodapé de fontes — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-034` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Após load grátis/promo. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Rodapé de fontes.<br>**Contexto:** Contagens por loja com cor verde (ok) ou vermelho (erro).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-PROMO-035 — Tamanho da primeira página promo

### CT-RN-PROMO-035-F — Feliz: Tamanho da primeira página promo

**Camada:** Feliz · **Regra:** `RN-PROMO-035` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Muitas ofertas. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Contar antes de carregar mais.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grid inicial ~48; botão carrega resto. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-035-N — Negativo: Tamanho da primeira página promo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-PROMO-035` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Muitas ofertas. |
| Passos | 1. Abrir o site e navegar até **Promoções**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Muitas ofertas..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-PROMO-035-E — Exploratório: Tamanho da primeira página promo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-PROMO-035` · **Tela:** Promoções

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Muitas ofertas. |
| Passos | **Charter (15 min)** — área: **Promoções** · regra: Tamanho da primeira página promo.<br>**Contexto:** Primeira leva de **Ofertas ao vivo** alinhada a ~48 itens antes de **Carregar mais**.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |
