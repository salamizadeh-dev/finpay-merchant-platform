import { useQuery } from '@tanstack/react-query';

import type {
  DashboardDateRange,
} from '../types/dashboard.types';

import {
  getDashboardMetrics,
} from '../api/getDashboardMetrics';

export function useDashboardMetrics(
  range: DashboardDateRange,
) {
  return useQuery({
    queryKey: [
      'dashboard',
      'metrics',
      range.startDate,
      range.endDate,
    ],
    queryFn: () => getDashboardMetrics(range),
  });
}