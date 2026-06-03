import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';
import { AnalyticsSummary } from '../../models/traffic.models';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';
import { ApexChartComponent } from '../../shared/components/apex-chart/apex-chart.component';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';
import { lineChartOptions, barChartOptions, heatmapOptions } from '../../shared/utils/chart-config';
import { WEEKDAY_COMPARISON } from '../../data/mock-data';
import { ApexOptions } from 'apexcharts';
import { KpiMetric } from '../../models/traffic.models';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    ChartCardComponent,
    ApexChartComponent,
    KpiCardComponent,
    SkeletonLoaderComponent,
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit {
  private readonly analyticsService = inject(AnalyticsService);

  loading = signal(true);
  kpis = signal<KpiMetric[]>([]);
  weekdayChart = signal<ApexOptions | null>(null);
  monthlyChart = signal<ApexOptions | null>(null);
  heatmapChart = signal<ApexOptions | null>(null);
  densityChart = signal<ApexOptions | null>(null);

  ngOnInit(): void {
    this.analyticsService.getSummary().subscribe((s) => {
      this.loading.set(false);
      this.kpis.set([
        { id: 'wd', label: 'Weekday Avg', value: s.weekdayAvg.toLocaleString(), icon: 'calendar_today', color: '#00d4ff', trend: 'up', change: 4.2 },
        { id: 'we', label: 'Weekend Avg', value: s.weekendAvg.toLocaleString(), icon: 'weekend', color: '#7c4dff', trend: 'stable', change: 0.8 },
        { id: 'peak', label: 'Peak Hour', value: s.peakHour, icon: 'schedule', color: '#ff9800', trend: 'up' },
        { id: 'growth', label: 'Monthly Growth', value: s.monthlyGrowth + '%', icon: 'trending_up', color: '#00e676', trend: 'up', change: s.monthlyGrowth },
      ]);
      const wc = WEEKDAY_COMPARISON;
      this.weekdayChart.set(
        barChartOptions(wc.categories, [
          { name: 'Weekday', data: wc.weekday },
          { name: 'Weekend', data: wc.weekend },
        ], 300)
      );
      this.monthlyChart.set(
        lineChartOptions(
          s.monthlyTrend.map((m) => m.month),
          [{ name: 'Traffic Volume', data: s.monthlyTrend.map((m) => m.volume) }],
          280
        )
      );
      this.heatmapChart.set(heatmapOptions(s.heatmap, 340));
      const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      this.densityChart.set(
        lineChartOptions(
          hours,
          [{ name: 'Density Index', data: hours.map(() => Math.floor(40 + Math.random() * 60)) }],
          260
        )
      );
    });
  }
}
