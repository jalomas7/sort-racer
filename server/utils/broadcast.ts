import {Server} from '../server';
import { WSEvent } from '@packages/common';
import WebSocket from 'ws';

export const broadcast = <T>(event: WSEvent<T>, ignore: WebSocket[] = []) => {
    Server.clients.forEach(c => {
        if(!ignore.includes(c)) {
            c.send(JSON.stringify(event));
        }
    });
};