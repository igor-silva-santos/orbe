# Página Promoções — Regras de negócio (visão de tela)

**Onde o usuário está:** página **Promoções & Jogos Grátis** (`/promocoes`), com três abas: **Jogos de Graça**, **Promoções** e **Em Alta**. O parâmetro de endereço `?tab=promocoes` ou `?tab=em-alta` escolhe a aba inicial; sem parâmetro ou valor inválido abre **Jogos de Graça**.

**O que existe nesta página:** hero com voltar, título, texto sobre lojas (Epic, EA App, Steam, etc.), horário da última atualização, botão **Atualizar agora**; abas com contadores (grátis e promoções); busca, ordenação, filtros por loja/plataforma; seções de ofertas; rodapé de fontes; aba **Em Alta** embute o conteúdo de jogos em alta (ver `05-JOGOS.md`).

---

## 1 — Abas, endereço e carregamento inicial

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-PROMO-001 | Aba pela URL | Endereço define aba inicial. | `/promocoes`, `/promocoes?tab=promocoes`, `/promocoes?tab=em-alta`. | Padrão **Jogos de Graça**; `promocoes` → aba Promoções; `em-alta` → Em Alta. | Abrir cada URL. |
| RN-PROMO-002 | Shell da página | Estrutura (hero, abas) aparece mesmo antes das ofertas terminarem de carregar. | Primeira visita. | Layout visível; conteúdo das abas grátis/promo preenche depois. | Abrir Promoções com rede lenta. |
| RN-PROMO-003 | Três abas | Grátis, Promoções, Em Alta com ícones distintos. | Página carregada. | Alternar abas muda conteúdo principal. | Clicar cada aba. |
| RN-PROMO-004 | Em Alta sem ofertas de loja | Aba **Em Alta** não carrega jogos grátis/promoções de lojas externas. | Aba **Em Alta** ativa. | Só blocos de jogos em alta; sem skeleton de 12 cards de deal (salvo loading interno de Em Alta). | Abrir Em Alta; observar ausência de grids de oferta. |
| RN-PROMO-005 | Carregar sob demanda | Cada aba de ofertas busca dados na **primeira** vez que o usuário entra nela. | Abrir direto em Promoções sem passar por Grátis. | Promoções carrega ao selecionar aba; Grátis pode não ter sido buscado ainda. | Entrar direto `?tab=promocoes`. |

---

## 2 — Origem dos dados (visão do usuário)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-PROMO-006 | Várias lojas — grátis | Jogos de graça agregam Epic, giveaways, Steam, itch.io, etc. | Aba Grátis carregada. | Cards de lojas diferentes; rodapé lista fontes com contagem. | Ler rodapé após load. |
| RN-PROMO-007 | Várias lojas — promo pagas | Promoções pagas combinam várias lojas; ordem padrão prioriza “melhor deal”. | Aba Promoções. | Ofertas misturadas; ordenação **Popularidade** por padrão. | Abrir aba Promoções. |
| RN-PROMO-008 | Catálogo Orbe na Steam | Jogos já catalogados no site com desconto na Steam aparecem em faixa dedicada. | Jogos Orbe em promo Steam. | Seção **Promoções na Steam (catálogo)** com carrossel horizontal. | Aba Promoções com catálogo populado. |
| RN-PROMO-009 | Atualização periódica | Ofertas são atualizadas em intervalo curto; botão **Atualizar agora** força nova busca. | Aba grátis ou promo. | Horário **Última atualização** muda após atualizar. | Clicar **Atualizar agora** duas vezes. |
| RN-PROMO-010 | Alerta de fontes indisponíveis | Se alguma loja falhar, banner âmbar ou vermelho avisa que a lista pode estar incompleta. | Fonte externa down no ambiente. | Banner listando lojas com falha. | Simular/induzir falha de fonte. |
| RN-PROMO-011 | Sem detalhes técnicos internos | Usuário não vê metadados de diagnóstico — só ofertas, contadores e alertas amigáveis. | Qualquer aba de oferta. | Nenhum painel “debug” na interface. | Inspecionar UI. |
| RN-PROMO-012 | Conteúdo da aba Grátis | Temporários, permanentes e lista unificada para contagem. | Grátis carregado. | Seções **Estão de graça** e **São de graça**; chips de plataforma. | Percorrer aba Grátis. |
| RN-PROMO-013 | Paginação de promoções pagas | Primeira leva ~48 ofertas; **Carregar mais** traz o restante quando existir. | Muitas promoções ao vivo. | Botão **Carregar mais promoções** aumenta grid. | Clicar até sumir botão. |
| RN-PROMO-014 | Preços em reais | Quando aplicável, valores convertidos; rodapé pode mostrar taxa USD/BRL e hora da cotação. | Ofertas em dólar. | Preço BRL nos cards; linha USD/BRL no rodapé. | Ler rodapé e cards. |

---

