import {Handler} from './types';
import {ConnectedEventData} from '@packages/common';
import { resetGame } from '../utils/resetGame';
import { Players } from '../server';

export const connectedHandler: Handler<ConnectedEventData> = (ws, event) => {
    const {
        data: {player},
    } = event;
    Players.set(ws, player)
    resetGame();
};
