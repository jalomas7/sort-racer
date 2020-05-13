import React from 'react';
import {useBallContext} from '../providers';

const GameWon = () => {
    const {gameWon} = useBallContext();
    return <div>game won?: {gameWon.toString()}</div>
};

export default GameWon;