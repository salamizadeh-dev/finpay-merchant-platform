import { demoTransactions } from '../data/demoDashboardData';

import type { DashboardActivity } from '../types/dashboard.types';

import { buildDashboardActivity } from '../utils/buildDashboardActivity';

export function getDashboardActivity(): Promise<DashboardActivity> {
  return Promise.resolve(
    buildDashboardActivity(demoTransactions),
  );
}