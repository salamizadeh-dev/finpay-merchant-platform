export const ROUTE_PATHS = {
  dashboard: '/',
  transactions: '/transactions',
  transactionDetails: '/transactions/:transactionId',
  refunds: '/refunds',
  settlements: '/settlements',
  merchants: '/merchants',
  monitoring: '/monitoring',
  users: '/users',
  settings: '/settings',
} as const;

export const buildRoute = {
  transactionDetails: (transactionId: string) =>
    `/transactions/${transactionId}`,
};