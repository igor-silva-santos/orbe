# Camadas — Filmes

**Inventário:** `02-FILMES.md` · **Cenários:** 204

---

## RN-FILMES-001 — Conteúdo na primeira abertura

### CT-RN-FILMES-001-F — Feliz: Conteúdo na primeira abertura

**Camada:** Feliz · **Regra:** `RN-FILMES-001` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Site acessível; catálogo com filmes. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Abrir a página Filmes em aba nova.<br>3. Observar grade e selects antes de interagir.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ao entrar em Filmes, cards e menus de filtro aparecem (ou estado vazio amigável se não houver dados). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-001-N — Negativo: Conteúdo na primeira abertura — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-FILMES-001` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Site acessível; catálogo com filmes. |
| Passos | 1. Abrir o site e navegar até **Filmes** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Ao entrar em Filmes, cards e menus de filtro aparecem (ou estado vazio amigável se não houver dados). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-001-E — Exploratório: Conteúdo na primeira abertura — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-001` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Site acessível; catálogo com filmes. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Conteúdo na primeira abertura.<br>**Contexto:** A listagem e as opções de filtro já vêm preparadas quando a página abre, sem precisar clicar em nada.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-002 — Atualização gradual do catálogo

### CT-RN-FILMES-002-F — Feliz: Atualização gradual do catálogo

**Camada:** Feliz · **Regra:** `RN-FILMES-002` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo alterado recentemente no ambiente de teste. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Registrar um filme de teste.<br>3. Aguardar ~5 min.<br>4. Recarregar Filmes.<br>5. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Após aguardar alguns minutos e recarregar Filmes, novos títulos ou datas podem surgir. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-002-N — Negativo: Atualização gradual do catálogo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-002` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo alterado recentemente no ambiente de teste. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Catálogo alterado recentemente no ambiente de teste..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-002-E — Exploratório: Atualização gradual do catálogo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-002` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo alterado recentemente no ambiente de teste. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Atualização gradual do catálogo.<br>**Contexto:** Mudanças no catálogo podem levar alguns minutos para aparecer na página após uma atualização em massa, mesmo sem o usuário fazer nada.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-003 — Falha no carregamento inicial

### CT-RN-FILMES-003-F — Feliz: Falha no carregamento inicial

**Camada:** Feliz · **Regra:** `RN-FILMES-003` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Simular indisponibilidade temporária do catálogo na abertura. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Ambiente com catálogo indisponível no primeiro acesso.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Página abre sem erro do navegador; grade vazia; filtros sem opções ou vazios; mensagem de “nenhum filme” se aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-003-N — Negativo: Falha no carregamento inicial — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-FILMES-003` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Simular indisponibilidade temporária do catálogo na abertura. |
| Passos | 1. Abrir o site e navegar até **Filmes** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Página abre sem erro do navegador; grade vazia; filtros sem opções ou vazios; mensagem de “nenhum filme” se aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-003-E — Exploratório: Falha no carregamento inicial — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-003` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Simular indisponibilidade temporária do catálogo na abertura. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Falha no carregamento inicial.<br>**Contexto:** Se a listagem não puder ser montada no primeiro momento, a página continua utilizável.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-004 — Texto do cabeçalho

### CT-RN-FILMES-004-F — Feliz: Texto do cabeçalho

**Camada:** Feliz · **Regra:** `RN-FILMES-004` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário na página Filmes. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Ler o cabeçalho da página.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Título **Filmes** e texto sobre cartaz, lançamentos e clássicos no topo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-004-N — Negativo: Texto do cabeçalho — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-004` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário na página Filmes. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário na página Filmes..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-004-E — Exploratório: Texto do cabeçalho — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-004` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário na página Filmes. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Texto do cabeçalho.<br>**Contexto:** Título e subtítulo da área são fixos.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-005 — Gaveta O que vem aí

### CT-RN-FILMES-005-F — Feliz: Gaveta O que vem aí

**Camada:** Feliz · **Regra:** `RN-FILMES-005` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resumo de eventos do site inclui filmes em **próximos lançamentos**. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Ambiente com lançamentos futuros.<br>3. Abrir Filmes.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seção colapsável **O que vem aí** com carrossel horizontal de cards de filme. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-005-N — Negativo: Gaveta O que vem aí — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-005` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Resumo de eventos do site inclui filmes em **próximos lançamentos**. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Resumo de eventos do site inclui filmes em **próximos lançamentos**..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-005-E — Exploratório: Gaveta O que vem aí — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-005` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Resumo de eventos do site inclui filmes em **próximos lançamentos**. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Gaveta O que vem aí.<br>**Contexto:** Bloco horizontal de estreias futuras de filme, acima dos filtros.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-006 — Ações nos cards da gaveta

### CT-RN-FILMES-006-F — Feliz: Ações nos cards da gaveta

**Camada:** Feliz · **Regra:** `RN-FILMES-006` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gaveta visível; usuário logado ou visitante conforme regra do card. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Favoritar um filme na gaveta.<br>3. Recarregar logado.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Menu e estados de lista refletem na conta quando logado. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-006-N — Negativo: Ações nos cards da gaveta — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-006` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Gaveta visível; usuário logado ou visitante conforme regra do card. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Gaveta visível; usuário logado ou visitante conforme regra do card..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-006-E — Exploratório: Ações nos cards da gaveta — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-006` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Gaveta visível; usuário logado ou visitante conforme regra do card. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Ações nos cards da gaveta.<br>**Contexto:** Favoritar e demais ações do menu ⋮ funcionam igual à grade principal.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-007 — Gaveta Em cartaz

### CT-RN-FILMES-007-F — Feliz: Gaveta Em cartaz

