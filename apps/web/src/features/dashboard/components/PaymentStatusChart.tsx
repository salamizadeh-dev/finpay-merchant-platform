import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { DashboardMetrics } from '../types/dashboard.types';

import styles from './DashboardPanels.module.css';

interface PaymentStatusChartProps {
  metrics: DashboardMetrics;
}

export function PaymentStatusChart({
  metrics,
}: PaymentStatusChartProps) {
  const data = [
    {
      status: 'Succeeded',
      count: metrics.successfulPayments,
    },
    {
      status: 'Failed',
      count: metrics.failedPayments,
    },
    {
      status: 'Pending',
      count: metrics.pendingPayments,
    },
  ];

  return (
    <section
      className={styles.panel}
      aria-labelledby="payment-status-title"
    >
      <h2 id="payment-status-title">
        Payment Status Distribution
      </h2>

      <p className={styles.panelDescription}>
        Number of transactions by payment status.
      </p>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="status" />

            <YAxis
              allowDecimals={false}
              width={35}
            />

            <Tooltip />

            <Bar
              dataKey="count"
              name="Payments"
              fill="var(--color-primary)"
              radius={[5, 5, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className={styles.panelDescription}>
        Succeeded: {metrics.successfulPayments} ·
        Failed: {metrics.failedPayments} ·
        Pending: {metrics.pendingPayments}
      </p>
    </section>
  );
}