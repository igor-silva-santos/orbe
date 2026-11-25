# Página Jogos e Jogos em Alta — Regras de negócio (visão de tela)

**Onde o usuário está:**

- **Página Jogos** — listagem completa de jogos (menu ou faixa Jogos na inicial).
- **Jogos em Alta** — conteúdo na aba **Em Alta** da página **Promoções** (`/promocoes?tab=em-alta`). O endereço antigo **/jogos-em-alta** redireciona para lá.

---

## Catálogo — página Jogos

### 1 — Abertura, cabeçalho e gavetas

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-JOGOS-001 | Conteúdo na abertura | Grade e filtros já vêm na abertura. | Catálogo OK. | Cards e selects visíveis. | Abrir Jogos. |
| RN-JOGOS-002 | Falha na abertura | Indisponibilidade não quebra a página. | Catálogo down. | Grade vazia; filtros vazios possíveis. | Simular falha inicial. |
| RN-JOGOS-003 | Sem recarga duplicada na abertura | Abrir Jogos não dispara loading extra imediato após a primeira pintura. | Primeira visita OK. | Estável até mudar filtro. | Abrir e aguardar. |
| RN-JOGOS-011 | Gaveta O que vem aí | Próximos lançamentos de jogos em carrossel. | Resumo com **próximos jogos**. | Seção **O que vem aí** acima dos filtros. | Ambiente com jogos futuros. |
| RN-JOGOS-012 | Gaveta Eventos recentes | Destaques de eventos de games (ex.: State of Play, Nintendo Direct). | Resumo com **eventos recentes**. | Seção **Eventos recentes** com cards de evento empilhados. | Ambiente com eventos no resumo. |

### 2 — Filtros e recarga

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-JOGOS-004 | Filtros aplicados | Gênero, plataforma, modo de jogo, ano e mês restringem a grade. | Valores específicos selecionados. | Lista coerente (ex.: só PlayStation). | Alterar cada filtro. |
| RN-JOGOS-005 | Mês sem ano explícito | Só mês selecionado usa o **ano corrente** para lançamentos daquele mês. | Março + todos os anos. | Jogos lançados em março do ano atual. | Filtrar mês atual. |
| RN-JOGOS-006 | Mês com ano | Mês + ano restringem ao intervalo daquele mês/ano. | Junho 2023. | Só lançamentos de jun/2023. | Combinar mês e ano. |
| RN-JOGOS-007 | Ordem alfabética | Sem controle “populares” na UI, ordem por nome do jogo. | Filtros em todos. | A–Z nos primeiros cards. | Ler primeiros títulos. |
| RN-JOGOS-008 | Popularidade (catálogo interno) | Modo “populares” existe no catálogo, **sem** botão nesta página. | — | Usuário só vê ordem alfabética aqui. | Confirmar ausência de atalho Populares. |
| RN-JOGOS-014 | Atualização após sync | Sync pode atualizar grade com página aberta. | Sync em andamento. | Cards mudam sem F5. | Manter Jogos aberta. |
| RN-JOGOS-015 | Opções de filtro | Gêneros, plataformas, modos e anos refletem jogos cadastrados; anos decrescentes. | Catálogo variado. | Menus populados coerentemente. | Abrir cada select. |

### 3 — Contador, grade, vazio e curadoria

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-JOGOS-009 | Listagem mais permissiva que destaques | Jogos “fracos” (pouco hype/nota) podem aparecer em Jogos mas **não** em **Em Alta** ou algumas faixas da home. | Jogo obscuro. | Visível em Jogos; ausente em Em Alta. | Comparar mesma busca. |
| RN-JOGOS-010 | Lote inicial na grade | ~dezenas de cards visíveis; sem “carregar mais”. | Catálogo grande. | Até ~48 cards; contador segue cards visíveis (como Animes). | Contar cards vs contador. |
| RN-JOGOS-013 | Loading, contador e vazio | Spinner ao filtrar; contador = quantidade na grade; empty **Nenhum jogo encontrado**. | Filtro vazio ou OK. | Comportamento igual padrão Animes. | Filtro impossível e amplo. |
| RN-JOGOS-016 | Preço Steam no detalhe/card | Quando o jogo tem página na Steam, preço em reais pode aparecer após carregar (não instantâneo na grade). | Jogo com Steam cadastrado. | Preço BRL ou indicador de carregamento no detalhe/card conforme produto. | Abrir jogo Steam conhecido. |

---

