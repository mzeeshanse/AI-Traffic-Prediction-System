import { Injectable, inject } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { AiModelInfo } from '../models/traffic.models';
import { MOCK_AI_MODEL } from '../data/mock-data';
import { ApiService } from '../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class ModelService {
  private readonly api = inject(ApiService);

  getActiveModel(): Observable<AiModelInfo> {
    return of(MOCK_AI_MODEL).pipe(delay(500));
    // return this.api.get<AiModelInfo>('/models/active');
  }
}
