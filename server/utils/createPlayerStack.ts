import {v4 as uuid} from 'uuid';
import {Ball, BallStacks} from '@packages/common';
import {shuffle} from '@packages/utils';

const createBallStack = (colors: string[]): Ball[] => {
    const balls: Ball[] = [];
    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        const ball: Ball = {
            id: uuid(),
            color,
        };
        balls.push(ball);
    }

    return balls;
};

export const createPlayerStack = (colors: string[]) => {
    let stack: BallStacks = {};
    for (let i = 0; i < colors.length + 1; i++) {
        stack[uuid()] = {balls: createBallStack(shuffle<string>(colors))};
    }
    return stack;
};
