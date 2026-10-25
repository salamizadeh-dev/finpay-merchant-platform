import { describe, expect, it } from 'vitest';

import { fillDailyVolume } from './fillDailyVolume';

describe('fillDailyVolume', () => {
  const range = {
    startDate: '2026-10-11',
    endDate: '2026-10-13',
  };

  it('fills dates without volume using zero', () => {
    const result = fillDailyVolume(
      [
        {
          date: '2026-10-11',
          amountMinor: 21000,
        },
      ],
      range,
    );

    expect(result).toEqual([
      { date: '2026-10-11', amountMinor: 21000 },
      { date: '2026-10-12', amountMinor: 0 },
      { date: '2026-10-13', amountMinor: 0 },
    ]);
  });

  it('creates a complete zero-valued range', () => {
    const result = fillDailyVolume([], range);

    expect(result).toHaveLength(3);

    expect(
      result.every((point) => point.amountMinor === 0),
    ).toBe(true);
  });
});