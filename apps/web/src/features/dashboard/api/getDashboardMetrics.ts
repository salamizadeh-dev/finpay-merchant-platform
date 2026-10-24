import type {
  DashboardDateRange,
  DashboardMetrics,
} from '../types/dashboard.types';

import {
  demoTransactions,
  demoRefunds,
} from '../data/demoDashboardData';

import {
  filterDashboardData,
} from '../utils/filterDashboardData';

import {
  calculateDashboardMetrics,
} from '../utils/calculateDashboardMetrics';

export function getDashboardMetrics(
  range: DashboardDateRange,
): Promise<DashboardMetrics> {
  const filtered = filterDashboardData(
    demoTransactions,
    demoRefunds,
    range,
  );

  const metrics = calculateDashboardMetrics(
    filtered.transactions,
    filtered.refunds,
  );

  return Promise.resolve(metrics);
}