import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';
import './OsDesktop.scss';
import RetroMinigame from '../RetroMinigame/RetroMinigame';
import Minesweeper from '../Minesweeper/Minesweeper';
import LockScreen from '../LockScreen/LockScreen';

import axiomIcon from '../../assets/axiom.png';
import fitnessIcon from '../../assets/fitness.png';
import portfolioIcon from '../../assets/porfolio.png';
import gamesFolderIcon from '../../assets/gamesFolder.png';
import logoApple from '../../assets/logoApple.png';

gsap.registerPlugin(Draggable);

// ─── External URLs ────────────────────────────────────────────────────────────
const EXTERNAL_URLS = {
  axiom: 'https://axiom-agencia.vercel.app',
  fitness: 'https://hubert-fitness-remote.vercel.app',
  portfolio: 'https://hubertchim-porfolio.vercel.app',
};

// ─── App Data ─────────────────────────────────────────────────────────────────
interface AppInfo {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  accent: string;
  url: string;
}

const apps: AppInfo[] = [
  {
    id: 'axiom',
    name: 'Axiom',
    subtitle: 'Desarrollo y Diseño Premium B2B',
    description: 'Agencia de desarrollo web y diseño digital enfocada en resultados. Creamos experiencias digitales que convierten visitantes en clientes para negocios ambiciosos.',
    accent: '#00df9a',
    url: EXTERNAL_URLS.axiom,
  },
  {
    id: 'fitness',
    name: 'HubertFit',
    subtitle: 'Transformación Física de Alto Rendimiento',
    description: 'Mi plataforma integral de asesorías. Si buscas un cambio físico real y sostenible, aquí encontrarás mi metodología comprobada, planes 100% adaptados a ti y seguimiento constante.',
    accent: '#FF914D',
    url: EXTERNAL_URLS.fitness,
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    subtitle: 'Proyectos y Trabajo Personal',
    description: 'Una colección curada de mis proyectos más relevantes en desarrollo frontend, diseño de interfaces y arquitectura de micro-frontends.',
    accent: '#8b5cf6',
    url: EXTERNAL_URLS.portfolio,
  },
];

// ─── App Icons (PNG) ──────────────────────────────────────────────────────────
function IconAxiom() {
  return <img src={axiomIcon} alt="Axiom" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
}

function IconFitness() {
  return <img src={fitnessIcon} alt="HubertFit" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
}

function IconPortfolio() {
  return <img src={portfolioIcon} alt="Portfolio" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
}

function IconGamesFolder() {
  return <img src={gamesFolderIcon} alt="Juegos" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
}

function IconChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function IconLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3a3 3 0 0 0-3 3v2.4a.6.6 0 0 0 .6.6H6a3 3 0 0 0 0-6zM18 3a3 3 0 0 1 3 3v2.4a.6.6 0 0 1-.6.6H18a3 3 0 0 1 0-6zM6 21a3 3 0 0 1-3-3v-2.4a.6.6 0 0 1 .6-.6H6a3 3 0 0 1 0 6zM18 21a3 3 0 0 0 3-3v-2.4a.6.6 0 0 0-.6-.6H18a3 3 0 0 0 0 6zM9 9h6v6H9z" />
    </svg>
  );
}

const iconMap: Record<string, () => React.ReactElement> = {
  axiom: IconAxiom,
  fitness: IconFitness,
  portfolio: IconPortfolio,
};

