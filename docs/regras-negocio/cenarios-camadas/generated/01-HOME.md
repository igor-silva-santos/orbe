# Camadas — Página inicial

**Inventário:** `01-HOME.md` · **Cenários:** 231

---

## RN-HOME-001 — Ordem das seções

### CT-RN-HOME-001-F — Feliz: Ordem das seções

**Camada:** Feliz · **Regra:** `RN-HOME-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página inicial carregada com sucesso. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Abrir a página inicial e rolar devagar.<br>3. Conferir a ordem.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Do topo para baixo: mensagem de boas-vindas → (opcional) Continuar assistindo → Filmes → Séries → Animes → Jogos. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-001-N — Negativo: Ordem das seções — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página inicial carregada com sucesso. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página inicial carregada com sucesso..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-001-E — Exploratório: Ordem das seções — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página inicial carregada com sucesso. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Ordem das seções.<br>**Contexto:** A página segue uma ordem fixa de blocos de cima para baixo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-002 — Título da faixa leva à listagem

### CT-RN-HOME-002-F — Feliz: Título da faixa leva à listagem

**Camada:** Feliz · **Regra:** `RN-HOME-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página inicial visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Clicar em cada título de faixa e verificar a página de destino.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ao clicar no título “Filmes”, o usuário vai para a página de listagem de filmes; o mesmo padrão para Séries, Animes e Jogos. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-002-N — Negativo: Título da faixa leva à listagem — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página inicial visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página inicial visível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-002-E — Exploratório: Título da faixa leva à listagem — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página inicial visível. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Título da faixa leva à listagem.<br>**Contexto:** O nome de cada faixa (Filmes, Séries, etc.) funciona como atalho.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-003 — Página não “quebra” sem conteúdo

### CT-RN-HOME-003-F — Feliz: Página não “quebra” sem conteúdo

**Camada:** Feliz · **Regra:** `RN-HOME-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Simular rede lenta ou catálogo vazio no primeiro carregamento. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Throttle de rede ou ambiente de teste vazio.<br>3. Abrir a página inicial.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Não aparece tela de erro do navegador; faixas e controles continuam; carrosséis podem mostrar placeholders e depois preencher ao rolar. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-003-N — Negativo: Página não “quebra” sem conteúdo — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-HOME-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Simular rede lenta ou catálogo vazio no primeiro carregamento. |
| Passos | 1. Abrir o site e navegar até **Página inicial** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Não aparece tela de erro do navegador; faixas e controles continuam; carrosséis podem mostrar placeholders e depois preencher ao rolar. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-003-E — Exploratório: Página não “quebra” sem conteúdo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Simular rede lenta ou catálogo vazio no primeiro carregamento. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Página não “quebra” sem conteúdo.<br>**Contexto:** Se no primeiro momento não houver títulos para mostrar, a estrutura da página continua aparecendo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-004 — Carregamento tardio das faixas

### CT-RN-HOME-004-F — Feliz: Carregamento tardio das faixas

**Camada:** Feliz · **Regra:** `RN-HOME-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário abre a página e fica só no topo (boas-vindas). |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Abrir a página, não rolar: observar rede/atividade.<br>3. Rolar até cada faixa.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ao rolar até Filmes/Jogos/Séries/Animes, novos cards ou animação de carregamento podem aparecer; não é obrigatório tudo carregar antes de rolar. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-004-N — Negativo: Carregamento tardio das faixas — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário abre a página e fica só no topo (boas-vindas). |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário abre a página e fica só no topo (boas-vindas)..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-004-E — Exploratório: Carregamento tardio das faixas — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário abre a página e fica só no topo (boas-vindas). |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Carregamento tardio das faixas.<br>**Contexto:** Filmes e jogos podem começar a buscar mais títulos quando o usuário se aproxima da faixa; séries e animes quando a própria faixa entra na área visível.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-AC-001 — Dois modos: estreias e semana

### CT-RN-HOME-AC-001-F — Feliz: Dois modos: estreias e semana

**Camada:** Feliz · **Regra:** `RN-HOME-AC-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Faixa Animes visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Clicar alternância calendário/lista.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Botões/ícones alternam entre modos; título do carrossel muda (temporada vs dia da semana). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-001-N — Negativo: Dois modos: estreias e semana — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-AC-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Faixa Animes visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Faixa Animes visível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-001-E — Exploratório: Dois modos: estreias e semana — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-AC-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Faixa Animes visível. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Dois modos: estreias e semana.<br>**Contexto:** A faixa Animes permite alternar entre visão por **temporada/estreias** e **agenda da semana** (por dia).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-AC-002 — Modo inicial automático

### CT-RN-HOME-AC-002-F — Feliz: Modo inicial automático

**Camada:** Feliz · **Regra:** `RN-HOME-AC-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Data de teste no fim vs início da temporada. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Testar em duas datas da mesma temporada.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Modo inicial diferente; só na primeira visita (escolha manual depois é mantida). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-002-N — Negativo: Modo inicial automático — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-AC-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Data de teste no fim vs início da temporada. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Data de teste no fim vs início da temporada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-002-E — Exploratório: Modo inicial automático — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-AC-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Data de teste no fim vs início da temporada. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Modo inicial automático.<br>**Contexto:** Na **quarta semana em diante** da temporada corrente, a página pode abrir já na agenda semanal; no início da temporada, abre em estreias.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-AC-003 — Estreias: temporada atual

### CT-RN-HOME-AC-003-F — Feliz: Estreias: temporada atual

**Camada:** Feliz · **Regra:** `RN-HOME-AC-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo estreias, temporada corrente. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Ler título da faixa.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Copy com nome da estação e ano. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-003-N — Negativo: Estreias: temporada atual — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-AC-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modo estreias, temporada corrente. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modo estreias, temporada corrente..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-003-E — Exploratório: Estreias: temporada atual — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-AC-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modo estreias, temporada corrente. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Estreias: temporada atual.<br>**Contexto:** No modo estreias, título indica estreias da temporada/ano (ex.: “Estreias de Verão 2026”).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-AC-004 — Estreias: posição inicial

### CT-RN-HOME-AC-004-F — Feliz: Estreias: posição inicial

**Camada:** Feliz · **Regra:** `RN-HOME-AC-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Animes com datas na temporada. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Abrir home e ver card central.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Card central coerente com “próximo” na data de hoje. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-004-N — Negativo: Estreias: posição inicial — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-AC-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Animes com datas na temporada. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Animes com datas na temporada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-004-E — Exploratório: Estreias: posição inicial — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-AC-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Animes com datas na temporada. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Estreias: posição inicial.<br>**Contexto:** Foco no próximo anime a estrear (ou último já estreado na temporada).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-AC-005 — Agenda semanal: só com episódio marcado

### CT-RN-HOME-AC-005-F — Feliz: Agenda semanal: só com episódio marcado