**Camada:** Feliz · **Regra:** `RN-FILMES-007` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resumo de eventos traz filmes em **destaques recentes / em cartaz**. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Ambiente com destaques em cartaz.<br>3. Abrir Filmes.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seção **Em cartaz** com ícone de claquete e carrossel horizontal. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-007-N — Negativo: Gaveta Em cartaz — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-007` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Resumo de eventos traz filmes em **destaques recentes / em cartaz**. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Resumo de eventos traz filmes em **destaques recentes / em cartaz**..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-007-E — Exploratório: Gaveta Em cartaz — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-007` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Resumo de eventos traz filmes em **destaques recentes / em cartaz**. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Gaveta Em cartaz.<br>**Contexto:** Destaques de filmes **em cartaz** em bloco próprio.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-008 — Gavetas carregam após a página

### CT-RN-FILMES-008-F — Feliz: Gavetas carregam após a página

**Camada:** Feliz · **Regra:** `RN-FILMES-008` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página Filmes recém-aberta. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Abrir Filmes e observar ordem de aparecimento dos blocos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Primeiro aparecem filtros e grade; em seguida as gavetas (se houver conteúdo). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-008-N — Negativo: Gavetas carregam após a página — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-008` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página Filmes recém-aberta. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página Filmes recém-aberta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-008-E — Exploratório: Gavetas carregam após a página — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-008` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página Filmes recém-aberta. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Gavetas carregam após a página.<br>**Contexto:** As gavetas podem aparecer um instante depois do restante da página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-009 — Atalho Todos os Filmes

### CT-RN-FILMES-009-F — Feliz: Atalho Todos os Filmes

**Camada:** Feliz · **Regra:** `RN-FILMES-009` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Qualquer outro atalho ativo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Clicar **Todos os Filmes**.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Botão **Todos os Filmes** destacado; grade ampla (ordenada por título). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-009-N — Negativo: Atalho Todos os Filmes — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-009` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Qualquer outro atalho ativo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Qualquer outro atalho ativo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-009-E — Exploratório: Atalho Todos os Filmes — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-009` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Qualquer outro atalho ativo. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Atalho Todos os Filmes.<br>**Contexto:** Restaura a listagem geral sem curadoria de atalho.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-010 — Atalho Em Cartaz

### CT-RN-FILMES-010-F — Feliz: Atalho Em Cartaz

**Camada:** Feliz · **Regra:** `RN-FILMES-010` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo com filmes em cartaz e outros. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Clicar **Em Cartaz**.<br>3. Conferir etiquetas nos cards.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grade restrita a títulos em cartaz; contador atualizado. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-010-N — Negativo: Atalho Em Cartaz — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-010` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo com filmes em cartaz e outros. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Catálogo com filmes em cartaz e outros..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-010-E — Exploratório: Atalho Em Cartaz — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-010` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo com filmes em cartaz e outros. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Atalho Em Cartaz.<br>**Contexto:** Mostra só filmes marcados como em cartaz.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-011 — Atalho Em Breve

### CT-RN-FILMES-011-F — Feliz: Atalho Em Breve

**Camada:** Feliz · **Regra:** `RN-FILMES-011` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filmes em breve e já lançados no catálogo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Clicar **Em Breve**.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só filmes em breve na grade. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-011-N — Negativo: Atalho Em Breve — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-011` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filmes em breve e já lançados no catálogo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filmes em breve e já lançados no catálogo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-011-E — Exploratório: Atalho Em Breve — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-011` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filmes em breve e já lançados no catálogo. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Atalho Em Breve.<br>**Contexto:** Mostra só estreias futuras curadas como “em breve”.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-012 — Atalho Populares

### CT-RN-FILMES-012-F — Feliz: Atalho Populares

**Camada:** Feliz · **Regra:** `RN-FILMES-012` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Vários filmes com popularidade distinta. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Alternar **Todos** e **Populares** e comparar ordem.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ordem diferente de **Todos**; títulos mais populares no topo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-012-N — Negativo: Atalho Populares — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-012` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Vários filmes com popularidade distinta. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Vários filmes com popularidade distinta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-012-E — Exploratório: Atalho Populares — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-012` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Vários filmes com popularidade distinta. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Atalho Populares.<br>**Contexto:** Reordena por popularidade (não alfabético).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-013 — Destaque visual do atalho

### CT-RN-FILMES-013-F — Feliz: Destaque visual do atalho

**Camada:** Feliz · **Regra:** `RN-FILMES-013` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Dois ou mais atalhos disponíveis. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Clicar cada atalho e observar estilo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Botão ativo com cor primária; demais em fundo neutro. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-013-N — Negativo: Destaque visual do atalho — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-013` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Dois ou mais atalhos disponíveis. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Dois ou mais atalhos disponíveis..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-013-E — Exploratório: Destaque visual do atalho — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-013` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Dois ou mais atalhos disponíveis. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Destaque visual do atalho.<br>**Contexto:** Só um atalho aparece como selecionado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-014 — Gênero “Todos”

### CT-RN-FILMES-014-F — Feliz: Gênero “Todos”

**Camada:** Feliz · **Regra:** `RN-FILMES-014` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Select em **Todos os Gêneros**. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Escolher todos os gêneros após filtrar um gênero específico.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grade ampla dentro do atalho ativo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-014-N — Negativo: Gênero “Todos” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-014` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Select em **Todos os Gêneros**. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Select em **Todos os Gêneros**..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-014-E — Exploratório: Gênero “Todos” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-014` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Select em **Todos os Gêneros**. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Gênero “Todos”.<br>**Contexto:** Não restringe por gênero.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-015 — Nome do gênero no menu

### CT-RN-FILMES-015-F — Feliz: Nome do gênero no menu

**Camada:** Feliz · **Regra:** `RN-FILMES-015` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista de gêneros populada. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Abrir select de gênero.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ex.: “action” exibido como “Action”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-015-N — Negativo: Nome do gênero no menu — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-015` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Lista de gêneros populada. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Lista de gêneros populada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-015-E — Exploratório: Nome do gênero no menu — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-015` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Lista de gêneros populada. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Nome do gênero no menu.<br>**Contexto:** Primeira letra do gênero aparece maiúscula no dropdown.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-016 — Ano “Todos”

### CT-RN-FILMES-016-F — Feliz: Ano “Todos”

