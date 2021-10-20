import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import Square from "./Square";
import Piece from "./Piece";
import { move } from "./Game";

const BoardSquare = ({ piece, black, position }) => {
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [from] = item.id.split("_");
      move(from, position);
    },
  });
  return (
    <div className="board-square" ref={drop}>
      <Square black={black}>
        {piece && <Piece piece={piece} position={position} />}
      </Square>
    </div>
  );
};

export default BoardSquare;
