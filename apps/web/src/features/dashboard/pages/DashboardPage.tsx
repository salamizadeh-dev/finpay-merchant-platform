import type { ReactNode } from 'react';

import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import { formatUsdMinor } from '../utils/formatUsdMinor';

import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const {
    data,
    isPending,
    isError,
    refetch,
  } = useDashboardMetrics();

  let content: ReactNode;

  if (isPending) {
    content = (
      <p role="status" className={styles.message}>
        Loading dashboard metrics...
      </p>
    );
  } else if (isError && !data) {
    content = (
      <div role="alert" className={styles.message}>
        <p>Unable to load dashboard metrics.</p>

        <button
          type="button"
          className={styles.retryButton}
          onClick={() => void refetch()}
        >
          Try again
        </button>
      </div>
    );
  } else if (!data || data.totalPayments === 0) {
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
    const metrics = [
      {
        label: 'Processed Volume',
        value: formatUsdMinor(
          data.grossProcessedVolumeMinor,
        ),
      },
      {
        label: 'Net Processed Volume',
        value: formatUsdMinor(
          data.netProcessedVolumeMinor,
        ),
      },
      {
        label: 'Refunded Volume',
        value: formatUsdMinor(
          data.refundedVolumeMinor,
        ),
      },
      {
        label: 'Success Rate',
        value:
          data.successRatePercent === null
            ? 'N/A'
            : `${data.successRatePercent.toFixed(1)}%`,
      },
      {
        label: 'Total Payments',
        value: data.totalPayments.toLocaleString('en-US'),
      },
      {
        label: 'Successful Payments',
        value: data.successfulPayments.toLocaleString('en-US'),
      },
      {
        label: 'Failed Payments',
        value: data.failedPayments.toLocaleString('en-US'),
      },
      {
        label: 'Pending Payments',
        value: data.pendingPayments.toLocaleString('en-US'),
      },
    ];

    content = (
      <dl className={styles.metricsGrid}>
        {metrics.map((metric) => (
          <div key={metric.label} className={styles.metricCard}>
            <dt className={styles.metricLabel}>
              {metric.label}
            </dt>

            <dd className={styles.metricValue}>
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <section
      aria-labelledby="dashboard-title"
      className={styles.dashboard}
    >
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>
            PAYMENT OPERATIONS
          </p>

          <h1 id="dashboard-title">
            Dashboard
          </h1>

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