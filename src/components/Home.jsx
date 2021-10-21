import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
import { auth, db } from "../firebase";

const Home = () => {
  const { currentUser } = auth;
  const [showModal, setShowModal] = useState(false);
  const history = useHistory()

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
    const game ={
      status: 'waiting',
      members: [member],
      gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
    }
     await db.collection('games').doc(game.gameId).set(game)
     history.push(`/game/${game.gameId}`)


  };
  return (
    <>
      <div className="columns home">
        <div className="column has-background-primary home-col">
          <button className="button is-link">Play Locally</button>
        </div>
        <div className="column has-background-link home-col">
          <button className="button is-primary" onClick={handlePlayOnline}>
            Play Online
          </button>
        </div>
        <div className={`modal ${showModal ? "is-active" : ""}`}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="card">
              <div className="card-content">Select your color</div>
              <footer className="card-footer">
                {newGameOptions.map(({ label, value }) => (
                  <span className="card-footer-item pointer" key={value} onClick={()=>startOnlineGame(value)}>
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
