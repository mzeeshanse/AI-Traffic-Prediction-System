import { Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/services/theme.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatSlideToggleModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <div class="page settings">
      <header class="page-header">
        <div>
          <h1>Settings</h1>
          <p>Appearance & API configuration</p>
        </div>
      </header>
      <div class="settings-grid">
        <div class="glass-card settings-card">
          <h3>Appearance</h3>
          <mat-slide-toggle
            [checked]="theme.mode() === 'dark'"
            (change)="theme.toggle()"
          >
            Dark theme
          </mat-slide-toggle>
        </div>
        <div class="glass-card settings-card">
          <h3>API Endpoint</h3>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Backend URL</mat-label>
            <input matInput [value]="apiUrl" readonly />
          </mat-form-field>
          <p class="hint">Configure in environment files for dev/prod.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-grid { display: grid; gap: 1.25rem; max-width: 600px; }
    .settings-card { padding: 1.5rem; }
    .settings-card h3 { margin: 0 0 1rem; }
    .full-width { width: 100%; }
    .hint { font-size: 0.8rem; color: var(--text-muted); margin: 0.5rem 0 0; }
  `],
})
export class SettingsComponent {
  readonly theme = inject(ThemeService);
  readonly apiUrl = environment.apiUrl;
}
