import { describe, expect, it } from 'vitest';

import {
  demoTransactions,
  demoRefunds,
} from '../data/demoDashboardData';

import {
  calculateDashboardMetrics,
} from './calculateDashboardMetrics';

describe('calculateDashboardMetrics', () => {
  it('calculates dashboard metrics from payment data', () => {
    const result = calculateDashboardMetrics(
      demoTransactions,
      demoRefunds,
    );

    expect(result).toEqual({
      totalPayments: 6,
      successfulPayments: 3,
      failedPayments: 2,
      pendingPayments: 1,
      successRatePercent: 60,
      grossProcessedVolumeMinor: 42450,
      refundedVolumeMinor: 2000,
      netProcessedVolumeMinor: 40450,
    });
  });

  it('returns null success rate when no payments are completed', () => {
    const result = calculateDashboardMetrics([], []);

    expect(result.totalPayments).toBe(0);
    expect(result.successRatePercent).toBeNull();
    expect(result.grossProcessedVolumeMinor).toBe(0);
  });

  it('excludes pending refunds from refunded volume', () => {
    const pendingRefunds = demoRefunds.filter(
      (refund) => refund.status === 'pending',
    );

    const result = calculateDashboardMetrics(
      demoTransactions,
      pendingRefunds,
    );

    expect(result.refundedVolumeMinor).toBe(0);
    expect(result.netProcessedVolumeMinor).toBe(42450);
  });
});