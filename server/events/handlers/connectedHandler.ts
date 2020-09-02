import {Handler} from '@root/events';
import {ConnectedEventData} from '@packages/common';
import {resetGame} from '@root/utils';
import {Players} from '@root/server';

export const connectedHandler: Handler<ConnectedEventData> = (ws, event) => {
    const {
        data: {player},
    } = event;
    Players.set(ws, player);
    resetGame();
};