**Camada:** Feliz · **Regra:** `RN-HOME-AC-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo semana. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Ativar modo semana em temporada ativa.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Separadores “Segunda”, “Terça”, etc., com cards abaixo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-005-N — Negativo: Agenda semanal: só com episódio marcado — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-AC-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modo semana. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modo semana..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-005-E — Exploratório: Agenda semanal: só com episódio marcado — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-AC-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modo semana. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Agenda semanal: só com episódio marcado.<br>**Contexto:** No modo semana, entram animes que têm **próximo episódio** agendado; agrupados por dia da semana.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-AC-006 — Agenda: abrir no dia de hoje

### CT-RN-HOME-AC-006-F — Feliz: Agenda: abrir no dia de hoje

**Camada:** Feliz · **Regra:** `RN-HOME-AC-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo semana com episódios na semana. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Abrir modo semana no meio da semana.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Separador do dia atual visível/central. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-006-N — Negativo: Agenda: abrir no dia de hoje — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-AC-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modo semana com episódios na semana. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modo semana com episódios na semana..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-006-E — Exploratório: Agenda: abrir no dia de hoje — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-AC-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modo semana com episódios na semana. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Agenda: abrir no dia de hoje.<br>**Contexto:** Ao entrar no modo semana, o foco vai para o separador do **dia da semana de hoje**.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-AC-007 — Trocar temporada

### CT-RN-HOME-AC-007-F — Feliz: Trocar temporada

**Camada:** Feliz · **Regra:** `RN-HOME-AC-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo estreias. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Avançar para próxima temporada.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Novos cards após breve carregamento se a temporada ainda não estava aberta. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-007-N — Negativo: Trocar temporada — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-AC-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modo estreias. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modo estreias..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-007-E — Exploratório: Trocar temporada — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-AC-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modo estreias. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Trocar temporada.<br>**Contexto:** Setas mudam ano/temporada (Inverno, Primavera, Verão, Outono).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-AC-008 — Em alta em animes

### CT-RN-HOME-AC-008-F — Feliz: Em alta em animes

**Camada:** Feliz · **Regra:** `RN-HOME-AC-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Em alta ligado na faixa Animes. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Toggle Em alta em Animes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Lista por popularidade; filtros de formato/adulto aplicados na exibição. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-008-N — Negativo: Em alta em animes — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-AC-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Em alta ligado na faixa Animes. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Em alta ligado na faixa Animes..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-008-E — Exploratório: Em alta em animes — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-AC-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Em alta ligado na faixa Animes. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Em alta em animes.<br>**Contexto:** Modo destaque lista animes populares (sem eixo de temporada).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-AC-009 — Fixar na semana (logado)

### CT-RN-HOME-AC-009-F — Feliz: Fixar na semana (logado)

**Camada:** Feliz · **Regra:** `RN-HOME-AC-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado, card de anime. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Fixar e ver pin.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Opção no menu ⋮; ícone de pin no card quando fixado. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-009-N — Negativo: Fixar na semana (logado) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-AC-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado, card de anime. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado, card de anime..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-009-E — Exploratório: Fixar na semana (logado) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-AC-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado, card de anime. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Fixar na semana (logado).<br>**Contexto:** Usuário logado pode fixar anime no menu do card para destacar na semana.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-AC-010 — Loop na agenda semanal

### CT-RN-HOME-AC-010-F — Feliz: Loop na agenda semanal

**Camada:** Feliz · **Regra:** `RN-HOME-AC-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo semana ativo. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Rolar até o fim no modo semana.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Comportamento de carrossel em loop (diferente do modo estreias). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-010-N — Negativo: Loop na agenda semanal — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-AC-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modo semana ativo. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modo semana ativo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-AC-010-E — Exploratório: Loop na agenda semanal — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-AC-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modo semana ativo. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Loop na agenda semanal.<br>**Contexto:** No modo semana, a rolagem pode ser contínua (volta ao início).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CA-001 — Bloco só para usuário logado

### CT-RN-HOME-CA-001-F — Feliz: Bloco só para usuário logado

**Camada:** Feliz · **Regra:** `RN-HOME-CA-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário **não** está logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Abrir a página em anônimo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Nenhum bloco “Continuar assistindo” entre o hero e Filmes. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-001-N — Negativo: Bloco só para usuário logado — sem a condição exigida

**Camada:** Negativo · **Regra:** `RN-HOME-CA-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário **não** está logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Usar usuário, dado ou estado **sem** a condição da regra (ex.: não logado se a regra exige login).<br>3. Repetir a mesma ação do caminho feliz.<br>4. Verificar que o elemento/comportamento **não** aparece ou permanece desabilitado. |
| Resultado_Esperado | O resultado feliz **não** ocorre; a tela permanece coerente (sem vazamento indevido). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-001-E — Exploratório: Bloco só para usuário logado — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CA-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário **não** está logado. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Bloco só para usuário logado.<br>**Contexto:** A faixa “Continuar assistindo” não aparece para visitante.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CA-002 — Bloco oculto sem itens

### CT-RN-HOME-CA-002-F — Feliz: Bloco oculto sem itens

**Camada:** Feliz · **Regra:** `RN-HOME-CA-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado, sem animes em progresso na lista. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Conta sem itens “continuar”/“seguir”.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seção ausente. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-002-N — Negativo: Bloco oculto sem itens — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOME-CA-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado, sem animes em progresso na lista. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-002-E — Exploratório: Bloco oculto sem itens — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CA-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado, sem animes em progresso na lista. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Bloco oculto sem itens.<br>**Contexto:** Se o usuário logado não tem nada para continuar, a faixa some.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CA-003 — Até dez títulos

### CT-RN-HOME-CA-003-F — Feliz: Até dez títulos

**Camada:** Feliz · **Regra:** `RN-HOME-CA-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado com mais de dez animes em progresso. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Conta com 11+ itens.<br>3. Contar cards.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só os dez primeiros (ordem de uso recente) aparecem na home. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-003-N — Negativo: Até dez títulos — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CA-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado com mais de dez animes em progresso. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado com mais de dez animes em progresso..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-003-E — Exploratório: Até dez títulos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CA-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado com mais de dez animes em progresso. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Até dez títulos.<br>**Contexto:** Quando há itens, no máximo dez cards na faixa horizontal.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CA-004 — Card mostra temporada e episódio

### CT-RN-HOME-CA-004-F — Feliz: Card mostra temporada e episódio

**Camada:** Feliz · **Regra:** `RN-HOME-CA-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Pelo menos um item na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Ler um card qualquer.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Texto no formato “S{n} · E{n}” (temporada e episódio). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-004-N — Negativo: Card mostra temporada e episódio — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CA-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Pelo menos um item na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Pelo menos um item na faixa..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-004-E — Exploratório: Card mostra temporada e episódio — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CA-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Pelo menos um item na faixa. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Card mostra temporada e episódio.<br>**Contexto:** Cada card exibe temporada e número do episódio.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CA-005 — Tempo restante

### CT-RN-HOME-CA-005-F — Feliz: Tempo restante

**Camada:** Feliz · **Regra:** `RN-HOME-CA-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item com progresso parcial no episódio. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Item com episódio pela metade.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Linha com tempo restante abaixo do título. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-005-N — Negativo: Tempo restante — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CA-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Item com progresso parcial no episódio. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Item com progresso parcial no episódio..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-005-E — Exploratório: Tempo restante — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CA-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Item com progresso parcial no episódio. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Tempo restante.<br>**Contexto:** Se houver tempo restante do episódio, aparece texto “Restam …”.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CA-006 — Abrir no streaming

