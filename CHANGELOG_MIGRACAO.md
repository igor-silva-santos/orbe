# 📓 Registro de Modificações - 09/04/2026

Este documento registra todas as alterações realizadas durante a sessão de migração do projeto Orbe Nerd da nuvem (Vercel/Supabase) para o servidor local (Windows 10).

---

## 1. Infraestrutura & DevOps
- **Dockerização Completa:** Criado `docker-compose.yml` para gerenciar PostgreSQL, Redis, API e Frontend.
- **Dockerfiles:** Criadas receitas de build otimizadas para o ambiente local.
- **Independência de Nuvem:** Removida a dependência do Supabase; agora o sistema utiliza um banco PostgreSQL 15 local.

## 2. Banco de Dados (Prisma)
- **Expansão do Modelo User:** Adicionados campos `nome`, `bio`, `avatar`, `preferencias` (Json) e `perfil_publico`.
- **Modelo WatchlistItem:** Criada tabela para espelhar os dados do projeto Watchlist (IndexedDB) no banco central.
- **Modelo Comment:** Criada estrutura para suportar comentários reais em filmes, séries, animes e jogos.
- **Persistência de Avaliações:** Adicionado campo `comentario` à tabela de interações de mídia.

## 3. Backend (API Node.js)
- **Digital Detective 2.0:** Robô refatorado para monitorar não apenas cinema (Ingresso.com), mas também a chegada de filmes em plataformas de streaming (Aluguel/Venda).
- **Sincronização de Watchlist:** Criada rota `POST /api/watchlist/sync` para receber backups em massa do app antigo.
- **Gestão de Perfil:** Novas rotas `GET/PATCH /me` para gerenciar dados do usuário.
- **Comentários:** Endpoints para listar e criar comentários reais integrados ao banco.
- **Filtros Dinâmicos:** Rota de premiações refatorada com SQL bruto para extrair nomes e anos dinamicamente.
- **Cache Inteligente:** Implementada invalidação automática de chaves do Redis ao editar qualquer mídia via Admin.
- **WebSockets:** Reativado o servidor WS para transmitir progresso de sincronização em tempo real.

## 4. Frontend (Next.js 14)
- **Novas Páginas:**
    - `/perfil`: Visualização de dados do usuário e bio.
    - `/configuracoes`: Gestão de perfil, avatar e privacidade.
- **Refatoração do Super Modal:**
    - Seção de comentários 100% funcional.
    - Botões de "Onde Assistir" agora usam links reais de streaming.
    - Lógica de eventos recorrentes para o calendário (temporadas completas).
- **Inteligência de UI (Animes):**
    - O carrossel agora alterna sozinho entre "Estreias" e "Agenda Semanal" conforme a semana da temporada.
    - Badge "NOVO EP": Indicador visual pulsante para animes lançados nas últimas 24h.
- **Correções de Estabilidade:**
    - **Fim dos Hydration Errors:** Implementado o wrapper `ClientOnly` e robustez na manipulação de datas no servidor.
    - **Tratamento 401:** O sistema agora detecta token expirado e redireciona para o login com mensagem clara.
- **Responsividade Mobile:**
    - Faxina no CSS de carrosséis e header para eliminar overflow (scroll lateral) em celulares.

## 5. Integração Watchlist
- **Ponte de Dados:** O arquivo `watchlist/index.html` agora possui um botão de sincronização que envia os dados do navegador para o servidor Orbe local.
- **Configuração:** Adicionados campos de URL de API e Token JWT nas configurações do app antigo.

---
**Status Final:** Projeto validado, build passando e pronto para subir para o Git.
