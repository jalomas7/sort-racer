import {Handler} from '../../events';
import {ConnectedEventData} from '@packages/common';
import {resetGame, ServerPlayerManager} from '../../utils';

export const connectedHandler: Handler<ConnectedEventData> = (ws, event) => {
    const {
        data: {player},
    } = event;
    ServerPlayerManager.set(ws, player);
    resetGame();
};
