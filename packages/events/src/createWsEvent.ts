import {WSEventName, WSEvent} from '@packages/common';

export const createWsEvent = <T>(event: WSEventName, data: T) => {
    return JSON.stringify({event, data} as WSEvent<T>);
};
