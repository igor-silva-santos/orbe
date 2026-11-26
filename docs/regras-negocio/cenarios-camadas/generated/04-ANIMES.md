# Camadas — Animes

**Inventário:** `04-ANIMES.md` · **Cenários:** 60

---

## RN-ANIMES-001 — Conteúdo na abertura

### CT-RN-ANIMES-001-F — Feliz: Conteúdo na abertura

**Camada:** Feliz · **Regra:** `RN-ANIMES-001` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo acessível. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Abrir Animes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Cards e selects visíveis após carregar. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-001-N — Negativo: Conteúdo na abertura — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-001` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo acessível. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Catálogo acessível..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-001-E — Exploratório: Conteúdo na abertura — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-001` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo acessível. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Conteúdo na abertura.<br>**Contexto:** Lista e filtros já aparecem ao entrar (com possível segunda atualização logo após).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-002 — Falha na abertura

### CT-RN-ANIMES-002-F — Feliz: Falha na abertura

**Camada:** Feliz · **Regra:** `RN-ANIMES-002` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Falha simulada. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Ambiente com catálogo indisponível na abertura.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grade vazia; filtros vazios; página utilizável. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-002-N — Negativo: Falha na abertura — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-ANIMES-002` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Falha simulada. |
| Passos | 1. Abrir o site e navegar até **Animes** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Grade vazia; filtros vazios; página utilizável. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-002-E — Exploratório: Falha na abertura — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-002` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Falha simulada. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Falha na abertura.<br>**Contexto:** Catálogo indisponível no primeiro momento não quebra a página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-003 — Texto do cabeçalho

### CT-RN-ANIMES-003-F — Feliz: Texto do cabeçalho

**Camada:** Feliz · **Regra:** `RN-ANIMES-003` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário em Animes. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Ler cabeçalho.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | **Animes** + texto sobre temporadas e clássicos. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-003-N — Negativo: Texto do cabeçalho — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-003` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário em Animes. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário em Animes..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-003-E — Exploratório: Texto do cabeçalho — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-003` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário em Animes. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Texto do cabeçalho.<br>**Contexto:** Título e descrição fixos.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-004 — Gaveta O que vem aí

### CT-RN-ANIMES-004-F — Feliz: Gaveta O que vem aí

**Camada:** Feliz · **Regra:** `RN-ANIMES-004` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Resumo com **próximos animes**. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Ambiente com estreias futuras.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Seção **O que vem aí** acima dos filtros. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-004-N — Negativo: Gaveta O que vem aí — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-004` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Resumo com **próximos animes**. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Resumo com **próximos animes**..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-004-E — Exploratório: Gaveta O que vem aí — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-004` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Resumo com **próximos animes**. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Gaveta O que vem aí.<br>**Contexto:** Animes futuros em carrossel horizontal.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-005 — Opções dos filtros

### CT-RN-ANIMES-005-F — Feliz: Opções dos filtros

**Camada:** Feliz · **Regra:** `RN-ANIMES-005` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo populado. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Abrir cada select e comparar com títulos conhecidos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Dropdowns preenchidos; gêneros em ordem alfabética; anos do mais recente ao mais antigo; status com rótulo em português quando aplicável. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-005-N — Negativo: Opções dos filtros — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-005` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo populado. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Catálogo populado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-005-E — Exploratório: Opções dos filtros — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-005` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo populado. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Opções dos filtros.<br>**Contexto:** Gêneros, anos, formatos, fontes e status vêm do catálogo disponível.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-006 — Valor “Todos”

### CT-RN-ANIMES-006-F — Feliz: Valor “Todos”

**Camada:** Feliz · **Regra:** `RN-ANIMES-006` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Todos em todos os selects. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Resetar filtros.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Grade ampla. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-006-N — Negativo: Valor “Todos” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-006` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Todos em todos os selects. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Todos em todos os selects..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-006-E — Exploratório: Valor “Todos” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-006` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Todos em todos os selects. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Valor “Todos”.<br>**Contexto:** Cada filtro em “Todos os …” não restringe aquele critério.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-007 — Recarga ao mudar filtro e na hidratação

### CT-RN-ANIMES-007-F — Feliz: Recarga ao mudar filtro e na hidratação

**Camada:** Feliz · **Regra:** `RN-ANIMES-007` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página recém-aberta ou filtro alterado. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Abrir Animes observando loading.<br>3. Depois trocar gênero.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Spinner possível logo após abrir; novo spinner ao mudar filtro. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-007-N — Negativo: Recarga ao mudar filtro e na hidratação — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-007` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página recém-aberta ou filtro alterado. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página recém-aberta ou filtro alterado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-007-E — Exploratório: Recarga ao mudar filtro e na hidratação — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-007` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página recém-aberta ou filtro alterado. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Recarga ao mudar filtro e na hidratação.<br>**Contexto:** A grade recarrega quando a página termina de abrir **e** sempre que um filtro muda (pode haver um loading extra logo após a primeira pintura).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-008 — Atualização após sync

