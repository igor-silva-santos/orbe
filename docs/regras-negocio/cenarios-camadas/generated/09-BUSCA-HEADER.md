# Camadas — Busca e cabeçalho

**Inventário:** `09-BUSCA-HEADER.md` · **Cenários:** 90

---

## RN-BUSCA-001 — Abrir e fechar

### CT-RN-BUSCA-001-F — Feliz: Abrir e fechar

**Camada:** Feliz · **Regra:** `RN-BUSCA-001` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Site carregado. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Clicar lupa → fechar com X/Esc/clique fora.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ícone de busca abre overlay; fechar remove overlay. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-001-N — Negativo: Abrir e fechar — sem a condição exigida

**Camada:** Negativo · **Regra:** `RN-BUSCA-001` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Site carregado. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Usar usuário, dado ou estado **sem** a condição da regra (ex.: não logado se a regra exige login).<br>3. Repetir a mesma ação do caminho feliz.<br>4. Verificar que o elemento/comportamento **não** aparece ou permanece desabilitado. |
| Resultado_Esperado | O resultado feliz **não** ocorre; a tela permanece coerente (sem vazamento indevido). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-001-E — Exploratório: Abrir e fechar — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-001` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Site carregado. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Abrir e fechar.<br>**Contexto:** A busca só aparece quando acionada pelo header.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-002 — Histórico do navegador

### CT-RN-BUSCA-002-F — Feliz: Histórico do navegador

**Camada:** Feliz · **Regra:** `RN-BUSCA-002` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Busca aberta. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Abrir busca → voltar do browser.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Botão voltar do navegador pode fechar a busca; Esc fecha. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-002-N — Negativo: Histórico do navegador — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-BUSCA-002` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Busca aberta. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Busca aberta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-002-E — Exploratório: Histórico do navegador — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-002` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Busca aberta. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Histórico do navegador.<br>**Contexto:** Comportamento alinhado ao modal de detalhe.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-003 — Limpar ao fechar

### CT-RN-BUSCA-003-F — Feliz: Limpar ao fechar

**Camada:** Feliz · **Regra:** `RN-BUSCA-003` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Busca usada com texto e filtro. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Buscar algo → fechar → reabrir.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Campo vazio, categoria “todos”, resultados zerados na próxima abertura. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-003-N — Negativo: Limpar ao fechar — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-BUSCA-003` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Busca usada com texto e filtro. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Campo vazio, categoria “todos”, resultados zerados na próxima abertura. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-003-E — Exploratório: Limpar ao fechar — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-003` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Busca usada com texto e filtro. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Limpar ao fechar.<br>**Contexto:** Ao sair da busca.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-004 — Em alta sem digitar

### CT-RN-BUSCA-004-F — Feliz: Em alta sem digitar

**Camada:** Feliz · **Regra:** `RN-BUSCA-004` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeira abertura ou após limpar. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Abrir busca sem digitar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Até ~20 títulos “em alta” exibidos como sugestão. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-004-N — Negativo: Em alta sem digitar — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-BUSCA-004` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Primeira abertura ou após limpar. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Até ~20 títulos “em alta” exibidos como sugestão. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-004-E — Exploratório: Em alta sem digitar — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-004` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Primeira abertura ou após limpar. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Em alta sem digitar.<br>**Contexto:** Overlay aberto e campo vazio.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-005 — Mínimo de caracteres

### CT-RN-BUSCA-005-F — Feliz: Mínimo de caracteres

**Camada:** Feliz · **Regra:** `RN-BUSCA-005` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Digitar 0 ou 1 caractere. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Digitar “a” e parar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Sem busca remota; resultados de mídia zerados (permanece em alta se vazio). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-005-N — Negativo: Mínimo de caracteres — abaixo do limite

**Camada:** Negativo · **Regra:** `RN-BUSCA-005` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Digitar 0 ou 1 caractere. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Reproduzir a ação com valor **abaixo do mínimo** (ex.: menos caracteres, nota/duração insuficiente).<br>3. Observar bloqueio, ausência do efeito ou mensagem de validação.<br>4. Confirmar que o sistema **não** aplica o benefício do caminho feliz. |
| Resultado_Esperado | Comportamento de bloqueio ou ausência do resultado feliz: validação visível, item oculto ou ação não executada — sem erro de interface. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-005-E — Exploratório: Mínimo de caracteres — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-005` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Digitar 0 ou 1 caractere. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Mínimo de caracteres.<br>**Contexto:** Busca efetiva por texto.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-006 — Espera antes de buscar