### CT-RN-HOME-CA-006-F — Feliz: Abrir no streaming

**Camada:** Feliz · **Regra:** `RN-HOME-CA-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item com link de streaming associado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Clicar card com link.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Nova aba do navegador no serviço de streaming. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-006-N — Negativo: Abrir no streaming — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CA-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Item com link de streaming associado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Item com link de streaming associado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-006-E — Exploratório: Abrir no streaming — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CA-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Item com link de streaming associado. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Abrir no streaming.<br>**Contexto:** Se o sistema tem link do Crunchyroll para aquele item, o clique abre em nova aba.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CA-007 — Sem link vai à minha lista

### CT-RN-HOME-CA-007-F — Feliz: Sem link vai à minha lista

**Camada:** Feliz · **Regra:** `RN-HOME-CA-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item sem URL de streaming. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Clicar card sem link externo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Navega para minha lista de animes na mesma aba. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-007-N — Negativo: Sem link vai à minha lista — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CA-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Item sem URL de streaming. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Item sem URL de streaming..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-007-E — Exploratório: Sem link vai à minha lista — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CA-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Item sem URL de streaming. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Sem link vai à minha lista.<br>**Contexto:** Sem link externo, o clique leva à área de animes da minha lista.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CA-008 — “Ver todos”

### CT-RN-HOME-CA-008-F — Feliz: “Ver todos”

**Camada:** Feliz · **Regra:** `RN-HOME-CA-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Faixa visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Clicar “Ver todos”.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Abre minha lista de animes. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-008-N — Negativo: “Ver todos” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CA-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Faixa visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Faixa visível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CA-008-E — Exploratório: “Ver todos” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CA-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Faixa visível. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: “Ver todos”.<br>**Contexto:** Link no canto da faixa leva à listagem completa de animes da minha lista.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-001 — Abrir detalhe

### CT-RN-HOME-CARD-001-F — Feliz: Abrir detalhe

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Clicar poster/título.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Modal com sinopse, datas, links, etc. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-001-N — Negativo: Abrir detalhe — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Card visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Card visível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-001-E — Exploratório: Abrir detalhe — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Card visível. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Abrir detalhe.<br>**Contexto:** Toque/clique no card abre painel de detalhe do título (modal).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-002 — Menu ⋮

### CT-RN-HOME-CARD-002-F — Feliz: Menu ⋮

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Abrir menu.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Menu com favoritar, quero assistir, etc. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-002-N — Negativo: Menu ⋮ — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Card visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Card visível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-002-E — Exploratório: Menu ⋮ — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Card visível. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Menu ⋮.<br>**Contexto:** Botão de três pontos abre menu de ações sem sair da home.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-003 — Fechar menu ao clicar fora

### CT-RN-HOME-CARD-003-F — Feliz: Fechar menu ao clicar fora

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Menu aberto. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Clicar área vazia.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Menu some. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-003-N — Negativo: Fechar menu ao clicar fora — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Menu aberto. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-003-E — Exploratório: Fechar menu ao clicar fora — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Menu aberto. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Fechar menu ao clicar fora.<br>**Contexto:** Clicar fora do menu fecha o menu.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-004 — Favoritar / quero assistir

### CT-RN-HOME-CARD-004-F — Feliz: Favoritar / quero assistir

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Favoritar e recarregar página logado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Estado ativo reflete no menu; indicador no card se aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-004-N — Negativo: Favoritar / quero assistir — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-004-E — Exploratório: Favoritar / quero assistir — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Favoritar / quero assistir.<br>**Contexto:** Ações gravam na conta do usuário quando logado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-005 — Visitante não grava

### CT-RN-HOME-CARD-005-F — Feliz: Visitante não grava

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Não logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Favoritar deslogado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Aviso; nada salvo. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-005-N — Negativo: Visitante não grava — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Não logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Não logado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-005-E — Exploratório: Visitante não grava — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Não logado. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Visitante não grava.<br>**Contexto:** Sem login, ações de lista pedem entrada na conta (mensagem).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-006 — Acompanhando (série/anime)

### CT-RN-HOME-CARD-006-F — Feliz: Acompanhando (série/anime)

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card série ou anime. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Abrir menu em série.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Item “Acompanhando” no menu. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-006-N — Negativo: Acompanhando (série/anime) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Card série ou anime. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Card série ou anime..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-006-E — Exploratório: Acompanhando (série/anime) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Card série ou anime. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Acompanhando (série/anime).<br>**Contexto:** Opção extra para série e anime.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-007 — Já assisti / já joguei

### CT-RN-HOME-CARD-007-F — Feliz: Já assisti / já joguei

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme/jogo futuro. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Tentar em estreia futura.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Opção desabilitada ou sem efeito. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-007-N — Negativo: Já assisti / já joguei — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme/jogo futuro. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme/jogo futuro..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-007-E — Exploratório: Já assisti / já joguei — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme/jogo futuro. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Já assisti / já joguei.<br>**Contexto:** Só disponível se o título **já foi lançado** (data de lançamento no passado).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-008 — Avaliar ao marcar visto

### CT-RN-HOME-CARD-008-F — Feliz: Avaliar ao marcar visto

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lançado, logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Marcar já assisti em filme antigo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Modal de avaliação. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-008-N — Negativo: Avaliar ao marcar visto — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Lançado, logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Lançado, logado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-008-E — Exploratório: Avaliar ao marcar visto — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Lançado, logado. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Avaliar ao marcar visto.<br>**Contexto:** Ao marcar já assisti/joguei em título lançado, abre fluxo de **nota** antes de concluir.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-009 — Etiqueta de status — filme

### CT-RN-HOME-CARD-009-F — Feliz: Etiqueta de status — filme

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filmes com flags diferentes. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Comparar filme em cartaz vs streaming.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Uma etiqueta principal por card. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-009-N — Negativo: Etiqueta de status — filme — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filmes com flags diferentes. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filmes com flags diferentes..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-009-E — Exploratório: Etiqueta de status — filme — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filmes com flags diferentes. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Etiqueta de status — filme.<br>**Contexto:** Ordem de prioridade visual: **Pré-venda** → **Em cartaz** → **No streaming** (após lançamento) → **Em breve**.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-010 — Etiqueta — série/anime

### CT-RN-HOME-CARD-010-F — Feliz: Etiqueta — série/anime

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Episódio exibido há menos de 24h. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Testar dia após estreia de ep.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | “NOVO EP” visível. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-010-N — Negativo: Etiqueta — série/anime — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Episódio exibido há menos de 24h. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Episódio exibido há menos de 24h..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-010-E — Exploratório: Etiqueta — série/anime — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Episódio exibido há menos de 24h. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Etiqueta — série/anime.<br>**Contexto:** **Novo ep** (24h) → **Em exibição** → **Em breve** → **No streaming**.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-011 — Novo ep: regra de 24h

### CT-RN-HOME-CARD-011-F — Feliz: Novo ep: regra de 24h

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-011` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ep entre 1h e 24h atrás. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Esperar ou simular data.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Etiqueta presente; após 24h some. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-011-N — Negativo: Novo ep: regra de 24h — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-011` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Ep entre 1h e 24h atrás. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Ep entre 1h e 24h atrás..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-011-E — Exploratório: Novo ep: regra de 24h — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-011` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Ep entre 1h e 24h atrás. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Novo ep: regra de 24h.<br>**Contexto:** “Novo ep” usa data do último episódio (série) ou regra equivalente no anime.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-012 — Dublagem no anime

