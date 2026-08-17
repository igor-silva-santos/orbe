# Checklist de Testes — Orbe

**Site:** https://orbe-seven.vercel.app  
**Tempo estimado:** 30–45 min  
**Navegador sugerido:** Chrome ou Firefox (desktop)

**Como usar:** marque `[x]` nos itens que passaram. Use o campo **Erro / observação** quando algo falhar.

**Ambiente do teste**

| Campo | Preencher |
|-------|-----------|
| Navegador | |
| Dispositivo (desktop / celular) | |
| Data | |
| Testador | |

---

## 1. Homepage — Carrosséis

### Abertura e carregamento

- [ ] Abri a homepage e a seção **Filmes** mostrou o **mês atual** no título (ex.: agosto de 2026)

  **Erro / observação:**

  <br><br>

- [ ] O poster do **próximo lançamento** apareceu sem ficar muito tempo em skeleton/cinza

  **Erro / observação:**

  <br><br>

- [ ] **Não** apareceu título errado (ex.: julho quando deveria ser agosto, ou ano antigo tipo 1966)

  **Erro / observação:**

  <br><br>

- [ ] Repeti para **Séries** — abriu de forma coerente

  **Erro / observação:**

  <br><br>

- [ ] Repeti para **Animes** — abriu de forma coerente

  **Erro / observação:**

  <br><br>

- [ ] Repeti para **Jogos** — abriu de forma coerente

  **Erro / observação:**

  <br><br>

### Navegação

- [ ] Cliquei na **seta direita** do carrossel de Filmes e o mês mudou corretamente

  **Erro / observação:**

  <br><br>

- [ ] Cliquei na **seta esquerda** e voltou para o mês anterior

  **Erro / observação:**

  <br><br>

- [ ] **Arrastei** o carrossel para os lados — funcionou suave, sem travar

  **Erro / observação:**

  <br><br>

- [ ] Ao chegar no **fim** e continuar arrastando, o carrossel **volta ao início** (loop)

  **Erro / observação:**

  <br><br>

- [ ] Cliquei no **título do mês** no carrossel e ele voltou para o mês atual

  **Erro / observação:**

  <br><br>

### Modo "Em Alta"

- [ ] Cliquei no botão **Em Alta** (ícone de gráfico) em Filmes e a lista mudou

  **Erro / observação:**

  <br><br>

- [ ] Apareceram títulos **populares**, inclusive mais antigos

  **Erro / observação:**

  <br><br>

- [ ] Testei os filtros **cinema / streaming / ambos** — a lista mudou conforme o filtro

  **Erro / observação:**

  <br><br>

- [ ] Cliquei em **Em Alta** de novo e voltei para lançamentos por data

  **Erro / observação:**

  <br><br>

### Links da homepage

- [ ] Cliquei no título **Filmes** da seção — fui para `/filmes`

  **Erro / observação:**

  <br><br>

- [ ] Cliquei no título **Séries** — fui para `/series`

  **Erro / observação:**

  <br><br>

- [ ] Cliquei no título **Animes** — fui para `/animes`

  **Erro / observação:**

  <br><br>

- [ ] Cliquei no título **Jogos** — fui para `/jogos`

  **Erro / observação:**

  <br><br>

### Animes (extra)

- [ ] O botão **Agenda** aparece quando há animes carregados

  **Erro / observação:**

  <br><br>

- [ ] A navegação por **temporada** funciona (setas ou arraste)

  **Erro / observação:**

  <br><br>

---

## 2. Promoções (`/promocoes`)

### Abas e navegação

- [ ] Abri `/promocoes` — a página carregou sem erro

  **Erro / observação:**

  <br><br>

- [ ] A aba **Grátis** mostra jogos gratuitos

  **Erro / observação:**

  <br><br>

- [ ] A aba **Promoções** mostra jogos em desconto

  **Erro / observação:**

  <br><br>

- [ ] A aba **Em Alta** mostra jogos populares

  **Erro / observação:**

  <br><br>

- [ ] Acessei `/jogos-em-alta` — redirecionou para `/promocoes?tab=em-alta`

  **Erro / observação:**

  <br><br>

### Funcionalidades

