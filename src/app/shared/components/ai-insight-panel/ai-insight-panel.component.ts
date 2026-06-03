import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ai-insight-panel',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="ai-insight glass-card">
      <div class="ai-insight__pulse"></div>
      <mat-icon>auto_awesome</mat-icon>
      <div>
        <span class="ai-insight__tag">AI Insight</span>
        <p>{{ message }}</p>
      </div>
    </div>
  `,
  styleUrl: './ai-insight-panel.component.scss',
})
export class AiInsightPanelComponent {
  @Input() message = '';
}
