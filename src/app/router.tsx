import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LoadingRemote from '../components/layout/LoadingRemote';
import { RemoteErrorBoundary } from '../components/layout/RemoteErrorBoundary';
import HomePage from '../components/HomePage';

// eslint-disable-next-line react-refresh/only-export-components
const PortfolioApp = React.lazy(() => import('portfolio_remote/PortfolioApp'));

export const router = createBrowserRouter([
  // Landing page — pantalla de inicio sin layout
  {
    path: '/',
    element: <HomePage />,
  },
  // Microfrontends con layout (sidebar + navbar)
  {
    element: <MainLayout />,
    children: [
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