import React, { useMemo, useState } from 'react';
import Board from './Board';

/**
 * Determine the winner for a given 3x3 board.
 * @param {Array<('X'|'O'|null)>} squares
 * @returns {{ winner: ('X'|'O'|null), line: (number[]|null) }}
 */
function calculateWinner(squares) {
  const lines = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: null };
}

/**
 * Checks whether the board is full (no nulls left).
 * @param {Array<('X'|'O'|null)>} squares
 * @returns {boolean}
 */
function isBoardFull(squares) {
  return squares.every(Boolean);
}

// PUBLIC_INTERFACE
export default function Game() {
  /** Main game container: owns board state, computes status, and handles moves/reset. */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [moveCount, setMoveCount] = useState(0);

  const { winner, line: winningLine } = useMemo(() => calculateWinner(squares), [squares]);
  const draw = !winner && isBoardFull(squares);

  const currentPlayer = xIsNext ? 'X' : 'O';

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (draw) return "It's a draw.";
    return `Next turn: ${currentPlayer}`;
  }, [winner, draw, currentPlayer]);

  const statusTone = winner ? 'success' : draw ? 'warning' : 'neutral';

  const gameOver = Boolean(winner) || draw;

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    /**
     * Handles a click on a square.
     * - Ignores clicks if game is over or square already filled.
     */
    if (gameOver) return;
    if (squares[index]) return;

    const next = squares.slice();
    next[index] = currentPlayer;

    setSquares(next);
    setXIsNext((prev) => !prev);
    setMoveCount((prev) => prev + 1);
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    /** Resets the game to initial state (empty board, X starts). */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setMoveCount(0);
  };

  return (
    <section className="Game" aria-label="Tic Tac Toe">
      <header className="GameHeader">
        <div className="GameTitleWrap">
          <h1 className="GameTitle">Tic Tac Toe</h1>
          <p className="GameSubtitle">Two-player · Local · First to 3 in a row</p>
        </div>

        <div className="PlayerIndicator" aria-label="Current player">
          <span className="PlayerIndicatorLabel">Current</span>
          <span className={`PlayerPill ${currentPlayer === 'X' ? 'isX' : 'isO'}`}>
            {currentPlayer}
          </span>
        </div>
      </header>

      <Board
        squares={squares}
        winningLine={winningLine}
        onSquareClick={handleSquareClick}
        disabled={gameOver}
      />

      <footer className="GameFooter">
        <div className={`GameStatus tone-${statusTone}`} role="status" aria-live="polite">
          <span className="GameStatusLabel">Status</span>
          <span className="GameStatusText">{statusText}</span>
        </div>

        <div className="GameMeta">
          <div className="MoveCounter" aria-label="Move counter">
            <span className="MoveCounterLabel">Moves</span>
            <span className="MoveCounterValue">{moveCount}</span>
          </div>

          <button
            type="button"
            className="Button ButtonPrimary"
            onClick={handleReset}
            aria-label="Reset and start a new game"
          >
            New Game
          </button>
        </div>
      </footer>
    </section>
  );
}
