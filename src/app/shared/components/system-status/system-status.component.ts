import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="status" [class]="state">
      <span class="status__dot"></span>
      {{ label }}
    </span>
  `,
  styles: [`
    .status {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      font-weight: 500;
      &__dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        animation: blink 2s infinite;
      }
      &.flowing .status__dot, &.ok .status__dot { background: #00e676; box-shadow: 0 0 8px #00e676; }
      &.moderate .status__dot, &.warn .status__dot { background: #ff9800; box-shadow: 0 0 8px #ff9800; }
      &.congested .status__dot, &.critical .status__dot { background: #ff5252; box-shadow: 0 0 8px #ff5252; }
    }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  `],
})
export class SystemStatusComponent {
  @Input() state: 'flowing' | 'moderate' | 'congested' | 'critical' | 'ok' | 'warn' = 'ok';
  @Input() label = 'Online';
}
