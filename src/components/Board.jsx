import React, {useEffect, useState} from "react";
import BoardSquare from "./BoardSquare";

const Board = ({ board, position }) => {
  const [currBoard, setCurrBoard] = useState([])
  useEffect(() => {
   setCurrBoard(
     position === "w" ? board.flat(): board.flat().reverse()
   )
  }, [board, position])
  const getXY = (i) => {
    const x = position === 'w' ? i % 8 : Math.abs((i % 8) - 7)
    const y = position === "w" ? Math.abs(Math.floor((i / 8) - 7)) : Math.floor(i/8);
    return { x, y };
  };
  const isBlack = (i) => {
    const { x, y } = getXY(i);
    return (x + y) % 2 === 0;
  };
  const getPosition = (i) => {
    const { x, y } = getXY(i);

    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];
    return `${letter}${y + 1}`;
  };
  return (
    <div className="board">
      {currBoard.flat().map((piece, i) => (
        <div key={i} className="square">
          <BoardSquare
            piece={piece}
            black={isBlack(i)}
            position={getPosition(i)}
          />
        </div>
      ))}
    </div>
  );
};

export default Board;
