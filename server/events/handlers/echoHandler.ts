import {Handler} from '../../events';

export const echoHandler: Handler<any> = (_, event) => {
    console.log('received: %s', JSON.stringify(event));
};
