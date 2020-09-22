import { Handler } from "../../events";
import { PlayerStackUpdate } from "@packages/common";
import { broadcast } from "../../utils";

export const playerStackUpdateHandler: Handler<PlayerStackUpdate> = (ws, event) => {
    broadcast(event, [ws]);
};