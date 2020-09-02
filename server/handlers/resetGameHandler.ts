import {Handler} from './types';
import {ConnectedEventData} from '@packages/common';
import {resetGame} from '../utils/resetGame';

export const resetGameHandler: Handler<ConnectedEventData> = () => {
    resetGame();
};
