import styles from './DashboardPanels.module.css';

interface KpiCardProps {
  label: string;
  value: string;
}

export function KpiCard({ label, value }: KpiCardProps) {
  return (
    <div className={styles.kpiCard}>
      <dt className={styles.kpiLabel}>{label}</dt>
      <dd className={styles.kpiValue}>{value}</dd>
    </div>
  );
}