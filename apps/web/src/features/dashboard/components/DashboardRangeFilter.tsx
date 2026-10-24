import type {
  DashboardPeriod,
} from '../types/dashboard.types';

import styles from './DashboardPanels.module.css';

interface DashboardRangeFilterProps {
  value: DashboardPeriod;
  onChange: (period: DashboardPeriod) => void;
}

export function DashboardRangeFilter({
  value,
  onChange,
}: DashboardRangeFilterProps) {
  return (
    <div className={styles.rangeFilter}>
      <label
        htmlFor="dashboard-reporting-period"
        className={styles.filterLabel}
      >
        Reporting period
      </label>

      <select
        id="dashboard-reporting-period"
        className={styles.filterSelect}
        value={value}
        onChange={(event) =>
          onChange(event.target.value as DashboardPeriod)
        }
      >
        <option value="all">All demo data</option>
        <option value="last5">Last 5 days</option>
        <option value="last3">Last 3 days</option>
      </select>
    </div>
  );
}