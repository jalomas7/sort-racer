import React, {
  createContext,
  useContext,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { getRandomHexColors, shuffle } from "../utils";
import { v4 as uuid } from "uuid";
import { Ball, PlayerStacks } from "../types";

export type GameContextType = {
  players: string[];
  playerStacks: PlayerStacks;
  ballColors: string[];
  gameWon: boolean;
  resetGame: () => void;
  winner?: string;
};

const defaultGameContext: GameContextType = {
  players: [],
  gameWon: false,
  playerStacks: {},
  ballColors: [],
  resetGame: () => {},
};

const GameContext = createContext(defaultGameContext);

export const useGameContext = () => useContext(GameContext);

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

export type GameContextProviderProps = {
  players: string[];
};

export const GameContextProvider: FunctionComponent<GameContextProviderProps> = ({
  children,
  players,
}) => {
  const [ballColors, setBallColors] = useState<string[]>([]);
  const [playerStacks, setPlayerStacks] = useState<PlayerStacks>({});
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | undefined>();

  useEffect(() => {
    let won: boolean = true;
    players.forEach((player) => {
      const ballStacks = playerStacks[player];

      if (!ballStacks) {
        return;
      }

      Object.keys(ballStacks).forEach((id) => {
        if (ballStacks[id].balls.length < 1) {
          return;
        }
        const firstBallColor = ballStacks[id].balls[0].color;
        ballStacks[id].balls.forEach((ball) => {
          if (ball.color !== firstBallColor) {
            won = false;
            return;
          }
        });
      });
      if (won) {
        setGameWon(true);
        setWinner(player);
      }
    });
  }, [players, playerStacks]);

  const resetGame = () => {
    setGameWon(false);
    const colors: string[] = getRandomHexColors(4, 2);
    setBallColors(colors);
    const stacks: PlayerStacks = {};
    players.forEach((player) => {
      for (let i = 0; i < colors.length + 1; i++) {
        stacks[player] = {
          ...stacks[player],
          [uuid()]: { balls: createBallStack(shuffle<string>(colors)) },
        };
      }
    });
    setPlayerStacks(stacks);
  };

  useEffect(() => {
    resetGame();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const value: GameContextType = {
    players,
    ballColors,
    playerStacks,
    gameWon,
    resetGame,
    winner,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
