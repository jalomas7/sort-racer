import {broadcast} from './broadcast';
import {WSEventName} from '@packages/common';
import {CreatePlayerStackData} from '@packages/common';
import {createPlayerStack} from './createPlayerStack';
import {Players} from '../server';
import {getRandomHexColors} from '@packages/utils';
import {PlayerStacks} from '@packages/common';
import {updatePlayers} from './updatePlayers';

export const resetGame = () => {
    const colors: string[] = getRandomHexColors(4, 2);
    const stacks: PlayerStacks = {};
    for (let player of Players.values()) {
        stacks[player] = createPlayerStack(colors);
    }
    const playerStackEvent: CreatePlayerStackData = {
        stacks,
        colors,
    };
    broadcast({event: WSEventName.CREATE_PLAYER_STACK, data: playerStackEvent});
    updatePlayers();
};