**Camada:** Feliz · **Regra:** `RN-FILMES-016` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | **Todos os Anos** selecionado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Resetar ano para todos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Filmes de vários anos na grade. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-016-N — Negativo: Ano “Todos” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-016` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: **Todos os Anos** selecionado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: **Todos os Anos** selecionado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-016-E — Exploratório: Ano “Todos” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-016` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | **Todos os Anos** selecionado. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Ano “Todos”.<br>**Contexto:** Não restringe por ano de estreia.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-017 — Anos no dropdown

### CT-RN-FILMES-017-F — Feliz: Anos no dropdown

**Camada:** Feliz · **Regra:** `RN-FILMES-017` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo com vários anos. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Comparar anos do menu com filmes conhecidos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Select de ano sem duplicatas; ordem decrescente. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-017-N — Negativo: Anos no dropdown — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-017` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo com vários anos. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Catálogo com vários anos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-017-E — Exploratório: Anos no dropdown — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-017` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo com vários anos. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Anos no dropdown.<br>**Contexto:** Anos disponíveis refletem filmes existentes no catálogo, do mais recente para o mais antigo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-018 — Meses em português

### CT-RN-FILMES-018-F — Feliz: Meses em português

**Camada:** Feliz · **Regra:** `RN-FILMES-018` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Select de mês aberto. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Abrir filtro de mês.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Doze meses nomeados corretamente. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-018-N — Negativo: Meses em português — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-018` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Select de mês aberto. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Select de mês aberto..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-018-E — Exploratório: Meses em português — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-018` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Select de mês aberto. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Meses em português.<br>**Contexto:** Janeiro a dezembro com rótulos em PT-BR.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-019 — Mês “Todos”

### CT-RN-FILMES-019-F — Feliz: Mês “Todos”

**Camada:** Feliz · **Regra:** `RN-FILMES-019` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | **Todos os Meses**. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Selecionar todos os meses.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Qualquer mês dentro dos demais filtros. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-019-N — Negativo: Mês “Todos” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-019` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: **Todos os Meses**. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: **Todos os Meses**..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-019-E — Exploratório: Mês “Todos” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-019` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | **Todos os Meses**. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Mês “Todos”.<br>**Contexto:** Não restringe por mês.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-020 — Status traduzido

### CT-RN-FILMES-020-F — Feliz: Status traduzido

**Camada:** Feliz · **Regra:** `RN-FILMES-020` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Select de status populado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Abrir filtro de status.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Labels legíveis (ex.: lançado, em produção). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-020-N — Negativo: Status traduzido — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-020` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Select de status populado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Select de status populado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-020-E — Exploratório: Status traduzido — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-020` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Select de status populado. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Status traduzido.<br>**Contexto:** Opções de status exibem rótulo em português quando o produto conhece o status.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-021 — Filtro por plataforma

### CT-RN-FILMES-021-F — Feliz: Filtro por plataforma

**Camada:** Feliz · **Regra:** `RN-FILMES-021` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Netflix (ou outra) selecionada. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Filtrar Netflix.<br>3. Abrir detalhe de um card.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só cards com aquela plataforma nos metadados visíveis. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-021-N — Negativo: Filtro por plataforma — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-021` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Netflix (ou outra) selecionada. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Netflix (ou outra) selecionada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-021-E — Exploratório: Filtro por plataforma — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-021` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Netflix (ou outra) selecionada. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Filtro por plataforma.<br>**Contexto:** Restringe a filmes disponíveis na plataforma escolhida (streaming).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-022 — Plataformas ordenadas

### CT-RN-FILMES-022-F — Feliz: Plataformas ordenadas

**Camada:** Feliz · **Regra:** `RN-FILMES-022` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Várias plataformas no catálogo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Abrir **Todas as Plataformas**.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Lista A–Z no dropdown. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-022-N — Negativo: Plataformas ordenadas — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-022` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Várias plataformas no catálogo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Várias plataformas no catálogo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-022-E — Exploratório: Plataformas ordenadas — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-022` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Várias plataformas no catálogo. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Plataformas ordenadas.<br>**Contexto:** Nomes de plataforma no select em ordem alfabética.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-023 — Filtros sempre clicáveis

### CT-RN-FILMES-023-F — Feliz: Filtros sempre clicáveis

**Camada:** Feliz · **Regra:** `RN-FILMES-023` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página Filmes estável. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Usar todos os filtros em sequência.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Selects não ficam permanentemente desabilitados. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-023-N — Negativo: Filtros sempre clicáveis — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-023` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página Filmes estável. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página Filmes estável..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-023-E — Exploratório: Filtros sempre clicáveis — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-023` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página Filmes estável. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Filtros sempre clicáveis.<br>**Contexto:** Menus de filtro permanecem habilitados durante uso normal.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-024 — Primeira visita sem “piscar” desnecessário

### CT-RN-FILMES-024-F — Feliz: Primeira visita sem “piscar” desnecessário

**Camada:** Feliz · **Regra:** `RN-FILMES-024` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Primeira visita com catálogo OK. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Abrir Filmes e aguardar sem tocar filtros.<br>3. Observar spinner.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Conteúdo estável logo após abrir; novo carregamento só ao mudar filtro/atalho. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-024-N — Negativo: Primeira visita sem “piscar” desnecessário — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-024` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Primeira visita com catálogo OK. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Primeira visita com catálogo OK..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-024-E — Exploratório: Primeira visita sem “piscar” desnecessário — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-024` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Primeira visita com catálogo OK. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Primeira visita sem “piscar” desnecessário.<br>**Contexto:** Ao abrir Filmes, a grade inicial não dispara um segundo carregamento imediato só por abrir a página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-025 — Mudança de filtro recarrega

### CT-RN-FILMES-025-F — Feliz: Mudança de filtro recarrega