### CT-RN-ANIMES-008-F — Feliz: Atualização após sync

**Camada:** Feliz · **Regra:** `RN-ANIMES-008` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Sync disparada. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Manter Animes aberta durante sync.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Lista muda sem F5. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-008-N — Negativo: Atualização após sync — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-008` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Sync disparada. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Sync disparada..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-008-E — Exploratório: Atualização após sync — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-008` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Sync disparada. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Atualização após sync.<br>**Contexto:** Sync do catálogo pode atualizar a grade com a página aberta.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-009 — Contador = cards da página atual

### CT-RN-ANIMES-009-F — Feliz: Contador = cards da página atual

**Camada:** Feliz · **Regra:** `RN-ANIMES-009` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Mais de ~48 animes para o filtro. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Filtro amplo.<br>3. Comparar contador com total esperado manualmente.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Contador pode mostrar até ~48 enquanto existem mais no catálogo. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-009-N — Negativo: Contador = cards da página atual — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-009` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Mais de ~48 animes para o filtro. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Mais de ~48 animes para o filtro..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-009-E — Exploratório: Contador = cards da página atual — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-009` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Mais de ~48 animes para o filtro. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Contador = cards da página atual.<br>**Contexto:** O texto “X animes encontrados” conta os cards **mostrados**, não necessariamente o total de animes que existem para o filtro no catálogo.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-010 — Grade, loading e vazio

### CT-RN-ANIMES-010-F — Feliz: Grade, loading e vazio

**Camada:** Feliz · **Regra:** `RN-ANIMES-010` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtro impossível ou resultados OK. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Testar filtro vazio e filtro amplo.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | **Nenhum anime encontrado** + dica; ou 2–5 colunas de cards ~210px. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-010-N — Negativo: Grade, loading e vazio — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-ANIMES-010` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtro impossível ou resultados OK. |
| Passos | 1. Abrir o site e navegar até **Animes** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | **Nenhum anime encontrado** + dica; ou 2–5 colunas de cards ~210px. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-010-E — Exploratório: Grade, loading e vazio — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-010` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtro impossível ou resultados OK. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Grade, loading e vazio.<br>**Contexto:** Spinner central durante busca; grid responsivo; empty state amigável.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-011 — Lote inicial sem “carregar mais”

### CT-RN-ANIMES-011-F — Feliz: Lote inicial sem “carregar mais”

**Camada:** Feliz · **Regra:** `RN-ANIMES-011` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo grande. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Contar cards com filtros abertos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | ~48 cards visíveis; sem paginação na UI. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-011-N — Negativo: Lote inicial sem “carregar mais” — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-011` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo grande. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Catálogo grande..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-011-E — Exploratório: Lote inicial sem “carregar mais” — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-011` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo grande. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Lote inicial sem “carregar mais”.<br>**Contexto:** A grade mostra um lote inicial (~dezenas); não há botão para próxima página nesta tela.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-012 — Exclusão de adulto explícito

### CT-RN-ANIMES-012-F — Feliz: Exclusão de adulto explícito

**Camada:** Feliz · **Regra:** `RN-ANIMES-012` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime adulto no catálogo. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Buscar título adulto conhecido.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ausente em Animes. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-012-N — Negativo: Exclusão de adulto explícito — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-ANIMES-012` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anime adulto no catálogo. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-012-E — Exploratório: Exclusão de adulto explícito — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-012` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anime adulto no catálogo. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Exclusão de adulto explícito.<br>**Contexto:** Animes marcados como conteúdo adulto não entram na listagem pública desta página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-013 — Tags sensíveis ocultas

### CT-RN-ANIMES-013-F — Feliz: Tags sensíveis ocultas

**Camada:** Feliz · **Regra:** `RN-ANIMES-013` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime com tag bloqueada. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Validar título de teste com tag sensível.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Não aparece na grade pública. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-013-N — Negativo: Tags sensíveis ocultas — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-ANIMES-013` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anime com tag bloqueada. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-013-E — Exploratório: Tags sensíveis ocultas — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-013` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anime com tag bloqueada. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Tags sensíveis ocultas.<br>**Contexto:** Títulos com tags como conteúdo adulto explícito (ex.: hentai, ecchi pesado) ficam de fora da listagem padrão.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-014 — Filtros combinados

### CT-RN-ANIMES-014-F — Feliz: Filtros combinados