## Redirect — endereço legado Jogos em Alta

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-JOGOS-017 | Redirect para Promoções | URL antiga não tem conteúdo próprio. | Usuário acessa **/jogos-em-alta**. | Navegador vai para **Promoções**, aba **Em Alta**. | Digitar URL legada. |
| RN-JOGOS-018 | Menu do site | Atalho **Jogos em Alta** no cabeçalho/rodapé aponta para o mesmo destino. | Menu visível. | Clique abre Promoções na aba Em Alta. | Clicar item de menu. |

---

## Jogos em Alta — aba Em Alta (Promoções)

### 4 — Carregamento e cabeçalho contextual

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-JOGOS-019 | Quem entra no ranking | Destaques semanais priorizam jogos recentes ou com hype/nota mínima; jogos antigos sem interesse ficam de fora. | Jogo lançado há meses sem destaque. | Ausente do **Top da Semana**. | Comparar jogo antigo vs lançamento recente. |
| RN-JOGOS-026 | Semana e métrica (modo completo) | Fora do modo compacto da aba Promoções, texto indica semana corrente e fontes (Steam + IGDB ou só IGDB). | Abrir Em Alta em contexto que mostra cabeçalho longo (se existir rota dedicada futura). | Na aba Promoções (**compact**), semana/métrica longa **oculta**; banner de promoções visível. | Abrir `/promocoes?tab=em-alta`. |
| RN-JOGOS-027 | Modo compacto na aba Promoções | Dentro de Promoções, Em Alta usa layout resumido: skeleton de 6 cards, banner para **Promoções ao vivo**, sem bloco grande de semana/métrica. | Aba **Em Alta** em Promoções. | Banner “Ofertas ao vivo…” + link **Ver promoções ao vivo**; grade compacta. | Abrir aba Em Alta. |
| RN-JOGOS-028 | Erro ao carregar | Falha ao montar Em Alta. | Catálogo/indisponibilidade simulada. | Mensagem **Não foi possível carregar os jogos em alta.** | Simular falha. |
| RN-JOGOS-029 | Conteúdo estável por sessão | Lista Em Alta não muda a cada segundo; atualiza ao reabrir aba/página. | Aba aberta. | Mesmos blocos durante navegação curta; recarregar pode atualizar. | Ficar na aba; depois F5. |

### 5 — Blocos de conteúdo Em Alta

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-JOGOS-020 | Top da Semana | Até **12** jogos em grade; os **três primeiros** com badge **#1**, **#2**, **#3**. | Pool de destaques não vazio. | Seção **Top da Semana** aberta por padrão. | Contar cards e badges. |
| RN-JOGOS-021 | Mais jogados na Steam | Faixa horizontal só se houver dados de jogadores simultâneos. | Jogos Steam com pico de jogadores. | Seção **Mais jogados na Steam** com carrossel. | Ambiente com dados Steam. |
| RN-JOGOS-022 | Promoções Steam (dados) | Descontos Steam fortes entram no pacote de dados de Em Alta; **não** há seção separada dedicada na UI atual (ofertas Steam aparecem principalmente na aba Promoções). | Jogos com desconto alto na Steam. | Verificar ofertas na aba **Promoções** / carrossel catálogo Steam. | Comparar jogo em promo Steam entre abas. |
| RN-JOGOS-023 | Por plataforma | Blocos PC → Xbox → PlayStation → Nintendo; até **8** jogos por bloco; bloco vazio mostra mensagem amigável. | Jogos multiplataforma. | Switch só no bloco Nintendo, etc. | Ler seções por plataforma. |
| RN-JOGOS-024 | Por modo de jogo | Multijogador, cooperativo, um jogador — até 8 jogos; bloco vazio com texto explicativo. | Jogos co-op. | Título listado em **Cooperativo** quando aplicável. | Achar jogo co-op conhecido. |
| RN-JOGOS-025 | Por categoria (gênero) | Até **6** gêneros com **pelo menos 2** jogos; até 8 jogos por gênero. | Gênero com 1 só jogo. | Gênero singleton **não** vira seção. | Contar seções de gênero. |

---

## Diferenças importantes

| Situação | O que o usuário pode notar |
|----------|----------------------------|
| Jogos vs Em Alta | Catálogo **Jogos** lista quase tudo; **Em Alta** é curadoria semanal exigente. |
| Em Alta vs Promoções | **Em Alta** = ranking Orbe; **Promoções** = ofertas de lojas externas + Steam catálogo. |
| Contador Jogos | Igual **Animes**: conta cards visíveis, não total global. |

---

## Ver também

- Aba Promoções (grátis, ofertas, Em Alta): `06-PROMOCOES.md`
- Carrossel Jogos na home: `01-HOME.md`
- Cards e detalhe: `08-MODAIS.md`
