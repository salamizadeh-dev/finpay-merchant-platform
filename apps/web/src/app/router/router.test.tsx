import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithDataRouter } from '../../test/renderWithProviders';

import {
  createMemoryRouter
} from 'react-router';

import { describe, expect, it } from 'vitest';

import { appRoutes } from './routeConfig';

function renderAppAt(path: string) {
  const router = createMemoryRouter(appRoutes, {
    initialEntries: [path],
  });

  const user = userEvent.setup();

  renderWithDataRouter(router);

  return { user };
}

describe('FinPay application routing', () => {
  it('renders the dashboard at the root route', async () => {
    renderAppAt('/');

    expect(
      await screen.findByRole('heading', {
        name: 'Dashboard',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('navigation', {
        name: 'Main navigation',
      }),
    ).toBeInTheDocument();
  });

  it('renders the transactions route with active navigation', async () => {
    renderAppAt('/transactions');

    expect(
      await screen.findByRole('heading', {
        name: 'Transactions',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: 'Transactions',
      }),
    ).toHaveAttribute('aria-current', 'page');
  });

  it('navigates between pages without removing the layout', async () => {
    const { user } = renderAppAt('/');

    const navigation = await screen.findByRole('navigation', {
      name: 'Main navigation',
    });

    await user.click(
      screen.getByRole('link', {
        name: 'Refunds',
      }),
    );

    expect(
      await screen.findByRole('heading', {
        name: 'Refunds',
      }),
    ).toBeInTheDocument();

    expect(navigation).toBeInTheDocument();

    expect(
      screen.getByText('Payment Operations'),
    ).toBeInTheDocument();
  });

  it('renders transaction details for a dynamic route', async () => {
    renderAppAt('/transactions/txn_12345');

    expect(
      await screen.findByRole('heading', {
        name: 'Transaction Details',
      }),
    ).toBeInTheDocument();
  });

  it('displays the 404 page for unknown routes', async () => {
    const { user } = renderAppAt('/unknown-page');

    expect(
      await screen.findByRole('heading', {
        name: 'Page not found',
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('link', {
        name: 'Return to dashboard',
      }),
    );

    expect(
      await screen.findByRole('heading', {
        name: 'Dashboard',
      }),
    ).toBeInTheDocument();
  });
});