import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

// --- Placeholders Temporales ---
const Dashboard = () => (
  <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
    <h3>🏠 Panel Principal</h3><p>Bienvenido al orquestador Host.</p>
  </div>
);
const ClientesSlot = () => (
  <div style={{ backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '8px', border: '2px dashed #0284c7' }}>
    <h3 style={{ color: '#0369a1' }}>👥 Ranura: Microfrontal de Clientes</h3><p>Esperando conexión remota...</p>
  </div>
);
const FacturacionSlot = () => (
  <div style={{ backgroundColor: '#fef08a', padding: '2rem', borderRadius: '8px', border: '2px dashed #ca8a04' }}>
    <h3 style={{ color: '#a16207' }}>📄 Ranura: Microfrontal de Facturación</h3><p>Esperando conexión remota...</p>
  </div>
);

// --- Configuración de Rutas ---
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // El Layout envuelve todas las rutas hijas
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> }, // Redirección por defecto
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'clientes', element: <ClientesSlot /> },
      { path: 'facturacion', element: <FacturacionSlot /> },
    ],
  },
]);