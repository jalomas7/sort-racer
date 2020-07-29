import React from 'react';
import styled from '@emotion/styled';
import {GameWon, Player} from './components';
import {useGameContext} from './providers';

const AppContainer = styled.div`
    display: flex;
    background-color: #282c34;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const App = () => {
    const {players} = useGameContext();

    return (
        <AppContainer>
            <GameWon />
                {players.map((player) => (
                    <Player playerId={player} key={player} />
                ))}
        </AppContainer>
    );
};

export default App;
