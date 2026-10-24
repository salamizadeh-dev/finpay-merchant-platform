import { useState, type ReactNode } from 'react';

import { KpiCard } from '../components/KpiCard';
import { DashboardRangeFilter } from '../components/DashboardRangeFilter';
import { PaymentStatusChart } from '../components/PaymentStatusChart';
import { RecentTransactions } from '../components/RecentTransactions';
import { TransactionVolumeChart } from '../components/TransactionVolumeChart';

import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import { useDashboardActivity } from '../hooks/useDashboardActivity';

import type {
  DashboardPeriod,
} from '../types/dashboard.types';

import {
  DEMO_REPORT_AS_OF_DATE,
  getDashboardDateRange,
} from '../utils/dashboardDateRange';

import { formatUsdMinor } from '../utils/formatUsdMinor';

import styles from './DashboardPage.module.css';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatUtcDay(date: string) {
  return dateFormatter.format(
    new Date(`${date}T00:00:00.000Z`),
  );
}

export function DashboardPage() {
  const [period, setPeriod] = useState<DashboardPeriod>('all');

  const range = getDashboardDateRange(period);

  const metricsQuery = useDashboardMetrics(range);
  const activityQuery = useDashboardActivity(range);

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
    (
      metricsQuery.data.totalPayments === 0 &&
      metricsQuery.data.refundedVolumeMinor === 0
    )
  ) {
    content = (
      <div className={styles.message}>
        <h2>No payment activity in this period</h2>

        <p>
          Select a different reporting period to view
          available payment activity.
        </p>
      </div>
    );
  } else {
    const metrics = metricsQuery.data;
    const activity = activityQuery.data;

    const kpis = [
      {
        label: 'Processed Volume',
        value: formatUsdMinor(
          metrics.grossProcessedVolumeMinor,
        ),
      },
      {
        label: 'Net Processed Volume',
        value: formatUsdMinor(
          metrics.netProcessedVolumeMinor,
        ),
      },
      {
        label: 'Refunded Volume',
        value: formatUsdMinor(
          metrics.refundedVolumeMinor,
        ),
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
        <div className={styles.headingText}>
          <p className={styles.eyebrow}>
            FINPAY / PAYMENT OPERATIONS
          </p>

          <h1 id="dashboard-title">
            Merchant Dashboard
          </h1>

          <p className={styles.description}>
            Monitor payment performance, transaction
            activity, and refund volume.
          </p>
        </div>

        <div className={styles.headerControls}>
          <DashboardRangeFilter
            value={period}
            onChange={setPeriod}
          />

          <span className={styles.demoBadge}>
            DEMO · USD
          </span>
        </div>
      </header>

      <div className={styles.reportingInfo}>
        <span className={styles.reportingDot} aria-hidden="true" />

        <span>
          Reporting period (UTC):{' '}
          <strong>
            {formatUtcDay(range.startDate)}
            {' — '}
            {formatUtcDay(range.endDate)}
          </strong>
        </span>

        <span className={styles.snapshotLabel}>
          Demo snapshot as of{' '}
          {formatUtcDay(DEMO_REPORT_AS_OF_DATE)}
        </span>
      </div>

      {content}
    </section>
  );
}