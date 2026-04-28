# 📋 Backlog Técnico: Orbe Nerd

Este documento lista o status das funcionalidades e o roadmap de evolução do projeto após a migração para o servidor local.

---

## 🟢 Próximas Entregas (Roadmap Futuro)
*Ideias para expandir o projeto agora que a base está sólida.*

1.  **Dashboard de Watchlist no Orbe:** Criar uma aba específica no Frontend do Orbe para visualizar os itens vindos do projeto Watchlist em tempo real.
2.  **Auth Centralizada (SSO Local):** Fazer o Watchlist usar o sistema de login do Orbe automaticamente, eliminando a necessidade de copiar tokens JWT.
3.  **App Mobile (Capacitor):** Transformar o Orbe/Watchlist em um aplicativo instalável (APK) que aponta para o seu servidor Windows 10.
4.  **Módulo de Streaming Local:** Integrar com pastas de arquivos do seu PC para permitir assistir conteúdos baixados diretamente pela interface.
5.  **Notificações Push (Browser):** Enviar alertas de novos episódios ou mudanças detectadas pelo Detetive Digital direto para o seu celular/desktop.

---

## ✅ Concluído (Sessão de Migração - 09/04/2026)

### 🔴 Urgência: Crítica (Infra & Core)
- [x] **Migração de Banco de Dados:** Configuração 100% local via Docker (PostgreSQL/Redis) sem dependência de nuvem.
- [x] **Invalidação de Cache:** Sistema inteligente que limpa o Redis ao editar qualquer mídia.
- [x] **Persistência de Avaliações:** Notas e comentários agora são salvos no banco de dados local.
- [x] **Correção de Autenticação:** Tratamento de erros 401 com redirecionamento automático (Fim dos Silent Fails).

### 🟠 Urgência: Alta (UX & Contas)
- [x] **Sistema de Contas Completo:** Páginas de Perfil e Configurações (/perfil, /configuracoes) com Bio e Avatar.
- [x] **WebSockets (Real-time):** Integração de progresso de sincronização em tempo real.
- [x] **Correção de Hydration:** Estabilização da renderização Next.js com ClientOnly wrappers e validação de datas.

### 🟡 Urgência: Média (Funcionalidades)
- [x] **Detetive Digital 2.0:** Monitoramento automático de Cinema (Ingresso.com) e Streaming (Aluguel/Venda via TMDB).
- [x] **Super Modal (Refatoração):** Comentários reais e links dinâmicos de "Onde Assistir".
- [x] **Filtros Dinâmicos:** Filtros de premiações agora buscam dados reais do banco em vez de nomes fixos.

### 🟢 Urgência: Baixa (Refinamento)
- [x] **Lógica de Temporada Inteligente (Animes):** Transição automática entre "Estreias" e "Agenda Semanal" baseada na semana da temporada.
- [x] **Badges de Novo Episódio:** Indicador visual verde e pulsante para lançamentos das últimas 24h.
- [x] **Eventos Recorrentes:** Agendamento automático de temporadas completas no calendário.
- [x] **Faxina CSS/Mobile:** Correção de overflow e ajustes de responsividade em carrosséis e header.

---
*Backlog atualizado após grande faxina técnica.*
