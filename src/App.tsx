import React from "react";
import styled from "@emotion/styled";
import { GameWon, Player } from "./components";
import { BallProvider } from "./providers";

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
  return (
    <AppContainer>
      <GameWon />
      <BallProvider>
        <Player />
      </BallProvider>
      <BallProvider>
        <Player />
      </BallProvider>
    </AppContainer>
  );
};

export default App;
