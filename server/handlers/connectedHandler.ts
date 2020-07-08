import {Players} from '../server';
import {Handler} from './types';
import {ConnectedEventData} from '@packages/common';
import { updatePlayers } from '../utils/updatePlayers';

export const connectedHandler: Handler<ConnectedEventData> = (ws, event) => {
    console.log('received: %s', JSON.stringify(event));
    event.data.players.forEach((p) => Players.set(ws, p));
    updatePlayers();
};
