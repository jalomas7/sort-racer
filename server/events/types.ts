import WebSocket from "ws";
import { WSEvent, WSEventName } from "@packages/common";

export type Handler<T> = (ws: WebSocket, event: WSEvent<T>) => void;
export type HandlerRegistry<T extends {} = any> = {
    [key in WSEventName]?: Handler<T>
}