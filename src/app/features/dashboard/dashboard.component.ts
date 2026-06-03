import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardOverview } from '../../models/traffic.models';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';
import { ApexChartComponent } from '../../shared/components/apex-chart/apex-chart.component';
import { AiInsightPanelComponent } from '../../shared/components/ai-insight-panel/ai-insight-panel.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';
import { lineChartOptions, fromHourly } from '../../shared/utils/chart-config';
import { ApexOptions } from 'apexcharts';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    KpiCardComponent,
    ChartCardComponent,
    ApexChartComponent,
    AiInsightPanelComponent,
    SkeletonLoaderComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly dashboardService = inject(DashboardService);
  private sub?: Subscription;

  loading = signal(true);
  data = signal<DashboardOverview | null>(null);
  realtimeChart = signal<ApexOptions | null>(null);
  predictionChart = signal<ApexOptions | null>(null);
  hourlyChart = signal<ApexOptions | null>(null);

  ngOnInit(): void {
    this.sub = interval(environment.refreshIntervalMs)
      .pipe(
        startWith(0),
        switchMap(() => this.dashboardService.getOverview())
      )
      .subscribe((overview) => {
        this.data.set(overview);
        this.loading.set(false);
        const rt = fromHourly(overview.realtimeTrend, 'actual');
        const pred = fromHourly(overview.predictionOverview, 'predicted');
        const hr = fromHourly(overview.hourlyTraffic, 'actual');
        this.realtimeChart.set(
          lineChartOptions(rt.categories, [{ name: 'Live Traffic', data: rt.data }], 280)
        );
        this.predictionChart.set(
          lineChartOptions(pred.categories, [{ name: 'AI Forecast', data: pred.data }], 280)
        );
        this.hourlyChart.set(
          lineChartOptions(hr.categories, [{ name: 'Hourly Volume', data: hr.data }], 260)
        );
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