**Camada:** Feliz · **Regra:** `RN-FILMES-025` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro ou atalho alterado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Trocar gênero ou ano.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Spinner breve; nova lista e contador. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-025-N — Negativo: Mudança de filtro recarrega — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-025` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro ou atalho alterado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtro ou atalho alterado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-025-E — Exploratório: Mudança de filtro recarrega — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-025` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro ou atalho alterado. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Mudança de filtro recarrega.<br>**Contexto:** Qualquer alteração em atalho ou select atualiza a grade.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-026 — Atualização após sync do site

### CT-RN-FILMES-026-F — Feliz: Atualização após sync do site

**Camada:** Feliz · **Regra:** `RN-FILMES-026` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sync disparada com Filmes aberta. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Manter Filmes aberta durante sync no ambiente de teste.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cards ou contagem mudam sem F5 manual. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-026-N — Negativo: Atualização após sync do site — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-026` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Sync disparada com Filmes aberta. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Sync disparada com Filmes aberta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-026-E — Exploratório: Atualização após sync do site — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-026` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Sync disparada com Filmes aberta. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Atualização após sync do site.<br>**Contexto:** Quando o site termina uma sincronização de catálogo em segundo plano, a listagem pode atualizar sozinha.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-027 — Spinner ao filtrar

### CT-RN-FILMES-027-F — Feliz: Spinner ao filtrar

**Camada:** Feliz · **Regra:** `RN-FILMES-027` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro alterado com rede normal. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Trocar filtro e observar loading.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Spinner no lugar do grid até concluir. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-027-N — Negativo: Spinner ao filtrar — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-027` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro alterado com rede normal. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtro alterado com rede normal..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-027-E — Exploratório: Spinner ao filtrar — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-027` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro alterado com rede normal. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Spinner ao filtrar.<br>**Contexto:** Durante nova busca, a grade some e aparece indicador central.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-028 — Contador com total global

### CT-RN-FILMES-028-F — Feliz: Contador com total global

**Camada:** Feliz · **Regra:** `RN-FILMES-028` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mais de ~48 filmes para o filtro atual. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Filtro amplo.<br>3. Ler contador vs cards na tela.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Contador alto (ex.: 200) com grade mostrando um subconjunto inicial. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-028-N — Negativo: Contador com total global — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-028` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Mais de ~48 filmes para o filtro atual. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Mais de ~48 filmes para o filtro atual..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-028-E — Exploratório: Contador com total global — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-028` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Mais de ~48 filmes para o filtro atual. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Contador com total global.<br>**Contexto:** O texto “X filmes encontrados” usa o **total** que corresponde aos filtros, não só os cards visíveis na primeira “página” interna.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-029 — Contador em carregamento

### CT-RN-FILMES-029-F — Feliz: Contador em carregamento

**Camada:** Feliz · **Regra:** `RN-FILMES-029` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro recém-alterado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Trocar filtro e ler linha acima da grade.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Texto **Carregando...**. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-029-N — Negativo: Contador em carregamento — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-029` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro recém-alterado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtro recém-alterado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-029-E — Exploratório: Contador em carregamento — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-029` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro recém-alterado. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Contador em carregamento.<br>**Contexto:** Enquanto recarrega, não mostra número antigo enganoso.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-030 — Grade responsiva

### CT-RN-FILMES-030-F — Feliz: Grade responsiva

**Camada:** Feliz · **Regra:** `RN-FILMES-030` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resultados > 0; não loading. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Redimensionar janela do navegador.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | 2 a 5 colunas; cards com largura máxima ~210px. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-030-N — Negativo: Grade responsiva — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-030` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Resultados > 0; não loading. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Resultados > 0; não loading..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-030-E — Exploratório: Grade responsiva — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-030` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Resultados > 0; não loading. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Grade responsiva.<br>**Contexto:** Cards em colunas que aumentam em telas maiores.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-031 — Nenhum resultado

### CT-RN-FILMES-031-F — Feliz: Nenhum resultado

**Camada:** Feliz · **Regra:** `RN-FILMES-031` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtros restritivos. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Aplicar filtro impossível.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ícone de filtro, título **Nenhum filme encontrado**, sugestão de ajustar filtros. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-031-N — Negativo: Nenhum resultado — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-031` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtros restritivos. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtros restritivos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-031-E — Exploratório: Nenhum resultado — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-031` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtros restritivos. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Nenhum resultado.<br>**Contexto:** Combinação de filtros sem match.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-032 — Falha ao recarregar no cliente

### CT-RN-FILMES-032-F — Feliz: Falha ao recarregar no cliente

**Camada:** Feliz · **Regra:** `RN-FILMES-032` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Rede cortada ao mudar filtro. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Desligar rede ao trocar filtro.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Página continua; grade pode zerar; sem crash. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-032-N — Negativo: Falha ao recarregar no cliente — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-FILMES-032` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Rede cortada ao mudar filtro. |
| Passos | 1. Abrir o site e navegar até **Filmes** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Página continua; grade pode zerar; sem crash. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-032-E — Exploratório: Falha ao recarregar no cliente — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-032` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Rede cortada ao mudar filtro. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Falha ao recarregar no cliente.<br>**Contexto:** Erro ao buscar de novo pode esvaziar a grade ou manter último estado, sem quebrar a página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-033 — Limite inicial de cards na tela

### CT-RN-FILMES-033-F — Feliz: Limite inicial de cards na tela

**Camada:** Feliz · **Regra:** `RN-FILMES-033` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro amplo com centenas de títulos. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Contar cards com filtro **Todos**.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Até ~48 cards visíveis na grade por vez (sem botão “carregar mais” nesta página). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-033-N — Negativo: Limite inicial de cards na tela — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-033` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro amplo com centenas de títulos. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtro amplo com centenas de títulos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-033-E — Exploratório: Limite inicial de cards na tela — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-033` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro amplo com centenas de títulos. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Limite inicial de cards na tela.<br>**Contexto:** A grade mostra um lote inicial de filmes (dezenas), não o catálogo inteiro de uma vez.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-034 — Cards com informação de streaming

### CT-RN-FILMES-034-F — Feliz: Cards com informação de streaming

