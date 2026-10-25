import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { DailyVolumePoint } from '../types/dashboard.types';

import { formatUsdMinor } from '../utils/formatUsdMinor';

import styles from './DashboardPanels.module.css';

interface TransactionVolumeChartProps {
  points: DailyVolumePoint[];
}

export function TransactionVolumeChart({
  points,
}: TransactionVolumeChartProps) {
  return (
    <section
      className={styles.panel}
      aria-labelledby="transaction-volume-title"
    >
      <h2 id="transaction-volume-title">
        Transaction Volume
      </h2>

      <p className={styles.panelDescription}>
        Daily successful payment volume in USD.
      </p>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tickFormatter={(date: string) => date.slice(5)}
            />

            <YAxis
              tickFormatter={(value: number) =>
                `$${(value / 100).toFixed(0)}`
              }
              width={55}
            />

            <Tooltip
              formatter={(value) =>
                formatUsdMinor(Number(value))
              }
              labelFormatter={(value) => `UTC: ${String(value)}`}
            />

            <Area
              type="monotone"
              dataKey="amountMinor"
              name="Processed volume"
              stroke="var(--color-primary)"
              fill="var(--color-primary-soft)"
              strokeWidth={2}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}