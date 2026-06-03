import { Injectable, inject } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { SmartCityStatus } from '../models/traffic.models';
import { MOCK_SMART_CITY } from '../data/mock-data';
import { ApiService } from '../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class TrafficService {
  private readonly api = inject(ApiService);

  getSmartCityStatus(): Observable<SmartCityStatus> {
    return of(MOCK_SMART_CITY).pipe(delay(500));
    // return this.api.get<SmartCityStatus>('/traffic/smart-city');
  }
}
