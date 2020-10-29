import {Handler} from '../../events';
import {broadcast} from '../../utils/broadcast';

export const broadcastHandler: Handler<any> = (ws, event) => {
    broadcast(event, [ws]);
};
