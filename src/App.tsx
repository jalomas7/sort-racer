import React from "react";
import styled from "@emotion/styled";
import Ball from './components/Ball';

const AppContainer = styled.div`
  text-align: center;
`;
const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const App = () => {
  return (
    <AppContainer>
      <AppHeader className="App-header">
        <Ball />
      </AppHeader>
    </AppContainer>
  );
};

export default App;
