import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { gameSubject, initGame, resetGame } from "./Game";
import Board from "./Board";

const GameApp = () => {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [position, setPosition] = useState();
  const [initResult, setInitResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("waiting");
  const { id } = useParams();
  const shareableLink = window.location.href;
  useEffect(() => {
    let subscribe;
    const init = async () => {
      const res = await initGame(id !== "local" ? db.doc(`games/${id}`) : null);
      setInitResult(res);
      setLoading(false);
      if (!res) {
        subscribe = gameSubject.subscribe((game) => {
          setBoard(game.board);
          setIsGameOver(game.isGameOver);
          setResult(game.result);
          setPosition(game.position);
          setStatus(game.status);
        });
      }
    };
    init();
    return () => subscribe && subscribe.unsubscribe();
  }, [id]);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareableLink);
  };
  if (loading) {
    return "Loading";
  }
  if (initResult === "not found") {
    return " Game Not Found";
  }
  if (initResult === "intruder") {
    return " The Game is full";
  }
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
        <Board board={board} position={position} />
      </div>
      {result && <p className="vertical-text">{result}</p>}
      {status === "waiting" && (
        <div className="notification is-link share-game">
          <strong>Share Game to play with friend</strong>
          <br />
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                type="text"
                className="input"
                readOnly
                value={shareableLink}
              />
            </div>
            <div className="control">
              <button className="button is-info" onClick={copyToClipboard}>
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameApp;
