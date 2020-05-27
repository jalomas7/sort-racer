import React, { useState, useEffect } from "react";
import { useBallContext } from "../providers";
import Modal from "./Modal";
import { getRandomHexColor, isDark } from "../utils";
import styled from "@emotion/styled";

const GameWonContainer = styled.div<{ background: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ background }) => background};
  color: ${({ background }) => (isDark(background) ? "white" : "black")};
  padding: 10em;
`;

const GameWonResetButton = styled.button`
  outline: none;
`;

const GameWonHeader = styled.h1``;

const GameWon = () => {
  const { resetGame } = useBallContext();
  const [color, setColor] = useState("transparent");

  useEffect(() => {
    setColor(getRandomHexColor());
  }, []);

  return (
    <Modal open={true} backgroundColor={'rgba(0,0,0,0.8)'}>
      <GameWonContainer background={color}>
        <GameWonHeader>YOU WIN!!!</GameWonHeader>
        <GameWonResetButton onClick={resetGame}>Play Again</GameWonResetButton>
      </GameWonContainer>
    </Modal>
  );
};

export default GameWon;
