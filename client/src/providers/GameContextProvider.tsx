import React, {createContext, useContext, FunctionComponent, useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {WSEvent, WSEventName, PlayerPositionsEventData, PlayerStacks, CreatePlayerStackData} from '@packages/common';

export type GameContextType = {
    players: string[];
    playerStacks: PlayerStacks;
    ballColors: string[];
    gameWon: boolean;
    declareWinner: (winner: string) => void;
    resetGame: () => void;
    winner?: string;
    updatePlayerPosition: (id: string, x: number, y: number) => void;
    getPlayerPosition: (id: string) => {x: number; y: number};
    serverConnection: WebSocket | undefined;
};

const defaultGameContext: GameContextType = {
    players: [],
    gameWon: false,
    declareWinner: () => {},
    playerStacks: {},
    ballColors: [],
    resetGame: () => {},
    updatePlayerPosition: () => {},
    getPlayerPosition: () => ({x: 0, y: 0}),
    serverConnection: undefined,
};

const GameContext = createContext(defaultGameContext);

export const useGameContext = () => useContext(GameContext);

export type GameContextProviderProps = {};

export const GameContextProvider: FunctionComponent<GameContextProviderProps> = ({children}) => {
    const [ballColors, setBallColors] = useState<string[]>([]);
    const [playerStacks, setPlayerStacks] = useState<PlayerStacks>({});
    const [gameWon, setGameWon] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>();
    const [ws, setWs] = useState<WebSocket>();
    const [players, setPlayers] = useState<string[]>([]);
    const [playerPositions, setPlayerPositions] = useState<PlayerPositionsEventData>(
        players.reduce((acc, c) => ({...acc, [c]: {x: 0, y: 0}}), {}),
    );

    useEffect(() => {
        setPlayerPositions(players.reduce((acc, c) => ({...acc, [c]: {x: 0, y: 0}}), {}));
    }, [players]);

    useEffect(() => {
        const thisWs = new WebSocket('ws://localhost:8080');
        thisWs.addEventListener('open', () => {
            thisWs.send(JSON.stringify({event: WSEventName.CONNECTED, data: {player: uuid()}}));
        });
        thisWs.addEventListener('message', (ev) => {
            try {
                const data: WSEvent<any> = JSON.parse(ev.data);
                switch (data.event) {
                    case WSEventName.POSITION_UPDATE:
                        Object.keys(data.data).forEach((k) => {
                            const {x, y} = data.data[k];
                            setPlayerPositions((p) => ({...p, [k]: {x, y}}));
                        });
                        break;
                    case WSEventName.GET_PLAYERS:
                        setPlayers((data as WSEvent<{players: string[]}>).data.players);
                        break;
                    case WSEventName.CREATE_PLAYER_STACK:
                        const {stacks, colors} = (data as WSEvent<CreatePlayerStackData>).data;
                        setPlayerStacks(stacks);
                        setBallColors(colors);
                }
            } catch {
                console.log('not json data');
            }
        });
        thisWs.addEventListener('close', () => {
            console.log('connection closed');
        });

        setWs(thisWs);

        return () => {
            if (ws) {
                ws.close();
                setWs(undefined);
            }
        };
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    const updatePlayerPosition = (playerId: string, x: number, y: number) => {
        setPlayerPositions((p) => ({...p, [playerId]: {x, y}}));
        if (ws && ws.readyState === ws.OPEN) {
            ws.send(
                JSON.stringify({
                    event: WSEventName.POSITION_UPDATE,
                    data: {
                        [playerId]: {x, y},
                    },
                }),
            );
        }
    };

    const getPlayerPosition = (playerId: string) => playerPositions[playerId] || ({x: 0, y: 0});

    const resetGame = () => {
        setGameWon(false);
        ws?.send(JSON.stringify({event: WSEventName.CONNECTED, data: {players}}));
        // const colors: string[] = getRandomHexColors(4, 2);
        // setBallColors(colors);
        // const stacks: PlayerStacks = {};
        // players.forEach((player) => {
        //     for (let i = 0; i < colors.length + 1; i++) {
        //         stacks[player] = {
        //             ...stacks[player],
        //             [uuid()]: {balls: createBallStack(shuffle<string>(colors))},
        //         };
        //     }
        // });
        // setPlayerStacks(stacks);
    };

    const declareWinner = (winner: string) => {
        setGameWon(true);
        setWinner(winner);
    };

    const value: GameContextType = {
        players,
        ballColors,
        playerStacks,
        declareWinner,
        gameWon,
        resetGame,
        winner,
        updatePlayerPosition,
        getPlayerPosition,
        serverConnection: ws,
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
