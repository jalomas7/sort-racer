import React, {
  createContext,
  useContext,
  FunctionComponent,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { Ball } from "../types";
import { useGameContext } from "./GameContextProvider";

export type BallContextType = {
  activeBall: Ball | undefined;
  setActiveBall: Dispatch<SetStateAction<Ball | undefined>>;
  onDrag: (stackId: string) => void;
  onDrop: (stackId: string) => void;
};

const defaultBallContext: BallContextType = {
  activeBall: undefined,
  setActiveBall: () => {},
  onDrag: () => {},
  onDrop: () => {},
};

const BallContext = createContext(defaultBallContext);

export const useBallContext = () => useContext(BallContext);

export type BallProviderProps = {
  playerId: string;
};

export const BallProvider: FunctionComponent<BallProviderProps> = ({
  children,
  playerId,
}) => {
  const [activeBall, setActiveBall] = useState<Ball>();
  const { playerStacks, declareWinner } = useGameContext();
  const ballStack = useMemo(() => playerStacks[playerId], [
    playerId,
    playerStacks,
  ]);

  const checkIfWinner = useCallback(() => {
    let playerWon: boolean = true;

    if (!ballStack) {
      return;
    }

    Object.keys(ballStack).forEach((id) => {
      if (ballStack[id].balls.length < 1) {
        return;
      }
      const firstBallColor = ballStack[id].balls[0].color;
      ballStack[id].balls.forEach((ball) => {
        if (ball.color !== firstBallColor) {
          playerWon = false;
          return;
        }
      });
    });
    console.log(`player ${playerId} won?`, playerWon);
    if (playerWon) {
      declareWinner(playerId);
      return;
    }
  }, [ballStack, playerId, declareWinner]);

  const onDrag = useCallback(
    (stackId: string) => {
      const ball = playerStacks[playerId][stackId].balls.shift();
      setActiveBall(ball);
    },
    [playerStacks[playerId]] //eslint-disable-line react-hooks/exhaustive-deps
  );

  const onDrop = useCallback(
    (stackId: string) => {
      const balls = playerStacks[playerId][stackId].balls;
      if (!activeBall || balls.length > 4) {
        return;
      }

      balls.unshift(activeBall);
      setActiveBall(undefined);
      checkIfWinner();
    },
    [playerStacks[playerId], activeBall] //eslint-disable-line react-hooks/exhaustive-deps
  );

  const value: BallContextType = {
    activeBall,
    setActiveBall,
    onDrag,
    onDrop,
  };

  return <BallContext.Provider value={value}>{children}</BallContext.Provider>;
};
