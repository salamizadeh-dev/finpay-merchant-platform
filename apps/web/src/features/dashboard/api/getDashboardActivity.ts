import type {
  DashboardActivity,
  DashboardDateRange,
} from '../types/dashboard.types';

import {
  demoTransactions,
  demoRefunds,
} from '../data/demoDashboardData';

import {
  filterDashboardData,
} from '../utils/filterDashboardData';

import {
  buildDashboardActivity,
} from '../utils/buildDashboardActivity';

import {
  fillDailyVolume,
} from '../utils/fillDailyVolume';

export function getDashboardActivity(
  range: DashboardDateRange,
): Promise<DashboardActivity> {
  const filtered = filterDashboardData(
    demoTransactions,
    demoRefunds,
    range,
  );

  const activity = buildDashboardActivity(
    filtered.transactions,
  );

  return Promise.resolve({
    ...activity,
    dailyVolume: fillDailyVolume(
      activity.dailyVolume,
      range,
    ),
  });
}