**Camada:** Feliz · **Regra:** `RN-ANIMES-014` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Vários filtros ativos. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Combinar gênero + ano + formato.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só animes que atendem **todos** os critérios. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-014-N — Negativo: Filtros combinados — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-014` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Vários filtros ativos. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Vários filtros ativos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-014-E — Exploratório: Filtros combinados — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-014` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Vários filtros ativos. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Filtros combinados.<br>**Contexto:** Gênero, ano (temporada), formato, fonte e status restringem juntos.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-015 — Ordem alfabética padrão

### CT-RN-ANIMES-015-F — Feliz: Ordem alfabética padrão

**Camada:** Feliz · **Regra:** `RN-ANIMES-015` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Filtros em todos. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Ler primeiros títulos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ordem A–Z aproximada pelos primeiros cards. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-015-N — Negativo: Ordem alfabética padrão — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-015` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Filtros em todos. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Filtros em todos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-015-E — Exploratório: Ordem alfabética padrão — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-015` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Filtros em todos. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Ordem alfabética padrão.<br>**Contexto:** Sem controle “populares” na UI, ordem por título (romaji/título exibido).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-016 — Listagem vs home / Hoje

### CT-RN-ANIMES-016-F — Feliz: Listagem vs home / Hoje

**Camada:** Feliz · **Regra:** `RN-ANIMES-016` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime marginal (baixa popularidade, fora de temporada). |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Comparar mesmo anime nas três áreas.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Pode aparecer em Animes e faltar na home/Hoje streaming. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-016-N — Negativo: Listagem vs home / Hoje — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-ANIMES-016` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anime marginal (baixa popularidade, fora de temporada). |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-016-E — Exploratório: Listagem vs home / Hoje — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-016` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anime marginal (baixa popularidade, fora de temporada). |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Listagem vs home / Hoje.<br>**Contexto:** A página Animes é **mais permissiva** que o carrossel Animes da home e que algumas seções da página Hoje (que exigem qualidade mínima).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-017 — Conteúdo pode demorar a atualizar

### CT-RN-ANIMES-017-F — Feliz: Conteúdo pode demorar a atualizar

**Camada:** Feliz · **Regra:** `RN-ANIMES-017` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Cadastro alterado. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Alterar anime de teste.<br>3. Recarregar.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Novidades após reload. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-017-N — Negativo: Conteúdo pode demorar a atualizar — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-017` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Cadastro alterado. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Cadastro alterado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-017-E — Exploratório: Conteúdo pode demorar a atualizar — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-017` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Cadastro alterado. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Conteúdo pode demorar a atualizar.<br>**Contexto:** Após mudanças no catálogo, aguardar e recarregar para ver efeito (mesma lógica das outras listagens).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-018 — Metadados de filtro completos

### CT-RN-ANIMES-018-F — Feliz: Metadados de filtro completos

**Camada:** Feliz · **Regra:** `RN-ANIMES-018` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Catálogo variado. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Percorrer formatos/fontes.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Sem opções “fantasma” no menu. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-018-N — Negativo: Metadados de filtro completos — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-018` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Catálogo variado. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Catálogo variado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-018-E — Exploratório: Metadados de filtro completos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-018` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Catálogo variado. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Metadados de filtro completos.<br>**Contexto:** Formatos e fontes listam valores realmente usados por algum anime.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-019 — Detalhe ao vivo

### CT-RN-ANIMES-019-F — Feliz: Detalhe ao vivo

**Camada:** Feliz · **Regra:** `RN-ANIMES-019` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Card qualquer. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Clicar card.<br>3. Testar título removido.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Modal/página de detalhe; id inválido não abre conteúdo quebrado. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-019-N — Negativo: Detalhe ao vivo — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-019` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Card qualquer. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Card qualquer..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-019-E — Exploratório: Detalhe ao vivo — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-019` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Card qualquer. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Detalhe ao vivo.<br>**Contexto:** Clique no card abre detalhe que pode buscar informações atualizadas (sinopse, episódios, links).<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-ANIMES-020 — Próximo episódio (detalhe/agenda)

### CT-RN-ANIMES-020-F — Feliz: Próximo episódio (detalhe/agenda)

**Camada:** Feliz · **Regra:** `RN-ANIMES-020` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anime em exibição semanal. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Anime em temporada corrente.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Contagem ou data de próximo ep no card/detalhe. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-020-N — Negativo: Próximo episódio (detalhe/agenda) — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-ANIMES-020` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anime em exibição semanal. |
| Passos | 1. Abrir o site e navegar até **Animes**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Anime em exibição semanal..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-ANIMES-020-E — Exploratório: Próximo episódio (detalhe/agenda) — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-ANIMES-020` · **Tela:** Animes

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anime em exibição semanal. |
| Passos | **Charter (15 min)** — área: **Animes** · regra: Próximo episódio (detalhe/agenda).<br>**Contexto:** Informação de próximo episódio aparece no detalhe/card quando existir agenda futura; não é filtro da grade.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |
