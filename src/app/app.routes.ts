import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'predictions',
        loadComponent: () =>
          import('./features/predictions/predictions.component').then((m) => m.PredictionsComponent),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/analytics/analytics.component').then((m) => m.AnalyticsComponent),
      },
      {
        path: 'smart-city',
        loadComponent: () =>
          import('./features/smart-city/smart-city.component').then((m) => m.SmartCityComponent),
      },
      {
        path: 'ai-models',
        loadComponent: () =>
          import('./features/ai-models/ai-models.component').then((m) => m.AiModelsComponent),
      },
      {
        path: 'architecture',
        loadComponent: () =>
          import('./features/architecture/architecture.component').then((m) => m.ArchitectureComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component').then((m) => m.SettingsComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
