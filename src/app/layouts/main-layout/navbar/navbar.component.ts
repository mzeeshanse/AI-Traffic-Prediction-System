import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { SystemStatusComponent } from '../../../shared/components/system-status/system-status.component';
import { MOCK_NOTIFICATIONS } from '../../../data/mock-data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    FormsModule,
    SystemStatusComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() trafficState: 'flowing' | 'moderate' | 'congested' | 'critical' = 'moderate';
  @Output() menuToggle = new EventEmitter<void>();

  readonly auth = inject(AuthService);
  readonly theme = inject(ThemeService);
  readonly notifications = MOCK_NOTIFICATIONS;
  searchQuery = '';

  trafficLabel(): string {
    const map = {
      flowing: 'Traffic Flowing',
      moderate: 'Moderate Congestion',
      congested: 'Congested',
      critical: 'Critical Alert',
    };
    return map[this.trafficState];
  }
}
