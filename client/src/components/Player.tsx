import React, { useState, FunctionComponent, useEffect } from "react";
import styled from "@emotion/styled";
import BallStack from "./BallStack";
import Ball from "./Ball";
import { useBallContext, useGameContext } from "../providers";

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

export type PlayerProps = {
    playerId: string;
};

const Player: FunctionComponent<PlayerProps> = ({ playerId }) => {
  const { activeBall } = useBallContext();
  const { playerStacks } = useGameContext();
  const [xPos, setXPos] = useState<number>(0);
  const [yPos, setYPos] = useState<number>(0);
  const [ws, setWs] = useState<WebSocket>();

  useEffect(() => {
    const thisWs = new WebSocket("ws://localhost:8080");
    thisWs.addEventListener("open", () => {
      setWs(thisWs);
    });
    thisWs.addEventListener("close", () => {
      thisWs.close();
    });
    thisWs.addEventListener('message', ev => {
      console.log(ev);
    });

    return () => {
      if (ws) {
        ws.close();
        setWs(undefined);
      }
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const updateActiveBallPos = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setXPos(e.clientX);
    setYPos(e.clientY);
    if (ws && ws.OPEN) {
      ws.send(
        JSON.stringify({
          [playerId]: { xPos: e.clientX, yPos: e.clientY },
        })
      );
    }
  };

  if (!playerStacks[playerId]) {
    return <React.Fragment />;
  }

    return (
        <PlayerContainer onMouseMoveCapture={updateActiveBallPos} id={playerId}>
            {Object.keys(playerStacks[playerId]).map((id) => (
                <BallStack balls={playerStacks[playerId][id].balls} key={id} id={id} />
            ))}
            {activeBall && <Ball x={xPos} y={yPos} color={activeBall.color} id={activeBall.id} />}
        </PlayerContainer>
    );
};

export default Player;
