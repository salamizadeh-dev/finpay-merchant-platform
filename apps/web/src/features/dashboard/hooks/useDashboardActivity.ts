import { useQuery } from '@tanstack/react-query';

import type {
  DashboardDateRange,
} from '../types/dashboard.types';

import {
  getDashboardActivity,
} from '../api/getDashboardActivity';

export function useDashboardActivity(
  range: DashboardDateRange,
) {
  return useQuery({
    queryKey: [
      'dashboard',
      'activity',
      range.startDate,
      range.endDate,
    ],
    queryFn: () => getDashboardActivity(range),
  });
}