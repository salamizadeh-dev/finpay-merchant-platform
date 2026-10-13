import styles from './AppShell.module.css';

export function TopBar() {
  return (
    <header className={styles.topBar}>
      <div>
        <p className={styles.eyebrow}>MERCHANT WORKSPACE</p>
        <p className={styles.topBarTitle}>
          Payment Operations
        </p>
      </div>

      <span className={styles.environment}>
        Demo Environment
      </span>
    </header>
  );
}