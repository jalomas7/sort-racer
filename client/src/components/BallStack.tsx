import React, {FunctionComponent} from 'react';
import BallComponent from './Ball';
import styled from '@emotion/styled';
import {useBallContext} from '../providers';
import {Ball} from '@packages/common';

const BallStackContainer = styled.div`
    min-width: 55px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 0 10px 25% 10px;
    align-self: flex-end;
`;

const BallStackVase = styled.div`
    width: 100%;
    height: 250px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    bottom: 0;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5));
`;

export type BallStackProps = {
    playerId: string;
    stackId: string;
    balls: Ball[];
};

const BallStack: FunctionComponent<BallStackProps> = ({balls, playerId, stackId}) => {
    const {onDrag, onDrop, activeBall} = useBallContext();

    return (
        <BallStackContainer
            onMouseDown={() => !activeBall && onDrag(playerId, stackId)}
            onMouseUp={() => activeBall && onDrop(playerId, stackId)}
            onClick={() => {
                activeBall && onDrop(playerId, stackId);
            }}
        >
            <BallStackVase />
            {balls.map(({color, id}) => (
                <BallComponent color={color} key={id} id={id} />
            ))}
        </BallStackContainer>
    );
};

export default BallStack;
