export enum WSEventName {
    POSITION_UPDATE = 'positionUpdate',
    CONNECTED = 'connected',
};

export type WSEvent<T> = {
    event: WSEventName;
    data: T;
};
