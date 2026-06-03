import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly mode = signal<ThemeMode>(
    (localStorage.getItem('traffic-ai-theme') as ThemeMode) || 'dark'
  );

  constructor() {
    effect(() => {
      const m = this.mode();
      document.documentElement.setAttribute('data-theme', m);
      localStorage.setItem('traffic-ai-theme', m);
    });
  }

  toggle(): void {
    this.mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }
}
