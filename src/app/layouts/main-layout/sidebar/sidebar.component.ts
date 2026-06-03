import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

export interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  readonly navItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/predictions', label: 'AI Predictions', icon: 'psychology' },
    { path: '/analytics', label: 'Historical Analytics', icon: 'analytics' },
    { path: '/smart-city', label: 'Smart City', icon: 'location_city' },
    { path: '/ai-models', label: 'AI Models', icon: 'model_training' },
    { path: '/architecture', label: 'System Architecture', icon: 'account_tree' },
    { path: '/settings', label: 'Settings', icon: 'settings' },
  ];
}