## 3 — Aba Jogos de Graça

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-PROMO-015 | Temporário vs permanente | **Estão de graça** = promo 100% por tempo limitado; **São de graça** = F2P ou sempre zero. | Deals de ambos tipos. | Duas seções com textos explicativos diferentes. | Ler subtítulos das seções. |
| RN-PROMO-016 | Ordenação padrão grátis | Temporários por **Acaba primeiro**; permanentes por título quando essa ordenação não se aplica. | Aba Grátis. | Select de ordenação; mudar reordena temporários. | Trocar ordenação. |
| RN-PROMO-017 | Filtro por plataforma/loja | Chips só aparecem para lojas que têm oferta no momento; filtro ativo some se a loja deixar de ter itens. | Filtrar e atualizar. | Chip some ou volta para **Todas**. | Filtrar Steam; atualizar se vazio. |
| RN-PROMO-018 | Busca por título | Campo **Buscar jogo...** filtra temporários, permanentes e destaques (case insensitive). | Texto parcial do título. | Grid reduzido. | Buscar substring. |
| RN-PROMO-019 | Destaques itch.io e EA App | Com filtro **Todas** e sem busca, ofertas itch.io e EA App podem aparecer em seções colapsáveis próprias, removidas do bloco principal para não duplicar. | Deals nessas lojas. | Seções **Grátis na itch.io** / **Grátis na EA** (ou equivalente). | Confirmar que itch não repete no grid principal. |
| RN-PROMO-020 | Agrupamento por loja | Com **Todas** plataformas, lista principal agrupa subtítulos por loja (uppercase). | Várias lojas. | Subtítulos EPIC, STEAM, etc., cada um com grid. | Ver aba Grátis com muitas fontes. |
| RN-PROMO-021 | Contador na aba Grátis | Número ao lado do nome da aba reflete ofertas grátis **após** filtro de plataforma e busca. | Busca ativa. | Badge diminui. | Buscar título raro. |
| RN-PROMO-022 | Vazio grátis | Sem temporários ou sem permanentes. | Lista filtrada vazia. | Mensagens específicas por seção. | Filtrar loja sem giveaways. |

---

## 4 — Aba Promoções (pagas)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-PROMO-023 | Ordenação padrão promo | **Popularidade** (melhor avaliação de deal). | Aba Promoções. | Trocar para **Maior desconto** reordena grid. | Usar select de ordenação. |
| RN-PROMO-024 | Faixa catálogo Steam | Carrossel no topo quando há jogos do catálogo Orbe em desconto na Steam. | Pelo menos um jogo Orbe em promo na Steam. | Seção com link **Ver aba Em Alta →**. | Abrir Promoções com catálogo em promo. |
| RN-PROMO-025 | Carregar mais | Botão só com filtro **Todas**, sem busca, e quando ainda há páginas. | >48 promoções. | **Carregar mais promoções** append cards; com busca o botão some. | Buscar título → botão ausente. |
| RN-PROMO-026 | Contador aba Promoções | Badge = ofertas ao vivo filtradas + itens do carrossel catálogo Steam filtrados. | Filtro plataforma. | Número atualiza. | Filtrar Epic. |
| RN-PROMO-027 | Wishlist Steam (em breve) | Caixa tracejada informativa, **sem** botão funcional de login Steam. | Aba Promoções visível. | Texto **Lista de desejos Steam (em breve)**. | Ler bloco no topo da aba. |

---

## 5 — Aba Em Alta e redirect legado

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-PROMO-028 | Em Alta embutido | Mesmo conteúdo de jogos em alta (Top da Semana, Steam, plataformas…) em modo compacto + banner para promoções. | Tab `em-alta`. | Ver regras RN-JOGOS-019–029 em `05-JOGOS.md`. | Abrir aba Em Alta. |
| RN-PROMO-029 | Bookmark antigo | `/jogos-em-alta` redireciona para esta aba. | URL legada. | Endereço final `?tab=em-alta`. | Acessar URL antiga. |

---

## 6 — UX global (hero, erros, loading)

| ID | Nome | Descrição | Pré-condições | Resultado na tela | Como testar |
| --- | --- | --- | --- | --- | --- |
| RN-PROMO-030 | Atualizar agora | Recarrega aba ativa **Grátis** ou **Promoções**; **Em Alta** não usa este botão para ofertas de loja. | Botão no hero. | Spinner no ícone; horário atualiza (abas de deal). | Clicar em Grátis vs Em Alta. |
| RN-PROMO-031 | Erro global de ofertas | Falha ao buscar grátis/promo. | Indisponibilidade. | **Não foi possível carregar promoções e jogos grátis.** + **Tentar novamente**. | Simular falha. |
| RN-PROMO-032 | Skeleton inicial | Primeira carga de Grátis/Promo mostra 12 placeholders shimmer. | Rede lenta, aba ≠ Em Alta. | Skeleton antes dos cards reais. | Throttle + abrir Promoções. |
| RN-PROMO-033 | Banner de degradação | Mesmo RN-PROMO-010 — lista fontes com falha. | Fontes parciais down. | Banner âmbar/vermelho. | Ambiente degradado. |
| RN-PROMO-034 | Rodapé de fontes | Contagens por loja com cor verde (ok) ou vermelho (erro). | Após load grátis/promo. | Linha **Fontes:** Epic (n), Steam (n)… | Comparar com quantidade visível. |
| RN-PROMO-035 | Tamanho da primeira página promo | Primeira leva de **Ofertas ao vivo** alinhada a ~48 itens antes de **Carregar mais**. | Muitas ofertas. | Grid inicial ~48; botão carrega resto. | Contar antes de carregar mais. |

---

## Diferenças importantes

| Situação | O que o usuário pode notar |
|----------|----------------------------|
| Grátis vs Promoções | Grátis separa temporário/permanente; Promoções mistura descontos pagos + faixa Steam catálogo. |
| Em Alta vs Promoções | Em Alta **não** lista giveaways de Epic/etc.; é ranking do catálogo de jogos. |
| Busca / filtro vs Carregar mais | Com busca ou loja filtrada, **Carregar mais** some — tudo filtrado client-side na página já carregada. |

---

## Ver também

- Jogos em Alta (detalhe dos blocos): `05-JOGOS.md`
- Catálogo Jogos: `05-JOGOS.md` (seção catálogo)
- Cards de mídia (fora de deals): `08-MODAIS.md`
