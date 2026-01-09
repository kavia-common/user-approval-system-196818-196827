import React from 'react';
import Square from './Square';

// PUBLIC_INTERFACE
export default function Board({ squares, onSquareClick, disabled, winningLine }) {
  /** Renders a 3x3 grid of squares and highlights any winning line. */
  return (
    <div className="BoardWrap" aria-label="Game board">
      <div className="Board" role="grid" aria-label="Tic Tac Toe board">
        {squares.map((value, index) => {
          const isWinning = Array.isArray(winningLine) ? winningLine.includes(index) : false;

          return (
            <Square
              key={index}
              value={value}
              index={index}
              onClick={() => onSquareClick(index)}
              disabled={disabled || Boolean(value)}
              isWinning={isWinning}
            />
          );
        })}
      </div>
    </div>
  );
}
