import {Server} from '../server';
import { Handler } from './types';

export const echoHandler: Handler<any> = (ws, event) => {
    console.log('received: %s', JSON.stringify(event));
    Server.clients.forEach((c) => {
        if (c !== ws) {
            c.send(JSON.stringify(event));
        }
    });
};
