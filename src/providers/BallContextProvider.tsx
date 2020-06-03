import React, {
  createContext,
  useContext,
  FunctionComponent,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { BallStacks, Ball } from "../types";

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
  ballStacks: BallStacks;
};

export const BallProvider: FunctionComponent<BallProviderProps> = ({
  children,
  ballStacks,
}) => {
  const [activeBall, setActiveBall] = useState<Ball>();

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

  const value: BallContextType = {
    activeBall,
    setActiveBall,
    onDrag,
    onDrop,
  };

  return <BallContext.Provider value={value}>{children}</BallContext.Provider>;
};
