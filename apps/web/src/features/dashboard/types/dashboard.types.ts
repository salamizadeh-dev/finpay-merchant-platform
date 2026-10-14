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