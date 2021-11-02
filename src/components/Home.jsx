import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase";

const Home = () => {
  const { currentUser } = auth;
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const newGameOptions = [
    { label: "Black Pieces", value: "b" },
    { label: "White Pieces", value: "w" },
    { label: "Random", value: "r" },
  ];
  const handlePlayOnline = () => {
    setShowModal(true);
  };

  const startOnlineGame = async (startingPiece) => {
    const member = {
      uid: currentUser.uid,
      piece:
        startingPiece === "r"
          ? ["b", "w"][Math.round(Math.random())]
          : startingPiece,
      name: localStorage.getItem("userName"),
      creator: true,
    };
    const game = {
      status: "waiting",
      members: [member],
      gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
    };
    await db.collection("games").doc(game.gameId).set(game);
    history.push(`/game/${game.gameId}`);
  };
  const startLocalGame = () => {
    history.push(`/game/local`);
  };
  return (
    <>
      <h4>Play Chess with your friends</h4>
      <div className="bttns-ctr">
            <button
              className="button is-link"
              onClick={() => {
                startLocalGame();
              }}
            >
              Play Locally
            </button>
            <button className="button is-primary" onClick={handlePlayOnline}>
              Play Online
            </button>
          <div className={`modal ${showModal ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div className="card">
                <div className="card-content">Select your color</div>
                <footer className="card-footer">
                  {newGameOptions.map(({ label, value }) => (
                    <span
                      className="card-footer-item pointer"
                      key={value}
                      onClick={() => startOnlineGame(value)}
                    >
                      {label}
                    </span>
                  ))}
                </footer>
              </div>
            </div>
            <button
              className="modal-close is-large"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
        </div>
    </>
  );
};

export default Home;
