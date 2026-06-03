# AI Traffic Prediction System — Frontend

Enterprise-grade **Angular 18** dashboard for smart city traffic intelligence. Connects to a FastAPI backend for AI predictions, historical analytics, and real-time monitoring.

![Angular](https://img.shields.io/badge/Angular-18.2-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Material](https://img.shields.io/badge/Material-18-purple)

## Screenshots

> Add screenshots after running the app: `Dashboard`, `AI Predictions`, `Historical Analytics`, `Smart City`, `AI Models`, `System Architecture`.

## Screens

![AI-Traffic-Prediction-System](AI-Traffic-Prediction-System/images/1.png)

| Dashboard | AI Predictions |
|-----------|----------------|
| _screenshot_ | _screenshot_ |

## Features

- **Dashboard** — KPI cards, real-time trends, prediction overview, AI insights
- **AI Predictions** — 24h & future-date forecasts, confidence, LSTM/XGBoost display
- **Historical Analytics** — Weekday/weekend, heatmaps, monthly growth
- **Smart City Monitoring** — Intersections, ANPR cameras, congestion zones
- **AI Model Monitoring** — MAE, RMSE, accuracy, training metadata
- **System Architecture** — Pipeline visualization & Mermaid diagram
- **Auth** — JWT-ready login, route guards, interceptors
- **Theme** — Dark/light mode, glassmorphism, responsive layout

## Architecture Overview

```
Angular 18 (Standalone + Signals)
    ↓ HttpClient + Interceptors
FastAPI Backend (/api/v1)
    ↓
Redis Cache · SQL Server · AI Engine (LSTM/XGBoost)
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Angular 18+ |
| UI | Angular Material, SCSS |
| Charts | ApexCharts |
| State | Angular Signals, RxJS |
| Architecture | Standalone components, lazy routes |

## Prerequisites

- Node.js 20+ (22 recommended)
- npm 10+

## Setup

```bash
cd traffic-ai-dashboard
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200)

### Demo Login

- **Email:** any valid email (e.g. `operator@traffic-ai.gov`)
- **Password:** 4+ characters (e.g. `demo1234`)

## Build

```bash
npm run build          # production
ng serve --configuration development
```

## Project Structure

```
src/app/
├── core/           # Auth, theme, API, guards
├── shared/         # KPI cards, charts, loaders
├── features/       # Dashboard, predictions, analytics, etc.
├── layouts/        # Sidebar, navbar, main layout
├── services/       # Domain API services
├── models/         # TypeScript interfaces
├── interceptors/   # JWT interceptor
└── data/           # Mock data (dev)
```

## API Integration

Configure the backend URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  apiUrl: 'http://localhost:8000/api/v1',
};
```

| Service | Endpoint (example) |
|---------|-------------------|
| DashboardService | `GET /dashboard` |
| PredictionService | `POST /predictions` |
| AnalyticsService | `GET /analytics` |
| TrafficService | `GET /traffic/smart-city` |
| ModelService | `GET /models/active` |

Mock data is used by default. Uncomment API calls in each service to connect to FastAPI.

### FastAPI Expected Routes

```
GET  /api/v1/dashboard
POST /api/v1/predictions
GET  /api/v1/analytics
GET  /api/v1/traffic/smart-city
GET  /api/v1/models/active
```

Authorization header: `Bearer <token>` (via `authInterceptor`).

## Development Notes

- Lazy-loaded feature routes
- Real-time refresh simulation on dashboard (30s)
- AI processing animations on predictions page
- Material dark theme with custom CSS variables

## License

MIT — Portfolio / Smart City / Enterprise ITS demonstration.
