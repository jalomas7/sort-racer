import React, {
    createContext,
    useContext,
    FunctionComponent,
    useState,
    Dispatch,
    SetStateAction,
    useCallback,
    useMemo,
    useEffect,
} from 'react';
import {useGameContext} from './GameContextProvider';
import {WSEventName, PlayerStackUpdateTypes, Ball} from '@packages/common';
import {WSEvent} from '@packages/common';
import {PlayerStackUpdate} from '@packages/common';

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
    thisPlayerId: string;
};

export const BallProvider: FunctionComponent<BallProviderProps> = ({children, thisPlayerId}) => {
    const [activeBall, setActiveBall] = useState<Ball>();
    const {playerStacks, declareWinner, serverConnection} = useGameContext();
    const ballStack = useMemo(() => playerStacks[thisPlayerId], [thisPlayerId, playerStacks]);

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
        if (playerWon) {
            declareWinner(thisPlayerId);
            return;
        }
    }, [ballStack, thisPlayerId, declareWinner]);

    const pickUpBall = useCallback(
        (stackId: string, playerId: string) => {
            const ball = playerStacks[playerId][stackId].balls.shift();
            setActiveBall(ball);
        },
        [playerStacks],
    );

    const dropBall = useCallback(
        (stackId: string, playerId: string) => {
            const balls = playerStacks[playerId][stackId].balls;
            if (!activeBall || balls.length > 4) {
                return;
            }

            balls.unshift(activeBall);
            setActiveBall(undefined);
            checkIfWinner();
        },
        [playerStacks, activeBall, checkIfWinner],
    );

    useEffect(() => {
        serverConnection?.addEventListener('message', (ev) => {
            try {
                const data: WSEvent<any> = JSON.parse(ev.data);
                switch (data.event) {
                    case WSEventName.UPDATE_COLUMNS:
                        const {type, playerId, stackId} = (data as WSEvent<PlayerStackUpdate>).data;
                            console.log('got here with', data.data);
                        if (type === PlayerStackUpdateTypes.ADD) {
                            pickUpBall(stackId, playerId);
                        } else {
                            dropBall(stackId, playerId);
                        }
                }
            } catch {
                console.log('not json data');
            }
        });
    }, [serverConnection, pickUpBall, dropBall]);

    const onDrag = useCallback(
        (stackId: string) => {
            pickUpBall(stackId, thisPlayerId);
            serverConnection?.send(
                JSON.stringify({
                    event: WSEventName.UPDATE_COLUMNS,
                    data: {
                        playerId: thisPlayerId,
                        stackId,
                        type: 'remove',
                    },
                } as WSEvent<PlayerStackUpdate>),
            );
        },
        [playerStacks[thisPlayerId]], //eslint-disable-line react-hooks/exhaustive-deps
    );

    const onDrop = useCallback(
        (stackId: string) => {
            dropBall(stackId, thisPlayerId);
            serverConnection?.send(
                JSON.stringify({
                    event: WSEventName.UPDATE_COLUMNS,
                    data: {
                        playerId: thisPlayerId,
                        stackId,
                        type: 'add',
                    },
                } as WSEvent<PlayerStackUpdate>),
            );
        },
        [playerStacks[thisPlayerId], activeBall], //eslint-disable-line react-hooks/exhaustive-deps
    );

    const value: BallContextType = {
        activeBall,
        setActiveBall,
        onDrag,
        onDrop,
    };

    return <BallContext.Provider value={value}>{children}</BallContext.Provider>;
};
