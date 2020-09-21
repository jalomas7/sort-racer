import {Server} from '../server';
import {WSEvent} from '@packages/common';
import WebSocket from 'ws';

export const broadcast = <T>(event: WSEvent<T>, ignore: WebSocket[] = [], echo = false) => {
    if (echo) {
        console.log('broadcasting', event);
    }
    Server.clients.forEach((c) => {
        if (!ignore.includes(c)) {
            c.send(JSON.stringify(event));
        }
    });
};
