import type {
  PaymentTransaction,
  RefundRecord,
} from '../../../domain/payments/payment.types';

export const demoTransactions: PaymentTransaction[] = [
  {
    id: 'txn_1001',
    merchantId: 'merchant_01',
    amountMinor: 12500,
    currency: 'USD',
    status: 'succeeded',
    createdAt: '2026-10-08T10:00:00Z',
  },
  {
    id: 'txn_1002',
    merchantId: 'merchant_01',
    amountMinor: 8950,
    currency: 'USD',
    status: 'succeeded',
    createdAt: '2026-10-09T12:30:00Z',
  },
  {
    id: 'txn_1003',
    merchantId: 'merchant_01',
    amountMinor: 3400,
    currency: 'USD',
    status: 'failed',
    createdAt: '2026-10-10T09:15:00Z',
  },
  {
    id: 'txn_1004',
    merchantId: 'merchant_01',
    amountMinor: 21000,
    currency: 'USD',
    status: 'succeeded',
    createdAt: '2026-10-11T15:40:00Z',
  },
  {
    id: 'txn_1005',
    merchantId: 'merchant_01',
    amountMinor: 7500,
    currency: 'USD',
    status: 'pending',
    createdAt: '2026-10-12T08:20:00Z',
  },
  {
    id: 'txn_1006',
    merchantId: 'merchant_01',
    amountMinor: 3000,
    currency: 'USD',
    status: 'failed',
    createdAt: '2026-10-13T11:10:00Z',
  },
];

export const demoRefunds: RefundRecord[] = [
  {
    id: 'ref_1001',
    transactionId: 'txn_1001',
    merchantId: 'merchant_01',
    amountMinor: 2000,
    currency: 'USD',
    status: 'succeeded',
    createdAt: '2026-10-12T14:00:00Z',
  },
  {
    id: 'ref_1002',
    transactionId: 'txn_1002',
    merchantId: 'merchant_01',
    amountMinor: 1500,
    currency: 'USD',
    status: 'pending',
    createdAt: '2026-10-13T15:00:00Z',
  },
];