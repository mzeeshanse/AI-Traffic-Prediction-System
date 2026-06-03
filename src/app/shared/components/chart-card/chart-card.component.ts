import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss',
})
export class ChartCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon = 'show_chart';
  @Input() loading = false;
}
