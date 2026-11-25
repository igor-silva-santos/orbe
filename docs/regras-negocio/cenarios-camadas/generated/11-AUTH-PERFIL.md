# Camadas — Entrar e perfil

**Inventário:** `11-AUTH-PERFIL.md` · **Cenários:** 90

---

## RN-AUTH-001 — Campos obrigatórios

### CT-RN-AUTH-001-F — Feliz: Campos obrigatórios

**Camada:** Feliz · **Regra:** `RN-AUTH-001` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página Entrar aberta. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Enviar vazio → validação nativa.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Email e senha exigidos pelo navegador antes de enviar. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-001-N — Negativo: Campos obrigatórios — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-001` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página Entrar aberta. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página Entrar aberta..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-001-E — Exploratório: Campos obrigatórios — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-001` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página Entrar aberta. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Campos obrigatórios.<br>**Contexto:** Formulário de login.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-002 — Sucesso

### CT-RN-AUTH-002-F — Feliz: Sucesso

**Camada:** Feliz · **Regra:** `RN-AUTH-002` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta existente. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Login OK vindo de Minha Lista.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Usuário entra; redireciona para página anterior segura ou home; nome aparece no header. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-002-N — Negativo: Sucesso — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-002` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Conta existente. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Conta existente..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-002-E — Exploratório: Sucesso — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-002` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Conta existente. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Sucesso.<br>**Contexto:** Credenciais válidas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-003 — Erro genérico

### CT-RN-AUTH-003-F — Feliz: Erro genérico

**Camada:** Feliz · **Regra:** `RN-AUTH-003` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Login falha. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Senha errada.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Toast “Ocorreu um erro ao tentar fazer login” (ou equivalente). |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-003-N — Negativo: Erro genérico — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-AUTH-003` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Login falha. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Toast “Ocorreu um erro ao tentar fazer login” (ou equivalente). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-003-E — Exploratório: Erro genérico — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-003` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Login falha. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Erro genérico.<br>**Contexto:** Credenciais inválidas ou falha de rede.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-004 — Redirect seguro

### CT-RN-AUTH-004-F — Feliz: Redirect seguro

**Camada:** Feliz · **Regra:** `RN-AUTH-004` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Link de Entrar vindo de página protegida. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Após login, confirmar retorno à Minha Lista.<br>3. Tentar manipular URL de retorno externo se QA tiver cenário.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Só redireciona para páginas internas do site; não envia o usuário para sites externos. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-004-N — Negativo: Redirect seguro — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-004` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Link de Entrar vindo de página protegida. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Link de Entrar vindo de página protegida..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-004-E — Exploratório: Redirect seguro — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-004` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Link de Entrar vindo de página protegida. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Redirect seguro.<br>**Contexto:** Parâmetro de retorno na URL após login.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-005 — Mostrar senha

### CT-RN-AUTH-005-F — Feliz: Mostrar senha

**Camada:** Feliz · **Regra:** `RN-AUTH-005` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Campo senha. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Clicar olho no campo senha.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Ícone alterna texto visível/oculto. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-005-N — Negativo: Mostrar senha — título que deve ficar de fora

