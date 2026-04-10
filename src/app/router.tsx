import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LoadingRemote from '../components/layout/LoadingRemote';

/**
 * IMPORTACIONES DINÁMICAS (Lazy Loading)
 * Usamos React.lazy para que el navegador solo descargue el código de la 
 * sección que el usuario visite, optimizando la carga inicial.
 */

// eslint-disable-next-line react-refresh/only-export-components
const PortfolioApp = React.lazy(() => import('portfolio_remote/PortfolioApp'));

// eslint-disable-next-line react-refresh/only-export-components
const AgenciaApp = React.lazy(() => import('agencia_remote/AgenciaApp'));

// eslint-disable-next-line react-refresh/only-export-components
const FitnessApp = React.lazy(() => import('fitness_remote/FitnessApp'));

/**
 * CONFIGURACIÓN DE RUTAS
 * El Host decide qué 'Remote' inyectar en el 'Outlet' del MainLayout.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Redirección inicial
      { index: true, element: <Navigate to="/portfolio" replace /> },
      
      // Ruta: Mi Porfolio (Puerto 5001)
      { 
        path: 'portfolio', 
        element: (
          <Suspense fallback={<LoadingRemote />}>
            <PortfolioApp />
          </Suspense>
        ) 
      },

      // Ruta: Agencia B2B (Puerto 5002)
      { 
        path: 'agencia', 
        element: (
          <Suspense fallback={<LoadingRemote />}>
            <AgenciaApp />
          </Suspense>
        ) 
      },

      // Ruta: Entrenamiento Personal (Puerto 5003)
      { 
        path: 'fitness', 
        element: (
          <Suspense fallback={<LoadingRemote />}>
            <FitnessApp />
          </Suspense>
        ) 
      },
    ],
  },
]);