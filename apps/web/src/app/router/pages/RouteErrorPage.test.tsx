import { render, screen } from '@testing-library/react';

import {
  createMemoryRouter,
  RouterProvider,
} from 'react-router';

import { describe, expect, it } from 'vitest';

import { RouteErrorPage } from './RouteErrorPage';

describe('RouteErrorPage', () => {
  it('shows a safe message when a route loader fails', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <p>Normal page</p>,
          errorElement: <RouteErrorPage />,
          loader: () => {
            throw new Response('Service unavailable', {
              status: 503,
              statusText: 'Service Unavailable',
            });
          },
        },
      ],
      {
        initialEntries: ['/'],
      },
    );

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', {
        name: 'Unable to load this page',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('alert'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Service unavailable'),
    ).not.toBeInTheDocument();
  });
});