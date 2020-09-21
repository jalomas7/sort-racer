import {Handler} from '@root/events';
import {broadcast} from '@root/utils/broadcast';

export const broadcastHandler: Handler<any> = (ws, event) => {
    broadcast(event, [ws]);
};
