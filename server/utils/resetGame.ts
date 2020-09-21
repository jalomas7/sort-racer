import {ServerPlayerManager} from './PlayerManager';

export const resetGame = () => {
    ServerPlayerManager.resetColorPalette();
    ServerPlayerManager.resetPlayerStacks();
    ServerPlayerManager.broadcastStacks();
    ServerPlayerManager.broadcastPlayers();
};
