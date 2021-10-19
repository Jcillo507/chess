import React from "react";
import BoardSquare from "./BoardSquare";

const Board = ({ board }) => {
  const getXY = (i) => {
    const x = i % 8;
    const y = Math.abs(Math.floor(i / 8) - 7);
    return { x, y };
  };
  const isBlack = (i) => {
    const { x, y } = getXY(i);
    return (x + y) % 2 === 1;
  };
  return (
    <div className="board">
      {board.flat().map((piece, i) => (
        <div key={i} className="square">
          <BoardSquare piece={piece} black={isBlack(i)} />
        </div>
      ))}
    </div>
  );
};

export default Board;
