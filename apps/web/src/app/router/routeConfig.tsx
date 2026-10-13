import type { RouteObject } from 'react-router';

import { AppShell } from '../components/layout/AppShell';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RouteErrorPage } from './pages/RouteErrorPage';

import { ROUTE_PATHS } from './routes';

export const appRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.dashboard,
    element: <AppShell />,
    errorElement: <RouteErrorPage />,

    children: [
      {
        index: true,
        element: <PlaceholderPage title="Dashboard" />,
      },
      {
        path: ROUTE_PATHS.transactions,
        element: <PlaceholderPage title="Transactions" />,
      },
      {
        path: ROUTE_PATHS.transactionDetails,
        element: <PlaceholderPage title="Transaction Details" />,
      },
      {
        path: ROUTE_PATHS.refunds,
        element: <PlaceholderPage title="Refunds" />,
      },
      {
        path: ROUTE_PATHS.settlements,
        element: <PlaceholderPage title="Settlements" />,
      },
      {
        path: ROUTE_PATHS.merchants,
        element: <PlaceholderPage title="Merchants" />,
      },
      {
        path: ROUTE_PATHS.monitoring,
        element: <PlaceholderPage title="Monitoring" />,
      },
      {
        path: ROUTE_PATHS.users,
        element: <PlaceholderPage title="Users" />,
      },
      {
        path: ROUTE_PATHS.settings,
        element: <PlaceholderPage title="Settings" />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];