**Camada:** Negativo · **Regra:** `RN-AUTH-005` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Campo senha. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Localizar ou preparar título/dado que **não** atende aos critérios da regra.<br>3. Buscar o título na listagem/carrossel/seção.<br>4. Confirmar ausência ou não destaque conforme a regra. |
| Resultado_Esperado | Item marginal **não** exibido (ou não destacado) como no caminho feliz. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-005-E — Exploratório: Mostrar senha — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-005` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Campo senha. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Mostrar senha.<br>**Contexto:** Acessibilidade.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-006 — Ir para cadastro

### CT-RN-AUTH-006-F — Feliz: Ir para cadastro

**Camada:** Feliz · **Regra:** `RN-AUTH-006` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página login. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Clicar cadastro.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Link para Inscreva-se. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-006-N — Negativo: Ir para cadastro — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-006` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Página login. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Página login..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-006-E — Exploratório: Ir para cadastro — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-006` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Página login. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Ir para cadastro.<br>**Contexto:** Rodapé.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-010 — Senha mínima

### CT-RN-AUTH-010-F — Feliz: Senha mínima

**Camada:** Feliz · **Regra:** `RN-AUTH-010` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Cadastro novo. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Senha de 7 chars.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Senha com menos de **8** caracteres bloqueada com aviso antes de enviar. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-010-N — Negativo: Senha mínima — abaixo do limite

**Camada:** Negativo · **Regra:** `RN-AUTH-010` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Cadastro novo. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Reproduzir a ação com valor **abaixo do mínimo** (ex.: menos caracteres, nota/duração insuficiente).<br>3. Observar bloqueio, ausência do efeito ou mensagem de validação.<br>4. Confirmar que o sistema **não** aplica o benefício do caminho feliz. |
| Resultado_Esperado | Comportamento de bloqueio ou ausência do resultado feliz: validação visível, item oculto ou ação não executada — sem erro de interface. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-010-E — Exploratório: Senha mínima — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-010` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Cadastro novo. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Senha mínima.<br>**Contexto:** Regra de segurança.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-011 — Confirmar senha

### CT-RN-AUTH-011-F — Feliz: Confirmar senha

**Camada:** Feliz · **Regra:** `RN-AUTH-011` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Senhas diferentes. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Senha ≠ confirmar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Toast de erro; formulário não envia. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-011-N — Negativo: Confirmar senha — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-AUTH-011` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Senhas diferentes. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Toast de erro; formulário não envia. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-011-E — Exploratório: Confirmar senha — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-011` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Senhas diferentes. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Confirmar senha.<br>**Contexto:** Dois campos devem coincidir.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-012 — Campos obrigatórios

### CT-RN-AUTH-012-F — Feliz: Campos obrigatórios

**Camada:** Feliz · **Regra:** `RN-AUTH-012` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Formulário. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Enviar incompleto.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Nome, email e senhas required. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-012-N — Negativo: Campos obrigatórios — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-012` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Formulário. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Formulário..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-012-E — Exploratório: Campos obrigatórios — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-012` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Formulário. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Campos obrigatórios.<br>**Contexto:** Nome, email, senhas.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-013 — Sucesso

### CT-RN-AUTH-013-F — Feliz: Sucesso

**Camada:** Feliz · **Regra:** `RN-AUTH-013` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Email novo. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Registrar conta QA.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mesmo fluxo pós-login: sessão ativa + redirect seguro. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-013-N — Negativo: Sucesso — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-013` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Email novo. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Email novo..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-013-E — Exploratório: Sucesso — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-013` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Email novo. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Sucesso.<br>**Contexto:** Cadastro aceito.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-014 — Erro do servidor

### CT-RN-AUTH-014-F — Feliz: Erro do servidor

**Camada:** Feliz · **Regra:** `RN-AUTH-014` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Cadastro recusado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Registrar email já usado.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Toast com mensagem retornada ou genérica. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-014-N — Negativo: Erro do servidor — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-AUTH-014` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Cadastro recusado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Toast com mensagem retornada ou genérica. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-014-E — Exploratório: Erro do servidor — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-014` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Cadastro recusado. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Erro do servidor.<br>**Contexto:** Email duplicado etc.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-020 — Restaurar ao abrir o site

### CT-RN-AUTH-020-F — Feliz: Restaurar ao abrir o site

**Camada:** Feliz · **Regra:** `RN-AUTH-020` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Fechar aba e reabrir. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Login → fechar browser → reabrir.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Continua logado se sessão válida; senão volta anônimo. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-020-N — Negativo: Restaurar ao abrir o site — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-020` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Fechar aba e reabrir. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Fechar aba e reabrir..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-020-E — Exploratório: Restaurar ao abrir o site — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-020` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Fechar aba e reabrir. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Restaurar ao abrir o site.<br>**Contexto:** Usuário já logou antes.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-021 — Dados após login

### CT-RN-AUTH-021-F — Feliz: Dados após login

**Camada:** Feliz · **Regra:** `RN-AUTH-021` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Login bem-sucedido. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Ver badge notificação e favoritos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Notificações, interações nos cards e pins de anime da semana carregam. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-021-N — Negativo: Dados após login — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-021` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Login bem-sucedido. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Login bem-sucedido..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-021-E — Exploratório: Dados após login — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-021` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Login bem-sucedido. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Dados após login.<br>**Contexto:** Conteúdo personalizado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-022 — Preferências lembradas