**Camada:** Feliz · **Regra:** `RN-FILMES-034` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com Netflix/Disney+ etc. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Inspecionar card de filme em streaming.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ícones ou pills de plataforma no card. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-034-N — Negativo: Cards com informação de streaming — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-034` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme com Netflix/Disney+ etc. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme com Netflix/Disney+ etc..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-034-E — Exploratório: Cards com informação de streaming — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-034` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme com Netflix/Disney+ etc. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Cards com informação de streaming.<br>**Contexto:** Quando o filme tem plataformas cadastradas, o card pode exibir ícones/nomes de streaming.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-035 — Saga e coleção no card

### CT-RN-FILMES-035-F — Feliz: Saga e coleção no card

**Camada:** Feliz · **Regra:** `RN-FILMES-035` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com saga cadastrada. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Card de filme conhecido em saga.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Atalho de saga visível no card (detalhe em modais). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-035-N — Negativo: Saga e coleção no card — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-035` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme com saga cadastrada. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme com saga cadastrada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-035-E — Exploratório: Saga e coleção no card — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-035` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme com saga cadastrada. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Saga e coleção no card.<br>**Contexto:** Filmes parte de saga podem mostrar indício de continuação no card.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-036 — Curadoria de exibição padrão

### CT-RN-FILMES-036-F — Feliz: Curadoria de exibição padrão

**Camada:** Feliz · **Regra:** `RN-FILMES-036` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme incompleto no catálogo vs filme em cartaz. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Comparar filme rascunho vs filme em cartaz.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Título sem pôster tende a **não** aparecer; em cartaz pode aparecer mesmo com pouca popularidade. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-036-N — Negativo: Curadoria de exibição padrão — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-036` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme incompleto no catálogo vs filme em cartaz. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme incompleto no catálogo vs filme em cartaz..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-036-E — Exploratório: Curadoria de exibição padrão — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-036` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme incompleto no catálogo vs filme em cartaz. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Curadoria de exibição padrão.<br>**Contexto:** A listagem pública prioriza filmes “apresentáveis”: com pôster, sinopse e relevância mínima, salvo exceções de cartaz/em breve.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-037 — Sem pôster

### CT-RN-FILMES-037-F — Feliz: Sem pôster

**Camada:** Feliz · **Regra:** `RN-FILMES-037` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme de teste sem pôster. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Buscar título sem pôster na busca global.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente em Filmes com filtros abertos. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-037-N — Negativo: Sem pôster — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-FILMES-037` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme de teste sem pôster. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-037-E — Exploratório: Sem pôster — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-037` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme de teste sem pôster. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Sem pôster.<br>**Contexto:** Filmes sem imagem de pôster não entram na grade padrão.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-038 — Sem sinopse

### CT-RN-FILMES-038-F — Feliz: Sem sinopse

**Camada:** Feliz · **Regra:** `RN-FILMES-038` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme sem overview. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Validar com dado de teste.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente na listagem geral. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-038-N — Negativo: Sem sinopse — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-FILMES-038` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme sem overview. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-038-E — Exploratório: Sem sinopse — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-038` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme sem overview. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Sem sinopse.<br>**Contexto:** Filmes sem texto de sinopse tendem a ficar de fora, exceto flags de cartaz/em breve.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-039 — Conteúdo adulto explícito

### CT-RN-FILMES-039-F — Feliz: Conteúdo adulto explícito

**Camada:** Feliz · **Regra:** `RN-FILMES-039` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme adulto no catálogo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Buscar título adulto.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente em Filmes. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-039-N — Negativo: Conteúdo adulto explícito — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-FILMES-039` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme adulto no catálogo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-039-E — Exploratório: Conteúdo adulto explícito — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-039` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme adulto no catálogo. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Conteúdo adulto explícito.<br>**Contexto:** Filmes marcados como adultos não aparecem na listagem pública.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-040 — Exceção em cartaz ou em breve

### CT-RN-FILMES-040-F — Feliz: Exceção em cartaz ou em breve

**Camada:** Feliz · **Regra:** `RN-FILMES-040` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme em cartaz com poucos votos. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Testar título em cartaz marginal.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Presente ao usar atalho **Em Cartaz** ou **Em Breve**. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-040-N — Negativo: Exceção em cartaz ou em breve — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-040` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme em cartaz com poucos votos. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme em cartaz com poucos votos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-040-E — Exploratório: Exceção em cartaz ou em breve — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-040` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme em cartaz com poucos votos. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Exceção em cartaz ou em breve.<br>**Contexto:** Filmes em cartaz ou em breve podem aparecer mesmo com popularidade baixa.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-041 — Nota mínima com muitos votos

### CT-RN-FILMES-041-F — Feliz: Nota mínima com muitos votos

**Camada:** Feliz · **Regra:** `RN-FILMES-041` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme nota ~5,5 com centenas de votos. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Comparar com filme bem avaliado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente na listagem geral. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-041-N — Negativo: Nota mínima com muitos votos — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-FILMES-041` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme nota ~5,5 com centenas de votos. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-041-E — Exploratório: Nota mínima com muitos votos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-041` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme nota ~5,5 com centenas de votos. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Nota mínima com muitos votos.<br>**Contexto:** Filmes com muitas avaliações e nota muito baixa tendem a ser ocultados.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-042 — Ano corrente ou futuro mais permissivo

### CT-RN-FILMES-042-F — Feliz: Ano corrente ou futuro mais permissivo

**Camada:** Feliz · **Regra:** `RN-FILMES-042` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano = ano corrente no select. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Filtrar ano corrente.<br>3. Procurar estreia futura.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Estreia futura do ano aparece na grade. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-042-N — Negativo: Ano corrente ou futuro mais permissivo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-042` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Ano = ano corrente no select. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Ano = ano corrente no select..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-042-E — Exploratório: Ano corrente ou futuro mais permissivo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-042` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Ano = ano corrente no select. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Ano corrente ou futuro mais permissivo.<br>**Contexto:** Filtrar pelo **ano atual** (ou futuro) pode incluir estreias ainda sem muita popularidade.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-043 — Filtro por ano civil

