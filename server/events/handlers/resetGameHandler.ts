import {Handler} from '@root/events';
import {ConnectedEventData} from '@packages/common';
import {resetGame} from '@root/utils';

export const resetGameHandler: Handler<ConnectedEventData> = () => {
    resetGame();
};
