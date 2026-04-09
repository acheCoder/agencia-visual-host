import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

// --- Placeholders Tematizados ---
const Portfolio = () => (
  <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
    <h1 style={{ color: 'var(--color-brand-primary)' }}>💻 Mi Porfolio de Desarrollador</h1>
    <p>Aquí se cargará tu historial de proyectos, stack tecnológico y experiencia profesional.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
      {[1, 2, 3].map(i => <div key={i} style={{ height: '100px', backgroundColor: '#eee', borderRadius: '8px' }}></div>)}
    </div>
  </div>
);

const Agencia = () => (
  <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
    <h1 style={{ color: '#059669' }}>🚀 Agencia de Desarrollo B2B</h1>
    <p>Sección dedicada a la venta de servicios web para pequeños negocios y digitalización.</p>
    <div style={{ padding: '2rem', backgroundColor: '#ecfdf5', borderRadius: '12px', marginTop: '2rem', border: '1px solid #10b981' }}>
      <h3>Servicio Destacado: Pack Digital Start-up</h3>
    </div>
  </div>
);

const Fitness = () => (
  <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
    <h1 style={{ color: '#dc2626' }}>💪 Hubert Personal Trainer</h1>
    <p>Tu plataforma de servicios de fitness, nutrición y seguimiento de clientes.</p>
    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
      <div style={{ flex: 1, padding: '1.5rem', backgroundColor: '#fef2f2', border: '1px solid #f87171', borderRadius: '8px' }}>Planes Online</div>
      <div style={{ flex: 1, padding: '1.5rem', backgroundColor: '#fef2f2', border: '1px solid #f87171', borderRadius: '8px' }}>Rutinas</div>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/portfolio" replace /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'agencia', element: <Agencia /> },
      { path: 'fitness', element: <Fitness /> },
    ],
  },
]);