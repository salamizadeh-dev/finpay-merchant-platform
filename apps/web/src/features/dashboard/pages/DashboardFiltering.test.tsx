import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  screen,
  waitFor,
  within,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import {
  renderWithProviders,
} from '../../../test/renderWithProviders';

import type {
  DailyVolumePoint,
} from '../types/dashboard.types';

import { DashboardPage } from './DashboardPage';

vi.mock('../components/TransactionVolumeChart', () => ({
  TransactionVolumeChart: ({
    points,
  }: {
    points: DailyVolumePoint[];
  }) => (
    <output data-testid="volume-points">
      {JSON.stringify(points)}
    </output>
  ),
}));

vi.mock('../components/PaymentStatusChart', () => ({
  PaymentStatusChart: () => (
    <div data-testid="payment-status-chart" />
  ),
}));

function expectProcessedVolume(value: string) {
  const label = screen.getByText('Processed Volume');
  const card = label.parentElement;

  if (!card) {
    throw new Error('KPI card not found');
  }

  expect(
    within(card).getByText(value),
  ).toBeInTheDocument();
}

describe('Dashboard period filtering', () => {
  it('updates KPIs, transactions, and chart data', async () => {
    const user = userEvent.setup();

    renderWithProviders(<DashboardPage />);

    await waitFor(() => {
      expectProcessedVolume('$424.50');
    });

    await user.selectOptions(
      screen.getByRole('combobox', {
        name: 'Reporting period',
      }),
      'last3',
    );

    await waitFor(() => {
      expectProcessedVolume('$210.00');
    });

    expect(
      screen.getByText('$190.00'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('50.0%'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: 'txn_1004',
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('link', {
        name: 'txn_1001',
      }),
    ).not.toBeInTheDocument();

    const points = JSON.parse(
      screen.getByTestId('volume-points').textContent ?? '[]',
    ) as DailyVolumePoint[];

    expect(points).toEqual([
      { date: '2026-10-11', amountMinor: 21000 },
      { date: '2026-10-12', amountMinor: 0 },
      { date: '2026-10-13', amountMinor: 0 },
    ]);
  });

  it('allows returning to the complete demo period', async () => {
    const user = userEvent.setup();

    renderWithProviders(<DashboardPage />);

    await waitFor(() => {
      expectProcessedVolume('$424.50');
    });

    const periodSelect = screen.getByRole('combobox', {
      name: 'Reporting period',
    });

    await user.selectOptions(periodSelect, 'last5');

    await waitFor(() => {
      expectProcessedVolume('$299.50');
    });

    await user.selectOptions(periodSelect, 'all');

    await waitFor(() => {
      expectProcessedVolume('$424.50');
    });
  });
});