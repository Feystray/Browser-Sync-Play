const WebSocket = require('ws');
const admin = "::1"
var adminws;
var clients = [];

function broadcast(message) {
    for (const client of clients) {
        client.send(message);
    }
}
const wss = new WebSocket.Server({ port: 8090 });
 wss.on('connection', function connection(ws, req)  {
  if(req.socket.remoteAddress==admin){
    adminws = ws;
    console.log('Admin connected');
  }else{
    clients.push(ws);
    console.log('New client connected');
  }
  ws.send(0);

  ws.on('message', message => {
    if(req.socket.remoteAddress==admin){
        broadcast(message);
        console.log(`Message from admin : ${message}`);
    }else{
       adminws.send(-1);
       broadcast(-1);
       console.log(`[${req.socket.remoteAddress}] is saying to pause`);
    }
    
  });

  ws.on('close', () => {
    console.log('Client has disconnected');
  });
});