- [ ] Usei a **busca** por nome de jogo — filtrou corretamente

  **Erro / observação:**

  <br><br>

- [ ] Mudei a **ordenação** (desconto, preço, A-Z) — a lista reordenou

  **Erro / observação:**

  <br><br>

- [ ] Cliquei em **Carregar mais** — apareceram mais jogos

  **Erro / observação:**

  <br><br>

- [ ] Os preços aparecem em **reais (R$)** quando aplicável

  **Erro / observação:**

  <br><br>

- [ ] No rodapé aparece a **cotação USD/BRL** com data/hora

  **Erro / observação:**

  <br><br>

### Filtros e cards

- [ ] Os **filtros de loja** (Steam, Epic, itch.io, EA, etc.) aparecem e funcionam

  **Erro / observação:**

  <br><br>

- [ ] Cards **grátis** têm visual diferente de jogos **F2P** (free-to-play)

  **Erro / observação:**

  <br><br>

- [ ] Alguns cards mostram **"Ver no Orbe"** — o link abre a página do jogo

  **Erro / observação:**

  <br><br>

- [ ] As imagens dos jogos carregam (sem ícone quebrado em massa)

  **Erro / observação:**

  <br><br>

### Links do site

- [ ] No **menu superior**, os links de promoções/jogos em alta funcionam

  **Erro / observação:**

  <br><br>

- [ ] No **rodapé**, os links de promoções funcionam

  **Erro / observação:**

  <br><br>

---

## 3. Páginas dedicadas (smoke test)

- [ ] `/filmes` — lista carrega

  **Erro / observação:**

  <br><br>

- [ ] `/series` — lista carrega

  **Erro / observação:**

  <br><br>

- [ ] `/animes` — lista carrega

  **Erro / observação:**

  <br><br>

- [ ] `/jogos` — lista carrega

  **Erro / observação:**

  <br><br>

- [ ] Cliquei em um item qualquer — a página de detalhe abre

  **Erro / observação:**

  <br><br>

---

## 4. Admin / Sync (só se tiver acesso)

- [ ] Abri `/admin/sync-logs` — lista de execuções aparece

  **Erro / observação:**

  <br><br>

- [ ] Cliquei em uma execução — consigo ver detalhes/fases

  **Erro / observação:**

  <br><br>

- [ ] Exportar log funciona

  **Erro / observação:**

  <br><br>

---

## 5. Celular (opcional)

- [ ] Homepage: carrosséis funcionam com toque/arraste

  **Erro / observação:**

  <br><br>

- [ ] `/promocoes` é usável no celular (abas, scroll, cards)

  **Erro / observação:**

  <br><br>

- [ ] Links e botões são clicáveis sem precisar dar zoom

  **Erro / observação:**

  <br><br>

---

## 6. Versão rápida (10 min)

- [ ] Homepage: Filmes abre no **mês certo**, poster aparece rápido

  **Erro / observação:**

  <br><br>

- [ ] Homepage: **arrastar** e **setas** do carrossel funcionam

  **Erro / observação:**

  <br><br>

- [ ] Homepage: **Em Alta** mostra populares

  **Erro / observação:**

  <br><br>

- [ ] `/promocoes`: abas **Grátis**, **Promoções** e **Em Alta** funcionam

  **Erro / observação:**

  <br><br>

- [ ] `/promocoes`: **busca** e **carregar mais** funcionam

  **Erro / observação:**

  <br><br>

- [ ] Títulos **Filmes / Séries / Animes / Jogos** na homepage são clicáveis

  **Erro / observação:**

  <br><br>

---

## Resumo final

| Área | Status | Observações gerais |
|------|--------|--------------------|
| Carrosséis (homepage) | ⬜ OK / ⬜ Com problemas | |
| Promoções | ⬜ OK / ⬜ Com problemas | |
| Páginas dedicadas | ⬜ OK / ⬜ Com problemas | |
| Admin (se testou) | ⬜ OK / ⬜ Com problemas / ⬜ Não testei | |
| Mobile (se testou) | ⬜ OK / ⬜ Com problemas / ⬜ Não testei | |

### Bugs críticos (resumo)

1.

2.

3.