### CT-RN-HOME-CARD-012-F — Feliz: Dublagem no anime

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-012` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com dublagem BR cadastrada. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Comparar com título só legendado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | “Dublado” no card. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-012-N — Negativo: Dublagem no anime — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-012` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anime com dublagem BR cadastrada. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Anime com dublagem BR cadastrada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-012-E — Exploratório: Dublagem no anime — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-012` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anime com dublagem BR cadastrada. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Dublagem no anime.<br>**Contexto:** Texto **Dublado** ou **Legendado** vem da informação oficial do título, não da lista de elenco no card.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-013 — Contagem para próximo episódio

### CT-RN-HOME-CARD-013-F — Feliz: Contagem para próximo episódio

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-013` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série/anime com próximo ep futuro. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Card com ep amanhã vs hoje à noite.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Texto com dias/horas; abaixo de 1 dia atualiza mais frequentemente. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-013-N — Negativo: Contagem para próximo episódio — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-013` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série/anime com próximo ep futuro. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série/anime com próximo ep futuro..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-013-E — Exploratório: Contagem para próximo episódio — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-013` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série/anime com próximo ep futuro. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Contagem para próximo episódio.<br>**Contexto:** Rodapé do card pode mostrar contagem regressiva para o próximo episódio.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-014 — Saga em filme

### CT-RN-HOME-CARD-014-F — Feliz: Saga em filme

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-014` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com saga. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Clicar saga vs poster.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Link de saga; clique **não** abre o modal (só o link). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-014-N — Negativo: Saga em filme — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-014` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme com saga. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme com saga..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-014-E — Exploratório: Saga em filme — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-014` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme com saga. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Saga em filme.<br>**Contexto:** Filme parte de saga pode mostrar atalho para página de continuações.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-015 — Conteúdo adulto no poster

### CT-RN-HOME-CARD-015-F — Feliz: Conteúdo adulto no poster

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-015` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Título marcado adulto ainda permitido. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Hover no card adulto.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Blur no poster. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-015-N — Negativo: Conteúdo adulto no poster — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-015` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Título marcado adulto ainda permitido. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Título marcado adulto ainda permitido..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-015-E — Exploratório: Conteúdo adulto no poster — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-015` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Título marcado adulto ainda permitido. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Conteúdo adulto no poster.<br>**Contexto:** Poster de título adulto aparece desfocado até passar o mouse (desktop) ou interação equivalente.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-016 — Indicador na minha lista

### CT-RN-HOME-CARD-016-F — Feliz: Indicador na minha lista

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-016` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado com item na lista. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Favoritar e olhar o card.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Borda ou pill de destaque. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-016-N — Negativo: Indicador na minha lista — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-016` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado com item na lista. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado com item na lista..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-016-E — Exploratório: Indicador na minha lista — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-016` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado com item na lista. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Indicador na minha lista.<br>**Contexto:** Logado com favorito/quero/acompanhando, o card pode mostrar marca visual de lista.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CARD-017 — Ocultar título

### CT-RN-HOME-CARD-017-F — Feliz: Ocultar título

**Camada:** Feliz · **Regra:** `RN-HOME-CARD-017` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Ocultar e buscar de novo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Título some das listas personalizadas subsequentes. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-017-N — Negativo: Ocultar título — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOME-CARD-017` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CARD-017-E — Exploratório: Ocultar título — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CARD-017` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Ocultar título.<br>**Contexto:** “Não me interessa” remove o título das recomendações pessoais conforme política da conta.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CON-001 — Foco em lançamentos recentes e próximos

### CT-RN-HOME-CON-001-F — Feliz: Foco em lançamentos recentes e próximos

**Camada:** Feliz · **Regra:** `RN-HOME-CON-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Data de teste conhecida; título com estreia há mais de 90 dias só por reestreia antiga. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Comparar título reestreia antiga na home vs página Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Título muito antigo fora dessa janela **não** aparece no carrossel temporal (pode existir em outras páginas do site). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-001-N — Negativo: Foco em lançamentos recentes e próximos — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOME-CON-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Data de teste conhecida; título com estreia há mais de 90 dias só por reestreia antiga. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-001-E — Exploratório: Foco em lançamentos recentes e próximos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CON-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Data de teste conhecida; título com estreia há mais de 90 dias só por reestreia antiga. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Foco em lançamentos recentes e próximos.<br>**Contexto:** Os três carrosséis priorizam títulos com data de lançamento (ou equivalente) nos **últimos 90 dias** e até o **fim do mês seguinte** ao mês atual — não uma lista infinita de clássicos antigos.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CON-002 — Filmes: sem shows e concertos na faixa

### CT-RN-HOME-CON-002-F — Feliz: Filmes: sem shows e concertos na faixa

**Camada:** Feliz · **Regra:** `RN-HOME-CON-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo com filme de concerto cadastrado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Buscar concerto na página Filmes.<br>3. Verificar ausência na home.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente na faixa Filmes da home. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-002-N — Negativo: Filmes: sem shows e concertos na faixa — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOME-CON-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo com filme de concerto cadastrado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-002-E — Exploratório: Filmes: sem shows e concertos na faixa — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CON-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo com filme de concerto cadastrado. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Filmes: sem shows e concertos na faixa.<br>**Contexto:** Gravações de show, stand-up e concertos ao vivo não devem aparecer nos carrosséis de lançamento da home.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CON-003 — Filmes: curta duração futura

### CT-RN-HOME-CON-003-F — Feliz: Filmes: curta duração futura

**Camada:** Feliz · **Regra:** `RN-HOME-CON-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme futuro com duração de curta-metragem conhecida. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Validar com título de teste curto.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Não aparece no carrossel inicial de filmes. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-003-N — Negativo: Filmes: curta duração futura — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOME-CON-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme futuro com duração de curta-metragem conhecida. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-003-E — Exploratório: Filmes: curta duração futura — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CON-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme futuro com duração de curta-metragem conhecida. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Filmes: curta duração futura.<br>**Contexto:** Filmes de estreia futura com duração conhecida muito curta (abaixo do padrão de “filme de cinema”) não entram na seleção inicial da home.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CON-004 — Filmes: destaques no card

