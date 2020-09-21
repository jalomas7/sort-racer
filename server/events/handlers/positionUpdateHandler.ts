import { Handler } from "@root/events";
import { PlayerPositionsEventData } from "@packages/common";
import { broadcastHandler } from "./broadcastHandler";

export const positionUpdateHandler: Handler<PlayerPositionsEventData> = (ws, event) => {
    broadcastHandler(ws, event);
}