// ─── Clock Hook ───────────────────────────────────────────────────────────────
function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function OsDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bootRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const [systemState, setSystemState] = useState<'BOOTING' | 'LOCKED' | 'DESKTOP'>('BOOTING');
  const [windows, setWindows] = useState<Record<string, boolean>>({});
  const [_activeWindow, setActiveWindow] = useState<string | null>(null);
  const [mobileApp, setMobileApp] = useState<AppInfo | null>(null);
  const windowElRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const mobileFullscreenRef = useRef<HTMLDivElement>(null);
  const clock = useClock();

  // ─── Boot → Locked transition ─────────────────────────────────────────────
  useEffect(() => {
    if (systemState !== 'BOOTING') return;
    const timer = setTimeout(() => setSystemState('LOCKED'), 2200);
    return () => clearTimeout(timer);
  }, [systemState]);

  // ─── Boot Screen GSAP animation ──────────────────────────────────────────
  useGSAP(() => {
    if (systemState !== 'BOOTING') return;

    gsap.to('.os-boot__logo', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, { scope: containerRef, dependencies: [systemState] });

  // ─── Desktop reveal when unlocked ────────────────────────────────────────
  useEffect(() => {
    if (systemState !== 'DESKTOP' || !desktopRef.current) return;
    gsap.to(desktopRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, [systemState]);

  // ─── Dock Magnify Effect ──────────────────────────────────────────────────
  const handleDockMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!dockRef.current) return;
    const items = dockRef.current.querySelectorAll<HTMLDivElement>('.os-dock__item');
    const dockRect = dockRef.current.getBoundingClientRect();
    const mouseX = e.clientX - dockRect.left;

    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left - dockRect.left + itemRect.width / 2;
      const distance = Math.abs(mouseX - itemCenter);
      const maxDist = 120;
      const scale = Math.max(1, 1.4 - (distance / maxDist) * 0.4);

      gsap.to(item, {
        scale,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  }, []);

  const handleDockMouseLeave = useCallback(() => {
    if (!dockRef.current) return;
    const items = dockRef.current.querySelectorAll('.os-dock__item');
    gsap.to(items, { scale: 1, duration: 0.3, ease: 'power2.out' });
  }, []);

  // ─── Window Management ────────────────────────────────────────────────────
  const zIndexRef = useRef(50);

  const openWindow = useCallback((id: string) => {
    setWindows((prev) => ({ ...prev, [id]: true }));
    setActiveWindow(id);
  }, []);

  const closeWindow = useCallback((id: string) => {
    const el = windowElRefs.current[id];
    if (el) {
      gsap.to(el, {
        scale: 0.9,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setWindows((prev) => {
            const next = { ...prev };
            delete next[id];
            return next;
          });
          setActiveWindow((prev) => (prev === id ? null : prev));
        },
      });
    } else {
      setWindows((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  }, []);

  const focusWindow = useCallback((id: string) => {
    setActiveWindow(id);
    const el = windowElRefs.current[id];
    if (el) {
      zIndexRef.current += 1;
      el.style.zIndex = String(zIndexRef.current);
    }
  }, []);

  // Animate + Draggable for newly opened windows
  useEffect(() => {
    Object.keys(windows).forEach((id) => {
      const el = windowElRefs.current[id];
      if (el && el.dataset.animated !== 'true') {
        el.dataset.animated = 'true';
        zIndexRef.current += 1;
        el.style.zIndex = String(zIndexRef.current);

        gsap.fromTo(el,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.4)' }
        );

        const titlebar = el.querySelector('.os-window__titlebar') as HTMLElement;
        if (titlebar) {
          Draggable.create(el, {
            trigger: titlebar,
            bounds: desktopRef.current!,
            zIndexBoost: false,
            onPress: () => focusWindow(id),
          });
        }
      }
    });
  }, [windows, focusWindow]);

  // ─── Mobile App Open/Close ────────────────────────────────────────────────
  const openMobileApp = useCallback((app: AppInfo) => {
    setMobileApp(app);
    requestAnimationFrame(() => {
      if (mobileFullscreenRef.current) {
        gsap.fromTo(mobileFullscreenRef.current,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }
        );
      }
    });
  }, []);

  const closeMobileApp = useCallback(() => {
    if (mobileFullscreenRef.current) {
      gsap.to(mobileFullscreenRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => setMobileApp(null),
      });
    }
  }, []);

  // ─── Time Formatting ──────────────────────────────────────────────────────
  const timeStr = clock.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const dateStr = clock.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div ref={containerRef}>
      {/* ─── Boot Screen ─────────────────────────────────────────────────── */}
      {systemState === 'BOOTING' && (
        <div ref={bootRef} className="os-boot">
          <div className="os-boot__logo">
            <img src={logoApple} alt="Logo" />
          </div>
          <div className="os-boot__progress">
            <div className="os-boot__progress-bar" />
          </div>
        </div>
      )}

      {/* ─── Lock Screen ───────────────────────────────────────────────── */}
      {systemState === 'LOCKED' && (
        <LockScreen onUnlock={() => setSystemState('DESKTOP')} />
      )}

      {/* ─── Desktop ─────────────────────────────────────────────────────── */}
      <div ref={desktopRef} className="os-desktop">
        {/* Top Bar (Desktop only) */}
        <div className="os-topbar">
          <div className="os-topbar__left">
            <IconLogo />
            Hubert OS
          </div>
          <div className="os-topbar__right">{timeStr}</div>
        </div>

        {/* Windows (Desktop only) */}
        {systemState === 'DESKTOP' && Object.keys(windows).map((winId, i) => {
          const app = apps.find((a) => a.id === winId);

          // App windows (Axiom, HubertFit, Portfolio)
          if (app) {
            const Icon = iconMap[app.id];
            return (
              <div
                key={winId}
                ref={(el) => { windowElRefs.current[winId] = el; }}
                className="os-window"
                style={{ top: `${80 + i * 30}px`, left: `${120 + i * 40}px` }}
                onClick={() => focusWindow(winId)}
              >
                <div className="os-window__titlebar">
                  <div className="os-window__dots">
                    <span className="os-window__dot os-window__dot--close" onClick={(e) => { e.stopPropagation(); closeWindow(winId); }} />
                    <span className="os-window__dot os-window__dot--minimize" />
                    <span className="os-window__dot os-window__dot--maximize" />
                  </div>
                  <span className="os-window__title">{app.name}</span>
                </div>
                <div className="os-window__content">
                  <div style={{ color: app.accent, width: 48, height: 48 }}>
                    <Icon />
                  </div>
                  <h2 className="os-window__heading">{app.name}</h2>
                  <p className="os-window__desc">{app.subtitle}</p>
                  <p className="os-window__description">{app.description}</p>
                  <a href={app.url} className={`os-window__cta os-window__cta--${app.id}`}>
                    Abrir →
                  </a>
                </div>
              </div>
            );
          }

          // Games Folder window
          if (winId === 'gamesFolder') {
            return (
              <div
                key={winId}
                ref={(el) => { windowElRefs.current[winId] = el; }}
                className="os-window"
                style={{ top: `${70 + i * 20}px`, left: `${100 + i * 30}px` }}
                onClick={() => focusWindow(winId)}
              >
                <div className="os-window__titlebar">
                  <div className="os-window__dots">
                    <span className="os-window__dot os-window__dot--close" onClick={(e) => { e.stopPropagation(); closeWindow(winId); }} />
                    <span className="os-window__dot os-window__dot--minimize" />
                    <span className="os-window__dot os-window__dot--maximize" />
                  </div>
                  <span className="os-window__title">Juegos</span>
                </div>
                <div className="os-window__content os-window__content--folder">
                  <div className="os-folder-grid">
                    <div className="os-folder-grid__item" onClick={(e) => { e.stopPropagation(); openWindow('snake'); }}>
                      <div className="os-folder-grid__icon os-folder-grid__icon--snake">🐍</div>
                      <span className="os-folder-grid__label">Snake.exe</span>
                    </div>
                    <div className="os-folder-grid__item" onClick={(e) => { e.stopPropagation(); openWindow('minesweeper'); }}>
                      <div className="os-folder-grid__icon os-folder-grid__icon--mines">💣</div>
                      <span className="os-folder-grid__label">Minesweeper.exe</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Snake window
          if (winId === 'snake') {
            return (
              <div
                key={winId}
                ref={(el) => { windowElRefs.current[winId] = el; }}
                className="os-window os-window--snake"
                style={{ top: `${60 + i * 20}px`, left: `${180 + i * 30}px` }}
                onClick={() => focusWindow(winId)}
              >
                <div className="os-window__titlebar">
                  <div className="os-window__dots">
                    <span className="os-window__dot os-window__dot--close" onClick={(e) => { e.stopPropagation(); closeWindow(winId); }} />
                    <span className="os-window__dot os-window__dot--minimize" />
                    <span className="os-window__dot os-window__dot--maximize" />
                  </div>
                  <span className="os-window__title">Snake.exe</span>
                </div>
                <div className="os-window__content os-window__content--game">
                  <RetroMinigame
                    onClaimReward={(s) => {
                      window.open(`https://wa.me/34600000000?text=🏆 Score: ${s} — Reclamo mi premio`, '_blank');
                    }}
                  />
                </div>
              </div>
            );
          }

          // Minesweeper window
          if (winId === 'minesweeper') {
            return (
              <div
                key={winId}
                ref={(el) => { windowElRefs.current[winId] = el; }}
                className="os-window os-window--minesweeper"
                style={{ top: `${90 + i * 20}px`, left: `${200 + i * 30}px` }}
                onClick={() => focusWindow(winId)}
              >
                <div className="os-window__titlebar">
                  <div className="os-window__dots">
                    <span className="os-window__dot os-window__dot--close" onClick={(e) => { e.stopPropagation(); closeWindow(winId); }} />
                    <span className="os-window__dot os-window__dot--minimize" />
                    <span className="os-window__dot os-window__dot--maximize" />
                  </div>
                  <span className="os-window__title">Minesweeper.exe</span>
                </div>
                <div className="os-window__content os-window__content--game">
                  <Minesweeper />
                </div>
              </div>
            );
          }

          return null;
        })}

        {/* Dock (Desktop only) */}
        {systemState === 'DESKTOP' && (
          <div
            ref={dockRef}
            className="os-dock"
            onMouseMove={handleDockMouseMove}
            onMouseLeave={handleDockMouseLeave}
          >
            {apps.map((app) => {
              const Icon = iconMap[app.id];
              return (
                <div
                  key={app.id}
                  className={`os-dock__item os-dock__item--${app.id}`}
                  onClick={() => openWindow(app.id)}
                >
                  <Icon />
                  <span className="os-dock__item__label">{app.name}</span>
                </div>
              );
            })}
            <div
              className="os-dock__item os-dock__item--games"
              onClick={() => openWindow('gamesFolder')}
            >
              <IconGamesFolder />
              <span className="os-dock__item__label">Juegos</span>
            </div>
          </div>
        )}

        {/* ─── Mobile Layout ───────────────────────────────────────────── */}
        {systemState === 'DESKTOP' && (
          <div className="os-mobile">
            <span className="os-mobile__time">{timeStr}</span>
            <span className="os-mobile__date">{dateStr}</span>

            <div className="os-mobile__grid">
              {apps.map((app) => {
                const Icon = iconMap[app.id];
                return (
                  <div
                    key={app.id}
                    className="os-mobile__app"
                    onClick={() => openMobileApp(app)}
                  >
                    <div className={`os-mobile__app-icon os-mobile__app-icon--${app.id}`}>
                      <Icon />
                    </div>
                    <span className="os-mobile__app-label">{app.name}</span>
                  </div>
                );
              })}
              <div
                className="os-mobile__app"
                onClick={() => openWindow('gamesFolder')}
              >
                <div className="os-mobile__app-icon os-mobile__app-icon--games">
                  <IconGamesFolder />
                </div>
                <span className="os-mobile__app-label">Juegos</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── Mobile Fullscreen View ────────────────────────────────────── */}
      {mobileApp && (
        <div
          ref={mobileFullscreenRef}
          className="os-mobile__fullscreen os-mobile__fullscreen--active"
        >
          <div className="os-mobile__fullscreen-header">
            <button className="os-mobile__fullscreen-back" onClick={closeMobileApp}>
              <IconChevronLeft />
              Atrás
            </button>
          </div>
          <div className="os-mobile__fullscreen-content">
            <div style={{ color: mobileApp.accent, width: 64, height: 64 }}>
              {iconMap[mobileApp.id]()}
            </div>
            <h2 className="os-mobile__fullscreen-title">{mobileApp.name}</h2>
            <p className="os-mobile__fullscreen-desc">{mobileApp.subtitle}</p>
            <a
              href={mobileApp.url}
              className={`os-mobile__fullscreen-cta os-mobile__fullscreen-cta--${mobileApp.id}`}
            >
              Ir a {mobileApp.name}
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
