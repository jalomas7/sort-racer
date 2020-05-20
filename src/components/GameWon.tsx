import React from 'react';
import {useBallContext} from '../providers';
import {Modal} from 'semantic-ui-react';

const GameWon = () => {
    const {gameWon} = useBallContext();
    return (
      <Modal open={gameWon}>
        <Modal.Content>YOU WIN!!!</Modal.Content>
      </Modal>
    );
};

export default GameWon;