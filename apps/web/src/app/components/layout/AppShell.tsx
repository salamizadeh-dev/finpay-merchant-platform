import { Outlet } from 'react-router';

import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

import styles from './AppShell.module.css';

export function AppShell() {
  return (
    <div className={styles.shell}>
      <Sidebar />

      <div className={styles.content}>
        <TopBar />

        <main id="main-content" className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}