### CT-RN-HOME-CON-004-F — Feliz: Filmes: destaques no card

**Camada:** Feliz · **Regra:** `RN-HOME-CON-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme elegível a destaque na semana/mês. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Comparar cards em destaque na mídia.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Pill ou etiqueta no card além do status normal. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-004-N — Negativo: Filmes: destaques no card — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CON-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme elegível a destaque na semana/mês. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme elegível a destaque na semana/mês..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-004-E — Exploratório: Filmes: destaques no card — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CON-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme elegível a destaque na semana/mês. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Filmes: destaques no card.<br>**Contexto:** Alguns filmes exibem etiqueta extra (ex.: “mais esperado”) conforme regras editoriais do produto.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CON-005 — Séries: data do próximo episódio

### CT-RN-HOME-CON-005-F — Feliz: Séries: data do próximo episódio

**Camada:** Feliz · **Regra:** `RN-HOME-CON-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Série com próximo episódio marcado para data futura. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Série semanal com ep na sexta.<br>3. Conferir posição na sexta.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Card na faixa Séries alinhado ao mês/dia do próximo ep ao rolar a timeline. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-005-N — Negativo: Séries: data do próximo episódio — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CON-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Série com próximo episódio marcado para data futura. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Série com próximo episódio marcado para data futura..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-005-E — Exploratório: Séries: data do próximo episódio — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CON-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Série com próximo episódio marcado para data futura. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Séries: data do próximo episódio.<br>**Contexto:** Série em exibição com episódio futuro aparece posicionada na **data do próximo episódio**, não só na estreia original da série.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CON-006 — Séries: episódio recente

### CT-RN-HOME-CON-006-F — Feliz: Séries: episódio recente

**Camada:** Feliz · **Regra:** `RN-HOME-CON-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Episódio exibido há poucos dias. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Série que estreou ep ontem.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Card ainda visível ao navegar no passado recente do carrossel. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-006-N — Negativo: Séries: episódio recente — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CON-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Episódio exibido há poucos dias. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Episódio exibido há poucos dias..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-006-E — Exploratório: Séries: episódio recente — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CON-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Episódio exibido há poucos dias. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Séries: episódio recente.<br>**Contexto:** Se não há episódio futuro, mas houve episódio nos últimos 90 dias, a série continua na timeline nessa data recente.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CON-007 — Jogos: plataformas no card

### CT-RN-HOME-CON-007-F — Feliz: Jogos: plataformas no card

**Camada:** Feliz · **Regra:** `RN-HOME-CON-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo com várias plataformas. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Inspecionar card de jogo multiplataforma.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Até quatro ícones visíveis no card. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-007-N — Negativo: Jogos: plataformas no card — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-CON-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogo com várias plataformas. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Jogo com várias plataformas..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-007-E — Exploratório: Jogos: plataformas no card — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CON-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogo com várias plataformas. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Jogos: plataformas no card.<br>**Contexto:** Cards de jogos mostram ícones de até quatro plataformas quando disponíveis.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CON-008 — Jogos pouco relevantes

### CT-RN-HOME-CON-008-F — Feliz: Jogos pouco relevantes

**Camada:** Feliz · **Regra:** `RN-HOME-CON-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Jogo obscuro no catálogo. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Comparar com página Jogos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente na faixa Jogos da home. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-008-N — Negativo: Jogos pouco relevantes — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOME-CON-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Jogo obscuro no catálogo. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-008-E — Exploratório: Jogos pouco relevantes — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CON-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Jogo obscuro no catálogo. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Jogos pouco relevantes.<br>**Contexto:** Jogos sem nenhum sinal de interesse (nota, seguidores, expectativa) tendem a não aparecer na seleção da home.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CON-009 — Conteúdo adulto explícito em animes

### CT-RN-HOME-CON-009-F — Feliz: Conteúdo adulto explícito em animes

**Camada:** Feliz · **Regra:** `RN-HOME-CON-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Título adulto no catálogo geral. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Buscar título adulto.<br>3. Verificar home.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente na home; pode ou não aparecer em outras áreas conforme política do site. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-009-N — Negativo: Conteúdo adulto explícito em animes — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOME-CON-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Título adulto no catálogo geral. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-009-E — Exploratório: Conteúdo adulto explícito em animes — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CON-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Título adulto no catálogo geral. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Conteúdo adulto explícito em animes.<br>**Contexto:** Animes classificados como conteúdo adulto explícito (ex.: hentai) não aparecem na faixa Animes da home.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-CON-010 — Animes da temporada e agenda

### CT-RN-HOME-CON-010-F — Feliz: Animes da temporada e agenda

**Camada:** Feliz · **Regra:** `RN-HOME-CON-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime fora de temporada e sem episódio próximo. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Anime antigo fora de exibição.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Pode não aparecer no carregamento inicial. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-010-N — Negativo: Animes da temporada e agenda — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HOME-CON-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anime fora de temporada e sem episódio próximo. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-CON-010-E — Exploratório: Animes da temporada e agenda — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-CON-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anime fora de temporada e sem episódio próximo. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Animes da temporada e agenda.<br>**Contexto:** Na faixa Animes entram títulos da temporada corrente, estreias no mês atual/próximo ou com episódio previsto nas **próximas três semanas**.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-EA-001 — Ativar Em alta

### CT-RN-HOME-EA-001-F — Feliz: Ativar Em alta

**Camada:** Feliz · **Regra:** `RN-HOME-EA-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Faixa Filmes, Séries ou Jogos. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Clicar Em alta na faixa Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Timeline por mês some; cards em ordem de “em alta”; sem separadores de ano TBD. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-EA-001-N — Negativo: Ativar Em alta — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-EA-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Faixa Filmes, Séries ou Jogos. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Faixa Filmes, Séries ou Jogos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-EA-001-E — Exploratório: Ativar Em alta — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-EA-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Faixa Filmes, Séries ou Jogos. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Ativar Em alta.<br>**Contexto:** Botão/controle “Em alta” na faixa troca a lista para destaques de popularidade/expectativa.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-EA-002 — Filmes em alta ≠ populares da página Filmes

### CT-RN-HOME-EA-002-F — Feliz: Filmes em alta ≠ populares da página Filmes

