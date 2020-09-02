import { Handler } from "@root/events";
import { PlayerStackUpdate } from "@packages/common";
import { broadcast } from "@root/utils";

export const playerStackUpdateHandler: Handler<PlayerStackUpdate> = (ws, event) => {
    broadcast(event, [ws]);
};