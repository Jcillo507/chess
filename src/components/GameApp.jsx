import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { gameSubject, initGame, resetGame } from "./Game";
import Board from "./Board";

const GameApp = () => {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();
  const { id } = useParams();
  useEffect(() => {
    initGame(id !== "local" ? db.doc(`games/${id}`) : null);
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
    });
    return () => subscribe.unsubscribe();
  }, []);

  return (
    <div className="app-ctr">
      {isGameOver && (
        <>
          <h2 className="vertical-text">Game Over</h2>
          <button onClick={resetGame}>
            <span className="vertical-text">New Game</span>
          </button>
        </>
      )}
      <div className="board-ctr">
        <Board board={board} turn={turn} />
      </div>
      {result && <p className="vertical-text">{result}</p>}
    </div>
  );
};

export default GameApp;
