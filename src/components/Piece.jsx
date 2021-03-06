import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";

const Piece = ({ piece: { type, color }, position }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: "piece",
      id: `${position}_${type}_${color}`,
    },
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  });
  const pieceImg = require(`./assets/${type}_${color}.png`).default;
  return (
    <>
      <DragPreviewImage connect={preview} src={pieceImg} />
      <div
        className="piece-ctr"
        ref={drag}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        <img src={pieceImg} alt="" className="piece" />
      </div>
    </>
  );
};

export default Piece;
