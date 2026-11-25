# Camadas — Minha lista

**Inventário:** `10-MINHA-LISTA.md` · **Cenários:** 117

---

## RN-LISTA-001 — Rotas exigem login

### CT-RN-LISTA-001-F — Feliz: Rotas exigem login

**Camada:** Feliz · **Regra:** `RN-LISTA-001` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Visitante não autenticado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Anônimo tenta abrir lista de animes pelo menu.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Redirecionamento para tela de **Entrar**, com retorno para a página que tentou abrir após login bem-sucedido. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-001-N — Negativo: Rotas exigem login — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-001` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Visitante não autenticado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Visitante não autenticado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-001-E — Exploratório: Rotas exigem login — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-001` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Visitante não autenticado. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Rotas exigem login.<br>**Contexto:** Qualquer área sob Minha Lista.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-002 — Camada de UX

### CT-RN-LISTA-002-F — Feliz: Camada de UX

**Camada:** Feliz · **Regra:** `RN-LISTA-002` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Visitante vs logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Comparar anônimo (redirect) vs logado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Sem login não vê conteúdo da lista; logado vê dados pessoais. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-002-N — Negativo: Camada de UX — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-002` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Visitante vs logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Visitante vs logado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-002-E — Exploratório: Camada de UX — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-002` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Visitante vs logado. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Camada de UX.<br>**Contexto:** O site barra acesso visual cedo; ações sensíveis ainda dependem da sessão válida.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-010 — Quatro tipos de mídia

### CT-RN-LISTA-010-F — Feliz: Quatro tipos de mídia

**Camada:** Feliz · **Regra:** `RN-LISTA-010` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Clicar Animes vs Filmes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cards: Animes, Filmes, Séries, Jogos; **somente Animes** leva a uma lista ativa hoje. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-010-N — Negativo: Quatro tipos de mídia — sem a condição exigida

