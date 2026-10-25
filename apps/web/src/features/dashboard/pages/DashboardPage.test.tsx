import { beforeEach, describe, expect, it, vi } from 'vitest';

import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test/renderWithProviders';

import type { DashboardMetrics } from '../types/dashboard.types';

import { getDashboardMetrics } from '../api/getDashboardMetrics';
import { DashboardPage } from './DashboardPage';

vi.mock('../components/TransactionVolumeChart', () => ({
  TransactionVolumeChart: () => (
    <div data-testid="transaction-volume-chart" />
  ),
}));

vi.mock('../components/PaymentStatusChart', () => ({
  PaymentStatusChart: () => (
    <div data-testid="payment-status-chart" />
  ),
}));

vi.mock(
  '../../features/dashboard/components/TransactionVolumeChart',
  () => ({
    TransactionVolumeChart: () => (
      <div data-testid="transaction-volume-chart" />
    ),
  }),
);

vi.mock(
  '../../features/dashboard/components/PaymentStatusChart',
  () => ({
    PaymentStatusChart: () => (
      <div data-testid="payment-status-chart" />
    ),
  }),
);

vi.mock('../api/getDashboardMetrics', () => ({
  getDashboardMetrics: vi.fn(),
}));

const mockedGetDashboardMetrics = vi.mocked(
  getDashboardMetrics,
);

const sampleMetrics: DashboardMetrics = {
  totalPayments: 6,
  successfulPayments: 3,
  failedPayments: 2,
  pendingPayments: 1,
  successRatePercent: 60,
  grossProcessedVolumeMinor: 42450,
  refundedVolumeMinor: 2000,
  netProcessedVolumeMinor: 40450,
};

function renderDashboard() {
  return renderWithProviders(<DashboardPage />);
}

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders calculated payment metrics', async () => {
    mockedGetDashboardMetrics.mockResolvedValue(sampleMetrics);

    renderDashboard();

    expect(
      await screen.findByText('$424.50'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('$404.50'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('60.0%'),
    ).toBeInTheDocument();
  });

  it('shows an empty state when no payments exist', async () => {
    mockedGetDashboardMetrics.mockResolvedValue({
      totalPayments: 0,
      successfulPayments: 0,
      failedPayments: 0,
      pendingPayments: 0,
      successRatePercent: null,
      grossProcessedVolumeMinor: 0,
      refundedVolumeMinor: 0,
      netProcessedVolumeMinor: 0,
    });

    renderDashboard();

    expect(
      await screen.findByText('No payment activity in this period'),
    ).toBeInTheDocument();
  });

  it('displays a safe error message', async () => {
    mockedGetDashboardMetrics.mockRejectedValue(
      new Error('Internal service failure'),
    );

    renderDashboard();

    expect(
      await screen.findByRole('alert'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Internal service failure'),
    ).not.toBeInTheDocument();
  });

  it('retries loading after a failed request', async () => {
    mockedGetDashboardMetrics
      .mockRejectedValueOnce(new Error('Temporary failure'))
      .mockResolvedValueOnce(sampleMetrics);

    const user = userEvent.setup();

    renderDashboard();

    await screen.findByRole('alert');

    await user.click(
      screen.getByRole('button', {
        name: 'Try again',
      }),
    );

    expect(
      await screen.findByText('$424.50'),
    ).toBeInTheDocument();

    expect(
      mockedGetDashboardMetrics,
    ).toHaveBeenCalledTimes(2);
  });
});