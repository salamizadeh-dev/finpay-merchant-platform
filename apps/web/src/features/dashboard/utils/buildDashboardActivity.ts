import type { PaymentTransaction } from '../../../domain/payments/payment.types';

import type { DashboardActivity } from '../types/dashboard.types';

export function buildDashboardActivity(
  transactions: readonly PaymentTransaction[],
): DashboardActivity {
  const dailyTotals = new Map<string, number>();

  for (const transaction of transactions) {
    const date = transaction.createdAt.slice(0, 10);

    const amount =
      transaction.status === 'succeeded'
        ? transaction.amountMinor
        : 0;

    dailyTotals.set(
      date,
      (dailyTotals.get(date) ?? 0) + amount,
    );
  }

  const dailyVolume = [...dailyTotals.entries()]
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, amountMinor]) => ({
      date,
      amountMinor,
    }));

  const recentTransactions = [...transactions]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return {
    dailyVolume,
    recentTransactions,
  };
}