### CT-RN-FILMES-043-F — Feliz: Filtro por ano civil

**Camada:** Feliz · **Regra:** `RN-FILMES-043` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Ano 2020 selecionado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Filtrar 2020 e abrir detalhes de cards.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só filmes com data de estreia em 2020. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-043-N — Negativo: Filtro por ano civil — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-043` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Ano 2020 selecionado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Ano 2020 selecionado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-043-E — Exploratório: Filtro por ano civil — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-043` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Ano 2020 selecionado. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Filtro por ano civil.<br>**Contexto:** Ano escolhido limita a estreias daquele ano calendário.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-044 — Filtro por mês

### CT-RN-FILMES-044-F — Feliz: Filtro por mês

**Camada:** Feliz · **Regra:** `RN-FILMES-044` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Março + ano 2025. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Combinar mês e ano.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só estreias de março/2025. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-044-N — Negativo: Filtro por mês — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-044` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Março + ano 2025. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Março + ano 2025..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-044-E — Exploratório: Filtro por mês — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-044` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Março + ano 2025. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Filtro por mês.<br>**Contexto:** Mês escolhido limita estreias daquele mês (com ano definido ou ano corrente).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-045 — Mês sem ano usa ano atual

### CT-RN-FILMES-045-F — Feliz: Mês sem ano usa ano atual

**Camada:** Feliz · **Regra:** `RN-FILMES-045` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mês = mês atual; ano = todos. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Em setembro, filtrar setembro com todos os anos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Estreias daquele mês no ano corrente. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-045-N — Negativo: Mês sem ano usa ano atual — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-045` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Mês = mês atual; ano = todos. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Mês = mês atual; ano = todos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-045-E — Exploratório: Mês sem ano usa ano atual — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-045` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Mês = mês atual; ano = todos. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Mês sem ano usa ano atual.<br>**Contexto:** Só mês selecionado assume o ano de “hoje”.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-046 — Filtro por gênero

### CT-RN-FILMES-046-F — Feliz: Filtro por gênero

**Camada:** Feliz · **Regra:** `RN-FILMES-046` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gênero Action. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Filtrar um gênero raro e validar cards.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só filmes daquele gênero. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-046-N — Negativo: Filtro por gênero — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-046` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Gênero Action. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Gênero Action..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-046-E — Exploratório: Filtro por gênero — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-046` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Gênero Action. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Filtro por gênero.<br>**Contexto:** Gênero escolhido exige correspondência exata no cadastro do filme.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-047 — Filtro por status

### CT-RN-FILMES-047-F — Feliz: Filtro por status

**Camada:** Feliz · **Regra:** `RN-FILMES-047` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Status específico. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Filtrar status e conferir detalhe.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grade coerente com status nos detalhes. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-047-N — Negativo: Filtro por status — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-047` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Status específico. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Status específico..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-047-E — Exploratório: Filtro por status — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-047` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Status específico. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Filtro por status.<br>**Contexto:** Status escolhido restringe ao estado cadastral (ex.: lançado, cancelado).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-048 — Só já lançados (catálogo)

### CT-RN-FILMES-048-F — Feliz: Só já lançados (catálogo)

**Camada:** Feliz · **Regra:** `RN-FILMES-048` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme futuro vs passado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Estreia futura só em **Em Breve**, não como lançado antigo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Filme futuro não entra em conjuntos que exigem “já lançado” (ex.: comparar com atalho **Em Breve**). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-048-N — Negativo: Só já lançados (catálogo) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-048` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme futuro vs passado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme futuro vs passado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-048-E — Exploratório: Só já lançados (catálogo) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-048` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme futuro vs passado. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Só já lançados (catálogo).<br>**Contexto:** Regra interna de “lançados”: data de estreia no passado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-049 — Só futuros (catálogo)

### CT-RN-FILMES-049-F — Feliz: Só futuros (catálogo)

**Camada:** Feliz · **Regra:** `RN-FILMES-049` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme passado e futuro. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Comparar atalhos **Todos** vs **Em Breve**.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | **Em Breve** alinhado a futuros curados. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-049-N — Negativo: Só futuros (catálogo) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-049` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme passado e futuro. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme passado e futuro..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-049-E — Exploratório: Só futuros (catálogo) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-049` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme passado e futuro. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Só futuros (catálogo).<br>**Contexto:** Regra interna de “futuros”: estreia hoje ou depois.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-050 — Disponibilidade cinema (catálogo)

### CT-RN-FILMES-050-F — Feliz: Disponibilidade cinema (catálogo)

**Camada:** Feliz · **Regra:** `RN-FILMES-050` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme só streaming vs em cartaz. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Validar filme em cartaz nos atalhos/gaveta.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | **Em Cartaz** e gaveta **Em cartaz** concentram títulos de cinema. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-050-N — Negativo: Disponibilidade cinema (catálogo) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-050` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme só streaming vs em cartaz. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme só streaming vs em cartaz..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-050-E — Exploratório: Disponibilidade cinema (catálogo) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-050` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme só streaming vs em cartaz. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Disponibilidade cinema (catálogo).<br>**Contexto:** Subconjunto usado em outras áreas para “no cinema”.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-051 — Disponibilidade streaming (catálogo)

### CT-RN-FILMES-051-F — Feliz: Disponibilidade streaming (catálogo)

**Camada:** Feliz · **Regra:** `RN-FILMES-051` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme com plataforma. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Filtrar plataforma + ler etiqueta do card.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Aparece ao filtrar plataforma; etiqueta **No streaming** no card quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-051-N — Negativo: Disponibilidade streaming (catálogo) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-051` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme com plataforma. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme com plataforma..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-051-E — Exploratório: Disponibilidade streaming (catálogo) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-051` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme com plataforma. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Disponibilidade streaming (catálogo).<br>**Contexto:** Subconjunto de títulos com streaming cadastrado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-052 — Ordem alfabética em “Todos”