**Camada:** Feliz · **Regra:** `RN-HOME-EA-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo Em alta em Filmes na home. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Comparar os mesmos dias home Em alta vs página Filmes Populares.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ordem/conjunto pode diferir da página Filmes → Populares. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-EA-002-N — Negativo: Filmes em alta ≠ populares da página Filmes — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-EA-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modo Em alta em Filmes na home. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modo Em alta em Filmes na home..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-EA-002-E — Exploratório: Filmes em alta ≠ populares da página Filmes — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-EA-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modo Em alta em Filmes na home. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Filmes em alta ≠ populares da página Filmes.<br>**Contexto:** A lista “Em alta” na home de **filmes** usa critério de **mais esperados** (antecipação de estreia), não o mesmo botão “Populares” da página Filmes.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-EA-003 — Séries e jogos em alta

### CT-RN-HOME-EA-003-F — Feliz: Séries e jogos em alta

**Camada:** Feliz · **Regra:** `RN-HOME-EA-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Modo Em alta ativo. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Ativar Em alta em Séries.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Lista fixa (~dezena de títulos) sem navegação por mês. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-EA-003-N — Negativo: Séries e jogos em alta — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-EA-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Modo Em alta ativo. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Modo Em alta ativo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-EA-003-E — Exploratório: Séries e jogos em alta — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-EA-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Modo Em alta ativo. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Séries e jogos em alta.<br>**Contexto:** Em Séries e Jogos, Em alta mostra títulos em destaque por popularidade/relevância do catálogo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-EA-004 — Início da lista

### CT-RN-HOME-EA-004-F — Feliz: Início da lista

**Camada:** Feliz · **Regra:** `RN-HOME-EA-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Toggle ligado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Ativar e ver posição.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Primeiro slide visível. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-EA-004-N — Negativo: Início da lista — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-EA-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Toggle ligado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Toggle ligado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-EA-004-E — Exploratório: Início da lista — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-EA-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Toggle ligado. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Início da lista.<br>**Contexto:** Ao ativar Em alta, o carrossel vai para o **primeiro** card da lista em alta.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-EA-005 — Desativar volta à timeline

### CT-RN-HOME-EA-005-F — Feliz: Desativar volta à timeline

**Camada:** Feliz · **Regra:** `RN-HOME-EA-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Estava em Em alta. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Ligar e desligar Em alta.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Modo mês retorna; foco próximo lançamento. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-EA-005-N — Negativo: Desativar volta à timeline — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-EA-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Estava em Em alta. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Estava em Em alta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-EA-005-E — Exploratório: Desativar volta à timeline — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-EA-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Estava em Em alta. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Desativar volta à timeline.<br>**Contexto:** Ao desligar Em alta, o carrossel retorna ao modo data e reposiciona no contexto de “hoje”.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-EA-006 — Gênero em Em alta

### CT-RN-HOME-EA-006-F — Feliz: Gênero em Em alta

**Camada:** Feliz · **Regra:** `RN-HOME-EA-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Em alta com vários gêneros. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Filtrar gênero em Em alta.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Dropdown coerente com cards visíveis. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-EA-006-N — Negativo: Gênero em Em alta — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-EA-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Em alta com vários gêneros. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Em alta com vários gêneros..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-EA-006-E — Exploratório: Gênero em Em alta — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-EA-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Em alta com vários gêneros. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Gênero em Em alta.<br>**Contexto:** Filtro de gênero continua disponível e lista só títulos em alta daquele gênero.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-HERO-001 — Botão “Começar agora”

### CT-RN-HOME-HERO-001-F — Feliz: Botão “Começar agora”

**Camada:** Feliz · **Regra:** `RN-HOME-HERO-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página inicial no topo. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Clicar “Começar agora” e verificar scroll até Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ao clicar, a página rola suavemente até a seção Filmes; o endereço do navegador **não** precisa mudar de página. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-HERO-001-N — Negativo: Botão “Começar agora” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-HERO-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página inicial no topo. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página inicial no topo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-HERO-001-E — Exploratório: Botão “Começar agora” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-HERO-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página inicial no topo. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Botão “Começar agora”.<br>**Contexto:** O botão principal leva o usuário à faixa de filmes na mesma página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-HERO-002 — Link “Ver jogos em alta”

### CT-RN-HOME-HERO-002-F — Feliz: Link “Ver jogos em alta”

**Camada:** Feliz · **Regra:** `RN-HOME-HERO-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página inicial no topo. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Clicar no link e conferir aba/conteúdo de em alta.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Abre a página de promoções já na aba/visualização de jogos em alta. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-HERO-002-N — Negativo: Link “Ver jogos em alta” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-HERO-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página inicial no topo. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página inicial no topo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-HERO-002-E — Exploratório: Link “Ver jogos em alta” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-HERO-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página inicial no topo. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Link “Ver jogos em alta”.<br>**Contexto:** O segundo botão abre a área de promoções com foco em jogos em destaque.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-SHELL-001 — Menu superior e busca

### CT-RN-HOME-SHELL-001-F — Feliz: Menu superior e busca

**Camada:** Feliz · **Regra:** `RN-HOME-SHELL-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Qualquer estado de login. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Usar busca e menu no topo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Busca abre overlay; login leva à entrada. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-SHELL-001-N — Negativo: Menu superior e busca — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-SHELL-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Qualquer estado de login. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Qualquer estado de login..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-SHELL-001-E — Exploratório: Menu superior e busca — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-SHELL-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Qualquer estado de login. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Menu superior e busca.<br>**Contexto:** Cabeçalho do site (busca, conta, tema) está presente na home e funciona igual às outras páginas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-SHELL-002 — Sem popup de “consentimento +18”

### CT-RN-HOME-SHELL-002-F — Feliz: Sem popup de “consentimento +18”

**Camada:** Feliz · **Regra:** `RN-HOME-SHELL-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Título adulto permitido. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Navegar home com título adulto.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Apenas blur/exclusão, sem popup dedicado. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-SHELL-002-N — Negativo: Sem popup de “consentimento +18” — sem a condição exigida

**Camada:** Negativo · **Regra:** `RN-HOME-SHELL-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Título adulto permitido. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Usar usuário, dado ou estado **sem** a condição da regra (ex.: não logado se a regra exige login).<br>3. Repetir a mesma ação do caminho feliz.<br>4. Verificar que o elemento/comportamento **não** aparece ou permanece desabilitado. |
| Resultado_Esperado | O resultado feliz **não** ocorre; a tela permanece coerente (sem vazamento indevido). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-SHELL-002-E — Exploratório: Sem popup de “consentimento +18” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-SHELL-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Título adulto permitido. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Sem popup de “consentimento +18”.<br>**Contexto:** Conteúdo adulto é tratado com blur e exclusão de alguns títulos; **não** há janela modal pedindo aceite de conteúdo adulto só na home.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TBD-001 — Separador de ano sem dia

### CT-RN-HOME-TBD-001-F — Feliz: Separador de ano sem dia

