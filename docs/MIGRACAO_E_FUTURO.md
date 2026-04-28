# 🚀 Guia de Migração e Visão de Futuro: Orbe & Watchlist

Este documento detalha a transição da arquitetura Cloud (Vercel/Supabase) para o servidor local (Windows 10) e o plano de integração unificada entre os projetos Orbe e Watchlist.

---

## 1. Motivação e Objetivos
- **Soberania de Dados:** Sair do Supabase/Vercel e manter os dados em hardware próprio.
- **Redução de Custos:** Usar um computador antigo (Windows 10) como servidor persistente.
- **Unificação de Ecossistema:** Criar uma ponte de comunicação onde o Watchlist (PWA) envia dados para o Orbe (Backend), centralizando a experiência do usuário.

---

## 2. Nova Arquitetura (Docker Local)

O projeto foi refatorado para rodar em containers, garantindo que o Windows 10 permaneça "limpo" e o servidor seja fácil de mover ou fazer backup.

### Componentes do Servidor (Docker Compose):
| Serviço | Tecnologia | Porta | Função |
| :--- | :--- | :--- | :--- |
| **Postgres** | PostgreSQL 15 | `5432` | Banco de dados centralizado (Substitui o Supabase). |
| **Redis** | Redis 7 | `6379` | Cache de alta performance para a API do Orbe. |
| **Orbe API** | Node.js / Express | `3001` | Cérebro do sistema, gerencia sync, auth e watchlist. |
| **Orbe Front** | Next.js 14 | `3000` | Interface web principal. |

---

## 3. Passo a Passo da Migração

### Fase A: Preparação do Hardware
1. Instalar **Docker Desktop** no Windows 10.
2. Definir um **IP Estático** para o computador na rede local (ex: `192.168.1.100`).
3. (Opcional) Configurar um **Cloudflare Tunnel** ou **Tailscale** se desejar acessar o servidor de fora de casa sem abrir portas no roteador.

### Fase B: Subir o Servidor
1. Navegue até a pasta do projeto Orbe.
2. Execute o comando:
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass;
   docker-compose up -d --build
   ```
3. O banco de dados será inicializado automaticamente com o schema atualizado via Prisma.

### Fase C: Sincronização do Watchlist
1. Abra o arquivo `watchlist/index.html`.
2. Vá em **Configurações (⚙️)**.
3. Configure a URL da API (ex: `http://192.168.1.100:3001/api`).
4. Insira seu Token JWT do Orbe.
5. Clique no ícone de **Sincronizar (🔄)** para enviar seus itens locais do IndexedDB para o servidor.

---

## 4. Integração Realizada (O "Link")

A ligação entre os projetos agora funciona da seguinte forma:
- **Modelo de Dados:** O banco do Orbe agora possui a tabela `WatchlistItem`, que espelha os campos do app antigo.
- **Sincronização em Massa:** A API do Orbe possui um endpoint de `upsert` que recebe a lista do Watchlist, compara IDs e atualiza apenas o necessário.
- **Interoperabilidade:** O Watchlist (que era isolado) agora serve como um "módulo de entrada" para o banco de dados principal do Orbe.

---

## 5. Roadmap: O Futuro do Projeto

### Curto Prazo (Próximos Passos)
- [ ] **Dashboard Unificado:** Criar uma aba no Orbe Frontend que mostre os itens vindos do Watchlist em tempo real.
- [ ] **Auth Centralizada:** Fazer o Watchlist usar o sistema de login do Orbe, eliminando a necessidade de copiar tokens JWT manualmente.
- [ ] **Backup Automático:** Configurar um script no servidor para fazer dump do banco Postgres diariamente para uma pasta do OneDrive/Google Drive.

### Médio Prazo (Evolução Técnica)
- [ ] **Notificações Push Locais:** Usar o servidor local para enviar alertas de novos episódios direto para o celular (via Service Workers).
- [ ] **Módulo de Streaming:** Integrar o Orbe com o seu servidor de arquivos local (caso tenha filmes/séries salvos no PC) para assistir direto na interface.

### Longo Prazo (Expansão)
- [ ] **App Mobile (Capacitor/Cordova):** Empacotar o Watchlist integrado como um app real para Android/iOS, apontando sempre para o seu servidor doméstico.
- [ ] **Multi-usuário:** Permitir que outros membros da casa tenham suas próprias listas no mesmo servidor.

---

> **Documento gerado em:** 09/04/2026  
> **Status:** Execução Iniciada
