import WebSocket from 'ws';
 
const wss = new WebSocket.Server({ port: 8080, host: 'localhost' });

console.log('server running at localhost:8080');

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
 
  ws.send('something');
});

wss.on("message", function incoming(data) {
  console.log(data);
});