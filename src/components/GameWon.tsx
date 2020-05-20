import React from 'react';
import {useBallContext} from '../providers';
import {Modal} from 'semantic-ui-react';
import styled from '@emotion/styled';

const GameWonResetButton = styled.button`
    outline: none;
`;

const GameWon = () => {
    const {gameWon, resetGame} = useBallContext();
    return (
      <Modal open={gameWon}>
        <Modal.Content>YOU WIN!!!</Modal.Content>
        <GameWonResetButton onClick={resetGame}>Play Again</GameWonResetButton>
      </Modal>
    );
};

export default GameWon;