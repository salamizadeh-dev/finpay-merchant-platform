import type { PaymentTransaction } from '../../../domain/payments/payment.types';

export interface DashboardMetrics {
  totalPayments: number;

  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;

  successRatePercent: number | null;

  grossProcessedVolumeMinor: number;
  refundedVolumeMinor: number;
  netProcessedVolumeMinor: number;
}

export interface DailyVolumePoint {
  date: string;
  amountMinor: number;
}

export interface DashboardActivity {
  dailyVolume: DailyVolumePoint[];
  recentTransactions: PaymentTransaction[];
}