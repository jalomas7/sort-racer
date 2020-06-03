import React, { useState } from "react";
import styled from "@emotion/styled";
import BallStack from "./BallStack";
import Ball from "./Ball";
import { useBallContext } from "../providers";

const PlayerContainer = styled.div`
  display: flex;
  background-color: #282c34;
  min-height: 15em;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  border: 5px solid white;
  margin: 0 10px;
`;

const Player = () => {
  const { ballStacks, activeBall } = useBallContext();
  const [xPos, setXPos] = useState<number>(0);
  const [yPos, setYPos] = useState<number>(0);

  const updateActiveBallPos = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setXPos(e.clientX);
    setYPos(e.clientY);
  };

  return (
    <PlayerContainer onMouseMoveCapture={updateActiveBallPos}>
      {Object.keys(ballStacks).map((id) => (
        <BallStack balls={ballStacks[id].balls} key={id} id={id} />
      ))}
      {activeBall && (
        <Ball x={xPos} y={yPos} color={activeBall.color} id={activeBall.id} />
      )}
    </PlayerContainer>
  );
};

export default Player;
