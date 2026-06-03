import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthUser {
  email: string;
  name: string;
  role: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'traffic-ai-auth';
  private readonly _user = signal<AuthUser | null>(this.loadUser());

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user()?.token);

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email && password.length >= 4) {
      const user: AuthUser = {
        email,
        name: email.split('@')[0],
        role: 'Traffic Operations Manager',
        token: 'mock-jwt-' + Date.now(),
      };
      this._user.set(user);
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this._user.set(null);
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this._user()?.token ?? null;
  }

  private loadUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
