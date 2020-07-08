export enum WSEventName {
    POSITION_UPDATE = 'positionUpdate',
    CONNECTED = 'connected',
    GET_PLAYERS = 'getPlayers',
    UPDATE_COLUMNS = 'updateColumns'
};

export type WSEvent<T> = {
    event: WSEventName;
    data: T;
};
