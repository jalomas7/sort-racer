import {WSEvent} from '@packages/common';
import WebSocket from 'ws';
import {handlers} from './registry';

export const handleEvent = <T>(ws: WebSocket, event: WSEvent<T>) => {
    const handler = handlers[event.event];
    return handler && handler(ws, event);
};

export * from './types';
