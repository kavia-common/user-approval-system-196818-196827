import React from 'react';

// PUBLIC_INTERFACE
export default function Square({ value, onClick, disabled, index, isWinning }) {
  /** Single square cell of the board. Implemented as a button for accessibility. */
  const label = value ? `Square ${index + 1}, ${value}` : `Square ${index + 1}, empty`;

  return (
    <button
      type="button"
      className={[
        'Square',
        value === 'X' ? 'isX' : '',
        value === 'O' ? 'isO' : '',
        isWinning ? 'isWinning' : ''
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <span className="SquareMark" aria-hidden="true">
        {value}
      </span>
    </button>
  );
}
