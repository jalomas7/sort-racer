import WebSocket from 'ws';
import {v4 as uuid} from 'uuid';
import {Ball, BallStacks, PlayerStacks} from '@packages/common';
import {shuffle} from '@packages/utils';
import { WSEvent } from '@packages/common';
import { GetPlayersEventData } from '@packages/common';
import { WSEventName } from '@packages/common';
import { broadcast } from './broadcast';
import { getRandomHexColors } from '@packages/utils';
import { CreatePlayerStackData } from '@packages/common';

export class PlayerManager {
    private players: Map<WebSocket, string>;
    private playerStacks: PlayerStacks;
    private colorPalette: string[];

    constructor() {
        this.players = new Map();
        this.playerStacks = {};
        this.colorPalette = getRandomHexColors(4, 2);
    }

    public delete(ws: WebSocket) {
        this.players.delete(ws);
        this.broadcastPlayers();
    }

    public set(ws: WebSocket, playerId: string) {
        this.players.set(ws, playerId);
        this.broadcastPlayers();
    }

    public resetPlayerStack(playerId: string) {
        let stack: BallStacks = {};
        for (let i = 0; i < this.colorPalette.length + 1; i++) {
            stack[uuid()] = {balls: this.createBallStack(shuffle<string>(this.colorPalette))};
        }
        this.playerStacks[playerId] = stack;
    };

    public resetPlayerStacks() {
        for(let player of this.players.values()) {
            this.resetPlayerStack(player);
        }
        this.broadcastPlayers();
    }

    public broadcastPlayers() {
        const event: WSEvent<GetPlayersEventData> = {
            event: WSEventName.GET_PLAYERS,
            data: {
                players: Array.from(this.players.values()),
            },
        };
        broadcast(event);
    };

    public broadcastStacks() {
        const playerStackEvent: CreatePlayerStackData = {
            stacks: this.playerStacks,
            colors: this.colorPalette,
        };
        broadcast({event: WSEventName.CREATE_PLAYER_STACK, data: playerStackEvent});
    }
    
    public resetColorPalette() {
        this.colorPalette = getRandomHexColors(4, 2);
    };

    private createBallStack = (colors: string[]): Ball[] => {
        const balls: Ball[] = [];
        for (let i = 0; i < colors.length; i++) {
            const color = colors[i];
            const ball: Ball = {
                id: uuid(),
                color,
            };
            balls.push(ball);
        }

        return balls;
    };
}

export const ServerPlayerManager = new PlayerManager();
