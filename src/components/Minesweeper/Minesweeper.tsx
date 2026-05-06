import { useState, useCallback } from 'react';
import './Minesweeper.scss';

interface Cell {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
}

const ROWS = 8;
const COLS = 8;
const MINES = 10;

function createBoard(): Cell[][] {
  const board: Cell[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    }))
  );

  // Place mines
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      placed++;
    }
  }

  // Calculate adjacency
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) {
            count++;
          }
        }
      }
      board[r][c].adjacent = count;
    }
  }

  return board;
}

export default function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>(createBoard);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const revealCell = useCallback((row: number, col: number) => {
    if (gameOver || gameWon) return;

    setBoard((prev) => {
      const next = prev.map((r) => r.map((c) => ({ ...c })));
      const cell = next[row][col];

      if (cell.revealed || cell.flagged) return prev;

      cell.revealed = true;

      if (cell.mine) {
        // Reveal all mines
        next.forEach((r) => r.forEach((c) => { if (c.mine) c.revealed = true; }));
        setTimeout(() => setGameOver(true), 0);
        return next;
      }

      // Flood fill for empty cells
      if (cell.adjacent === 0) {
        const queue: [number, number][] = [[row, col]];
        while (queue.length > 0) {
          const [cr, cc] = queue.shift()!;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = cr + dr;
              const nc = cc + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                const neighbor = next[nr][nc];
                if (!neighbor.revealed && !neighbor.mine && !neighbor.flagged) {
                  neighbor.revealed = true;
                  if (neighbor.adjacent === 0) {
                    queue.push([nr, nc]);
                  }
                }
              }
            }
          }
        }
      }

      // Check win
      const unrevealed = next.flat().filter((c) => !c.revealed && !c.mine).length;
      if (unrevealed === 0) {
        setTimeout(() => setGameWon(true), 0);
      }

      return next;
    });
  }, [gameOver, gameWon]);

  const toggleFlag = useCallback((e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver || gameWon) return;

    setBoard((prev) => {
      const next = prev.map((r) => r.map((c) => ({ ...c })));
      const cell = next[row][col];
      if (cell.revealed) return prev;
      cell.flagged = !cell.flagged;
      return next;
    });
  }, [gameOver, gameWon]);

  const reset = () => {
    setBoard(createBoard());
    setGameOver(false);
    setGameWon(false);
  };

  const flagCount = board.flat().filter((c) => c.flagged).length;

  const getCellContent = (cell: Cell) => {
    if (!cell.revealed && cell.flagged) return '🚩';
    if (!cell.revealed) return '';
    if (cell.mine) return '💣';
    if (cell.adjacent === 0) return '';
    return cell.adjacent.toString();
  };

  const getCellClass = (cell: Cell) => {
    let cls = 'minesweeper__cell';
    if (cell.revealed) cls += ' minesweeper__cell--revealed';
    if (cell.revealed && cell.mine) cls += ' minesweeper__cell--mine';
    if (cell.revealed && cell.adjacent > 0) cls += ` minesweeper__cell--n${cell.adjacent}`;
    return cls;
  };

  return (
    <div className="minesweeper">
      <div className="minesweeper__header">
        <span className="minesweeper__mines">💣 {MINES - flagCount}</span>
        <span className="minesweeper__status">
          {gameOver ? '💀 GAME OVER' : gameWon ? '🏆 GANASTE' : 'MINESWEEPER.EXE'}
        </span>
        <button className="minesweeper__reset" onClick={reset}>↺</button>
      </div>

      <div className="minesweeper__board">
        {board.map((row, r) => (
          <div key={r} className="minesweeper__row">
            {row.map((cell, c) => (
              <button
                key={c}
                className={getCellClass(cell)}
                onClick={() => revealCell(r, c)}
                onContextMenu={(e) => toggleFlag(e, r, c)}
              >
                {getCellContent(cell)}
              </button>
            ))}
          </div>
        ))}
      </div>

      {(gameOver || gameWon) && (
        <div className="minesweeper__actions">
          <button className="minesweeper__btn" onClick={reset}>
            Reintentar
          </button>
        </div>
      )}
    </div>
  );
}
