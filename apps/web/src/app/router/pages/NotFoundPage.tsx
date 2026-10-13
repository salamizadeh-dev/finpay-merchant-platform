import { Link } from 'react-router';

import { ROUTE_PATHS } from '../routes';

export function NotFoundPage() {
  return (
    <section aria-labelledby="not-found-title">
      <h1 id="not-found-title">Page not found</h1>
      <p>The requested page could not be found.</p>

      <Link to={ROUTE_PATHS.dashboard}>
        Return to dashboard
      </Link>
    </section>
  );
}