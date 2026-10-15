import { useQuery } from '@tanstack/react-query';

import { getDashboardMetrics } from '../api/getDashboardMetrics';

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: getDashboardMetrics,
  });
}