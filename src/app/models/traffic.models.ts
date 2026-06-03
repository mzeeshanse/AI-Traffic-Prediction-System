export interface KpiMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  icon: string;
  color?: string;
}

export interface HourlyTrafficPoint {
  hour: string;
  actual?: number;
  predicted?: number;
  density?: number;
}

export interface PredictionRequest {
  hours?: number;
  targetDate?: string;
  modelType?: string;
}

export interface PredictionResult {
  modelType: string;
  confidence: number;
  mae?: number;
  rmse?: number;
  generatedAt: string;
  summary: string;
  hourly: HourlyTrafficPoint[];
  historical: HourlyTrafficPoint[];
}

export interface AnalyticsSummary {
  weekdayAvg: number;
  weekendAvg: number;
  peakHour: string;
  monthlyGrowth: number;
  heatmap: number[][];
  monthlyTrend: { month: string; volume: number }[];
}

export interface SmartCityStatus {
  intersections: number;
  activeCameras: number;
  vehiclesProcessed: number;
  congestionZones: CongestionZone[];
  mobilityScore: number;
  liveStats: { label: string; value: string; status: 'ok' | 'warn' | 'critical' }[];
}

export interface CongestionZone {
  id: string;
  name: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  vehicles: number;
}

export interface AiModelInfo {
  name: string;
  type: 'LSTM' | 'XGBoost' | 'Ensemble';
  version: string;
  accuracy: number;
  mae: number;
  rmse: number;
  datasetSize: number;
  lastTrained: string;
  confidence: number;
  status: 'active' | 'training' | 'idle';
}

export interface DashboardOverview {
  kpis: KpiMetric[];
  realtimeTrend: HourlyTrafficPoint[];
  predictionOverview: HourlyTrafficPoint[];
  hourlyTraffic: HourlyTrafficPoint[];
  systemHealth: number;
  trafficState: 'flowing' | 'moderate' | 'congested' | 'critical';
  aiInsight: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'ai';
}

export interface ArchitectureNode {
  id: string;
  label: string;
  description: string;
  icon: string;
  layer: number;
}

export interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
}
