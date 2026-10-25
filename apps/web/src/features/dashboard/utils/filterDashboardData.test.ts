import { describe, expect, it } from 'vitest';

import {
  demoTransactions,
  demoRefunds,
} from '../data/demoDashboardData';

import { filterDashboardData } from './filterDashboardData';

describe('filterDashboardData', () => {
  it('filters transactions by their creation date', () => {
    const result = filterDashboardData(
      demoTransactions,
      demoRefunds,
      {
        startDate: '2026-10-11',
        endDate: '2026-10-13',
      },
    );

    expect(result.transactions.map((tx) => tx.id)).toEqual([
      'txn_1004',
      'txn_1005',
      'txn_1006',
    ]);
  });

  it('filters refunds by refund date independently', () => {
    const result = filterDashboardData(
      demoTransactions,
      demoRefunds,
      {
        startDate: '2026-10-11',
        endDate: '2026-10-13',
      },
    );

    expect(result.refunds.map((refund) => refund.id)).toEqual([
      'ref_1001',
      'ref_1002',
    ]);
  });
});