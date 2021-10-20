import React, { useEffect, useState } from 'react'

import './App.css';
import { gameSubject, initGame, resetGame } from './components/Game'
import Board from './components/Board'

const App = () => {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe((game) =>{
     setBoard(game.board)
     setIsGameOver(game.isGameOver)
     setResult(game.result)
    })
    return () => subscribe.unsubscribe()
  }, [])

  return (
    <div className="ctr">
      {isGameOver && (
        <> 
        <h2 className="vertical-text">Game Over</h2>
        <button onClick={resetGame}><span className='vertical-text'>New Game</span></button>
        </>
      )}
      <div className="board-ctr">
        <Board board={board} />
      </div>
      {result && <p className='vertical-text'>{result}</p>}
    </div>
  );
}

export default App;
