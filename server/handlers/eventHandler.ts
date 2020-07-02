import {WSEvent, WSEventName} from '@packages/common';
import WebSocket from 'ws';
import {echoHandler} from './echoHandler';
import {HandlerRegistry} from './types';

const handlers: HandlerRegistry = {
    [WSEventName.CONNECTED]: echoHandler,
    [WSEventName.POSITION_UPDATE]: echoHandler,
};

export const handleEvent = <T>(ws: WebSocket, event: WSEvent<T>) => {
    handlers[event.event](ws, event);
};
