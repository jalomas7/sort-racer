import { PlayerStacks } from './Stacks';

export type ConnectedEventData = {
    player: string;
};

export type GetPlayersEventData = {
    players: string[];
}

export type PlayerPositionsEventData = {
    [playerId: string]: {
        x: number;
        y: number;
    };
};

export enum PlayerStackUpdateTypes {
    ADD = 'add',
    REMOVE = 'remove',
}

export type PlayerStackUpdate = {
    playerId: string;
    stackId: string;
    type: PlayerStackUpdateTypes;
};

export type CreatePlayerStackData = {
    stacks: PlayerStacks;
    colors: string[];
}