### CT-RN-AUTH-022-F — Feliz: Preferências lembradas

**Camada:** Feliz · **Regra:** `RN-AUTH-022` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário alterou tema ou favoritos. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Mudar tema → F5.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Tema, favoritos e opção de scroll rápido persistem entre visitas no mesmo navegador. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-022-N — Negativo: Preferências lembradas — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-022` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Usuário alterou tema ou favoritos. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Usuário alterou tema ou favoritos..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-022-E — Exploratório: Preferências lembradas — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-022` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Usuário alterou tema ou favoritos. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Preferências lembradas.<br>**Contexto:** Tema e interações locais.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-023 — Sair

### CT-RN-AUTH-023-F — Feliz: Sair

**Camada:** Feliz · **Regra:** `RN-AUTH-023` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Sair → header sem avatar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Limpa usuário, notificações, interações e pins; volta estado de visitante. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-023-N — Negativo: Sair — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-023` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-023-E — Exploratório: Sair — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-023` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Sair.<br>**Contexto:** Logout pelo menu.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-024 — Sessão no navegador

### CT-RN-AUTH-024-F — Feliz: Sessão no navegador

**Camada:** Feliz · **Regra:** `RN-AUTH-024` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Login em produção. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Permanecer logado overnight (QA).<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Sessão mantida por vários dias no mesmo dispositivo (comportamento de “permanecer logado”). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-024-N — Negativo: Sessão no navegador — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-024` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Login em produção. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Login em produção..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-024-E — Exploratório: Sessão no navegador — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-024` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Login em produção. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Sessão no navegador.<br>**Contexto:** Cookie de sessão.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-025 — Tipo de conta

### CT-RN-AUTH-025-F — Feliz: Tipo de conta

**Camada:** Feliz · **Regra:** `RN-AUTH-025` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Admin vs explorador. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Comparar contas.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Admin vê ferramentas extras (ex. edição no modal, links no perfil); demais usuários não. |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-025-N — Negativo: Tipo de conta — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-025` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Admin vs explorador. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Admin vs explorador..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-025-E — Exploratório: Tipo de conta — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-025` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Admin vs explorador. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Tipo de conta.<br>**Contexto:** Papel do usuário.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-030 — Só para logados

### CT-RN-AUTH-030-F — Feliz: Só para logados

**Camada:** Feliz · **Regra:** `RN-AUTH-030` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anônimo ou sessão inválida. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Abrir Meu perfil sem login.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Redirect para Entrar; falha ao carregar perfil também redireciona. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-030-N — Negativo: Só para logados — sem a condição exigida

