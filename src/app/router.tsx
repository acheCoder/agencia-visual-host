import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LoadingRemote from '../components/layout/LoadingRemote';
import { RemoteErrorBoundary } from '../components/layout/RemoteErrorBoundary';

// eslint-disable-next-line react-refresh/only-export-components
const PortfolioApp = React.lazy(() => import('portfolio_remote/PortfolioApp'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/portfolio" replace /> },
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
    ],
  },
]);