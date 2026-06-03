import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PredictionService } from '../../services/prediction.service';
import { PredictionResult } from '../../models/traffic.models';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';
import { ApexChartComponent } from '../../shared/components/apex-chart/apex-chart.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { lineChartOptions, fromHourly } from '../../shared/utils/chart-config';
import { ApexOptions } from 'apexcharts';
import { KpiMetric } from '../../models/traffic.models';

@Component({
  selector: 'app-predictions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    ChartCardComponent,
    ApexChartComponent,
    LoadingSpinnerComponent,
    KpiCardComponent,
  ],
  templateUrl: './predictions.component.html',
  styleUrl: './predictions.component.scss',
})
export class PredictionsComponent {
  private readonly predictionService = inject(PredictionService);

  loading = signal(false);
  processing = signal(false);
  result = signal<PredictionResult | null>(null);
  predictionChart = signal<ApexOptions | null>(null);
  comparisonChart = signal<ApexOptions | null>(null);
  targetDate = '';
  modelType = 'ensemble';
  summaryKpis = signal<KpiMetric[]>([]);

  runPrediction24h(): void {
    this.loading.set(true);
    this.processing.set(true);
    this.predictionService.predict({ hours: 24, modelType: this.modelType }).subscribe({
      next: (res) => this.applyResult(res),
      complete: () => {
        this.loading.set(false);
        this.processing.set(false);
      },
    });
  }

  runFuturePrediction(): void {
    if (!this.targetDate) return;
    this.loading.set(true);
    this.processing.set(true);
    this.predictionService.predictForDate(this.targetDate).subscribe({
      next: (res) => this.applyResult(res),
      complete: () => {
        this.loading.set(false);
        this.processing.set(false);
      },
    });
  }

  private applyResult(res: PredictionResult): void {
    this.result.set(res);
    const pred = fromHourly(res.hourly, 'predicted');
    const hist = fromHourly(res.historical, 'actual');
    this.predictionChart.set(
      lineChartOptions(pred.categories, [{ name: 'Predicted', data: pred.data }], 320)
    );
    this.comparisonChart.set(
      lineChartOptions(pred.categories, [
        { name: 'Historical', data: hist.data },
        { name: 'AI Prediction', data: pred.data },
      ], 320)
    );
    this.summaryKpis.set([
      { id: 'conf', label: 'AI Confidence', value: res.confidence + '%', icon: 'verified', color: '#00e676', trend: 'up' },
      { id: 'model', label: 'Model Type', value: res.modelType, icon: 'model_training', color: '#7c4dff', trend: 'stable' },
      { id: 'mae', label: 'MAE', value: res.mae ?? '—', icon: 'analytics', color: '#00d4ff', trend: 'stable' },
      { id: 'rmse', label: 'RMSE', value: res.rmse ?? '—', icon: 'show_chart', color: '#ff9800', trend: 'stable' },
    ]);
  }
}
