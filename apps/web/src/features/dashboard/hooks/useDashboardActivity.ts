import { useQuery } from '@tanstack/react-query';

import { getDashboardActivity } from '../api/getDashboardActivity';

export function useDashboardActivity() {
  return useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: getDashboardActivity,
  });
}