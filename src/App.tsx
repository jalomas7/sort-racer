import React from "react";
import styled from "@emotion/styled";
import BallStack from './components/BallStack';
import { getRandomHexColor } from "./utils";

const AppContainer = styled.div`
  text-align: center;
  display: flex;
  background-color: #282c34;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const App = () => {
  const balls = [getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor()];
  return (
    <AppContainer>
        <BallStack balls={balls} />
        <BallStack balls={balls} />
        <BallStack balls={balls} />
        <BallStack balls={balls} />
        <BallStack balls={balls} />
    </AppContainer>
  );
};

export default App;