**Camada:** Negativo · **Regra:** `RN-LISTA-010` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Usar usuário, dado ou estado **sem** a condição da regra (ex.: não logado se a regra exige login).<br>3. Repetir a mesma ação do caminho feliz.<br>4. Verificar que o elemento/comportamento **não** aparece ou permanece desabilitado. |
| Resultado_Esperado | O resultado feliz **não** ocorre; a tela permanece coerente (sem vazamento indevido). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-010-E — Exploratório: Quatro tipos de mídia — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-010` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário logado. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Quatro tipos de mídia.<br>**Contexto:** Página inicial da Minha Lista.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-011 — “Em breve”

### CT-RN-LISTA-011-F — Feliz: “Em breve”

**Camada:** Feliz · **Regra:** `RN-LISTA-011` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Hub aberto. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Tentar clicar Filmes no hub.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Filmes, Séries e Jogos aparecem esmaecidos, sem link, com selo “Em breve”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-011-N — Negativo: “Em breve” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-011` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Hub aberto. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Hub aberto..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-011-E — Exploratório: “Em breve” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-011` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Hub aberto. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: “Em breve”.<br>**Contexto:** Tipos ainda não disponíveis.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-012 — Mensagem orientadora

### CT-RN-LISTA-012-F — Feliz: Mensagem orientadora

**Camada:** Feliz · **Regra:** `RN-LISTA-012` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Hub aberto. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Ler texto introdutório.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Texto explicando que a organização começa pelos animes. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-012-N — Negativo: Mensagem orientadora — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-012` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Hub aberto. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Hub aberto..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-012-E — Exploratório: Mensagem orientadora — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-012` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Hub aberto. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Mensagem orientadora.<br>**Contexto:** Copy da página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-020 — Abas Catálogo vs Fila

### CT-RN-LISTA-020-F — Feliz: Abas Catálogo vs Fila

**Camada:** Feliz · **Regra:** `RN-LISTA-020` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado em Minha Lista. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Alternar entre hub e fila.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Links “Catálogo Orbe” (hub) e “Fila Crunchyroll”; aba atual destacada. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-020-N — Negativo: Abas Catálogo vs Fila — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-020` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado em Minha Lista. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado em Minha Lista..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-020-E — Exploratório: Abas Catálogo vs Fila — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-020` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado em Minha Lista. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Abas Catálogo vs Fila.<br>**Contexto:** Barra local em subpáginas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-021 — Animes fora da barra

### CT-RN-LISTA-021-F — Feliz: Animes fora da barra

**Camada:** Feliz · **Regra:** `RN-LISTA-021` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Confirmar links da nav vs entrada por animes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | A lista de animes não aparece na barra lateral; acesso via hub, header “Mais” ou atalhos. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-021-N — Negativo: Animes fora da barra — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-LISTA-021` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-021-E — Exploratório: Animes fora da barra — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-021` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Animes fora da barra.<br>**Contexto:** Acesso à lista de animes.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-030 — Exige login na tela

### CT-RN-LISTA-030-F — Feliz: Exige login na tela

**Camada:** Feliz · **Regra:** `RN-LISTA-030` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sessão expirada na página. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Abrir rota futura sem cookie.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Redireciona para Entrar; nada da lista é mostrado. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-030-N — Negativo: Exige login na tela — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-030` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Sessão expirada na página. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Sessão expirada na página..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-030-E — Exploratório: Exige login na tela — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-030` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Sessão expirada na página. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Exige login na tela.<br>**Contexto:** Renderização client-side.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-031 — Carregar lista pessoal

### CT-RN-LISTA-031-F — Feliz: Carregar lista pessoal

**Camada:** Feliz · **Regra:** `RN-LISTA-031` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Aplicar filtros e recarregar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grid de obras conforme filtros; falha de permissão → Entrar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-031-N — Negativo: Carregar lista pessoal — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-LISTA-031` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Grid de obras conforme filtros; falha de permissão → Entrar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-031-E — Exploratório: Carregar lista pessoal — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-031` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Carregar lista pessoal.<br>**Contexto:** Dados do usuário.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-032 — Filtro por status

### CT-RN-LISTA-032-F — Feliz: Filtro por status

**Camada:** Feliz · **Regra:** `RN-LISTA-032` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista com itens variados. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Clicar cada aba.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Abas: Tudo, Quero assistir, Acompanhando, Favoritos, Assistidos/jogados. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-032-N — Negativo: Filtro por status — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-032` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Lista com itens variados. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Lista com itens variados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-032-E — Exploratório: Filtro por status — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-032` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Lista com itens variados. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Filtro por status.<br>**Contexto:** Abas de estado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-033 — Filtro por tipo

### CT-RN-LISTA-033-F — Feliz: Filtro por tipo

**Camada:** Feliz · **Regra:** `RN-LISTA-033` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista mista. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Filtrar só jogos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Chips: todos, filme, série, anime, jogo restringem o grid. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-033-N — Negativo: Filtro por tipo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-033` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Lista mista. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Lista mista..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-033-E — Exploratório: Filtro por tipo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-033` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Lista mista. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Filtro por tipo.<br>**Contexto:** Chips de mídia.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-034 — Itens ocultos

### CT-RN-LISTA-034-F — Feliz: Itens ocultos

**Camada:** Feliz · **Regra:** `RN-LISTA-034` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Itens marcados como ocultos. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Marcar “não me interessa” e voltar à lista.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Não aparecem na lista visível. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-034-N — Negativo: Itens ocultos — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-LISTA-034` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Itens marcados como ocultos. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-034-E — Exploratório: Itens ocultos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-034` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Itens marcados como ocultos. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Itens ocultos.<br>**Contexto:** Status “oculto” / não me interessa.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-035 — Status ao vivo

### CT-RN-LISTA-035-F — Feliz: Status ao vivo

**Camada:** Feliz · **Regra:** `RN-LISTA-035` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mudar status em outra tela sem recarregar. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Favoritar na home → abrir minha lista.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Lista reflete ação mais recente do usuário sobre o card. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-035-N — Negativo: Status ao vivo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-035` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Mudar status em outra tela sem recarregar. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Mudar status em outra tela sem recarregar..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-035-E — Exploratório: Status ao vivo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-035` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Mudar status em outra tela sem recarregar. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Status ao vivo.<br>**Contexto:** Alterações recentes nos cards.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-036 — Aviso de itens faltantes

### CT-RN-LISTA-036-F — Feliz: Aviso de itens faltantes

**Camada:** Feliz · **Regra:** `RN-LISTA-036` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta com referências antigas. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Conta de teste com `missingCount` se existir.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mensagem com quantidade de itens não encontrados no catálogo. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-036-N — Negativo: Aviso de itens faltantes — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-LISTA-036` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Conta com referências antigas. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-036-E — Exploratório: Aviso de itens faltantes — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-036` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Conta com referências antigas. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Aviso de itens faltantes.<br>**Contexto:** Obras salvas fora do catálogo atual.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-037 — Listas vazias

### CT-RN-LISTA-037-F — Feliz: Listas vazias

**Camada:** Feliz · **Regra:** `RN-LISTA-037` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista vazia vs filtros restritivos. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Zerar filtros vs filtro impossível.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mensagens diferentes para “nada na lista” vs “nenhum item neste filtro”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-037-N — Negativo: Listas vazias — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-037` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Lista vazia vs filtros restritivos. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Lista vazia vs filtros restritivos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-037-E — Exploratório: Listas vazias — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-037` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Lista vazia vs filtros restritivos. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Listas vazias.<br>**Contexto:** Sem itens ou filtro sem match.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-040 — Visitante

### CT-RN-LISTA-040-F — Feliz: Visitante

**Camada:** Feliz · **Regra:** `RN-LISTA-040` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário não logado (cenário raro nesta rota). |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Validar RN-LISTA-001.<br>3. Esta regra cobre mensagem na página se aplicável.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | CTA “Entrar no Orbe”; em fluxo normal o redirect de RN-LISTA-001 ocorre antes. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-040-N — Negativo: Visitante — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-040` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário não logado (cenário raro nesta rota). |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário não logado (cenário raro nesta rota)..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-040-E — Exploratório: Visitante — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-040` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário não logado (cenário raro nesta rota). |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Visitante.<br>**Contexto:** Fallback se a página carregar sem sessão.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-041 — Carregar ao abrir

### CT-RN-LISTA-041-F — Feliz: Carregar ao abrir

**Camada:** Feliz · **Regra:** `RN-LISTA-041` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Abrir animes logado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ao entrar na página, lista e estados carregam automaticamente. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-041-N — Negativo: Carregar ao abrir — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-041` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-041-E — Exploratório: Carregar ao abrir — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-041` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Carregar ao abrir.<br>**Contexto:** Lista de animes pessoal.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-042 — Última sincronização

### CT-RN-LISTA-042-F — Feliz: Última sincronização

**Camada:** Feliz · **Regra:** `RN-LISTA-042` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta com/sem sync prévia. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Conta nova vs conta com extensão.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Data/hora da última sync ou texto de nunca sincronizado. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-042-N — Negativo: Última sincronização — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-042` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Conta com/sem sync prévia. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Conta com/sem sync prévia..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-042-E — Exploratório: Última sincronização — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-042` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Conta com/sem sync prévia. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Última sincronização.<br>**Contexto:** Informação de frescor dos dados.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-043 — Ações da barra

### CT-RN-LISTA-043-F — Feliz: Ações da barra

**Camada:** Feliz · **Regra:** `RN-LISTA-043` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página animes. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Clicar atualizar.<br>3. Importar arquivo demo se disponível.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Botões: atualizar lista, importar backup de arquivo, importar demo (ambiente QA). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-043-N — Negativo: Ações da barra — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-043` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página animes. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página animes..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-043-E — Exploratório: Ações da barra — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-043` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página animes. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Ações da barra.<br>**Contexto:** Ferramentas no topo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-044 — Banners informativos

### CT-RN-LISTA-044-F — Feliz: Banners informativos

**Camada:** Feliz · **Regra:** `RN-LISTA-044` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página carregada. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Simular offline.<br>3. Ver banner.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Banners de offline e opt-in de notificações push quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-044-N — Negativo: Banners informativos — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-044` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página carregada. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página carregada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-044-E — Exploratório: Banners informativos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-044` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página carregada. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Banners informativos.<br>**Contexto:** Topo da página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-045 — Painel da extensão

### CT-RN-LISTA-045-F — Feliz: Painel da extensão

**Camada:** Feliz · **Regra:** `RN-LISTA-045` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página animes. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Com/sem extensão instalada.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Bloco com status da extensão do navegador e opção de verificar de novo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-045-N — Negativo: Painel da extensão — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-045` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página animes. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página animes..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-045-E — Exploratório: Painel da extensão — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-045` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página animes. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Painel da extensão.<br>**Contexto:** Integração Crunchyroll.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-046 — Filtros da watchlist

### CT-RN-LISTA-046-F — Feliz: Filtros da watchlist

**Camada:** Feliz · **Regra:** `RN-LISTA-046` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista com vários estados. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Alternar abas e contar itens.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Abas: todos, em andamento (continuar/seguir), começar, terminado, dublagem PT-BR; contagens por aba. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-046-N — Negativo: Filtros da watchlist — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-046` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Lista com vários estados. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Lista com vários estados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-046-E — Exploratório: Filtros da watchlist — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-046` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Lista com vários estados. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Filtros da watchlist.<br>**Contexto:** Abas locais.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-047 — Lista vazia orientada

### CT-RN-LISTA-047-F — Feliz: Lista vazia orientada

**Camada:** Feliz · **Regra:** `RN-LISTA-047` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Zero itens. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Conta vazia com/sem extensão.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mensagem e CTAs diferentes se extensão instalada (conectar) vs não instalada (instalar). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-047-N — Negativo: Lista vazia orientada — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-047` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Zero itens. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Zero itens..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-047-E — Exploratório: Lista vazia orientada — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-047` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Zero itens. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Lista vazia orientada.<br>**Contexto:** Sem animes na lista.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-048 — Remover item

### CT-RN-LISTA-048-F — Feliz: Remover item

**Camada:** Feliz · **Regra:** `RN-LISTA-048` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item na lista. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Remover um título → cancelar e confirmar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Diálogo de confirmação do navegador antes de remover. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-048-N — Negativo: Remover item — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-048` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Item na lista. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Item na lista..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-048-E — Exploratório: Remover item — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-048` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Item na lista. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Remover item.<br>**Contexto:** Exclusão de um anime.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-049 — Editar progresso

### CT-RN-LISTA-049-F — Feliz: Editar progresso

**Camada:** Feliz · **Regra:** `RN-LISTA-049` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item com progresso. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Editar S2 E5 → salvar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Modal de edição; salvar atualiza card. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-049-N — Negativo: Editar progresso — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-049` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Item com progresso. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Item com progresso..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-049-E — Exploratório: Editar progresso — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-049` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Item com progresso. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Editar progresso.<br>**Contexto:** Temporada/episódio assistido.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-050 — Feedback de sync/import

### CT-RN-LISTA-050-F — Feliz: Feedback de sync/import

**Camada:** Feliz · **Regra:** `RN-LISTA-050` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Operação concluída. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Sync com sucesso e com erro.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Banner verde ou vermelho com opção fechar. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-050-N — Negativo: Feedback de sync/import — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-050` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Operação concluída. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Operação concluída..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-050-E — Exploratório: Feedback de sync/import — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-050` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Operação concluída. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Feedback de sync/import.<br>**Contexto:** Após atualizar ou importar.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-051 — Modo offline

### CT-RN-LISTA-051-F — Feliz: Modo offline

**Camada:** Feliz · **Regra:** `RN-LISTA-051` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Lista já carregada uma vez. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Carregar → offline → recarregar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Itens anteriores permanecem visíveis offline quando possível. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-051-N — Negativo: Modo offline — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-051` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Lista já carregada uma vez. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Lista já carregada uma vez..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-051-E — Exploratório: Modo offline — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-051` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Lista já carregada uma vez. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Modo offline.<br>**Contexto:** Sem rede após já ter dados.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-052 — Backup antigo

### CT-RN-LISTA-052-F — Feliz: Backup antigo

**Camada:** Feliz · **Regra:** `RN-LISTA-052` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Arquivo backup formato antigo. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Importar backup legado de QA.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Campos normalizados (identificadores e status antigos mapeados) após import. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-052-N — Negativo: Backup antigo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-052` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Arquivo backup formato antigo. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Arquivo backup formato antigo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-052-E — Exploratório: Backup antigo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-052` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Arquivo backup formato antigo. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Backup antigo.<br>**Contexto:** Import de arquivo legado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-053 — Adicionar do catálogo

### CT-RN-LISTA-053-F — Feliz: Adicionar do catálogo

**Camada:** Feliz · **Regra:** `RN-LISTA-053` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Adicionar anime pelo catálogo interno.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Fluxo “adicionar do catálogo Orbe” refresca a lista após incluir. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-053-N — Negativo: Adicionar do catálogo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-053` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-053-E — Exploratório: Adicionar do catálogo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-053` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Adicionar do catálogo.<br>**Contexto:** Inclusão manual.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-060 — Exige login

### CT-RN-LISTA-060-F — Feliz: Exige login

**Camada:** Feliz · **Regra:** `RN-LISTA-060` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anônimo. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Abrir fila sem login.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Redirect para Entrar. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-060-N — Negativo: Exige login — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-060` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anônimo. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Anônimo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-060-E — Exploratório: Exige login — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-060` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anônimo. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Exige login.<br>**Contexto:** Mesmo padrão das demais rotas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-061 — Ordem da fila

### CT-RN-LISTA-061-F — Feliz: Ordem da fila

**Camada:** Feliz · **Regra:** `RN-LISTA-061` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado com fila populada. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Validar ordem dos blocos/linhas.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ordem: **Continuar** → **A seguir** → **Começar** (conforme descrição no cabeçalho da página). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-061-N — Negativo: Ordem da fila — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-061` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado com fila populada. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado com fila populada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-061-E — Exploratório: Ordem da fila — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-061` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado com fila populada. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Ordem da fila.<br>**Contexto:** Prioridade de assistir.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-062 — Estados especiais

### CT-RN-LISTA-062-F — Feliz: Estados especiais

**Camada:** Feliz · **Regra:** `RN-LISTA-062` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Itens nesses estados. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Itens de teste nesses estados.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Rótulos em destaque âmbar para “esperando dublagem” e “esperando episódio”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-062-N — Negativo: Estados especiais — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-062` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Itens nesses estados. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Itens nesses estados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-062-E — Exploratório: Estados especiais — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-062` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Itens nesses estados. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Estados especiais.<br>**Contexto:** Espera de dublagem ou episódio.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-063 — Dicas de catálogo CR

### CT-RN-LISTA-063-F — Feliz: Dicas de catálogo CR

**Camada:** Feliz · **Regra:** `RN-LISTA-063` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item na fila. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Ler hint sob um anime.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Resumo de episódios no ar, dublados PT-BR e fronteira sub/dub quando existir. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-063-N — Negativo: Dicas de catálogo CR — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-063` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Item na fila. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Item na fila..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-063-E — Exploratório: Dicas de catálogo CR — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-063` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Item na fila. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Dicas de catálogo CR.<br>**Contexto:** Texto auxiliar por linha.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-064 — Trilha de áudio

### CT-RN-LISTA-064-F — Feliz: Trilha de áudio

**Camada:** Feliz · **Regra:** `RN-LISTA-064` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Item com metadados. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Comparar anime dub vs sub.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Linha com temporada/ep e “Trilha PT-BR” ou “Leg/sub”. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-064-N — Negativo: Trilha de áudio — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-064` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Item com metadados. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Item com metadados..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-064-E — Exploratório: Trilha de áudio — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-064` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Item com metadados. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Trilha de áudio.<br>**Contexto:** Informação de legenda vs dublagem.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-065 — Abrir detalhe

### CT-RN-LISTA-065-F — Feliz: Abrir detalhe

**Camada:** Feliz · **Regra:** `RN-LISTA-065` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime ligado ao catálogo Orbe. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Clicar linha com anime resolvido.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Abre modal de detalhe do anime. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-065-N — Negativo: Abrir detalhe — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-065` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anime ligado ao catálogo Orbe. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Anime ligado ao catálogo Orbe..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-065-E — Exploratório: Abrir detalhe — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-065` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anime ligado ao catálogo Orbe. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Abrir detalhe.<br>**Contexto:** Clique na linha.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-066 — Ajuda extensão

### CT-RN-LISTA-066-F — Feliz: Ajuda extensão

**Camada:** Feliz · **Regra:** `RN-LISTA-066` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página fila. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Ler bloco de instruções.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Link para watchlist Crunchyroll e nota sobre filtro de dublagem PT-BR no popup da extensão. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-066-N — Negativo: Ajuda extensão — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-066` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página fila. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página fila..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-066-E — Exploratório: Ajuda extensão — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-066` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página fila. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Ajuda extensão.<br>**Contexto:** Orientação na página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-070 — Login para interagir

### CT-RN-LISTA-070-F — Feliz: Login para interagir

**Camada:** Feliz · **Regra:** `RN-LISTA-070` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anônimo em tela que mostra cards (ex. após bug). |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Deslogar e tentar favoritar na lista.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Toast pedindo login; ação não conclui. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-070-N — Negativo: Login para interagir — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-070` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anônimo em tela que mostra cards (ex. após bug). |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Anônimo em tela que mostra cards (ex. após bug)..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-070-E — Exploratório: Login para interagir — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-070` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anônimo em tela que mostra cards (ex. após bug). |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Login para interagir.<br>**Contexto:** Favoritar, listas, etc.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-071 — Significado dos status

### CT-RN-LISTA-071-F — Feliz: Significado dos status

**Camada:** Feliz · **Regra:** `RN-LISTA-071` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Aplicar cada status.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Favorito, quero assistir, acompanhando; “não me interessa” oculta da lista principal. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-071-N — Negativo: Significado dos status — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-LISTA-071` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-071-E — Exploratório: Significado dos status — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-071` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Significado dos status.<br>**Contexto:** Menu do card.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-LISTA-072 — Acompanhando só anime/série

### CT-RN-LISTA-072-F — Feliz: Acompanhando só anime/série

**Camada:** Feliz · **Regra:** `RN-LISTA-072` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card de filme vs anime. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Abrir menu em filme e anime.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | “Acompanhando” oferecido para anime e série; não para filme/jogo da mesma forma. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-072-N — Negativo: Acompanhando só anime/série — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-LISTA-072` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Card de filme vs anime. |
| Passos | 1. Abrir o site e navegar até **Minha lista**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Card de filme vs anime..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-LISTA-072-E — Exploratório: Acompanhando só anime/série — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-LISTA-072` · **Tela:** Minha lista

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Card de filme vs anime. |
| Passos | **Charter (15 min)** — área: **Minha lista** · regra: Acompanhando só anime/série.<br>**Contexto:** Opção no menu.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |
