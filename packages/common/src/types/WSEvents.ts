export enum WSEventName {
    POSITION_UPDATE = 'positionUpdate',
    CONNECTED = 'connected',
    GET_PLAYERS = 'getPlayers',
    UPDATE_COLUMNS = 'updateColumns',
    CREATE_PLAYER_STACK = 'createPlayerStack',
    RESET_GAME = 'RESET_GAME'
};

export type WSEvent<T> = {
    event: WSEventName;
    data: T;
};
