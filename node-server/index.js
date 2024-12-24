const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('NodeMCU connected');

  // Receive data from NodeMCU
  ws.on('message', (message) => {
    const buffer = new Buffer.from(message);
    console.log("New Message: ", buffer.toString());
    
    // console.log('Received:', JSON.parse(message));

    // Example: Send a response back
    ws.send('Message received: ' + message);
  });

  ws.on('close', () => {
    console.log('NodeMCU disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:3000');
