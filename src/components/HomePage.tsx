import { useNavigate } from 'react-router-dom';

const projects = [
  {
    label: '💼 Ver Portfolio',
    path: '/portfolio',
    description: 'Mi trabajo y proyectos personales',
  },
  {
    label: '🚀 Ver Agencia',
    path: '/agencia',
    description: 'Soluciones digitales para empresas',
  },
  {
    label: '💪 Ver Web Entrenador',
    path: '/fitness',
    description: 'Entrenamiento personal online',
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Círculo gradiente de fondo */}
      <div style={styles.glowOrb} />

      <div style={styles.content}>
        <h1 style={styles.title}>¿Qué quieres hacer hoy?</h1>
        <p style={styles.subtitle}>Selecciona un proyecto para explorar</p>

        <div style={styles.buttonGroup}>
          {projects.map((project) => (
            <button
              key={project.path}
              onClick={() => navigate(project.path)}
              style={styles.button}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.buttonHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, styles.button);
              }}
            >
              <span style={styles.buttonLabel}>{project.label}</span>
              <span style={styles.buttonDesc}>{project.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100vw',
    background: '#0a0a0a',
    overflow: 'hidden',
  },
  glowOrb: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,145,77,0.35) 0%, rgba(255,100,20,0.12) 40%, transparent 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    filter: 'blur(40px)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  title: {
    fontSize: '2.4rem',
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
    textAlign: 'center',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '1.05rem',
    color: 'rgba(255,255,255,0.45)',
    margin: '0 0 28px 0',
    fontWeight: 400,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '340px',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '18px 24px',
    borderRadius: '16px',
    border: '1px solid rgba(255,145,77,0.25)',
    background: 'rgba(255,255,255,0.04)',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.25s ease',
    backdropFilter: 'blur(8px)',
  },
  buttonHover: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '18px 24px',
    borderRadius: '16px',
    border: '1px solid rgba(255,145,77,0.6)',
    background: 'rgba(255,145,77,0.12)',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.25s ease',
    backdropFilter: 'blur(8px)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px rgba(255,145,77,0.15)',
  },
  buttonLabel: {
    fontSize: '1.15rem',
    fontWeight: 600,
  },
  buttonDesc: {
    fontSize: '0.82rem',
    color: 'rgba(255,255,255,0.4)',
    fontWeight: 400,
  },
};
