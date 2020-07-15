import { Handler } from "./types";
import { PlayerStackUpdate } from "@packages/common";
import { broadcast } from "../utils/broadcast";
import { echoHandler } from "./echoHandler";

export const playerStackUpdateHandler: Handler<PlayerStackUpdate> = (ws, event) => {
    echoHandler(ws, event);
    broadcast(event, [ws]);
};