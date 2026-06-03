import { Injectable, inject } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';
import { DashboardOverview } from '../models/traffic.models';
import { MOCK_DASHBOARD } from '../data/mock-data';
import { ApiService } from '../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly api = inject(ApiService);

  getOverview(): Observable<DashboardOverview> {
    return of(MOCK_DASHBOARD).pipe(delay(600));
    // return this.api.get<DashboardOverview>('/dashboard');
  }
}
