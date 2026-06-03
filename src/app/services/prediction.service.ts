import { Injectable, inject } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { PredictionRequest, PredictionResult } from '../models/traffic.models';
import { MOCK_PREDICTION } from '../data/mock-data';
import { ApiService } from '../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class PredictionService {
  private readonly api = inject(ApiService);

  predict(request: PredictionRequest = { hours: 24 }): Observable<PredictionResult> {
    return of({ ...MOCK_PREDICTION, generatedAt: new Date().toISOString() }).pipe(delay(1800));
    // return this.api.post<PredictionResult>('/predictions', request);
  }

  predictForDate(date: string): Observable<PredictionResult> {
    return of({ ...MOCK_PREDICTION, generatedAt: date }).pipe(delay(2000));
  }
}
