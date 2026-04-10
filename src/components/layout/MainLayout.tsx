import { Outlet } from 'react-router-dom';
import Navbar from '../../common-submodule/src/components/Navbar/Navbar';
import Sidebar from './Sidebar';

const hostLinks = [
  { label: 'Panel de Control', href: '/' },
  { label: 'Configuración', href: '/settings' },
];

export default function MainLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <Navbar links={hostLinks} />
        <main style={{ flex: 1, paddingTop: '100px', padding: '100px 2rem 2rem 2rem', overflowY: 'auto' }}>
          {/* Aquí se inyectará el contenido dinámico según la URL */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}