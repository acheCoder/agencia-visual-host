import { motion, type Variants } from 'framer-motion';
import './PortalHub.scss';

import axiomIcon from '../../assets/axiom.png';
import fitnessIcon from '../../assets/fitness.png';
import portfolioIcon from '../../assets/porfolio.png';

const EXTERNAL_URLS = {
  portfolio: 'https://hubertchim-porfolio.vercel.app',
  agencia: 'https://axiom-agencia.vercel.app',
  fitness: 'https://hubert-fitness-remote.vercel.app',
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
};

const cardHoverAxiom = {
  scale: 1.02,
  borderColor: 'rgba(0, 223, 154, 0.5)',
  boxShadow: '0 0 30px rgba(0, 223, 154, 0.15), inset 0 0 20px rgba(0, 223, 154, 0.03)',
};

const cardHoverFit = {
  scale: 1.02,
  borderColor: 'rgba(255, 145, 77, 0.5)',
  boxShadow: '0 0 30px rgba(255, 145, 77, 0.15), inset 0 0 20px rgba(255, 145, 77, 0.03)',
};

const cardHoverPortfolio = {
  scale: 1.02,
  borderColor: 'rgba(139, 92, 246, 0.5)',
  boxShadow: '0 0 30px rgba(139, 92, 246, 0.15), inset 0 0 20px rgba(139, 92, 246, 0.03)',
};

// ─── Iconos (PNG desde assets) ────────────────────────────────────────────────
function IconAxiom() {
  return <img src={axiomIcon} alt="Axiom" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
}

function IconFitness() {
  return <img src={fitnessIcon} alt="HubertFit" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
}

function IconPortfolio() {
  return <img src={portfolioIcon} alt="Portfolio" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
}

function IconProfile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" />
    </svg>
  );
}

export default function PortalHub() {
  return (
    <div className="portal-hub">
      {/* Orbe de luz difuminado */}
      <div className="portal-hub__orb" aria-hidden="true" />

      <motion.div
        className="portal-hub__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header / Perfil */}
        <motion.header className="portal-hub__header" variants={itemVariants}>
          <div className="portal-hub__avatar" aria-hidden="true">
            <IconProfile />
          </div>
          <h1 className="portal-hub__name">Hubert</h1>
          <p className="portal-hub__bio">
            Ingeniería Frontend & High-Performance Coaching
          </p>
        </motion.header>

        {/* Tarjetas */}
        <div className="portal-hub__cards">
          {/* Portfolio */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={cardHoverPortfolio}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <a
                href={EXTERNAL_URLS.portfolio}
                className="portal-hub__card portal-hub__card--portfolio"
                aria-label="Ir a Portfolio — Proyectos y Trabajo Personal"
              >
                <div className="portal-hub__card-icon portal-hub__card-icon--portfolio">
                  <IconPortfolio />
                </div>
                <div className="portal-hub__card-text">
                  <h2 className="portal-hub__card-title">Portfolio</h2>
                  <p className="portal-hub__card-subtitle">
                    Proyectos y Trabajo Personal
                  </p>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Axiom */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={cardHoverAxiom}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <a
                href={EXTERNAL_URLS.agencia}
                className="portal-hub__card portal-hub__card--axiom"
                aria-label="Ir a Axiom — Desarrollo y Diseño Premium B2B"
              >
                <div className="portal-hub__card-icon portal-hub__card-icon--axiom">
                  <IconAxiom />
                </div>
                <div className="portal-hub__card-text">
                  <h2 className="portal-hub__card-title">Axiom</h2>
                  <p className="portal-hub__card-subtitle">
                    Desarrollo y Diseño Premium B2B
                  </p>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* HubertFit */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={cardHoverFit}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <a
                href={EXTERNAL_URLS.fitness}
                className="portal-hub__card portal-hub__card--hubertfit"
                aria-label="Ir a HubertFit — Transformación Física de Alto Rendimiento"
              >
                <div className="portal-hub__card-icon portal-hub__card-icon--hubertfit">
                  <IconFitness />
                </div>
                <div className="portal-hub__card-text">
                  <h2 className="portal-hub__card-title">HubertFit</h2>
                  <p className="portal-hub__card-subtitle">
                    Transformación Física de Alto Rendimiento
                  </p>
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p className="portal-hub__footer" variants={itemVariants}>
          Toca una tarjeta para continuar
        </motion.p>
      </motion.div>
    </div>
  );
}
