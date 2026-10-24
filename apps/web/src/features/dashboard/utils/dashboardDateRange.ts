import type {
  DashboardDateRange,
  DashboardPeriod,
} from '../types/dashboard.types';

export const DEMO_REPORT_AS_OF_DATE = '2026-10-13';

const DEMO_FIRST_DATE = '2026-10-08';

export function getDashboardDateRange(
  period: DashboardPeriod,
): DashboardDateRange {
  const endDate = DEMO_REPORT_AS_OF_DATE;

  if (period === 'all') {
    return {
      startDate: DEMO_FIRST_DATE,
      endDate,
    };
  }

  const days = period === 'last3' ? 3 : 5;

  const start = new Date(`${endDate}T00:00:00.000Z`);

  start.setUTCDate(start.getUTCDate() - (days - 1));

  return {
    startDate: start.toISOString().slice(0, 10),
    endDate,
  };
}