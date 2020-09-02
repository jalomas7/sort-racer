import {createWsEvent} from '@packages/events';
import {
    WSEventName,
    PlayerStackUpdate,
    PlayerStackUpdateTypes,
    PlayerPositionsEventData,
    ConnectedEventData,
} from '@packages/common';

export const createDropBallEvent = (playerId: string, stackId: string) => {
    return createWsEvent<PlayerStackUpdate>(WSEventName.UPDATE_COLUMNS, {
        playerId,
        stackId,
        type: PlayerStackUpdateTypes.ADD,
    });
};

export const createDragBallEvent = (playerId: string, stackId: string) => {
    return createWsEvent<PlayerStackUpdate>(WSEventName.UPDATE_COLUMNS, {
        playerId,
        stackId,
        type: PlayerStackUpdateTypes.REMOVE,
    });
};

export const createUpdatePlayerPositionEvent = (playerId: string, x: number, y: number) => {
    return createWsEvent<PlayerPositionsEventData>(WSEventName.POSITION_UPDATE, {
        [playerId]: {x, y},
    });
};

export const createConnectedEvent = (player: string) => {
    return createWsEvent<ConnectedEventData>(WSEventName.CONNECTED, {
        player,
    });
};

export const createResetGameEvent = () => {
    return createWsEvent(WSEventName.RESET_GAME, {});
}