**Camada:** Feliz · **Regra:** `RN-HOME-TBD-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Existem títulos com ano mas sem dia/mês confirmado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Rolar até o fim da timeline datada em Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cartão separador + cards desses títulos **depois** da parte datada. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TBD-001-N — Negativo: Separador de ano sem dia — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TBD-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Existem títulos com ano mas sem dia/mês confirmado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Existem títulos com ano mas sem dia/mês confirmado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TBD-001-E — Exploratório: Separador de ano sem dia — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TBD-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Existem títulos com ano mas sem dia/mês confirmado. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Separador de ano sem dia.<br>**Contexto:** Após os títulos com dia definido, o carrossel pode mostrar bloco “Lançamentos de [ano] — sem data confirmada”.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TBD-002 — Título ao focar TBD

### CT-RN-HOME-TBD-002-F — Feliz: Título ao focar TBD

**Camada:** Feliz · **Regra:** `RN-HOME-TBD-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário focou slide TBD. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Focar separador de ano.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Texto “sem data confirmada” no cabeçalho do carrossel. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TBD-002-N — Negativo: Título ao focar TBD — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TBD-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário focou slide TBD. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário focou slide TBD..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TBD-002-E — Exploratório: Título ao focar TBD — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TBD-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário focou slide TBD. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Título ao focar TBD.<br>**Contexto:** Ao parar em um separador ou card “só ano”, o título superior usa a frase de ano sem data confirmada.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TBD-003 — Anos futuros na fila

### CT-RN-HOME-TBD-003-F — Feliz: Anos futuros na fila

**Camada:** Feliz · **Regra:** `RN-HOME-TBD-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Carrossel em modo timeline (não “Em alta”). |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Rolar até virada de ano no carrossel.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ao avançar meses/anos, aparecem novos blocos TBD conforme o ano. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TBD-003-N — Negativo: Anos futuros na fila — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TBD-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Carrossel em modo timeline (não “Em alta”). |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Carrossel em modo timeline (não “Em alta”)..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TBD-003-E — Exploratório: Anos futuros na fila — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TBD-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Carrossel em modo timeline (não “Em alta”). |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Anos futuros na fila.<br>**Contexto:** São reservados espaços para anos do ano corrente até alguns anos à frente (blocos podem ir enchendo ao rolar).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TL-001 — Título do mês no carrossel

### CT-RN-HOME-TL-001-F — Feliz: Título do mês no carrossel

**Camada:** Feliz · **Regra:** `RN-HOME-TL-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Carrossel carregado com pelo menos um título datado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Abrir faixa Filmes e ler o título superior.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Texto em português com mês por extenso. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-001-N — Negativo: Título do mês no carrossel — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TL-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Carrossel carregado com pelo menos um título datado. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Carrossel carregado com pelo menos um título datado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-001-E — Exploratório: Título do mês no carrossel — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TL-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Carrossel carregado com pelo menos um título datado. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Título do mês no carrossel.<br>**Contexto:** Acima dos cards de Filmes/Séries/Jogos aparece um título do tipo “Lançamentos de [mês] de [ano]” conforme o card central/focado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TL-002 — Abrir no próximo lançamento

### CT-RN-HOME-TL-002-F — Feliz: Abrir no próximo lançamento

