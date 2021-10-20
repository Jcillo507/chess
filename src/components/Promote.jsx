import React from "react";
import Square from "./Square";
import { move } from "./Game";

const promotionPieces = ["r", "n", "b", "q"];

const Promote = ({ promotion: { from, to, color } }) => {
  return (
    <div className="board">
      {promotionPieces.map((p, i) => (
        <div key={i} className="promote-square">
          <Square black={i % 3 === 0}>
            <div className="piece-ctr" onClick={()=>move(from, to, p)}>
              <img
                src={require(`./assets/${p}_${color}.png`).default}
                alt="piece"
                className="piece cursor-pointer"
              />
            </div>
          </Square>
        </div>
      ))}
    </div>
  );
};

export default Promote;