**Camada:** Negativo · **Regra:** `RN-AUTH-030` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anônimo ou sessão inválida. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Usar usuário, dado ou estado **sem** a condição da regra (ex.: não logado se a regra exige login).<br>3. Repetir a mesma ação do caminho feliz.<br>4. Verificar que o elemento/comportamento **não** aparece ou permanece desabilitado. |
| Resultado_Esperado | O resultado feliz **não** ocorre; a tela permanece coerente (sem vazamento indevido). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-030-E — Exploratório: Só para logados — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-030` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anônimo ou sessão inválida. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Só para logados.<br>**Contexto:** Proteção da rota.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-031 — Dados básicos

### CT-RN-AUTH-031-F — Feliz: Dados básicos

**Camada:** Feliz · **Regra:** `RN-AUTH-031` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Perfil carregado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Perfil com avatar externo válido/inválido.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Nome, email, papel (Administrador / Explorador); foto só se URL de avatar for de origem permitida. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-031-N — Negativo: Dados básicos — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-031` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Perfil carregado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Perfil carregado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-031-E — Exploratório: Dados básicos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-031` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Perfil carregado. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Dados básicos.<br>**Contexto:** Identidade na página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-032 — Bio

### CT-RN-AUTH-032-F — Feliz: Bio

**Camada:** Feliz · **Regra:** `RN-AUTH-032` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Com/sem bio salva. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Conta sem bio.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Bio visível ou placeholder convidando a editar em Configurações. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-032-N — Negativo: Bio — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-032` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Com/sem bio salva. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Com/sem bio salva..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-032-E — Exploratório: Bio — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-032` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Com/sem bio salva. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Bio.<br>**Contexto:** Texto sobre o usuário.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-033 — Bloco conta

### CT-RN-AUTH-033-F — Feliz: Bloco conta

**Camada:** Feliz · **Regra:** `RN-AUTH-033` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Perfil OK. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Ler seção conta.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Email, “membro desde” em pt-BR, visibilidade Público/Privado. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-033-N — Negativo: Bloco conta — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-033` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Perfil OK. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Perfil OK..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-033-E — Exploratório: Bloco conta — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-033` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Perfil OK. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Bloco conta.<br>**Contexto:** Metadados.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-034 — Atalhos

### CT-RN-AUTH-034-F — Feliz: Atalhos

**Camada:** Feliz · **Regra:** `RN-AUTH-034` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Perfil aberto. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Clicar atalhos.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Links para Minha lista e Configurações. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-034-N — Negativo: Atalhos — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-034` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Perfil aberto. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Perfil aberto..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-034-E — Exploratório: Atalhos — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-034` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Perfil aberto. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Atalhos.<br>**Contexto:** Navegação rápida.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-035 — Ferramentas admin

### CT-RN-AUTH-035-F — Feliz: Ferramentas admin

**Camada:** Feliz · **Regra:** `RN-AUTH-035` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Role admin. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Logar admin.<br>3. Usuário comum não vê.<br>4. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Link para logs de sincronização e ação para baixar log de sync (ferramenta temporária de QA/operações). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-035-N — Negativo: Ferramentas admin — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-035` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Role admin. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Role admin..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-035-E — Exploratório: Ferramentas admin — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-035` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Role admin. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Ferramentas admin.<br>**Contexto:** Conta administrador.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-040 — Só para logados

### CT-RN-AUTH-040-F — Feliz: Só para logados

**Camada:** Feliz · **Regra:** `RN-AUTH-040` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anônimo. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Abrir Configurações sem login.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Redirect Entrar se perfil não carrega. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-040-N — Negativo: Só para logados — sem a condição exigida

**Camada:** Negativo · **Regra:** `RN-AUTH-040` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Anônimo. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Usar usuário, dado ou estado **sem** a condição da regra (ex.: não logado se a regra exige login).<br>3. Repetir a mesma ação do caminho feliz.<br>4. Verificar que o elemento/comportamento **não** aparece ou permanece desabilitado. |
| Resultado_Esperado | O resultado feliz **não** ocorre; a tela permanece coerente (sem vazamento indevido). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-040-E — Exploratório: Só para logados — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-040` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Anônimo. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Só para logados.<br>**Contexto:** Mesmo padrão do perfil.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-041 — Campos editáveis

### CT-RN-AUTH-041-F — Feliz: Campos editáveis

**Camada:** Feliz · **Regra:** `RN-AUTH-041` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Alterar nome e salvar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Nome, URL do avatar, bio, interruptor perfil público (padrão público se nunca definido). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-041-N — Negativo: Campos editáveis — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-041` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-041-E — Exploratório: Campos editáveis — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-041` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Campos editáveis.<br>**Contexto:** Formulário.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-042 — Salvar perfil

### CT-RN-AUTH-042-F — Feliz: Salvar perfil

**Camada:** Feliz · **Regra:** `RN-AUTH-042` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Dados válidos. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Salvar bio nova → ver perfil.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Mensagem inline de sucesso ou erro; perfil reflete mudanças. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-042-N — Negativo: Salvar perfil — degradação sem quebra

