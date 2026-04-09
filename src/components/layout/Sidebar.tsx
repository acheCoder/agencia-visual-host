import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  // Función para darle estilo visual a la pestaña activa
  const navStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: 'none',
    color: 'var(--color-brand-text-inverse)',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    display: 'block',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    transition: 'background-color 0.2s',
    fontWeight: isActive ? 'bold' : 'normal'
  });

  return (
    <aside style={{ width: 'var(--sidebar-width)', backgroundColor: 'var(--color-brand-sidebar)', color: 'var(--color-brand-text-inverse)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.5rem', fontWeight: 'bold', fontSize: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        Agencia Visual
      </div>
      <nav style={{ padding: '1rem' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><NavLink to="/dashboard" style={navStyle}>🏠 Dashboard</NavLink></li>
          <li><NavLink to="/clientes" style={navStyle}>👥 Clientes</NavLink></li>
          <li><NavLink to="/facturacion" style={navStyle}>📄 Facturación</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
}