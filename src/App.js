import React, { useEffect, useState } from 'react'

import './App.css';
import { gameSubject, initGame } from './components/Game'
import Board from './components/Board'

const App = () => {
  const [board, setBoard] = useState([])
  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe((game) => setBoard(game.board))
    return () => subscribe.unsubscribe()
  }, [])

  return (
    <div className="ctr">
      <div className="board-ctr">
        <Board board={board} />
      </div>
    </div>
  );
}

export default App;
