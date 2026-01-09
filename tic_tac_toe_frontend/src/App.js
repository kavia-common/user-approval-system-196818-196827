import React from 'react';
import Game from './components/Game';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  /** Root application component rendering the Tic Tac Toe game at the root route. */
  return (
    <div className="App">
      <main className="AppShell" aria-label="Tic Tac Toe application">
        <Game />
      </main>
    </div>
  );
}

export default App;
