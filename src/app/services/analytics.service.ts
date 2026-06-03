import { Injectable, inject } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { AnalyticsSummary } from '../models/traffic.models';
import { MOCK_ANALYTICS } from '../data/mock-data';
import { ApiService } from '../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly api = inject(ApiService);

  getSummary(): Observable<AnalyticsSummary> {
    return of(MOCK_ANALYTICS).pipe(delay(700));
    // return this.api.get<AnalyticsSummary>('/analytics');
  }
}
