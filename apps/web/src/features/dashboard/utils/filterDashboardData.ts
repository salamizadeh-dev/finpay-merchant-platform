import type {
  PaymentTransaction,
  RefundRecord,
} from '../../../domain/payments/payment.types';

import type {
  DashboardDateRange,
} from '../types/dashboard.types';

function isWithinRange(
  timestamp: string,
  range: DashboardDateRange,
): boolean {
  const date = timestamp.slice(0, 10);

  return date >= range.startDate && date <= range.endDate;
}

export function filterDashboardData(
  transactions: readonly PaymentTransaction[],
  refunds: readonly RefundRecord[],
  range: DashboardDateRange,
) {
  return {
    transactions: transactions.filter((transaction) =>
      isWithinRange(transaction.createdAt, range),
    ),

    refunds: refunds.filter((refund) =>
      isWithinRange(refund.createdAt, range),
    ),
  };
}