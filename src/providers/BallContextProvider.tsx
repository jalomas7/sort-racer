import React, {
  createContext,
  useContext,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { getRandomHexColor } from "../utils";
import {v4 as uuid} from 'uuid';
import {BallStack, Ball} from '../types';

export type BallContextType = {
  activeBall: string | undefined;
  ballStacks: BallStack[];
  ballColors: string[];
};

const defaultBallContext: BallContextType = {
  activeBall: undefined,
  ballStacks: [],
  ballColors: [],
};

const BallContext = createContext(defaultBallContext);

export const useBallContext = () => useContext(BallContext);

const createBallStack = (colors: string[]): BallStack => {
  const balls: Ball[] = [];
  for (let i = 0; i < 5; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const ball: Ball = {
      id: uuid(),
      color,
    };
    balls.push(ball);
  }

  return {
    id: uuid(),
    balls,
  };
};

export const BallProvider: FunctionComponent = ({children}) => {
  const [value, setValue] = useState(defaultBallContext);

  useEffect(() => {
    const ballColors = [
      getRandomHexColor(),
      getRandomHexColor(),
      getRandomHexColor(),
      getRandomHexColor(),
      getRandomHexColor(),
    ];
    const ballStacks: BallStack[] = [];
    for (let i = 0; i < 5; i++) {
      ballStacks.push(createBallStack(ballColors));
    }
    setValue({
      ballColors,
      ballStacks,
      activeBall: undefined,
    });
  }, []);

  return <BallContext.Provider value={value}>{children}</BallContext.Provider>;
};
