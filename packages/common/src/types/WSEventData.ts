export type ConnectedEventData = {
    players: string[];
}

export type PlayerPositionsEventData = {
    [playerId: string]: {
        x: number;
        y: number;
    };
};

export type ColumnSwapEventData = {
    from: string;
    to: string;
};