**Camada:** Feliz · **Regra:** `RN-HOME-TL-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Existe estreia futura na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Abrir home em dia com estreias futuras.<br>3. Ver qual card está ao centro.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Card central (ou focado) é o próximo lançamento, não o primeiro da lista histórica. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-002-N — Negativo: Abrir no próximo lançamento — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TL-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Existe estreia futura na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Existe estreia futura na faixa..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-002-E — Exploratório: Abrir no próximo lançamento — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TL-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Existe estreia futura na faixa. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Abrir no próximo lançamento.<br>**Contexto:** Ao carregar, o carrossel posiciona o foco no **primeiro título com data hoje ou futura** dentro da janela de 90 dias.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TL-003 — Sem futuro: último lançado

### CT-RN-HOME-TL-003-F — Feliz: Sem futuro: último lançado

**Camada:** Feliz · **Regra:** `RN-HOME-TL-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Só passado recente na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Testar em dia sem estreias futuras carregadas.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Foco no lançamento mais recente já ocorrido. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-003-N — Negativo: Sem futuro: último lançado — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TL-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Só passado recente na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Só passado recente na faixa..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-003-E — Exploratório: Sem futuro: último lançado — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TL-003` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Só passado recente na faixa. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Sem futuro: último lançado.<br>**Contexto:** Se não há mais nenhuma data futura na lista carregada, o foco vai para o **último título já lançado** (ainda dentro dos 90 dias).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TL-004 — Série/anime: data do episódio

### CT-RN-HOME-TL-004-F — Feliz: Série/anime: data do episódio

**Camada:** Feliz · **Regra:** `RN-HOME-TL-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card com “próximo episódio” visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Série com nova temporada distante mas ep semanal próximo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Posição no carrossel coerente com a data do episódio, não só estreia da série. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-004-N — Negativo: Série/anime: data do episódio — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TL-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Card com “próximo episódio” visível. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Card com “próximo episódio” visível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-004-E — Exploratório: Série/anime: data do episódio — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TL-004` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Card com “próximo episódio” visível. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Série/anime: data do episódio.<br>**Contexto:** Para séries (e posicionamento equivalente quando o card traz “próximo episódio”), a data usada na timeline é a do **próximo episódio**, se for hoje ou futuro.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TL-005 — Placeholders no início

### CT-RN-HOME-TL-005-F — Feliz: Placeholders no início

**Camada:** Feliz · **Regra:** `RN-HOME-TL-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeiro acesso ou rede lenta. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Recarregar com rede lenta na faixa Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Até ~10 placeholders; depois substituídos por cards reais na posição correta. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-005-N — Negativo: Placeholders no início — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TL-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Primeiro acesso ou rede lenta. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Primeiro acesso ou rede lenta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-005-E — Exploratório: Placeholders no início — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TL-005` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Primeiro acesso ou rede lenta. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Placeholders no início.<br>**Contexto:** Antes de calcular a posição, o usuário pode ver cartões cinza/esqueleto centralizados.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TL-006 — Rolagem horizontal

### CT-RN-HOME-TL-006-F — Feliz: Rolagem horizontal

**Camada:** Feliz · **Regra:** `RN-HOME-TL-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Faixa com vários cards. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Arrastar carrossel e usar setas laterais.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Movimento horizontal; card central em destaque (anel/foco). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-006-N — Negativo: Rolagem horizontal — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TL-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Faixa com vários cards. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Faixa com vários cards..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-006-E — Exploratório: Rolagem horizontal — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TL-006` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Faixa com vários cards. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Rolagem horizontal.<br>**Contexto:** O usuário desliza ou usa setas para ver títulos anteriores e posteriores no tempo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TL-007 — Ctrl + roda do mouse

### CT-RN-HOME-TL-007-F — Feliz: Ctrl + roda do mouse

**Camada:** Feliz · **Regra:** `RN-HOME-TL-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Desktop, foco na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Testar em navegador desktop.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Carrossel muda de slide com Ctrl+scroll. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-007-N — Negativo: Ctrl + roda do mouse — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TL-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Desktop, foco na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Desktop, foco na faixa..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-007-E — Exploratório: Ctrl + roda do mouse — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TL-007` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Desktop, foco na faixa. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Ctrl + roda do mouse.<br>**Contexto:** Com tecla Ctrl pressionada, a roda do mouse no carrossel avança/volta slides (em desktop).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TL-008 — Carregar meses ao navegar

### CT-RN-HOME-TL-008-F — Feliz: Carregar meses ao navegar

**Camada:** Feliz · **Regra:** `RN-HOME-TL-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário rola vários meses para frente ou para trás. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Rolar rapidamente 3–4 meses à frente.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Novos cards aparecem; título do mês no topo atualiza. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-008-N — Negativo: Carregar meses ao navegar — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TL-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário rola vários meses para frente ou para trás. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário rola vários meses para frente ou para trás..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-008-E — Exploratório: Carregar meses ao navegar — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TL-008` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário rola vários meses para frente ou para trás. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Carregar meses ao navegar.<br>**Contexto:** Ao chegar perto do fim ou início de um mês no carrossel, o sistema busca títulos do mês seguinte ou anterior.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TL-009 — Não “pular” ao puxar o passado

### CT-RN-HOME-TL-009-F — Feliz: Não “pular” ao puxar o passado

**Camada:** Feliz · **Regra:** `RN-HOME-TL-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário no meio do carrossel; sistema carrega mês anterior. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Rolar para trás até disparar carga de mês anterior.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | O mesmo título permanece em foco (sem salto brusco). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-009-N — Negativo: Não “pular” ao puxar o passado — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TL-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário no meio do carrossel; sistema carrega mês anterior. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário no meio do carrossel; sistema carrega mês anterior..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-009-E — Exploratório: Não “pular” ao puxar o passado — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TL-009` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário no meio do carrossel; sistema carrega mês anterior. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Não “pular” ao puxar o passado.<br>**Contexto:** Ao incluir meses mais antigos no início da lista, a posição visual do card que o usuário estava vendo se mantém.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TL-010 — Setas de mudança de mês

### CT-RN-HOME-TL-010-F — Feliz: Setas de mudança de mês

**Camada:** Feliz · **Regra:** `RN-HOME-TL-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Carrossel com navegação por mês habilitada. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Clicar setas de mês repetidamente.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Avanço/retrocesso por mês; após vários meses sem título, para de avançar em vazio. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-010-N — Negativo: Setas de mudança de mês — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-HOME-TL-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Carrossel com navegação por mês habilitada. |
| Passos | 1. Abrir o site e navegar até **Página inicial** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Avanço/retrocesso por mês; após vários meses sem título, para de avançar em vazio. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-010-E — Exploratório: Setas de mudança de mês — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TL-010` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Carrossel com navegação por mês habilitada. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Setas de mudança de mês.<br>**Contexto:** Controles permitem saltar para o próximo/anterior **mês** com títulos (até um limite de meses vazios seguidos).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TL-011 — Filtro por gênero

### CT-RN-HOME-TL-011-F — Feliz: Filtro por gênero

**Camada:** Feliz · **Regra:** `RN-HOME-TL-011` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Vários gêneros na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Abrir filtro, escolher um gênero.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só cards daquele gênero; lista de gêneros reflete o que existe nos cards carregados. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-011-N — Negativo: Filtro por gênero — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TL-011` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Vários gêneros na faixa. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Vários gêneros na faixa..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-011-E — Exploratório: Filtro por gênero — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TL-011` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Vários gêneros na faixa. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Filtro por gênero.<br>**Contexto:** Menu de filtro na faixa restringe os cards ao gênero escolhido.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TL-012 — Troca de gênero reposiciona

### CT-RN-HOME-TL-012-F — Feliz: Troca de gênero reposiciona

**Camada:** Feliz · **Regra:** `RN-HOME-TL-012` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro alterado com resultados. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Filtrar gênero raro e observar card central.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Posição inicial coerente com o subconjunto filtrado. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-012-N — Negativo: Troca de gênero reposiciona — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TL-012` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro alterado com resultados. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtro alterado com resultados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-012-E — Exploratório: Troca de gênero reposiciona — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TL-012` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro alterado com resultados. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Troca de gênero reposiciona.<br>**Contexto:** Ao mudar o gênero, o carrossel recalcula e volta a focar no “próximo lançamento” **dentro do filtro**.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-TL-013 — Scroll rápido (ícone raio)

### CT-RN-HOME-TL-013-F — Feliz: Scroll rápido (ícone raio)

**Camada:** Feliz · **Regra:** `RN-HOME-TL-013` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário ativa ícone de raio/Zap no controle da faixa (se visível). |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Ligar/desligar e comparar velocidade.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Transições mais rápidas; mais cards pré-carregados ao rolar forte. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-013-N — Negativo: Scroll rápido (ícone raio) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-TL-013` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário ativa ícone de raio/Zap no controle da faixa (se visível). |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário ativa ícone de raio/Zap no controle da faixa (se visível)..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-TL-013-E — Exploratório: Scroll rápido (ícone raio) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-TL-013` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário ativa ícone de raio/Zap no controle da faixa (se visível). |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Scroll rápido (ícone raio).<br>**Contexto:** Opção global de “scroll rápido” acelera a animação do carrossel e antecipa carregamento ao se aproximar da borda do mês.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-UPD-001 — Atualizar após sincronização do catálogo

### CT-RN-HOME-UPD-001-F — Feliz: Atualizar após sincronização do catálogo

**Camada:** Feliz · **Regra:** `RN-HOME-UPD-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ambiente onde sync/disparo de atualização ocorre. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Após sync, manter home aberta e observar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cards novos ou datas alteradas após evento. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-UPD-001-N — Negativo: Atualizar após sincronização do catálogo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HOME-UPD-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Ambiente onde sync/disparo de atualização ocorre. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Ambiente onde sync/disparo de atualização ocorre..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-UPD-001-E — Exploratório: Atualizar após sincronização do catálogo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-UPD-001` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Ambiente onde sync/disparo de atualização ocorre. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Atualizar após sincronização do catálogo.<br>**Contexto:** Quando o site recebe atualização em massa de títulos (em segundo plano), as faixas da home podem **atualizar sozinhas** sem o usuário recarregar a página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HOME-UPD-002 — Falha na atualização silenciosa

### CT-RN-HOME-UPD-002-F — Feliz: Falha na atualização silenciosa

**Camada:** Feliz · **Regra:** `RN-HOME-UPD-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Falha de rede na atualização. |
| Passos | 1. Abrir o site e navegar até **Página inicial**.<br>2. Cortar rede após sync.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Sem mensagem obrigatória; conteúdo antigo permanece. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-UPD-002-N — Negativo: Falha na atualização silenciosa — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-HOME-UPD-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Falha de rede na atualização. |
| Passos | 1. Abrir o site e navegar até **Página inicial** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Sem mensagem obrigatória; conteúdo antigo permanece. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HOME-UPD-002-E — Exploratório: Falha na atualização silenciosa — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HOME-UPD-002` · **Tela:** Página inicial

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Falha de rede na atualização. |
| Passos | **Charter (15 min)** — área: **Página inicial** · regra: Falha na atualização silenciosa.<br>**Contexto:** Se a atualização automática falhar, a home mantém o que já estava na tela.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |
