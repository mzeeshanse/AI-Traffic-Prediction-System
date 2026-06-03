import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MOCK_ARCHITECTURE } from '../../data/mock-data';
import { ArchitectureNode } from '../../models/traffic.models';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.scss',
})
export class ArchitectureComponent {
  readonly nodes = MOCK_ARCHITECTURE;

  readonly mermaidDiagram = `flowchart TB
    A[Angular 18 Frontend] --> B[FastAPI Backend]
    B --> C[Redis Cache]
    B --> D[SQL Server]
    B --> E[AI Engine LSTM/XGBoost]
    E --> F[Prediction Pipeline]
    F --> B
    C --> B
    D --> B`;

  layers(): ArchitectureNode[][] {
    const map = new Map<number, ArchitectureNode[]>();
    this.nodes.forEach((n) => {
      const list = map.get(n.layer) ?? [];
      list.push(n);
      map.set(n.layer, list);
    });
    return Array.from(map.entries())
      .sort(([a], [b]) => a - b)
      .map(([, nodes]) => nodes);
  }
}
