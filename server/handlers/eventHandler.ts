import {WSEvent, WSEventName} from '@packages/common';
import WebSocket from 'ws';
import {echoHandler} from './echoHandler';
import {HandlerRegistry} from './types';
import { connectedHandler } from './connectedHandler';
import { playerStackUpdateHandler } from './playerStackUpdateHandler';

const handlers: HandlerRegistry = {
    [WSEventName.CONNECTED]: connectedHandler,
    [WSEventName.POSITION_UPDATE]: echoHandler,
    [WSEventName.UPDATE_COLUMNS]: playerStackUpdateHandler
};

export const handleEvent = <T>(ws: WebSocket, event: WSEvent<T>) => {
    const handler = handlers[event.event];
    return handler && handler(ws, event);
};
