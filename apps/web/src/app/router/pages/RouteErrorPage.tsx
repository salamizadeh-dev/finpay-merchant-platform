import {
  Link,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router';

import { ROUTE_PATHS } from '../routes';

export function RouteErrorPage() {
  const error = useRouteError();

  const isNotFound =
    isRouteErrorResponse(error) && error.status === 404;

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
      }}
    >
      <div role="alert">
        <p>FINPAY — ERROR</p>

        <h1>
          {isNotFound
            ? 'Page not found'
            : 'Unable to load this page'}
        </h1>

        <p>
          {isNotFound
            ? 'The requested resource could not be found.'
            : 'An unexpected error occurred. Please try again.'}
        </p>

        <Link to={ROUTE_PATHS.dashboard}>
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}