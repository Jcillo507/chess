import React from "react";
import piece from "./assets/r_w.png";

const Piece = ({ piece: { type, color } }) => {
  const pieceImg = require(`./assets/${type}_${color}.png`).default;

  return (
    <div>
      <img src={pieceImg} alt="piece" />
    </div>
  );
};

export default Piece;
