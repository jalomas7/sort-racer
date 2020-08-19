import { Handler } from "./types";
import { PlayerPositionsEventData } from "@packages/common";
import { broadcastHandler } from "./broadcastHandler";
import { echoHandler } from "./echoHandler";

export const positionUpdateHandler: Handler<PlayerPositionsEventData> = (ws, event) => {
    broadcastHandler(ws, event);
    echoHandler(ws, event);
}