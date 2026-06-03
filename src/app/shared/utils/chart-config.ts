import { ApexOptions } from 'apexcharts';
import { HourlyTrafficPoint } from '../../models/traffic.models';

const palette = ['#00d4ff', '#7c4dff', '#00e676', '#ff9800', '#ff5252'];

export function lineChartOptions(
  categories: string[],
  series: { name: string; data: number[] }[],
  height = 300
): ApexOptions {
  return {
    series,
    chart: { type: 'line', height, sparkline: { enabled: false } },
    colors: palette,
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { categories, labels: { style: { colors: '#8892b0' } } },
    yaxis: { labels: { style: { colors: '#8892b0' } } },
    legend: { position: 'top', labels: { colors: '#ccd6f6' } },
    dataLabels: { enabled: false },
    tooltip: { theme: 'dark' },
  };
}

export function barChartOptions(
  categories: string[],
  series: { name: string; data: number[] }[],
  height = 300
): ApexOptions {
  return {
    series,
    chart: { type: 'bar', height },
    colors: palette,
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
    xaxis: { categories },
    dataLabels: { enabled: false },
    legend: { position: 'top' },
  };
}

export function heatmapOptions(data: number[][], height = 320): ApexOptions {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const series = days.map((day, i) => ({
    name: day,
    data: data[i]?.map((v, h) => ({ x: `${h}:00`, y: v })) ?? [],
  }));
  return {
    series,
    chart: { type: 'heatmap', height },
    colors: ['#008FFB'],
    dataLabels: { enabled: false },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 30, color: '#0d2137', name: 'Low' },
            { from: 31, to: 60, color: '#1565c0', name: 'Medium' },
            { from: 61, to: 100, color: '#00d4ff', name: 'High' },
          ],
        },
      },
    },
  };
}

export function fromHourly(points: HourlyTrafficPoint[], key: 'actual' | 'predicted' = 'actual') {
  return {
    categories: points.map((p) => p.hour),
    data: points.map((p) => (key === 'actual' ? p.actual : p.predicted) ?? 0),
  };
}
