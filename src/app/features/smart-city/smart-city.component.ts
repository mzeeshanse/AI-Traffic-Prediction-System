import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TrafficService } from '../../services/traffic.service';
import { SmartCityStatus, CongestionZone } from '../../models/traffic.models';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-smart-city',
  standalone: true,
  imports: [CommonModule, MatIconModule, KpiCardComponent, SkeletonLoaderComponent],
  templateUrl: './smart-city.component.html',
  styleUrl: './smart-city.component.scss',
})
export class SmartCityComponent implements OnInit {
  private readonly trafficService = inject(TrafficService);

  loading = signal(true);
  status = signal<SmartCityStatus | null>(null);

  ngOnInit(): void {
    this.trafficService.getSmartCityStatus().subscribe((s) => {
      this.status.set(s);
      this.loading.set(false);
    });
  }

  zoneClass(level: CongestionZone['level']): string {
    return `zone--${level}`;
  }
}
