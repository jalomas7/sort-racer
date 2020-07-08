import {Server} from '../server';
import { WSEvent } from '@packages/common';

export const broadcast = <T>(event: WSEvent<T>) => {
    Server.clients.forEach(c => {
        c.send(JSON.stringify(event));
    });
};