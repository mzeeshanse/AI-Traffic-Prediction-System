import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="spinner-wrap" [class.overlay]="overlay">
      <mat-spinner [diameter]="diameter"></mat-spinner>
      @if (message) {
        <p>{{ message }}</p>
      }
    </div>
  `,
  styles: [`
    .spinner-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 2rem;
      p { margin: 0; color: var(--text-muted); font-size: 0.9rem; }
      &.overlay {
        position: absolute;
        inset: 0;
        background: rgba(10, 15, 30, 0.7);
        z-index: 10;
        backdrop-filter: blur(4px);
      }
    }
  `],
})
export class LoadingSpinnerComponent {
  @Input() message = '';
  @Input() diameter = 48;
  @Input() overlay = false;
}
