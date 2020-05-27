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
import { getRandomHexColor, shuffle } from "../utils";
import { v4 as uuid } from "uuid";
import { BallStacks, Ball } from "../types";

export type BallContextType = {
  activeBall: Ball | undefined;
  setActiveBall: Dispatch<SetStateAction<Ball | undefined>>;
  ballStacks: BallStacks;
  ballColors: string[];
  gameWon: boolean;
  onDrag: (stackId: string) => void;
  onDrop: (stackId: string) => void;
  resetGame: () => void;
};

const defaultBallContext: BallContextType = {
  activeBall: undefined,
  gameWon: false,
  setActiveBall: () => {},
  ballStacks: {},
  ballColors: [],
  onDrag: () => {},
  onDrop: () => {},
  resetGame: () => {}
};

const BallContext = createContext(defaultBallContext);

export const useBallContext = () => useContext(BallContext);

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

export const BallProvider: FunctionComponent = ({ children }) => {
  const [activeBall, setActiveBall] = useState<Ball>();
  const [ballColors, setBallColors] = useState<string[]>([]);
  const [ballStacks, setBallStacks] = useState<BallStacks>({});
  const [gameWon, setGameWon] = useState<boolean>(false);

  useEffect(() => {
    if(activeBall !== undefined) {
      return;
    }

    let won: boolean = true;
    Object.keys(ballStacks).forEach(id => {
      if(ballStacks[id].balls.length < 1) {
        return;
      }
      const firstBallColor = ballStacks[id].balls[0].color;
      ballStacks[id].balls.forEach(ball => {
        if(ball.color !== firstBallColor) {
          won = false;
          return;
        }
      });
    });
    setGameWon(won)
  }, [ballStacks, activeBall]);

  const onDrag = useCallback(
    (stackId: string) => {
      const ball = ballStacks[stackId].balls.shift();
      setActiveBall(ball);
    },
    [ballStacks]
  );

  const onDrop = useCallback(
    (stackId: string) => {
      const balls = ballStacks[stackId].balls;
      if (!activeBall || balls.length > 4) {
        return;
      }

      balls.unshift(activeBall);
      setActiveBall(undefined);
    },
    [ballStacks, activeBall]
  );

  const resetGame = () => {
    setGameWon(false);
    const colors: string[] = [
      getRandomHexColor(2),
      getRandomHexColor(2),
      getRandomHexColor(2),
      getRandomHexColor(2)
    ];
    setBallColors(colors);
    const stacks: BallStacks = {};
    for (let i = 0; i < colors.length + 1; i++) {
      stacks[uuid()] = { balls: createBallStack(shuffle<string>(colors)) };
    }
    setBallStacks(stacks);
  };

  useEffect(() => {
    resetGame();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const value: BallContextType = {
      ballColors,
      ballStacks,
      activeBall,
      setActiveBall,
      onDrag,
      onDrop,
      gameWon,
      resetGame
  }

  return <BallContext.Provider value={value}>{children}</BallContext.Provider>;
};
