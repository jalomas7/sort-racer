export type PlayerStacks = {
    [playerId: string]: BallStacks;
};

export type BallStacks = {
    [id: string]: {
        balls: Ball[];
    };
};

export type Ball = {
    id: string;
    color: string;
};
