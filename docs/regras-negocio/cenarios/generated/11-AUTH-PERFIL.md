# Cenários — Entrar e perfil

**Arquivo inventário:** `11-AUTH-PERFIL.md`

---

## CT-RN-AUTH-001-01 — Validar: Campos obrigatórios

**ID_Regra:** `RN-AUTH-001` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página Entrar aberta. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Enviar vazio → validação nativa.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Email e senha exigidos pelo navegador antes de enviar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-002-01 — Validar: Sucesso

**ID_Regra:** `RN-AUTH-002` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Conta existente. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Login OK vindo de Minha Lista.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Usuário entra; redireciona para página anterior segura ou home; nome aparece no header. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-003-01 — Validar: Erro genérico

**ID_Regra:** `RN-AUTH-003` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Login falha. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Senha errada.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Toast “Ocorreu um erro ao tentar fazer login” (ou equivalente). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-004-01 — Validar: Redirect seguro

**ID_Regra:** `RN-AUTH-004` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Link de Entrar vindo de página protegida. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Após login, confirmar retorno à Minha Lista.<br>3. Tentar manipular URL de retorno externo se QA tiver cenário.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Só redireciona para páginas internas do site; não envia o usuário para sites externos. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-005-01 — Validar: Mostrar senha

**ID_Regra:** `RN-AUTH-005` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Campo senha. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Clicar olho no campo senha.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Ícone alterna texto visível/oculto. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-006-01 — Validar: Ir para cadastro

**ID_Regra:** `RN-AUTH-006` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Página login. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Clicar cadastro.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Link para Inscreva-se. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-010-01 — Validar: Senha mínima

**ID_Regra:** `RN-AUTH-010` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Cadastro novo. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Senha de 7 chars.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Senha com menos de **8** caracteres bloqueada com aviso antes de enviar. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-011-01 — Validar: Confirmar senha

**ID_Regra:** `RN-AUTH-011` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Senhas diferentes. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Senha ≠ confirmar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Toast de erro; formulário não envia. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-012-01 — Validar: Campos obrigatórios

**ID_Regra:** `RN-AUTH-012` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Formulário. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Enviar incompleto.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nome, email e senhas required. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-013-01 — Validar: Sucesso

**ID_Regra:** `RN-AUTH-013` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Email novo. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Registrar conta QA.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mesmo fluxo pós-login: sessão ativa + redirect seguro. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-014-01 — Validar: Erro do servidor

**ID_Regra:** `RN-AUTH-014` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Cadastro recusado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Registrar email já usado.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Toast com mensagem retornada ou genérica. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-020-01 — Validar: Restaurar ao abrir o site

**ID_Regra:** `RN-AUTH-020` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Fechar aba e reabrir. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Login → fechar browser → reabrir.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Continua logado se sessão válida; senão volta anônimo. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-021-01 — Validar: Dados após login

**ID_Regra:** `RN-AUTH-021` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Login bem-sucedido. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Ver badge notificação e favoritos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Notificações, interações nos cards e pins de anime da semana carregam. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-022-01 — Validar: Preferências lembradas

**ID_Regra:** `RN-AUTH-022` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Usuário alterou tema ou favoritos. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Mudar tema → F5.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Tema, favoritos e opção de scroll rápido persistem entre visitas no mesmo navegador. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-023-01 — Validar: Sair

**ID_Regra:** `RN-AUTH-023` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Sair → header sem avatar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Limpa usuário, notificações, interações e pins; volta estado de visitante. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-024-01 — Validar: Sessão no navegador

**ID_Regra:** `RN-AUTH-024` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Login em produção. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Permanecer logado overnight (QA).<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Sessão mantida por vários dias no mesmo dispositivo (comportamento de “permanecer logado”). |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-025-01 — Validar: Tipo de conta

**ID_Regra:** `RN-AUTH-025` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Admin vs explorador. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Comparar contas.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Admin vê ferramentas extras (ex. edição no modal, links no perfil); demais usuários não. |
| Dados_Conta_Ambiente | Homologação; conta **administrador** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-030-01 — Validar: Só para logados

**ID_Regra:** `RN-AUTH-030` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anônimo ou sessão inválida. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Abrir Meu perfil sem login.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Redirect para Entrar; falha ao carregar perfil também redireciona. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-031-01 — Validar: Dados básicos

**ID_Regra:** `RN-AUTH-031` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Perfil carregado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Perfil com avatar externo válido/inválido.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nome, email, papel (Administrador / Explorador); foto só se URL de avatar for de origem permitida. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-032-01 — Validar: Bio

**ID_Regra:** `RN-AUTH-032` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Com/sem bio salva. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Conta sem bio.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Bio visível ou placeholder convidando a editar em Configurações. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-033-01 — Validar: Bloco conta

**ID_Regra:** `RN-AUTH-033` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Perfil OK. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Ler seção conta.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Email, “membro desde” em pt-BR, visibilidade Público/Privado. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-034-01 — Validar: Atalhos

**ID_Regra:** `RN-AUTH-034` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Perfil aberto. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Clicar atalhos.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Links para Minha lista e Configurações. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-035-01 — Validar: Ferramentas admin

**ID_Regra:** `RN-AUTH-035` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Role admin. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Logar admin.<br>3. Usuário comum não vê.<br>4. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Link para logs de sincronização e ação para baixar log de sync (ferramenta temporária de QA/operações). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-040-01 — Validar: Só para logados

**ID_Regra:** `RN-AUTH-040` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Anônimo. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Abrir Configurações sem login.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Redirect Entrar se perfil não carrega. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-041-01 — Validar: Campos editáveis

**ID_Regra:** `RN-AUTH-041` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Alterar nome e salvar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Nome, URL do avatar, bio, interruptor perfil público (padrão público se nunca definido). |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-042-01 — Validar: Salvar perfil

**ID_Regra:** `RN-AUTH-042` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Dados válidos. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Salvar bio nova → ver perfil.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Mensagem inline de sucesso ou erro; perfil reflete mudanças. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-043-01 — Validar: Texto de privacidade

**ID_Regra:** `RN-AUTH-043` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Configurações abertas. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Ler copy do toggle.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Explica que perfil público afeta visibilidade de lista/favoritos para outros. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-044-01 — Validar: Sem troca de senha aqui

**ID_Regra:** `RN-AUTH-044` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Configurações. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Confirmar ausência de “alterar senha”.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Não há campos de senha ou email nesta tela. |
| Dados_Conta_Ambiente | Homologação/produção; **anônimo** (ajustar se a regra exigir login) |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-050-01 — Validar: Minha lista no menu

**ID_Regra:** `RN-AUTH-050` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Header desktop/mobile. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Abrir menu avatar.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Entrada para Minha lista no menu do usuário e no mobile. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |

## CT-RN-AUTH-051-01 — Validar: Perfil e configurações

**ID_Regra:** `RN-AUTH-051` · **Tela:** Entrar e perfil

| Campo | Valor |
| --- | --- |
| Tipo_Testagem | Funcional manual |
| Pre_condicoes_TestE | Logado. |
| Passos | 1. Abrir o site e navegar até **Entrar e perfil** (conforme a regra).<br>2. Ir perfil → configurações.<br>3. Comparar o que aparece na tela com o **Resultado esperado** do cenário. |
| Resultado_Esperado | Perfil no menu; Configurações via perfil ou botão dedicado. |
| Dados_Conta_Ambiente | Homologação/produção; usuário **logado** |
| Status_Elaboracao | Pronto para TL |
