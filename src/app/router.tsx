import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AgenciaPage from '../pages/AgenciaPage';
import FitnessPage from '../pages/FitnessPage';
import LoadingRemote from '../components/layout/LoadingRemote'; // Importación nueva

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
          <Suspense fallback={<LoadingRemote />}>
            <PortfolioApp />
          </Suspense>
        ) 
      },
      { path: 'agencia', element: <AgenciaPage /> },
      { path: 'fitness', element: <FitnessPage /> },
    ],
  },
]);