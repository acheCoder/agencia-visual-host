import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const navStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: 'none',
    color: 'var(--color-brand-text-inverse)',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
    transition: 'all 0.2s ease',
    fontWeight: isActive ? '600' : '400',
    borderLeft: isActive ? '4px solid var(--color-brand-primary)' : '4px solid transparent'
  });

  return (
    <aside style={{ width: 'var(--sidebar-width)', backgroundColor: 'var(--color-brand-sidebar)', color: 'var(--color-brand-text-inverse)', display: 'flex', flexDirection: 'column', boxShadow: '4px 0 10px rgba(0,0,0,0.1)' }}>
      <div style={{ padding: '2rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '1px' }}>HUBERT HUB</div>
        <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '4px', textTransform: 'uppercase' }}>Multi-Business Orchestrator</div>
      </div>
      
      <nav style={{ padding: '1.5rem 1rem', flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <li><NavLink to="/portfolio" style={navStyle}>💻 Mi Porfolio</NavLink></li>
          <li><NavLink to="/agencia" style={navStyle}>🚀 Agencia Web B2B</NavLink></li>
          <li><NavLink to="/fitness" style={navStyle}>💪 Entrenamiento Personal</NavLink></li>
        </ul>
      </nav>

      <div style={{ padding: '1.5rem', fontSize: '0.75rem', opacity: 0.4, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © 2026 Hubert Chim
      </div>
    </aside>
  );
}