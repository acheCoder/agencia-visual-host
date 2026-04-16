import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoadingRemote from '../components/layout/LoadingRemote';
import { RemoteErrorBoundary } from '../components/layout/RemoteErrorBoundary';
import HomePage from '../components/HomePage';

// eslint-disable-next-line react-refresh/only-export-components
const PortfolioApp = React.lazy(() => import('portfolio_remote/PortfolioApp'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'portfolio',
    element: (
      <RemoteErrorBoundary remoteName="Portfolio">
        <Suspense fallback={<LoadingRemote />}>
          <PortfolioApp />
        </Suspense>
      </RemoteErrorBoundary>
    ),
  },
]);