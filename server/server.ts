import WebSocket from 'ws';
import {handleEvent} from './events';
import {updatePlayers} from './utils';

export const Server = new WebSocket.Server({port: 8080, host: 'localhost'});
export const Players: Map<WebSocket, string> = new Map();

console.log('server running at localhost:8080');

Server.on('connection', (ws) => {
    console.log('connection recieved');
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message as string);
            handleEvent(ws, data);
        } catch {
            console.log('data not stringable', message);
            return;
        }
    });

    ws.on('close', () => {
        Players.delete(ws);
        updatePlayers();
        console.log('connection closed');
    });
});

Server.on('close', () => {
    console.log('server closed');
});

process.on('SIGINT', () => {
    let closeAttempts = 0;
    const closeCb = (e?: Error) => {
        console.log('Closing server connections');

        for (let client of Server.clients) {
            client.close();
        }

        if (!e || closeAttempts > 4) {
            if (closeAttempts > 4) {
                console.log('Force closing');
            }
            process.exit();
        } else {
            closeAttempts++;
            Server.close(closeCb);
        }
    };

    Server.close(closeCb);
});
