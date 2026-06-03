import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ModelService } from '../../services/model.service';
import { AiModelInfo } from '../../models/traffic.models';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';
import { ApexChartComponent } from '../../shared/components/apex-chart/apex-chart.component';
import { lineChartOptions } from '../../shared/utils/chart-config';
import { ApexOptions } from 'apexcharts';

@Component({
  selector: 'app-ai-models',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatIconModule,
    MatProgressBarModule,
    KpiCardComponent,
    ChartCardComponent,
    ApexChartComponent,
  ],
  templateUrl: './ai-models.component.html',
  styleUrl: './ai-models.component.scss',
})
export class AiModelsComponent implements OnInit {
  private readonly modelService = inject(ModelService);

  model = signal<AiModelInfo | null>(null);
  accuracyChart = signal<ApexOptions | null>(null);

  ngOnInit(): void {
    this.modelService.getActiveModel().subscribe((m) => {
      this.model.set(m);
      this.accuracyChart.set(
        lineChartOptions(
          ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          [{ name: 'Accuracy %', data: [91.2, 92.8, 93.5, m.accuracy] }],
          260
        )
      );
    });
  }
}
