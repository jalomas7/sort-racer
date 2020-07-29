import React, {
    createContext,
    useContext,
    FunctionComponent,
    useState,
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
} from 'react';
import {useGameContext} from './GameContextProvider';
import {WSEventName, PlayerStackUpdateTypes, Ball} from '@packages/common';
import {WSEvent} from '@packages/common';
import {PlayerStackUpdate} from '@packages/common';
import {BallStack} from '../components';

type ActiveBallsMap = {
    [playerId: string]: Ball | undefined;
};

export type BallContextType = {
    activeBalls: ActiveBallsMap;
    setActiveBalls: Dispatch<SetStateAction<ActiveBallsMap>>;
    onDrag: (playerId: string, stackId: string) => void;
    onDrop: (playerId: string, stackId: string) => void;
};

const defaultBallContext: BallContextType = {
    activeBalls: {},
    setActiveBalls: () => {},
    onDrag: () => {},
    onDrop: () => {},
};

const BallContext = createContext(defaultBallContext);

export const useBallContext = () => useContext(BallContext);

export type BallProviderProps = {};

export const BallProvider: FunctionComponent<BallProviderProps> = ({children}) => {
    const [activeBalls, setActiveBalls] = useState<ActiveBallsMap>({});
    const {playerStacks, declareWinner, serverConnection} = useGameContext();

    const checkIfWinner = useCallback(() => {
        Object.keys(playerStacks).forEach((k) => {
            let playerWon: boolean = true;
            const ballStack = playerStacks[k];
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
            if (playerWon) {
                declareWinner(k);
                return;
            }
        });
    }, [playerStacks, declareWinner]);

    const pickUpBall = useCallback(
        (stackId: string, playerId: string) => {
            if (activeBalls[playerId] || BallStack.length < 1) {
                return;
            }
            const ball = playerStacks[playerId][stackId].balls.shift();
            setActiveBalls({...activeBalls, [playerId]: ball});
        },
        [playerStacks, activeBalls],
    );

    const dropBall = useCallback(
        (stackId: string, playerId: string) => {
            const balls = playerStacks[playerId][stackId].balls;
            const activeBall = activeBalls[playerId]
            if (!activeBall|| balls.length > 4) {
                return;
            }

            balls.unshift(activeBall);
            setActiveBalls({...activeBalls, [playerId]: undefined});
            checkIfWinner();
        },
        [playerStacks, activeBalls, checkIfWinner],
    );

    const onDrag = useCallback(
        (playerId: string, stackId: string) => {
            pickUpBall(stackId, playerId);
            serverConnection?.send(
                JSON.stringify({
                    event: WSEventName.UPDATE_COLUMNS,
                    data: {
                        playerId,
                        stackId,
                        type: 'remove',
                    },
                } as WSEvent<PlayerStackUpdate>),
            );
        },
        [pickUpBall, serverConnection],
    );

    const onDrop = useCallback(
        (playerId: string, stackId: string) => {
            dropBall(stackId, playerId);
            serverConnection?.send(
                JSON.stringify({
                    event: WSEventName.UPDATE_COLUMNS,
                    data: {
                        playerId,
                        stackId,
                        type: 'add',
                    },
                } as WSEvent<PlayerStackUpdate>),
            );
        },
        [dropBall, serverConnection],
    );

    useEffect(() => {
        if (!serverConnection) {
            return;
        }

        const stackUpdate = (ev: WebSocketEventMap['message']) => {
            try {
                const data: WSEvent<any> = JSON.parse(ev.data);
                switch (data.event) {
                    case WSEventName.UPDATE_COLUMNS:
                        const {type, playerId, stackId} = (data as WSEvent<PlayerStackUpdate>).data;
                        if (type === PlayerStackUpdateTypes.ADD) {
                            dropBall(stackId, playerId);
                        } else {
                            pickUpBall(stackId, playerId);
                        }
                }
            } catch (error) {
                console.log('error updating stack');
                console.log(error);
            }
        };

        // TODO: this gets triggered twice for the receiving client, fix
        serverConnection.addEventListener('message', stackUpdate);

        return () => serverConnection.removeEventListener('message', stackUpdate);
    }, [serverConnection, pickUpBall, dropBall]); //eslint-disable-line

    const value: BallContextType = {
        activeBalls,
        setActiveBalls,
        onDrag,
        onDrop,
    };

    return <BallContext.Provider value={value}>{children}</BallContext.Provider>;
};
