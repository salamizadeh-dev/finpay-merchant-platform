import type { ReactNode } from 'react';

import { KpiCard } from '../components/KpiCard';
import { PaymentStatusChart } from '../components/PaymentStatusChart';
import { RecentTransactions } from '../components/RecentTransactions';
import { TransactionVolumeChart } from '../components/TransactionVolumeChart';

import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import { useDashboardActivity } from '../hooks/useDashboardActivity';

import { formatUsdMinor } from '../utils/formatUsdMinor';

import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const metricsQuery = useDashboardMetrics();
  const activityQuery = useDashboardActivity();

  let content: ReactNode;

  if (metricsQuery.isPending || activityQuery.isPending) {
    content = (
      <p role="status" className={styles.message}>
        Loading dashboard...
      </p>
    );
  } else if (metricsQuery.isError || activityQuery.isError) {
    content = (
      <div role="alert" className={styles.message}>
        <p>Unable to load dashboard information.</p>

        <button
          type="button"
          className={styles.retryButton}
          onClick={() => {
            void metricsQuery.refetch();
            void activityQuery.refetch();
          }}
        >
          Try again
        </button>
      </div>
    );
  } else if (
    !metricsQuery.data ||
    !activityQuery.data ||
    metricsQuery.data.totalPayments === 0
  ) {
    content = (
      <div className={styles.message}>
        <h2>No payment activity yet</h2>
        <p>
          Payment metrics will appear when transaction
          data becomes available.
        </p>
      </div>
    );
  } else {
    const metrics = metricsQuery.data;
    const activity = activityQuery.data;

    const kpis = [
      {
        label: 'Processed Volume',
        value: formatUsdMinor(metrics.grossProcessedVolumeMinor),
      },
      {
        label: 'Net Processed Volume',
        value: formatUsdMinor(metrics.netProcessedVolumeMinor),
      },
      {
        label: 'Refunded Volume',
        value: formatUsdMinor(metrics.refundedVolumeMinor),
      },
      {
        label: 'Success Rate',
        value:
          metrics.successRatePercent === null
            ? 'N/A'
            : `${metrics.successRatePercent.toFixed(1)}%`,
      },
      {
        label: 'Total Payments',
        value: metrics.totalPayments.toLocaleString('en-US'),
      },
      {
        label: 'Successful Payments',
        value: metrics.successfulPayments.toLocaleString('en-US'),
      },
      {
        label: 'Failed Payments',
        value: metrics.failedPayments.toLocaleString('en-US'),
      },
      {
        label: 'Pending Payments',
        value: metrics.pendingPayments.toLocaleString('en-US'),
      },
    ];

    content = (
      <>
        <dl className={styles.metricsGrid}>
          {kpis.map((kpi) => (
            <KpiCard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
            />
          ))}
        </dl>

        <div className={styles.chartsGrid}>
          <TransactionVolumeChart
            points={activity.dailyVolume}
          />

          <PaymentStatusChart metrics={metrics} />
        </div>

        <RecentTransactions
          transactions={activity.recentTransactions}
        />
      </>
    );
  }

  return (
    <section
      className={styles.dashboard}
      aria-labelledby="dashboard-title"
    >
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>
            PAYMENT OPERATIONS
          </p>

          <h1 id="dashboard-title">Dashboard</h1>

          <p className={styles.description}>
            Overview of merchant payment activity.
          </p>
        </div>

        <span className={styles.demoBadge}>
          Demo Data · USD
        </span>
      </header>

      {content}
    </section>
  );
}