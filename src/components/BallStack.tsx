import React, { FunctionComponent } from 'react';
import Ball from './Ball';
import styled from '@emotion/styled';

const BallStackContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export type BallStackProps = {
    balls: string[];
}

const BallStack: FunctionComponent<BallStackProps> = ({balls}) => {
    return <BallStackContainer>
        {
            balls.map((ball, i) => <Ball color={ball} key={i} />)
        }
    </BallStackContainer>
};

export default BallStack;