import {createWsEvent} from '@packages/events';
import {WSEventName, PlayerStackUpdate, PlayerStackUpdateTypes} from '@packages/common';

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
