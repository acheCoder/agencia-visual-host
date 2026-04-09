export default function Header() {
  return (
    <header style={{ 
      height: 'var(--header-height)', 
      backgroundColor: 'var(--color-surface)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      justifyContent: 'space-between'
    }}>
      <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 500 }}>Panel de Control Host</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--color-brand-primary)', fontWeight: 'bold' }}>👤 Admin</span>
      </div>
    </header>
  );
}