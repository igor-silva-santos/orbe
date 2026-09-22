# Entrar, cadastro, perfil e configurações — Regras de negócio (visão de tela)

**Onde o usuário está:** telas de **Entrar**, **Inscreva-se**, **Meu perfil** e **Configurações**, além do comportamento global de sessão em todo o site.

**O que existe neste fluxo:** formulários de email/senha; redirecionamento após login; menu do usuário no header; dados públicos/privados do perfil.

---

## 1 — Entrar

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-AUTH-001 | Campos obrigatórios | Formulário de login. | Página Entrar aberta. | Email e senha exigidos pelo navegador antes de enviar. | Enviar vazio → validação nativa. |
| RN-AUTH-002 | Sucesso | Credenciais válidas. | Conta existente. | Usuário entra; redireciona para página anterior segura ou home; nome aparece no header. | Login OK vindo de Minha Lista. |
| RN-AUTH-003 | Erro genérico | Credenciais inválidas ou falha de rede. | Login falha. | Toast “Ocorreu um erro ao tentar fazer login” (ou equivalente). | Senha errada. |
| RN-AUTH-004 | Redirect seguro | Parâmetro de retorno na URL após login. | Link de Entrar vindo de página protegida. | Só redireciona para páginas internas do site; não envia o usuário para sites externos. | Após login, confirmar retorno à Minha Lista; tentar manipular URL de retorno externo se QA tiver cenário. |
| RN-AUTH-005 | Mostrar senha | Acessibilidade. | Campo senha. | Ícone alterna texto visível/oculto. | Clicar olho no campo senha. |
| RN-AUTH-006 | Ir para cadastro | Rodapé. | Página login. | Link para Inscreva-se. | Clicar cadastro. |

---

## 2 — Inscreva-se

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-AUTH-010 | Senha mínima | Regra de segurança. | Cadastro novo. | Senha com menos de **8** caracteres bloqueada com aviso antes de enviar. | Senha de 7 chars. |
| RN-AUTH-011 | Confirmar senha | Dois campos devem coincidir. | Senhas diferentes. | Toast de erro; formulário não envia. | Senha ≠ confirmar. |
| RN-AUTH-012 | Campos obrigatórios | Nome, email, senhas. | Formulário. | Nome, email e senhas required. | Enviar incompleto. |
| RN-AUTH-013 | Sucesso | Cadastro aceito. | Email novo. | Mesmo fluxo pós-login: sessão ativa + redirect seguro. | Registrar conta QA. |
| RN-AUTH-014 | Erro do servidor | Email duplicado etc. | Cadastro recusado. | Toast com mensagem retornada ou genérica. | Registrar email já usado. |

---

## 3 — Sessão em todo o site

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-AUTH-020 | Restaurar ao abrir o site | Usuário já logou antes. | Fechar aba e reabrir. | Continua logado se sessão válida; senão volta anônimo. | Login → fechar browser → reabrir. |
| RN-AUTH-021 | Dados após login | Conteúdo personalizado. | Login bem-sucedido. | Notificações, interações nos cards e pins de anime da semana carregam. | Ver badge notificação e favoritos. |
| RN-AUTH-022 | Preferências lembradas | Tema e interações locais. | Usuário alterou tema ou favoritos. | Tema, favoritos e opção de scroll rápido persistem entre visitas no mesmo navegador. | Mudar tema → F5. |
| RN-AUTH-023 | Sair | Logout pelo menu. | Logado. | Limpa usuário, notificações, interações e pins; volta estado de visitante. | Sair → header sem avatar. |
| RN-AUTH-024 | Sessão no navegador | Cookie de sessão. | Login em produção. | Sessão mantida por vários dias no mesmo dispositivo (comportamento de “permanecer logado”). | Permanecer logado overnight (QA). |
| RN-AUTH-025 | Tipo de conta | Papel do usuário. | Admin vs explorador. | Admin vê ferramentas extras (ex. edição no modal, links no perfil); demais usuários não. | Comparar contas. |

---

## 4 — Meu perfil

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-AUTH-030 | Só para logados | Proteção da rota. | Anônimo ou sessão inválida. | Redirect para Entrar; falha ao carregar perfil também redireciona. | Abrir Meu perfil sem login. |
| RN-AUTH-031 | Dados básicos | Identidade na página. | Perfil carregado. | Nome, email, papel (Administrador / Explorador); foto só se URL de avatar for de origem permitida. | Perfil com avatar externo válido/inválido. |
| RN-AUTH-032 | Bio | Texto sobre o usuário. | Com/sem bio salva. | Bio visível ou placeholder convidando a editar em Configurações. | Conta sem bio. |
| RN-AUTH-033 | Bloco conta | Metadados. | Perfil OK. | Email, “membro desde” em pt-BR, visibilidade Público/Privado. | Ler seção conta. |
| RN-AUTH-034 | Atalhos | Navegação rápida. | Perfil aberto. | Links para Minha lista e Configurações. | Clicar atalhos. |
| RN-AUTH-035 | Ferramentas admin | Conta administrador. | Role admin. | Link para logs de sincronização e ação para baixar log de sync (ferramenta temporária de QA/operações). | Logar admin; usuário comum não vê. |

---

## 5 — Configurações

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-AUTH-040 | Só para logados | Mesmo padrão do perfil. | Anônimo. | Redirect Entrar se perfil não carrega. | Abrir Configurações sem login. |
| RN-AUTH-041 | Campos editáveis | Formulário. | Logado. | Nome, URL do avatar, bio, interruptor perfil público (padrão público se nunca definido). | Alterar nome e salvar. |
| RN-AUTH-042 | Salvar perfil | Envio do formulário. | Dados válidos. | Mensagem inline de sucesso ou erro; perfil reflete mudanças. | Salvar bio nova → ver perfil. |
| RN-AUTH-043 | Texto de privacidade | Toggle perfil público. | Configurações abertas. | Explica que perfil público afeta visibilidade de lista/favoritos para outros. | Ler copy do toggle. |
| RN-AUTH-044 | Sem troca de senha aqui | Escopo da página. | Configurações. | Não há campos de senha ou email nesta tela. | Confirmar ausência de “alterar senha”. |

---

## 6 — Header e rotas protegidas

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-AUTH-050 | Minha lista no menu | Usuário logado. | Header desktop/mobile. | Entrada para Minha lista no menu do usuário e no mobile. | Abrir menu avatar. |
| RN-AUTH-051 | Perfil e configurações | Navegação. | Logado. | Perfil no menu; Configurações via perfil ou botão dedicado. | Ir perfil → configurações. |
