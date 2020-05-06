import React, { FunctionComponent } from 'react';
import BallComponent from './Ball';
import styled from '@emotion/styled';
import { Ball } from '../types';

const BallStackContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export type BallStackProps = {
    balls: Ball[];
}

const BallStack: FunctionComponent<BallStackProps> = ({balls}) => {
    return <BallStackContainer>
        {
            balls.map(ball => <BallComponent color={ball.color} key={ball.id} />)
        }
    </BallStackContainer>
};

export default BallStack;