export type CurrencyCode = 'USD';

export type PaymentStatus =
  | 'succeeded'
  | 'failed'
  | 'pending';

export type RefundStatus =
  | 'succeeded'
  | 'failed'
  | 'pending';

export interface PaymentTransaction {
  id: string;
  merchantId: string;
  amountMinor: number;
  currency: CurrencyCode;
  status: PaymentStatus;
  createdAt: string;
}

export interface RefundRecord {
  id: string;
  transactionId: string;
  merchantId: string;
  amountMinor: number;
  currency: CurrencyCode;
  status: RefundStatus;
  createdAt: string;
}