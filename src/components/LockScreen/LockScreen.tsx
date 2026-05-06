import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Wifi, BatteryMedium, Keyboard } from 'lucide-react';
import './LockScreen.scss';
import avatarImg from '../../assets/avatar.png';

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(new Date());

  // Real-time clock
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleTouch = () => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: onUnlock,
    });
  };

  // Format: "mié 6 may"
  const dateStr = time
    .toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })
    .replace(/\./g, '')
    .toLowerCase();

  // Format: "10:32"
  const timeStr = time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  return (
    <div ref={containerRef} className="lock-screen">
      {/* Top Bar */}
      <div className="lock-screen__topbar">
        <span className="lock-screen__topbar-icons">
          <Keyboard size={14} />
          <Wifi size={14} />
          <BatteryMedium size={16} />
        </span>
      </div>

      {/* Clock */}
      <div className="lock-screen__clock">
        <span className="lock-screen__date">{dateStr}</span>
        <span className="lock-screen__time">{timeStr}</span>
      </div>

      {/* User Area */}
      <div className="lock-screen__user" onClick={handleTouch}>
        <div className="lock-screen__avatar">
          <img src={avatarImg} alt="Hubert Chim" />
        </div>
        <h2 className="lock-screen__name">Bienvenido a mi espacio</h2>
        <p className="lock-screen__hint">Toca para desbloquear</p>
      </div>
    </div>
  );
}
