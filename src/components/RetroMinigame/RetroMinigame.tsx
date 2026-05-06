import { useRef, useState, useEffect, useCallback } from 'react';
import './RetroMinigame.scss';

interface RetroMinigameProps {
  onClaimReward?: (score: number) => void;
  rewardThreshold?: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Coord = { x: number; y: number };

const GRID_SIZE = 20;
const TICK_MS = 120;

export default function RetroMinigame({
  onClaimReward,
  rewardThreshold = 10,
}: RetroMinigameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  // Game state refs (avoid re-renders during gameplay)
  const snakeRef = useRef<Coord[]>([{ x: 10, y: 10 }]);
  const foodRef = useRef<Coord>({ x: 15, y: 15 });
  const dirRef = useRef<Direction>('RIGHT');
  const nextDirRef = useRef<Direction>('RIGHT');
  const scoreRef = useRef(0);
  const gameOverRef = useRef(false);

  // Canvas sizing
  const [canvasSize, setCanvasSize] = useState(300);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const size = Math.min(w - 16, 400);
        setCanvasSize(Math.max(200, size));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Place food at a random location not on the snake
  const placeFood = useCallback(() => {
    const snake = snakeRef.current;
    let pos: Coord;
    do {
      pos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
    foodRef.current = pos;
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = 'RIGHT';
    nextDirRef.current = 'RIGHT';
    scoreRef.current = 0;
    gameOverRef.current = false;
    setScore(0);
    setGameOver(false);
    setStarted(true);
    placeFood();
    lastTickRef.current = performance.now();
  }, [placeFood]);

  // Direction change (prevents 180° reversal)
  const changeDirection = useCallback((newDir: Direction) => {
    const current = dirRef.current;
    if (
      (newDir === 'UP' && current !== 'DOWN') ||
      (newDir === 'DOWN' && current !== 'UP') ||
      (newDir === 'LEFT' && current !== 'RIGHT') ||
      (newDir === 'RIGHT' && current !== 'LEFT')
    ) {
      nextDirRef.current = newDir;
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, Direction> = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT',
        W: 'UP', S: 'DOWN', A: 'LEFT', D: 'RIGHT',
      };
      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        if (!started && !gameOver) {
          resetGame();
        }
        changeDirection(dir);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [changeDirection, started, gameOver, resetGame]);

  // Game loop
  useEffect(() => {
    if (!started || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = (now: number) => {
      frameRef.current = requestAnimationFrame(loop);

      if (now - lastTickRef.current < TICK_MS) return;
      lastTickRef.current = now;

      if (gameOverRef.current) return;

      // Update direction
      dirRef.current = nextDirRef.current;

      // Move snake
      const snake = snakeRef.current;
      const head = { ...snake[0] };

      switch (dirRef.current) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        gameOverRef.current = true;
        setGameOver(true);
        return;
      }

      // Self collision
      if (snake.some((s) => s.x === head.x && s.y === head.y)) {
        gameOverRef.current = true;
        setGameOver(true);
        return;
      }

      snake.unshift(head);

      // Eat food
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        placeFood();
      } else {
        snake.pop();
      }

      // Draw
      const cell = canvasSize / GRID_SIZE;

      // Background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      // Wall border (visible inside canvas)
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 3;
      ctx.strokeRect(1.5, 1.5, canvasSize - 3, canvasSize - 3);

      // Grid lines (subtle)
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.06)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cell, 0);
        ctx.lineTo(i * cell, canvasSize);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * cell);
        ctx.lineTo(canvasSize, i * cell);
        ctx.stroke();
      }

      // Food
      ctx.fillStyle = '#ff914d';
      ctx.shadowColor = '#ff914d';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(
        foodRef.current.x * cell + cell / 2,
        foodRef.current.y * cell + cell / 2,
        cell / 2.5,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.shadowBlur = 0;

      // Snake
      snake.forEach((seg, i) => {
        const alpha = 1 - i * 0.03;
        ctx.fillStyle = i === 0
          ? '#00df9a'
          : `rgba(0, 223, 154, ${Math.max(0.4, alpha)})`;
        ctx.shadowColor = i === 0 ? '#00df9a' : 'transparent';
        ctx.shadowBlur = i === 0 ? 6 : 0;
        ctx.fillRect(
          seg.x * cell + 1,
          seg.y * cell + 1,
          cell - 2,
          cell - 2,
        );
      });
      ctx.shadowBlur = 0;
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [started, gameOver, canvasSize, placeFood]);

  // Draw initial/game-over screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!started || gameOver) {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      // Wall border
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 3;
      ctx.strokeRect(1.5, 1.5, canvasSize - 3, canvasSize - 3);

      ctx.fillStyle = '#00df9a';
      ctx.font = `bold ${canvasSize * 0.06}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';

      if (gameOver) {
        ctx.fillStyle = '#ff5f57';
        ctx.fillText('GAME OVER', canvasSize / 2, canvasSize * 0.35);
        ctx.fillStyle = '#ff914d';
        ctx.font = `${canvasSize * 0.045}px "JetBrains Mono", monospace`;
        ctx.fillText(`Puntuación: ${scoreRef.current}`, canvasSize / 2, canvasSize * 0.45);

        if (scoreRef.current >= rewardThreshold) {
          ctx.fillStyle = '#febc2e';
          ctx.font = `${canvasSize * 0.035}px "JetBrains Mono", monospace`;
          const lines = ['🏆 ¡Puntuación Élite! Has', 'desbloqueado una recompensa', 'secreta.'];
          lines.forEach((line, i) => {
            ctx.fillText(line, canvasSize / 2, canvasSize * 0.56 + i * canvasSize * 0.05);
          });
        }
      } else {
        ctx.fillText('SNAKE.EXE', canvasSize / 2, canvasSize * 0.4);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = `${canvasSize * 0.035}px "JetBrains Mono", monospace`;
        ctx.fillText('Pulsa una tecla o toca para jugar', canvasSize / 2, canvasSize * 0.52);
      }
    }
  }, [started, gameOver, canvasSize, rewardThreshold]);

  return (
    <div ref={containerRef} className="retro-minigame">
      {/* Header */}
      <div className="retro-minigame__header">
        <span className="retro-minigame__title">SNAKE.EXE</span>
        <span className="retro-minigame__score">
          Score: <strong>{score}</strong>
        </span>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="retro-minigame__canvas"
        onClick={() => { if (!started) resetGame(); }}
      />

      {/* Game Over Actions */}
      {gameOver && (
        <button className="retro-minigame__retry" onClick={resetGame}>
          ↻ Reintentar
        </button>
      )}
      {gameOver && score >= rewardThreshold && (
        <button
          className="retro-minigame__reward"
          onClick={() => onClaimReward?.(score)}
        >
          🏆 Reclamar Premio
        </button>
      )}

      {/* D-Pad (Mobile only) */}
      <div className="retro-minigame__controls">
        <div className="retro-minigame__dpad">
        <button
          className="retro-minigame__dpad-btn retro-minigame__dpad-btn--up"
          onTouchStart={(e) => { e.preventDefault(); if (!started) resetGame(); changeDirection('UP'); }}
          onClick={() => { if (!started) resetGame(); changeDirection('UP'); }}
        >
          ▲
        </button>
        <button
          className="retro-minigame__dpad-btn retro-minigame__dpad-btn--left"
          onTouchStart={(e) => { e.preventDefault(); if (!started) resetGame(); changeDirection('LEFT'); }}
          onClick={() => { if (!started) resetGame(); changeDirection('LEFT'); }}
        >
          ◀
        </button>
        <button
          className="retro-minigame__dpad-btn retro-minigame__dpad-btn--right"
          onTouchStart={(e) => { e.preventDefault(); if (!started) resetGame(); changeDirection('RIGHT'); }}
          onClick={() => { if (!started) resetGame(); changeDirection('RIGHT'); }}
        >
          ▶
        </button>
        <button
          className="retro-minigame__dpad-btn retro-minigame__dpad-btn--down"
          onTouchStart={(e) => { e.preventDefault(); if (!started) resetGame(); changeDirection('DOWN'); }}
          onClick={() => { if (!started) resetGame(); changeDirection('DOWN'); }}
        >
          ▼
        </button>
        </div>
      </div>
    </div>
  );
}
