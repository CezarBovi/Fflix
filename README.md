# FFlix – Plataforma de Streaming

Monorepo contendo:

- `backend/`: API Node.js + Express + TypeScript organizada por domínio (DDD) e exposta via API Gateway REST.
- `frontend/`: Single Page Application em React + Vite + TypeScript para visualizar roadmap, microserviços e contratos REST.

## Requisitos Atendidos

- Microsserviços principais (Auth, User, Content, Upload, Transcoding, Streaming, Payment, Recommendation, Analytics, Notification).
- API REST documentada via `frontend` (seção API Explorer) e consolidada em `backend/src/routes`.
- Arquitetura orientada a DDD com camadas `domain/application/infrastructure/presentation`.
- Suporte a padrões: JWT, CQRS light (analytics), filas fictícias para upload/transcoding, mock database em memória.

## Back-end

```bash
cd backend
npm install
npm run dev      # TS + nodemon
npm run build    # compila para dist/
npm start        # executa código compilado
```

### Endpoints Principais

- `POST /api/auth/register | login | refresh`
- `GET /api/users/me`, `PATCH /api/users/me/preferences`, `GET /api/users/:id/history`
- `POST /api/content`, `GET /api/content`, `POST /api/content/:id/publish`
- `POST /api/upload/signed-url`, `POST /api/upload/callback`
- `POST /api/transcoding/jobs`, `GET /api/transcoding/jobs/:id`
- `GET /api/streaming/playback/:videoId`, `POST /api/streaming/sessions/:sessionId/heartbeat`
- `POST /api/payments/subscriptions`, `GET /api/payments/subscriptions/:id`, `POST /api/payments/webhooks`
- `GET /api/recommendations/:userId`, `POST /api/recommendations/feedback`
- `GET /api/analytics/metrics`, `POST /api/analytics/events`
- `POST /api/notifications/email | push`

## Front-end

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # artefatos prontos para deploy
```

Features principais:

- Hero interativo com health-check e quick actions.
- Formulário de login conectado ao endpoint `/api/auth/login`.
- Vitrine de conteúdos e player HLS demo.
- Roadmap de sprints (12-16) e painel de métricas consumindo `/api/analytics/metrics` (fallback mock).
- Grade de microserviços e explorer de rotas REST por domínio.

## Variáveis de Ambiente

Copie `backend/.env.example` (defina PORT, JWT, CDN etc). Para o front, use `VITE_API_URL` caso seu gateway não seja `http://localhost:4000/api`.

## Próximos Passos

- Conectar repositórios reais (PostgreSQL/Redis) no backend.
- Integrar CDN/DRM reais e pipeline de upload/transcoding via filas (Bull/RabbitMQ).
- Adicionar testes (Jest, Playwright) e observabilidade (OpenTelemetry + Grafana stack).