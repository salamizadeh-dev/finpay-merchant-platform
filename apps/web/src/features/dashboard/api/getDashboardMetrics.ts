import type { DashboardMetrics } from '../types/dashboard.types';

import {
  demoTransactions,
  demoRefunds,
} from '../data/demoDashboardData';

import {
  calculateDashboardMetrics,
} from '../utils/calculateDashboardMetrics';

export function getDashboardMetrics(): Promise<DashboardMetrics> {
  const metrics = calculateDashboardMetrics(
    demoTransactions,
    demoRefunds,
  );

  return Promise.resolve(metrics);
}