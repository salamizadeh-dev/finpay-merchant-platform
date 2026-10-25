import { describe, expect, it } from 'vitest';

import { demoTransactions } from '../data/demoDashboardData';

import { buildDashboardActivity } from './buildDashboardActivity';

describe('buildDashboardActivity', () => {
  it('calculates daily volume from successful payments only', () => {
    const result = buildDashboardActivity(demoTransactions);

    expect(result.dailyVolume).toEqual([
      { date: '2026-10-08', amountMinor: 12500 },
      { date: '2026-10-09', amountMinor: 8950 },
      { date: '2026-10-10', amountMinor: 0 },
      { date: '2026-10-11', amountMinor: 21000 },
      { date: '2026-10-12', amountMinor: 0 },
      { date: '2026-10-13', amountMinor: 0 },
    ]);
  });

  it('returns five most recent transactions without mutating input', () => {
    const originalIds = demoTransactions.map((tx) => tx.id);

    const result = buildDashboardActivity(demoTransactions);

    expect(result.recentTransactions).toHaveLength(5);

    expect(result.recentTransactions[0].id).toBe('txn_1006');

    expect(demoTransactions.map((tx) => tx.id)).toEqual(
      originalIds,
    );
  });

  it('handles empty transaction data', () => {
    const result = buildDashboardActivity([]);

    expect(result.dailyVolume).toEqual([]);
    expect(result.recentTransactions).toEqual([]);
  });
});