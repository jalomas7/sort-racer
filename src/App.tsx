import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "@emotion/styled";

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

const AppImg = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 20s linear;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const App = () => {
  return (
    <AppContainer>
      <AppHeader className="App-header">
        <AppImg src={logo} className="App-logo" alt="logo" />
      </AppHeader>
    </AppContainer>
  );
};

export default App;