**Camada:** Negativo · **Regra:** `RN-AUTH-042` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Dados válidos. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** com catálogo/API indisponível ou vazio (conforme pré-condição).<br>2. Aguardar carregamento e interagir com a área afetada.<br>3. Confirmar estado vazio, mensagem amigável ou retry — sem tela branca. |
| Resultado_Esperado | Mensagem inline de sucesso ou erro; perfil reflete mudanças. |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-042-E — Exploratório: Salvar perfil — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-042` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Dados válidos. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Salvar perfil.<br>**Contexto:** Envio do formulário.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-043 — Texto de privacidade

### CT-RN-AUTH-043-F — Feliz: Texto de privacidade

**Camada:** Feliz · **Regra:** `RN-AUTH-043` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Configurações abertas. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Ler copy do toggle.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Explica que perfil público afeta visibilidade de lista/favoritos para outros. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-043-N — Negativo: Texto de privacidade — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-043` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Configurações abertas. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Configurações abertas..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-043-E — Exploratório: Texto de privacidade — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-043` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Configurações abertas. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Texto de privacidade.<br>**Contexto:** Toggle perfil público.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-044 — Sem troca de senha aqui

### CT-RN-AUTH-044-F — Feliz: Sem troca de senha aqui

**Camada:** Feliz · **Regra:** `RN-AUTH-044` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Configurações. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Confirmar ausência de “alterar senha”.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Não há campos de senha ou email nesta tela. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-044-N — Negativo: Sem troca de senha aqui — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-044` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Configurações. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Configurações..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; preparar **pré-condição oposta** à do caminho feliz |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-044-E — Exploratório: Sem troca de senha aqui — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-044` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Configurações. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Sem troca de senha aqui.<br>**Contexto:** Escopo da página.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; conforme pré-condição da regra (caminho feliz) |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-050 — Minha lista no menu

### CT-RN-AUTH-050-F — Feliz: Minha lista no menu

**Camada:** Feliz · **Regra:** `RN-AUTH-050` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Header desktop/mobile. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Abrir menu avatar.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Entrada para Minha lista no menu do usuário e no mobile. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-050-N — Negativo: Minha lista no menu — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-050` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Header desktop/mobile. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Header desktop/mobile..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-050-E — Exploratório: Minha lista no menu — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-050` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Header desktop/mobile. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Minha lista no menu.<br>**Contexto:** Usuário logado.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |

## RN-AUTH-051 — Perfil e configurações

### CT-RN-AUTH-051-F — Feliz: Perfil e configurações

**Camada:** Feliz · **Regra:** `RN-AUTH-051` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Ir perfil → configurações.<br>3. Confirmar na tela o **resultado feliz** descrito na regra. |
| Resultado_Esperado | Perfil no menu; Configurações via perfil ou botão dedicado. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-051-N — Negativo: Perfil e configurações — condição não atendida ou perfil inverso

**Camada:** Negativo · **Regra:** `RN-AUTH-051` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Oposta ou ausência: Logado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil**.<br>2. Montar pré-condição **oposta** à do caminho feliz: Logado..<br>3. Executar os mesmos passos do cenário feliz.<br>4. Registrar se o resultado feliz deixa de ocorrer ou se há mensagem de impedimento. |
| Resultado_Esperado | Sem o cumprimento da regra, o comportamento feliz **não** se manifesta; nenhum defeito de UX (erro não tratado, dado incorreto exposto). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **não** logado (inverso do feliz) |
| Exploratorio_Validado | N/A |

### CT-RN-AUTH-051-E — Exploratório: Perfil e configurações — charter de risco na tela

**Camada:** Exploratório · **Regra:** `RN-AUTH-051` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Exploratório guiado |
| Pre_condicoes_TestE | Logado. |
| Passos | **Charter (15 min)** — área: **Entrar e perfil** · regra: Perfil e configurações.<br>**Contexto:** Navegação.<br>**Hipóteses:** (H1) estados intermediários (scroll, resize, tema claro/escuro) não quebram o comportamento; (H2) combinação com filtros/busca/modal adjacente não contradiz a regra; (H3) repetição rápida da ação não duplica efeito indevido.<br>**Fora do escopo:** outras telas, performance profunda, segurança ofensiva.<br>**Encerramento:** registrar achados com print; vincular desvio à `ID_Regra` se encontrado. |
| Resultado_Esperado | Sessão exploratória concluída; hipóteses verificadas ou desvio aberto com evidência; sem contradição grave ao resultado feliz da regra. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Exploratorio_Validado | Pendente TL |
