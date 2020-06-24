import WebSocket from 'ws';

const wss = new WebSocket.Server({port: 8080, host: 'localhost'});

console.log('server running at localhost:8080');

wss.on('connection', (ws) => {
    console.log('connection recieved');
    ws.on('message', message => {
        console.log('received: %s', message);
        wss.clients.forEach(c => {
            if(c !== ws) {
                c.send(message);
            }
        })
    });

    ws.on('close', () => {
        console.log('connection closed');
    });

    ws.send('something');
});

wss.on('close', () => {
    console.log('server closed');
});

process.on('SIGINT', () => {
    let closeAttempts = 0;
    const closeCb = (e?: Error) => {
        console.log('Closing server connections');
        
        for(let client of wss.clients) {
            client.close();
        }

        if (!e || closeAttempts > 4) {
            if (closeAttempts > 4) {
                console.log('Force closing');
            }
            process.exit();
        } else {
            closeAttempts++;
            wss.close(closeCb);
        }
    };

    wss.close(closeCb);
});
