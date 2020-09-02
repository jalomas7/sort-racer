import { HandlerRegistry } from "./types";
import { WSEventName } from "@packages/common";
import {connectedHandler, playerStackUpdateHandler, positionUpdateHandler, resetGameHandler} from './handlers';

export const handlers: HandlerRegistry = {
    [WSEventName.CONNECTED]: connectedHandler,
    [WSEventName.POSITION_UPDATE]: positionUpdateHandler,
    [WSEventName.UPDATE_COLUMNS]: playerStackUpdateHandler,
    [WSEventName.RESET_GAME]: resetGameHandler,
}