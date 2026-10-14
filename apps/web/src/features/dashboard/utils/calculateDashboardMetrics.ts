import type {
  PaymentTransaction,
  RefundRecord,
} from '../../../domain/payments/payment.types.ts';

import type {
  DashboardMetrics,
} from '../types/dashboard.types';

export function calculateDashboardMetrics(
  transactions: readonly PaymentTransaction[],
  refunds: readonly RefundRecord[],
): DashboardMetrics {
  const successfulTransactions = transactions.filter(
    (transaction) => transaction.status === 'succeeded',
  );

  const failedTransactions = transactions.filter(
    (transaction) => transaction.status === 'failed',
  );

  const pendingTransactions = transactions.filter(
    (transaction) => transaction.status === 'pending',
  );

  const grossProcessedVolumeMinor =
    successfulTransactions.reduce(
      (total, transaction) => total + transaction.amountMinor,
      0,
    );

  const refundedVolumeMinor = refunds
    .filter((refund) => refund.status === 'succeeded')
    .reduce(
      (total, refund) => total + refund.amountMinor,
      0,
    );

  const completedPayments =
    successfulTransactions.length + failedTransactions.length;

  const successRatePercent =
    completedPayments === 0
      ? null
      : Math.round(
          (successfulTransactions.length / completedPayments) * 1000,
        ) / 10;

  return {
    totalPayments: transactions.length,
    successfulPayments: successfulTransactions.length,
    failedPayments: failedTransactions.length,
    pendingPayments: pendingTransactions.length,
    successRatePercent,
    grossProcessedVolumeMinor,
    refundedVolumeMinor,
    netProcessedVolumeMinor:
      grossProcessedVolumeMinor - refundedVolumeMinor,
  };
}