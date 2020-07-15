export type ConnectedEventData = {
    players: string[];
};

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
