import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <Header />
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {/* Aquí se inyectará el contenido dinámico según la URL */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}