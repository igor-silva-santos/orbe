# Orbe Nerd

Hub de descoberta e acompanhamento de filmes, séries, animes e jogos.

**Demo:** https://orbe-seven.vercel.app  
**UI:** direção visual [Pulp Gráfico](DESIGN.md) (`design-preview/orbe-redesign-05-pulp-dual-theme.html`)

## Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 14, Tailwind CSS |
| Backend | Flask (Python) |
| Banco | PostgreSQL (Prisma no sync) |
| APIs | TMDB, Anilist, IGDB |
| Auth | JWT |

## Funcionalidades

- Catálogo por categoria com carrosséis de lançamentos
- Busca global com filtros
- Detalhe de mídia (modal), watchlist e interações do usuário
- Tema claro/escuro
- Sync de conteúdo a partir das APIs externas

## Como rodar

### Backend

```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Build de produção do frontend: `npm run build`.

## Design

A direção visual ativa está documentada em [`DESIGN.md`](DESIGN.md). Os protótipos HTML ficam em `design-preview/`.

## Roadmap

- [ ] Deploy de produção estável (Vercel + backend)
- [ ] Watchlist sincronizada
- [ ] Notificações em tempo real
- [ ] PWA