### CT-RN-FILMES-052-F — Feliz: Ordem alfabética em “Todos”

**Camada:** Feliz · **Regra:** `RN-FILMES-052` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | **Todos os Filmes** ativo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Ler primeiros títulos da grade.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Primeiros cards em ordem A–Z por título. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-052-N — Negativo: Ordem alfabética em “Todos” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-052` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: **Todos os Filmes** ativo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: **Todos os Filmes** ativo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-052-E — Exploratório: Ordem alfabética em “Todos” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-052` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | **Todos os Filmes** ativo. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Ordem alfabética em “Todos”.<br>**Contexto:** Sem atalho **Populares**, ordem por título.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-053 — Listagem mais ampla que a home

### CT-RN-FILMES-053-F — Feliz: Listagem mais ampla que a home

**Camada:** Feliz · **Regra:** `RN-FILMES-053` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Concerto/gravação ao vivo cadastrada. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Comparar mesmo título home vs Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Pode aparecer em Filmes e **não** no carrossel da home. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-053-N — Negativo: Listagem mais ampla que a home — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-053` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Concerto/gravação ao vivo cadastrada. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Concerto/gravação ao vivo cadastrada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-053-E — Exploratório: Listagem mais ampla que a home — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-053` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Concerto/gravação ao vivo cadastrada. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Listagem mais ampla que a home.<br>**Contexto:** A página Filmes pode mostrar títulos que a faixa Filmes da inicial não mostra.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-054 — Opções de filtro só com filmes

### CT-RN-FILMES-054-F — Feliz: Opções de filtro só com filmes

**Camada:** Feliz · **Regra:** `RN-FILMES-054` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Gênero órfão no cadastro interno. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Abrir todos os gêneros e buscar um raro inexistente.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Gênero sem filme **não** aparece no select. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-054-N — Negativo: Opções de filtro só com filmes — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-054` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Gênero órfão no cadastro interno. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Gênero órfão no cadastro interno..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-054-E — Exploratório: Opções de filtro só com filmes — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-054` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Gênero órfão no cadastro interno. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Opções de filtro só com filmes.<br>**Contexto:** Gêneros/plataformas no menu existem porque há pelo menos um filme associado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-055 — Anos sem duplicata

### CT-RN-FILMES-055-F — Feliz: Anos sem duplicata

**Camada:** Feliz · **Regra:** `RN-FILMES-055` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Vários filmes no mesmo ano. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Abrir filtro de ano.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ano único no dropdown. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-055-N — Negativo: Anos sem duplicata — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-055` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Vários filmes no mesmo ano. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Vários filmes no mesmo ano..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-055-E — Exploratório: Anos sem duplicata — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-055` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Vários filmes no mesmo ano. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Anos sem duplicata.<br>**Contexto:** Cada ano aparece uma vez no filtro de ano.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-056 — Janela temporal da home

### CT-RN-FILMES-056-F — Feliz: Janela temporal da home

**Camada:** Feliz · **Regra:** `RN-FILMES-056` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme muito antigo fora da janela da home. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Filme clássico: Filmes vs home.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Presente em Filmes com filtros; pode faltar na home. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-056-N — Negativo: Janela temporal da home — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-FILMES-056` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme muito antigo fora da janela da home. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-056-E — Exploratório: Janela temporal da home — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-056` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme muito antigo fora da janela da home. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Janela temporal da home.<br>**Contexto:** Carrossel da inicial foca lançamentos em janela de anos próximos; Filmes lista histórico amplo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-057 — Concertos na listagem

### CT-RN-FILMES-057-F — Feliz: Concertos na listagem

**Camada:** Feliz · **Regra:** `RN-FILMES-057` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Título tipo “Live from…”. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Buscar concerto na página Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Card visível em Filmes; pode faltar no carrossel da home. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-057-N — Negativo: Concertos na listagem — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-057` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Título tipo “Live from…”. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Título tipo “Live from…”..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-057-E — Exploratório: Concertos na listagem — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-057` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Título tipo “Live from…”. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Concertos na listagem.<br>**Contexto:** Shows, stand-up e concertos ao vivo podem aparecer aqui.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-058 — Curta-metragem futuro na home

### CT-RN-FILMES-058-F — Feliz: Curta-metragem futuro na home

**Camada:** Feliz · **Regra:** `RN-FILMES-058` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Curta com duração conhecida e estreia futura. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Comparar home vs Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Pode aparecer em Filmes filtrando ano/mês; pode faltar na home. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-058-N — Negativo: Curta-metragem futuro na home — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-058` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Curta com duração conhecida e estreia futura. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Curta com duração conhecida e estreia futura..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-058-E — Exploratório: Curta-metragem futuro na home — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-058` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Curta com duração conhecida e estreia futura. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Curta-metragem futuro na home.<br>**Contexto:** Estreias futuras muito curtas podem ser excluídas do carrossel inicial.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-059 — Duração mínima só na home

### CT-RN-FILMES-059-F — Feliz: Duração mínima só na home

**Camada:** Feliz · **Regra:** `RN-FILMES-059` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme futuro curto. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Mesmo título home vs Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Visível em Filmes se passar curadoria da listagem. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-059-N — Negativo: Duração mínima só na home — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-059` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme futuro curto. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme futuro curto..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-059-E — Exploratório: Duração mínima só na home — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-059` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme futuro curto. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Duração mínima só na home.<br>**Contexto:** Regra de “filme de estreia” longo para destaque na home não se aplica à listagem Filmes.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-060 — Abrir detalhe pelo card

### CT-RN-FILMES-060-F — Feliz: Abrir detalhe pelo card

**Camada:** Feliz · **Regra:** `RN-FILMES-060` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card na grade ou gaveta. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Clicar poster/título.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Modal com sinopse, datas, links. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-060-N — Negativo: Abrir detalhe pelo card — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-060` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Card na grade ou gaveta. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Card na grade ou gaveta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-060-E — Exploratório: Abrir detalhe pelo card — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-060` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Card na grade ou gaveta. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Abrir detalhe pelo card.<br>**Contexto:** Clique no card abre painel/modal de detalhe do filme.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-061 — Destaques no detalhe

