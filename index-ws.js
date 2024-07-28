const express = require('express');
const server = require('http').createServer();
const app = express();

app.get('/', function(req, res){
    res.sendFile('index.html', {root: __dirname});
});

server.on('request', app);
server.listen(3000, function() {console.log('Listening on 3000');});

/* Begin websockets */

const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({server: server});

wss.on('connection',function connection(ws){
    const numClients = wss.clients.size;
    console.log('Clients connected ',numClients);

    wss.broadcast(`current visitors: ${numClients}`);

   if( ws.readyState === ws.OPEN){
        ws.send('Welcome to my server');

   }
   ws.on('close', function close(){
    console.log('A client has disconnected');
   });
});

wss.broadcast = function broadcast(data){
    wss.clients.forEach(function each(client){
        client.send(data);
    })
}