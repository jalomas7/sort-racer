export type BallStacks = {
  [id: string]: {
    balls: Ball[];
  };
};

export type Ball = {
    id: string;
    color: string;
};
