import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import ApexCharts, { ApexOptions } from 'apexcharts';

@Component({
  selector: 'app-apex-chart',
  standalone: true,
  template: `<div #chartContainer class="apex-container"></div>`,
  styles: [
    `
      .apex-container {
        width: 100%;
        min-height: 280px;
      }
    `,
  ],
})
export class ApexChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('chartContainer', { static: true }) container!: ElementRef<HTMLDivElement>;
  @Input() options: ApexOptions | null = null;

  private chart: ApexCharts | null = null;
  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && this.viewReady) {
      this.render();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private render(): void {
    if (!this.options) return;

    const opts: ApexOptions = {
      ...this.options,
      chart: {
        ...this.options.chart,
        background: 'transparent',
        foreColor: '#8892b0',
        animations: { enabled: true, easing: 'easeinout', speed: 800 },
        toolbar: { show: false },
        fontFamily: 'inherit',
      },
      theme: { mode: 'dark' },
      grid: {
        borderColor: 'rgba(255,255,255,0.06)',
        ...this.options.grid,
      },
    };

    if (this.chart) {
      this.chart.updateOptions(opts);
      return;
    }

    this.chart = new ApexCharts(this.container.nativeElement, opts);
    this.chart.render();
  }
}