### CT-RN-BUSCA-006-F — Feliz: Espera antes de buscar

**Camada:** Feliz · **Regra:** `RN-BUSCA-006` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Digitar termo com 2+ caracteres. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Digitar rápido “star wars”.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Resultados atualizam ~350 ms após parar de digitar; buscas antigas não “piscam” por cima das novas. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-006-N — Negativo: Espera antes de buscar — abaixo do limite

**Camada:** Negativo · **Regra:** `RN-BUSCA-006` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Digitar termo com 2+ caracteres. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Reproduzir a ação com valor **abaixo do mínimo** (ex.: menos caracteres, nota/duração insuficiente).<br>3. Observar bloqueio, ausência do efeito ou mensagem de validação.<br>4. Confirmar que o sistema **não** aplica o benefício do caminho feliz. |
| Resultado_Esperado | Comportamento de bloqueio ou ausência do resultado feliz: validação visível, item oculto ou ação não executada — sem erro de interface. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-006-E — Exploratório: Espera antes de buscar — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-006` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Digitar termo com 2+ caracteres. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Espera antes de buscar.<br>**Contexto:** Evita buscar a cada tecla.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-007 — Filtro por tipo

### CT-RN-BUSCA-007-F — Feliz: Filtro por tipo

**Camada:** Feliz · **Regra:** `RN-BUSCA-007` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Query válida. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Buscar termo comum.<br>3. Alternar chips.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Opções: todos, filmes, séries, animes, jogos, pessoas; restringe o que é buscado/exibido. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-007-N — Negativo: Filtro por tipo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-BUSCA-007` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Query válida. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Query válida..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-007-E — Exploratório: Filtro por tipo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-007` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Query válida. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Filtro por tipo.<br>**Contexto:** Chips ou abas de categoria.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-008 — Resultados de mídia

### CT-RN-BUSCA-008-F — Feliz: Resultados de mídia

**Camada:** Feliz · **Regra:** `RN-BUSCA-008` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Categoria “todos” ou tipo específico. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Termo que existe em mais de um tipo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Filmes, séries, animes e jogos aparecem em grupos conforme filtro. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-008-N — Negativo: Resultados de mídia — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-BUSCA-008` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Categoria “todos” ou tipo específico. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Categoria “todos” ou tipo específico..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-008-E — Exploratório: Resultados de mídia — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-008` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Categoria “todos” ou tipo específico. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Resultados de mídia.<br>**Contexto:** Várias mídias na mesma busca.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-009 — Pessoas e dubladores

### CT-RN-BUSCA-009-F — Feliz: Pessoas e dubladores

**Camada:** Feliz · **Regra:** `RN-BUSCA-009` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Termo com 2+ chars; categoria todos ou pessoas. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Buscar nome de ator e de dublador.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cards de ator/equipe vs dublador com rótulos distintos. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-009-N — Negativo: Pessoas e dubladores — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-BUSCA-009` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Termo com 2+ chars; categoria todos ou pessoas. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Termo com 2+ chars; categoria todos ou pessoas..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-009-E — Exploratório: Pessoas e dubladores — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-009` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Termo com 2+ chars; categoria todos ou pessoas. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Pessoas e dubladores.<br>**Contexto:** Resultados de elenco.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-010 — O que mostra por categoria

### CT-RN-BUSCA-010-F — Feliz: O que mostra por categoria

**Camada:** Feliz · **Regra:** `RN-BUSCA-010` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Query ≥ 2; chip selecionado. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Mesmo termo em “todos” vs “filmes” vs “pessoas”.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Chip “pessoas” esconde grids de mídia; demais chips focam o tipo escolhido. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-010-N — Negativo: O que mostra por categoria — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-BUSCA-010` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Query ≥ 2; chip selecionado. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Query ≥ 2; chip selecionado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-010-E — Exploratório: O que mostra por categoria — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-010` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Query ≥ 2; chip selecionado. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: O que mostra por categoria.<br>**Contexto:** Com texto digitado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-011 — Seção pessoas

### CT-RN-BUSCA-011-F — Feliz: Seção pessoas

**Camada:** Feliz · **Regra:** `RN-BUSCA-011` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Query ≥ 2; todos ou pessoas; há matches. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Buscar sobrenome comum.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Bloco de pessoas visível só nessas condições. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-011-N — Negativo: Seção pessoas — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-BUSCA-011` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Query ≥ 2; todos ou pessoas; há matches. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Query ≥ 2; todos ou pessoas; há matches..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-011-E — Exploratório: Seção pessoas — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-011` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Query ≥ 2; todos ou pessoas; há matches. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Seção pessoas.<br>**Contexto:** Grid dedicado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-012 — Contagem de resultados

### CT-RN-BUSCA-012-F — Feliz: Contagem de resultados

**Camada:** Feliz · **Regra:** `RN-BUSCA-012` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Busca com resultados. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Comparar total ao mudar chip.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Número reflete mídias visíveis + pessoas quando a seção pessoas está ativa. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-012-N — Negativo: Contagem de resultados — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-BUSCA-012` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Busca com resultados. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Busca com resultados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-012-E — Exploratório: Contagem de resultados — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-012` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Busca com resultados. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Contagem de resultados.<br>**Contexto:** Total exibido ao usuário.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-013 — Ações nos cards

### CT-RN-BUSCA-013-F — Feliz: Ações nos cards

**Camada:** Feliz · **Regra:** `RN-BUSCA-013` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado ou anônimo. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Favoritar da busca logado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mesmas regras dos cards nas listagens (login exigido onde aplicável). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-013-N — Negativo: Ações nos cards — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-BUSCA-013` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado ou anônimo. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado ou anônimo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-013-E — Exploratório: Ações nos cards — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-013` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado ou anônimo. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Ações nos cards.<br>**Contexto:** Favoritar e listas na busca.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-014 — Destaque de foco

### CT-RN-BUSCA-014-F — Feliz: Destaque de foco

**Camada:** Feliz · **Regra:** `RN-BUSCA-014` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Busca com vários resultados. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Observar foco ao interagir.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Um item pode receber estado visual de foco (navegação completa por teclado pode ser limitada). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-014-N — Negativo: Destaque de foco — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-BUSCA-014` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Busca com vários resultados. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Busca com vários resultados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-014-E — Exploratório: Destaque de foco — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-014` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Busca com vários resultados. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Destaque de foco.<br>**Contexto:** Preparado para navegação por teclado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-015 — Estados vazios

### CT-RN-BUSCA-015-F — Feliz: Estados vazios

**Camada:** Feliz · **Regra:** `RN-BUSCA-015` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sem trending e sem query; ou query sem resultado. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Termo inventado “zzzxxyy”.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | “Nenhum conteúdo em alta” ou mensagem citando o termo buscado. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-015-N — Negativo: Estados vazios — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-BUSCA-015` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Sem trending e sem query; ou query sem resultado. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | “Nenhum conteúdo em alta” ou mensagem citando o termo buscado. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-015-E — Exploratório: Estados vazios — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-015` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Sem trending e sem query; ou query sem resultado. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Estados vazios.<br>**Contexto:** Sem sugestões e sem match.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-020 — Destino do clique

### CT-RN-BUSCA-020-F — Feliz: Destino do clique

**Camada:** Feliz · **Regra:** `RN-BUSCA-020` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resultado de pessoa na busca. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Clicar cada tipo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ator/equipe → página da pessoa; dublador → página do dublador. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-020-N — Negativo: Destino do clique — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-BUSCA-020` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Resultado de pessoa na busca. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Resultado de pessoa na busca..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-020-E — Exploratório: Destino do clique — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-020` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Resultado de pessoa na busca. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Destino do clique.<br>**Contexto:** Ator vs dublador.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-021 — Voltar à busca

### CT-RN-BUSCA-021-F — Feliz: Voltar à busca

**Camada:** Feliz · **Regra:** `RN-BUSCA-021` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Veio da overlay de busca. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Busca → pessoa → voltar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ao voltar da página de pessoa/dublador, a busca pode reabrir (fluxo de retorno). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-021-N — Negativo: Voltar à busca — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-BUSCA-021` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Veio da overlay de busca. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Veio da overlay de busca..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-021-E — Exploratório: Voltar à busca — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-021` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Veio da overlay de busca. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Voltar à busca.<br>**Contexto:** Após abrir perfil a partir da busca.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-BUSCA-022 — Subtítulo do card

### CT-RN-BUSCA-022-F — Feliz: Subtítulo do card

**Camada:** Feliz · **Regra:** `RN-BUSCA-022` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Cards na grid de pessoas. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Ler subtítulos na busca.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | “Ator / equipe” ou “Dublador” conforme o caso. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-022-N — Negativo: Subtítulo do card — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-BUSCA-022` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Cards na grid de pessoas. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Cards na grid de pessoas..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-BUSCA-022-E — Exploratório: Subtítulo do card — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-BUSCA-022` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Cards na grid de pessoas. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Subtítulo do card.<br>**Contexto:** Identificação rápida.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HEADER-001 — Links principais (desktop)

### CT-RN-HEADER-001-F — Feliz: Links principais (desktop)

**Camada:** Feliz · **Regra:** `RN-HEADER-001` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Janela larga (layout desktop). |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Redimensionar janela.<br>3. Clicar cada link.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Links visíveis: Filmes, Séries, Animes, Jogos, Continuações, Hoje. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-001-N — Negativo: Links principais (desktop) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HEADER-001` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Janela larga (layout desktop). |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Janela larga (layout desktop)..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-001-E — Exploratório: Links principais (desktop) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HEADER-001` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Janela larga (layout desktop). |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Links principais (desktop).<br>**Contexto:** Navegação do catálogo em telas largas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HEADER-002 — Menu “Mais”

### CT-RN-HEADER-002-F — Feliz: Menu “Mais”

**Camada:** Feliz · **Regra:** `RN-HEADER-002` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Desktop. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Abrir “Mais” e seguir um item.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Dropdown: Promoções, Eventos, Jogos em Alta, Premiações, Minha Lista (animes), Extensão CR. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-002-N — Negativo: Menu “Mais” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HEADER-002` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Desktop. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Desktop..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-002-E — Exploratório: Menu “Mais” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HEADER-002` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Desktop. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Menu “Mais”.<br>**Contexto:** Atalhos secundários.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HEADER-003 — Item ativo

### CT-RN-HEADER-003-F — Feliz: Item ativo

**Camada:** Feliz · **Regra:** `RN-HEADER-003` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Navegar entre seções. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Estar em Promoções e olhar o header.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Link da rota atual com estilo primário/negrito; “Mais” destaca se algum sublink está ativo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-003-N — Negativo: Item ativo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HEADER-003` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Navegar entre seções. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Navegar entre seções..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-003-E — Exploratório: Item ativo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HEADER-003` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Navegar entre seções. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Item ativo.<br>**Contexto:** Página atual destacada.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HEADER-004 — Abrir busca

### CT-RN-HEADER-004-F — Feliz: Abrir busca

**Camada:** Feliz · **Regra:** `RN-HEADER-004` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Qualquer página. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Mobile: abrir menu → busca.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Abre overlay; fecha menu mobile se estiver aberto. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-004-N — Negativo: Abrir busca — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HEADER-004` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Qualquer página. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Qualquer página..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-004-E — Exploratório: Abrir busca — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HEADER-004` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Qualquer página. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Abrir busca.<br>**Contexto:** Ícone de lupa.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HEADER-005 — Tema claro/escuro

### CT-RN-HEADER-005-F — Feliz: Tema claro/escuro

**Camada:** Feliz · **Regra:** `RN-HEADER-005` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Header visível. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Clicar sol/lua.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ícone alterna tema; cores do site mudam. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-005-N — Negativo: Tema claro/escuro — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HEADER-005` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Header visível. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Header visível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-005-E — Exploratório: Tema claro/escuro — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HEADER-005` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Header visível. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Tema claro/escuro.<br>**Contexto:** Alternância visual.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HEADER-006 — Notificações

### CT-RN-HEADER-006-F — Feliz: Notificações

**Camada:** Feliz · **Regra:** `RN-HEADER-006` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta com ou sem notificações. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Conta com notificações pendentes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Abre painel/modal de notificações; badge com contagem (máx. exibição “9+”). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-006-N — Negativo: Notificações — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HEADER-006` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Conta com ou sem notificações. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Conta com ou sem notificações..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-006-E — Exploratório: Notificações — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HEADER-006` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Conta com ou sem notificações. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Notificações.<br>**Contexto:** Sino de avisos.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HEADER-007 — Menu do usuário logado

### CT-RN-HEADER-007-F — Feliz: Menu do usuário logado

**Camada:** Feliz · **Regra:** `RN-HEADER-007` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sessão ativa. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Logar → menu avatar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Opções: Minha lista, Meu perfil, Sair (volta à home após sair). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-007-N — Negativo: Menu do usuário logado — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HEADER-007` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Sessão ativa. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Sessão ativa..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-007-E — Exploratório: Menu do usuário logado — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HEADER-007` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Sessão ativa. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Menu do usuário logado.<br>**Contexto:** Conta autenticada.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-HEADER-008 — Visitante (desktop)

### CT-RN-HEADER-008-F — Feliz: Visitante (desktop)

**Camada:** Feliz · **Regra:** `RN-HEADER-008` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anônimo; layout desktop/tablet largo. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Anônimo desktop.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Links Entrar e Inscreva-se visíveis. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-008-N — Negativo: Visitante (desktop) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HEADER-008` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anônimo; layout desktop/tablet largo. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Anônimo; layout desktop/tablet largo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-008-E — Exploratório: Visitante (desktop) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HEADER-008` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anônimo; layout desktop/tablet largo. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Visitante (desktop).<br>**Contexto:** Sem login em tela média/grande.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Exploratorio_Validado | Pendente TL |

## RN-HEADER-009 — Menu mobile

### CT-RN-HEADER-009-F — Feliz: Menu mobile

**Camada:** Feliz · **Regra:** `RN-HEADER-009` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Layout mobile. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Testar em viewport mobile.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Hambúrguer com catálogo, “descobrir” (itens do Mais) e bloco login/lista/perfil. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-009-N — Negativo: Menu mobile — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HEADER-009` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Layout mobile. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Layout mobile..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-009-E — Exploratório: Menu mobile — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HEADER-009` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Layout mobile. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Menu mobile.<br>**Contexto:** Telas estreitas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HEADER-010 — Fechar menus

### CT-RN-HEADER-010-F — Feliz: Fechar menus

**Camada:** Feliz · **Regra:** `RN-HEADER-010` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Dropdown “Mais” ou menu usuário aberto. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Abrir dropdown → clicar página.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Fecha ao clicar fora; overlay escuro fecha menu do usuário. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-010-N — Negativo: Fechar menus — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-HEADER-010` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Dropdown “Mais” ou menu usuário aberto. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-010-E — Exploratório: Fechar menus — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HEADER-010` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Dropdown “Mais” ou menu usuário aberto. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Fechar menus.<br>**Contexto:** Clique fora.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HEADER-020 — Resultado abre detalhe

### CT-RN-HEADER-020-F — Feliz: Resultado abre detalhe

**Camada:** Feliz · **Regra:** `RN-HEADER-020` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Busca aberta com resultados. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Buscar filme → abrir card.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Clicar card abre modal de detalhe e fecha a busca. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-020-N — Negativo: Resultado abre detalhe — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HEADER-020` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Busca aberta com resultados. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Busca aberta com resultados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-020-E — Exploratório: Resultado abre detalhe — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HEADER-020` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Busca aberta com resultados. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Resultado abre detalhe.<br>**Contexto:** Card de mídia na busca.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-HEADER-021 — Retorno da página pessoa

### CT-RN-HEADER-021-F — Feliz: Retorno da página pessoa

**Camada:** Feliz · **Regra:** `RN-HEADER-021` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Fluxo busca → página pessoa → voltar. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Executar RN-BUSCA-021 + voltar do browser ou link voltar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Busca reabre quando o site guardou “voltar para busca”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-021-N — Negativo: Retorno da página pessoa — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-HEADER-021` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Fluxo busca → página pessoa → voltar. |
| Passos | 1. Abrir o site e navegar até **Busca e cabeçalho**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Fluxo busca → página pessoa → voltar..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-HEADER-021-E — Exploratório: Retorno da página pessoa — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-HEADER-021` · **Tela:** Busca e cabeçalho

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Fluxo busca → página pessoa → voltar. |
| Passos | **Charter (15 min)** — área: **Busca e cabeçalho** · regra: Retorno da página pessoa.<br>**Contexto:** Veio da busca.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |
