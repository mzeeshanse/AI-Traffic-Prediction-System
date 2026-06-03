import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  sidebarCollapsed = signal(false);
  trafficState: 'flowing' | 'moderate' | 'congested' | 'critical' = 'moderate';

  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }
}