### CT-RN-FILMES-061-F — Feliz: Destaques no detalhe

**Camada:** Feliz · **Regra:** `RN-FILMES-061` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme elegível a destaque editorial. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Abrir detalhe de estreia aguardada.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Pills no modal além do status normal. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-061-N — Negativo: Destaques no detalhe — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-061` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme elegível a destaque editorial. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme elegível a destaque editorial..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-061-E — Exploratório: Destaques no detalhe — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-061` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme elegível a destaque editorial. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Destaques no detalhe.<br>**Contexto:** Alguns filmes exibem etiquetas extras (ex.: mais esperado) no detalhe.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-062 — Edição administrativa

### CT-RN-FILMES-062-F — Feliz: Edição administrativa

**Camada:** Feliz · **Regra:** `RN-FILMES-062` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta visitante ou usuário comum. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Confirmar ausência de controles de admin na página Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Comportamento da listagem reflete catálogo já publicado; sem UI de edição aqui. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-062-N — Negativo: Edição administrativa — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-062` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Conta visitante ou usuário comum. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Conta visitante ou usuário comum..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-062-E — Exploratório: Edição administrativa — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-062` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Conta visitante ou usuário comum. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Edição administrativa.<br>**Contexto:** Alterações de cadastro feitas por equipe interna não são testadas nesta tela pública.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-063 — Ranking “mais esperados”

### CT-RN-FILMES-063-F — Feliz: Ranking “mais esperados”

**Camada:** Feliz · **Regra:** `RN-FILMES-063` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Estreias próximas no catálogo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Comparar filme “mais esperado” na home vs Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Filmes pode mostrar pills nos cards/detalhe; ranking completo não é seção fixa aqui. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-063-N — Negativo: Ranking “mais esperados” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-063` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Estreias próximas no catálogo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Estreias próximas no catálogo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-063-E — Exploratório: Ranking “mais esperados” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-063` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Estreias próximas no catálogo. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Ranking “mais esperados”.<br>**Contexto:** Lista de antecipação de estreias alimenta destaques em outras áreas (ex.: **Em alta** na home), não um bloco dedicado em Filmes.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-064 — Timeline por ano (outras telas)

### CT-RN-FILMES-064-F — Feliz: Timeline por ano (outras telas)

**Camada:** Feliz · **Regra:** `RN-FILMES-064` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário em Filmes. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Confirmar ausência de carrossel mensal contínuo em Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Filmes usa grade + filtros ano/mês, não carrossel temporal contínuo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-064-N — Negativo: Timeline por ano (outras telas) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-064` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário em Filmes. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário em Filmes..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-064-E — Exploratório: Timeline por ano (outras telas) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-064` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário em Filmes. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Timeline por ano (outras telas).<br>**Contexto:** Navegação mês a mês por carrossel existe na home, não como timeline na página Filmes.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-065 — Timeline por mês (outras telas)

### CT-RN-FILMES-065-F — Feliz: Timeline por mês (outras telas)

**Camada:** Feliz · **Regra:** `RN-FILMES-065` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mês selecionado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Filtrar mês e rolar grade.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grade estática filtrada, não slide por slide de timeline. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-065-N — Negativo: Timeline por mês (outras telas) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-065` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Mês selecionado. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Mês selecionado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-065-E — Exploratório: Timeline por mês (outras telas) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-065` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Mês selecionado. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Timeline por mês (outras telas).<br>**Contexto:** Agrupamento fino por mês no carrossel da home; aqui filtro de mês na grade.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-066 — Só ano confirmado (outras telas)

### CT-RN-FILMES-066-F — Feliz: Só ano confirmado (outras telas)

**Camada:** Feliz · **Regra:** `RN-FILMES-066` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filme TBA só com ano. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Filme “2027 — data a confirmar” em Filmes vs home.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Pode listar com data incompleta nos detalhes; sem separador TBD como na home. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-066-N — Negativo: Só ano confirmado (outras telas) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-066` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filme TBA só com ano. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filme TBA só com ano..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-066-E — Exploratório: Só ano confirmado (outras telas) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-066` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filme TBA só com ano. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Só ano confirmado (outras telas).<br>**Contexto:** Blocos “sem data confirmada” aparecem no carrossel da home; em Filmes use filtro de ano e status.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-067 — Contador alinhado ao total filtrado

### CT-RN-FILMES-067-F — Feliz: Contador alinhado ao total filtrado

**Camada:** Feliz · **Regra:** `RN-FILMES-067` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro restritivo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Anotar contador e amostrar busca por título.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Contador = quantidade lógica do filtro. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-067-N — Negativo: Contador alinhado ao total filtrado — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-067` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro restritivo. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtro restritivo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-067-E — Exploratório: Contador alinhado ao total filtrado — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-067` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro restritivo. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Contador alinhado ao total filtrado.<br>**Contexto:** Número exibido corresponde ao conjunto filtrado no servidor, não a páginas visuais futuras.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-FILMES-068 — Coerência após recarregar

### CT-RN-FILMES-068-F — Feliz: Coerência após recarregar

**Camada:** Feliz · **Regra:** `RN-FILMES-068` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtros alterados; F5. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Alterar filtros e recarregar navegador.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Atalho **Todos** e selects voltam ao padrão; nova carga inicial. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-068-N — Negativo: Coerência após recarregar — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-FILMES-068` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtros alterados; F5. |
| Passos | 1. Abrir o site e navegar até **Filmes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtros alterados; F5..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-FILMES-068-E — Exploratório: Coerência após recarregar — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-FILMES-068` · **Tela:** Filmes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtros alterados; F5. |
| Passos | **Charter (15 min)** — área: **Filmes** · regra: Coerência após recarregar.<br>**Contexto:** Recarregar a página mantém filtros no estado inicial (não persistem na URL por padrão).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |
