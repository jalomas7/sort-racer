import React, {FunctionComponent} from 'react';
import styled from '@emotion/styled';
import BallStack from './BallStack';
import Ball from './Ball';
import {useBallContext, useGameContext} from '../providers';

const PlayerContainer = styled.div`
    display: flex;
    background-color: #282c34;
    min-height: 15em;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    border: 5px solid white;
    margin: 0 10px;
`;

export type PlayerProps = {
    playerId: string;
};

const Player: FunctionComponent<PlayerProps> = ({playerId}) => {
    const {activeBall} = useBallContext();
    const {playerStacks, updatePlayerPosition, getPlayerPosition} = useGameContext();

    const updateActiveBallPos = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        updatePlayerPosition(playerId, e.clientX, e.clientY);
    };

    if (!playerStacks[playerId]) {
        return <React.Fragment />;
    }

    const {x, y} = getPlayerPosition(playerId);

    return (
        <PlayerContainer onMouseMoveCapture={updateActiveBallPos} id={playerId}>
            {Object.keys(playerStacks[playerId]).map((id) => (
                <BallStack balls={playerStacks[playerId][id].balls} key={id} playerId={playerId} stackId={id} />
            ))}
            {activeBall && <Ball x={x} y={y} color={activeBall.color} id={activeBall.id} />}
        </PlayerContainer>
    );
};

export default Player;
