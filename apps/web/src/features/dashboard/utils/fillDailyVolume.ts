import type {
  DailyVolumePoint,
  DashboardDateRange,
} from '../types/dashboard.types';

export function fillDailyVolume(
  points: readonly DailyVolumePoint[],
  range: DashboardDateRange,
): DailyVolumePoint[] {
  const totals = new Map(
    points.map((point) => [point.date, point.amountMinor]),
  );

  const result: DailyVolumePoint[] = [];

  const day = new Date(
    `${range.startDate}T00:00:00.000Z`,
  );

  const lastDay = new Date(
    `${range.endDate}T00:00:00.000Z`,
  );

  while (day <= lastDay) {
    const date = day.toISOString().slice(0, 10);

    result.push({
      date,
      amountMinor: totals.get(date) ?? 0,
    });

    day.setUTCDate(day.getUTCDate() + 1);
  }

  return result;
}