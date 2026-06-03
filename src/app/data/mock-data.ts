import {
  AiModelInfo,
  AnalyticsSummary,
  ArchitectureNode,
  DashboardOverview,
  HourlyTrafficPoint,
  KpiMetric,
  NotificationItem,
  PredictionResult,
  SmartCityStatus,
} from '../models/traffic.models';

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

function generateHourly(base: number, variance: number, predicted = false): HourlyTrafficPoint[] {
  return hours.map((hour, i) => {
    const peak = i >= 7 && i <= 9 ? 1.4 : i >= 16 && i <= 19 ? 1.6 : i >= 11 && i <= 14 ? 1.2 : 0.7;
    const val = Math.round(base * peak * (0.85 + Math.random() * variance));
    return predicted
      ? { hour, predicted: val, actual: Math.round(val * (0.92 + Math.random() * 0.12)) }
      : { hour, actual: val };
  });
}

export const MOCK_KPIS: KpiMetric[] = [
  { id: 'vehicles', label: 'Total Vehicles Today', value: '284,512', change: 12.4, trend: 'up', icon: 'directions_car', color: '#00d4ff' },
  { id: 'peak', label: 'Peak Hour Traffic', value: '18:00', change: 8.2, trend: 'up', icon: 'schedule', color: '#7c4dff' },
  { id: 'congestion', label: 'Congestion Risk', value: 'Moderate', change: -3.1, trend: 'down', icon: 'warning', color: '#ff9800' },
  { id: 'accuracy', label: 'AI Prediction Accuracy', value: '94.2%', change: 1.8, trend: 'up', icon: 'psychology', color: '#00e676' },
  { id: 'cameras', label: 'Active Cameras', value: 156, change: 0, trend: 'stable', icon: 'videocam', color: '#40c4ff' },
  { id: 'violations', label: 'Traffic Violations', value: 342, change: -15.2, trend: 'down', icon: 'gavel', color: '#ff5252' },
  { id: 'health', label: 'System Health', value: '99.1%', change: 0.2, trend: 'up', icon: 'health_and_safety', color: '#69f0ae' },
];

export const MOCK_DASHBOARD: DashboardOverview = {
  kpis: MOCK_KPIS,
  realtimeTrend: generateHourly(1200, 0.3),
  predictionOverview: generateHourly(1150, 0.25, true),
  hourlyTraffic: generateHourly(1300, 0.35),
  systemHealth: 99.1,
  trafficState: 'moderate',
  aiInsight: 'Traffic congestion expected between 4 PM and 6 PM near Central Junction and Highway 7.',
};

export const MOCK_PREDICTION: PredictionResult = {
  modelType: 'LSTM + XGBoost Ensemble',
  confidence: 94.2,
  mae: 42.3,
  rmse: 58.7,
  generatedAt: new Date().toISOString(),
  summary: 'Peak congestion predicted 16:00–19:00. Recommend adaptive signal timing on corridors A3 and B7.',
  hourly: generateHourly(1400, 0.2, true),
  historical: generateHourly(1350, 0.15),
};

export const MOCK_ANALYTICS: AnalyticsSummary = {
  weekdayAvg: 12450,
  weekendAvg: 8920,
  peakHour: '17:00',
  monthlyGrowth: 6.8,
  heatmap: Array.from({ length: 7 }, () =>
    Array.from({ length: 24 }, () => Math.floor(20 + Math.random() * 80))
  ),
  monthlyTrend: [
    { month: 'Jan', volume: 720000 },
    { month: 'Feb', volume: 745000 },
    { month: 'Mar', volume: 768000 },
    { month: 'Apr', volume: 792000 },
    { month: 'May', volume: 815000 },
    { month: 'Jun', volume: 842000 },
  ],
};

export const MOCK_SMART_CITY: SmartCityStatus = {
  intersections: 48,
  activeCameras: 156,
  vehiclesProcessed: 1847293,
  mobilityScore: 78,
  congestionZones: [
    { id: 'z1', name: 'Central Junction', level: 'high', vehicles: 1240 },
    { id: 'z2', name: 'Highway 7 North', level: 'critical', vehicles: 1890 },
    { id: 'z3', name: 'Airport Road', level: 'medium', vehicles: 890 },
    { id: 'z4', name: 'Tech Park Gate', level: 'low', vehicles: 420 },
  ],
  liveStats: [
    { label: 'ANPR Processing', value: '1.2ms avg', status: 'ok' },
    { label: 'Edge Nodes Online', value: '24/24', status: 'ok' },
    { label: 'Signal Sync', value: 'Active', status: 'ok' },
    { label: 'Data Pipeline', value: '98.4%', status: 'warn' },
  ],
};

export const MOCK_AI_MODEL: AiModelInfo = {
  name: 'TrafficFlow-Ensemble-v3',
  type: 'Ensemble',
  version: '3.2.1',
  accuracy: 94.2,
  mae: 42.3,
  rmse: 58.7,
  datasetSize: 2840000,
  lastTrained: '2026-05-28T02:00:00Z',
  confidence: 94.2,
  status: 'active',
};

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: '1', title: 'AI Insight', message: 'Congestion expected 4–6 PM on Highway 7.', time: '2 min ago', type: 'ai' },
  { id: '2', title: 'Model Update', message: 'LSTM ensemble retrained successfully.', time: '1 hr ago', type: 'info' },
  { id: '3', title: 'Camera Alert', message: 'Camera CAM-042 back online.', time: '3 hrs ago', type: 'info' },
];

export const MOCK_ARCHITECTURE: ArchitectureNode[] = [
  { id: 'angular', label: 'Angular 18 Frontend', description: 'Smart city dashboard, signals, ApexCharts', icon: 'web', layer: 1 },
  { id: 'fastapi', label: 'FastAPI Backend', description: 'REST API, prediction endpoints, auth', icon: 'api', layer: 2 },
  { id: 'redis', label: 'Redis Cache', description: 'Real-time traffic cache, session store', icon: 'memory', layer: 3 },
  { id: 'sqlserver', label: 'SQL Server', description: 'Historical traffic, ANPR records', icon: 'storage', layer: 3 },
  { id: 'ai', label: 'AI Engine', description: 'LSTM, XGBoost, ensemble inference', icon: 'psychology', layer: 4 },
  { id: 'pipeline', label: 'Prediction Pipeline', description: 'ETL → features → model → API', icon: 'account_tree', layer: 4 },
];

export const WEEKDAY_COMPARISON = {
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  weekday: [11200, 11800, 12100, 11900, 12400, 0, 0],
  weekend: [0, 0, 0, 0, 0, 8200, 7800],
};
