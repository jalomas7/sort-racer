import {Handler} from '../../events';
import {ConnectedEventData} from '@packages/common';
import {resetGame} from '../../utils';

export const resetGameHandler: Handler<ConnectedEventData> = () => {
    resetGame();
};
