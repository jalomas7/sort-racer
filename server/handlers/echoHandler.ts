import {Handler} from './types';

export const echoHandler: Handler<any> = (_, event) => {
    console.log('received: %s', JSON.stringify(event));
};
