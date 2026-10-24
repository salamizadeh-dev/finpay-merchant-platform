import { describe, expect, it } from 'vitest';

import { getDashboardDateRange } from './dashboardDateRange';

describe('getDashboardDateRange', () => {
  it('returns the full demo reporting period', () => {
    expect(getDashboardDateRange('all')).toEqual({
      startDate: '2026-10-08',
      endDate: '2026-10-13',
    });
  });

  it('calculates the last three UTC days inclusively', () => {
    expect(getDashboardDateRange('last3')).toEqual({
      startDate: '2026-10-11',
      endDate: '2026-10-13',
    });
  });

  it('calculates the last five UTC days inclusively', () => {
    expect(getDashboardDateRange('last5')).toEqual({
      startDate: '2026-10-09',
      endDate: '2026-10-13',
    });
  });
});