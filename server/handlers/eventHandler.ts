import {WSEvent, WSEventName} from '@packages/common';
import WebSocket from 'ws';
import {HandlerRegistry} from './types';
import { connectedHandler } from './connectedHandler';
import { playerStackUpdateHandler } from './playerStackUpdateHandler';
import {positionUpdateHandler} from './positionUpdateHandler';
import {resetGameHandler} from './resetGameHandler';

const handlers: HandlerRegistry = {
    [WSEventName.CONNECTED]: connectedHandler,
    [WSEventName.POSITION_UPDATE]: positionUpdateHandler,
    [WSEventName.UPDATE_COLUMNS]: playerStackUpdateHandler,
    [WSEventName.RESET_GAME]: resetGameHandler
};

export const handleEvent = <T>(ws: WebSocket, event: WSEvent<T>) => {
    const handler = handlers[event.event];
    return handler && handler(ws, event);
};
