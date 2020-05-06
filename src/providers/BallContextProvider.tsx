import React, {
  createContext,
  useContext,
  FunctionComponent,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { getRandomHexColor } from "../utils";
import { v4 as uuid } from "uuid";
import { BallStacks, Ball } from "../types";

export type BallContextType = {
  activeBall: Ball | undefined;
  setActiveBall: Dispatch<SetStateAction<Ball | undefined>>;
  ballStacks: BallStacks;
  ballColors: string[];
  onDrag: (stackId: string) => void;
  onDrop: (stackId: string) => void;
};

const defaultBallContext: BallContextType = {
  activeBall: undefined,
  setActiveBall: () => {},
  ballStacks: {},
  ballColors: [],
  onDrag: () => {},
  onDrop: () => {},
};

const BallContext = createContext(defaultBallContext);

export const useBallContext = () => useContext(BallContext);

const createBallStack = (colors: string[]): Ball[] => {
  const balls: Ball[] = [];
  for (let i = 0; i < 5; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const ball: Ball = {
      id: uuid(),
      color,
    };
    balls.push(ball);
  }

  return balls;
};

export const BallProvider: FunctionComponent = ({ children }) => {
  const [activeBall, setActiveBall] = useState<Ball>();
  const [ballColors, setBallColors] = useState<string[]>([]);
  const [ballStacks, setBallStacks] = useState<BallStacks>({});

  const onDrag = useCallback(
    (stackId: string) => {
      const ball = ballStacks[stackId].balls.shift();
      setActiveBall(ball);
    },
    [ballStacks]
  );

  const onDrop = useCallback(
    (stackId: string) => {
      if (!activeBall) {
        return;
      }

      ballStacks[stackId].balls.unshift(activeBall);
      setActiveBall(undefined);
    },
    [ballStacks, activeBall]
  );

  useEffect(() => {
    const colors: string[] = [
      getRandomHexColor(),
      getRandomHexColor(),
      getRandomHexColor(),
      getRandomHexColor(),
      getRandomHexColor()
    ];
    setBallColors(colors);
    const stacks: BallStacks = {};
    for (let i = 0; i < 5; i++) {
      stacks[uuid()] = { balls: createBallStack(colors) };
    }
    setBallStacks(stacks);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const value: BallContextType = {
      ballColors,
      ballStacks,
      activeBall,
      setActiveBall,
      onDrag,
      onDrop
  }

  return <BallContext.Provider value={value}>{children}</BallContext.Provider>;
};
