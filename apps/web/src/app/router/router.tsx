import { createBrowserRouter } from 'react-router';

import { ROUTE_PATHS } from './routes';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { NotFoundPage } from './pages/NotFoundPage';


export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.dashboard,
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
]);