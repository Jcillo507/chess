import React from 'react'
import piece from "./assets/r_w.png";

const Piece = ({piece:{type, color}}) => {
  console.log(type,color)
  console.log(`./assets/${type}_${color}.png`);
 const pieceImg = require(`./assets/${type}_${color}.png`);
  return (
    <div>
      <img src={pieceImg} alt="piece" />
    </div>
  );
}

export default Piece
