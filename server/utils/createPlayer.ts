import {getRandomHexColors} from '@packages/utils';
import {createPlayerStack} from './createPlayerStack';
import {Players} from '../server';
import {Handler} from '@root/events';
import {ConnectedEventData} from '@packages/common';

export const createPlayer: Handler<ConnectedEventData> = (ws, event) => {
    const colors: string[] = getRandomHexColors(4, 2);
    const {
        data: {player},
    } = event;
    Players.set(ws, player);
    return {
        colors,
        stack: createPlayerStack(colors),
    };
};
