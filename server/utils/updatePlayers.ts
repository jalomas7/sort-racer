import {WSEventName, WSEvent, ConnectedEventData} from '@packages/common';
import {Players} from '../server';
import { broadcast } from './broadcast';

export const updatePlayers = () => {
    console.log('updating player list for clients', Players.values());
    const event: WSEvent<ConnectedEventData> = {
        event: WSEventName.GET_PLAYERS,
        data: {
            players: Array.from(Players.values()),
        },
    };
    broadcast(event);
};
