
import type { ReactElement, ReactNode } from 'react';

import {
  render,
  type RenderOptions,
} from '@testing-library/react';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from 'react-router';

interface TestRenderOptions
  extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
}

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

export function renderWithProviders(
  ui: ReactElement,
  {
    initialEntries = ['/'],
    ...renderOptions
  }: TestRenderOptions = {},
) {
  const queryClient = createTestQueryClient();

  function TestWrapper({
    children,
  }: {
    children: ReactNode;
  }) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          {children}
        </MemoryRouter>
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, {
      wrapper: TestWrapper,
      ...renderOptions,
    }),
    queryClient,
  };
}

export function renderWithDataRouter(
  router: ReturnType<typeof createMemoryRouter>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  const queryClient = createTestQueryClient();

  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      options,
    ),
    queryClient,
  };
}
