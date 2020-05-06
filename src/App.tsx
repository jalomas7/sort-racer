import React from "react";
import styled from "@emotion/styled";
import BallStack from "./components/BallStack";
import { useBallContext } from "./providers";
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
  const { ballStacks } = useBallContext();

  return (
    <AppContainer>
      {ballStacks.map((stack) => (
        <BallStack balls={stack.balls} key={stack.id} />
      ))}
    </AppContainer>
  );
};

export default App;
