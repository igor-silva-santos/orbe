# Busca global e cabeçalho — Regras de negócio (visão de tela)

**Onde o usuário está:** em qualquer página do site com o **cabeçalho** fixo (menu, busca, tema, conta) e/ou com a **busca global** aberta em tela cheia sobre o conteúdo.

**O que existe neste fluxo:** ícone de lupa; overlay de busca com campo de texto, filtros por tipo e grids de resultados; menu principal desktop e menu hambúrguer no mobile.

---

## 1 — Busca global (overlay)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-BUSCA-001 | Abrir e fechar | A busca só aparece quando acionada pelo header. | Site carregado. | Ícone de busca abre overlay; fechar remove overlay. | Clicar lupa → fechar com X/Esc/clique fora. |
| RN-BUSCA-002 | Histórico do navegador | Comportamento alinhado ao modal de detalhe. | Busca aberta. | Botão voltar do navegador pode fechar a busca; Esc fecha. | Abrir busca → voltar do browser. |
| RN-BUSCA-003 | Limpar ao fechar | Ao sair da busca. | Busca usada com texto e filtro. | Campo vazio, categoria “todos”, resultados zerados na próxima abertura. | Buscar algo → fechar → reabrir. |
| RN-BUSCA-004 | Em alta sem digitar | Overlay aberto e campo vazio. | Primeira abertura ou após limpar. | Até ~20 títulos “em alta” exibidos como sugestão. | Abrir busca sem digitar. |
| RN-BUSCA-005 | Mínimo de caracteres | Busca efetiva por texto. | Digitar 0 ou 1 caractere. | Sem busca remota; resultados de mídia zerados (permanece em alta se vazio). | Digitar “a” e parar. |
| RN-BUSCA-006 | Espera antes de buscar | Evita buscar a cada tecla. | Digitar termo com 2+ caracteres. | Resultados atualizam ~350 ms após parar de digitar; buscas antigas não “piscam” por cima das novas. | Digitar rápido “star wars”. |
| RN-BUSCA-007 | Filtro por tipo | Chips ou abas de categoria. | Query válida. | Opções: todos, filmes, séries, animes, jogos, pessoas; restringe o que é buscado/exibido. | Buscar termo comum; alternar chips. |
| RN-BUSCA-008 | Resultados de mídia | Várias mídias na mesma busca. | Categoria “todos” ou tipo específico. | Filmes, séries, animes e jogos aparecem em grupos conforme filtro. | Termo que existe em mais de um tipo. |
| RN-BUSCA-009 | Pessoas e dubladores | Resultados de elenco. | Termo com 2+ chars; categoria todos ou pessoas. | Cards de ator/equipe vs dublador com rótulos distintos. | Buscar nome de ator e de dublador. |
| RN-BUSCA-010 | O que mostra por categoria | Com texto digitado. | Query ≥ 2; chip selecionado. | Chip “pessoas” esconde grids de mídia; demais chips focam o tipo escolhido. | Mesmo termo em “todos” vs “filmes” vs “pessoas”. |
| RN-BUSCA-011 | Seção pessoas | Grid dedicado. | Query ≥ 2; todos ou pessoas; há matches. | Bloco de pessoas visível só nessas condições. | Buscar sobrenome comum. |
| RN-BUSCA-012 | Contagem de resultados | Total exibido ao usuário. | Busca com resultados. | Número reflete mídias visíveis + pessoas quando a seção pessoas está ativa. | Comparar total ao mudar chip. |
| RN-BUSCA-013 | Ações nos cards | Favoritar e listas na busca. | Logado ou anônimo. | Mesmas regras dos cards nas listagens (login exigido onde aplicável). | Favoritar da busca logado. |
| RN-BUSCA-014 | Destaque de foco | Preparado para navegação por teclado. | Busca com vários resultados. | Um item pode receber estado visual de foco (navegação completa por teclado pode ser limitada). | Observar foco ao interagir. |
| RN-BUSCA-015 | Estados vazios | Sem sugestões e sem match. | Sem trending e sem query; ou query sem resultado. | “Nenhum conteúdo em alta” ou mensagem citando o termo buscado. | Termo inventado “zzzxxyy”. |

---

## 2 — Card de pessoa na busca

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-BUSCA-020 | Destino do clique | Ator vs dublador. | Resultado de pessoa na busca. | Ator/equipe → página da pessoa; dublador → página do dublador. | Clicar cada tipo. |
| RN-BUSCA-021 | Voltar à busca | Após abrir perfil a partir da busca. | Veio da overlay de busca. | Ao voltar da página de pessoa/dublador, a busca pode reabrir (fluxo de retorno). | Busca → pessoa → voltar. |
| RN-BUSCA-022 | Subtítulo do card | Identificação rápida. | Cards na grid de pessoas. | “Ator / equipe” ou “Dublador” conforme o caso. | Ler subtítulos na busca. |

---

## 3 — Cabeçalho (menu e utilidades)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HEADER-001 | Links principais (desktop) | Navegação do catálogo em telas largas. | Janela larga (layout desktop). | Links visíveis: Filmes, Séries, Animes, Jogos, Continuações, Hoje. | Redimensionar janela; clicar cada link. |
| RN-HEADER-002 | Menu “Mais” | Atalhos secundários. | Desktop. | Dropdown: Promoções, Eventos, Jogos em Alta, Premiações, Minha Lista (animes), Extensão CR. | Abrir “Mais” e seguir um item. |
| RN-HEADER-003 | Item ativo | Página atual destacada. | Navegar entre seções. | Link da rota atual com estilo primário/negrito; “Mais” destaca se algum sublink está ativo. | Estar em Promoções e olhar o header. |
| RN-HEADER-004 | Abrir busca | Ícone de lupa. | Qualquer página. | Abre overlay; fecha menu mobile se estiver aberto. | Mobile: abrir menu → busca. |
| RN-HEADER-005 | Tema claro/escuro | Alternância visual. | Header visível. | Ícone alterna tema; cores do site mudam. | Clicar sol/lua. |
| RN-HEADER-006 | Notificações | Sino de avisos. | Conta com ou sem notificações. | Abre painel/modal de notificações; badge com contagem (máx. exibição “9+”). | Conta com notificações pendentes. |
| RN-HEADER-007 | Menu do usuário logado | Conta autenticada. | Sessão ativa. | Opções: Minha lista, Meu perfil, Sair (volta à home após sair). | Logar → menu avatar. |
| RN-HEADER-008 | Visitante (desktop) | Sem login em tela média/grande. | Anônimo; layout desktop/tablet largo. | Links Entrar e Inscreva-se visíveis. | Anônimo desktop. |
| RN-HEADER-009 | Menu mobile | Telas estreitas. | Layout mobile. | Hambúrguer com catálogo, “descobrir” (itens do Mais) e bloco login/lista/perfil. | Testar em viewport mobile. |
| RN-HEADER-010 | Fechar menus | Clique fora. | Dropdown “Mais” ou menu usuário aberto. | Fecha ao clicar fora; overlay escuro fecha menu do usuário. | Abrir dropdown → clicar página. |

---

## 4 — Busca, header e modal juntos

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-HEADER-020 | Resultado abre detalhe | Card de mídia na busca. | Busca aberta com resultados. | Clicar card abre modal de detalhe e fecha a busca. | Buscar filme → abrir card. |
| RN-HEADER-021 | Retorno da página pessoa | Veio da busca. | Fluxo busca → página pessoa → voltar. | Busca reabre quando o site guardou “voltar para busca”. | Executar RN-BUSCA-021 + voltar do browser ou link voltar. |
