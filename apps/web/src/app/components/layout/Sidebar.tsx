import { NavLink } from 'react-router';

import { ROUTE_PATHS } from '../../router/routes';

import styles from './AppShell.module.css';

const navigationItems = [
  { label: 'Dashboard', to: ROUTE_PATHS.dashboard },
  { label: 'Transactions', to: ROUTE_PATHS.transactions },
  { label: 'Refunds', to: ROUTE_PATHS.refunds },
  { label: 'Settlements', to: ROUTE_PATHS.settlements },
  { label: 'Merchants', to: ROUTE_PATHS.merchants },
  { label: 'Monitoring', to: ROUTE_PATHS.monitoring },
  { label: 'Users', to: ROUTE_PATHS.users },
  { label: 'Settings', to: ROUTE_PATHS.settings },
];

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandMark} aria-hidden="true">
          F
        </span>

        <div>
          <p className={styles.brandName}>FinPay</p>
          <p className={styles.brandSubtitle}>Merchant Platform</p>
        </div>
      </div>

      <nav
        className={styles.navigation}
        aria-label="Main navigation"
      >
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === ROUTE_PATHS.dashboard}
            className={({ isActive }) =>
              [
                styles.navLink,
                isActive ? styles.navLinkActive : '',
              ]
                .filter(Boolean)
                .join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}