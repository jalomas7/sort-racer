import React, { useState } from "react";
import styled from "@emotion/styled";
import BallStack from "./components/BallStack";
import { useBallContext } from "./providers";
import Ball from "./components/Ball";

const AppContainer = styled.div`
  display: flex;
  background-color: #282c34;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const App = () => {
  const { ballStacks, activeBall } = useBallContext();
  const [xPos, setXPos] = useState<number>(0);
  const [yPos, setYPos] = useState<number>(0);

  return (
    <AppContainer
      onMouseMove={(e) => {
        e.preventDefault();
        setXPos(e.clientX);
        setYPos(e.clientY);
      }}
    >
      {Object.keys(ballStacks).map((id) => (
        <BallStack balls={ballStacks[id].balls} key={id} id={id} />
      ))}
      {activeBall && <Ball x={xPos} y={yPos} color={activeBall.color} id={activeBall.id} />}
    </AppContainer>
  );
};

export default App;
