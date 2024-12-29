const cors = require("cors");
const WebSocket = require("ws");

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 3000 });
const wss2 = new WebSocket.Server(
    { port: 3001 },
    {
        cors: {
            origin: "*",
        },
    }
);

wss.on("connection", (ws) => {
    console.log("NodeMCU connected");

    // Receive data from NodeMCU
    ws.on("message", (message) => {
        const buffer = new Buffer.from(message);
        console.log("New Message: ", buffer.toString());

        // console.log('Received:', JSON.parse(message));

        // Example: Send a response back
        ws.send("Message received: " + message);

        // Send data to React
        wss2.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => {
        console.log("NodeMCU disconnected");
    });
});

wss2.on("connection", (ws) => {
    console.log("React connected");

    // Receive data from React
    ws.on("message", (message) => {
        const buffer = new Buffer.from(message);
        console.log("New Message: ", buffer.toString());

        // console.log('Received:', JSON.parse(message));

        // Example: Send a response back
        ws.send("Message received: " + message);
    });

    ws.on("close", () => {
        console.log("React disconnected");
    });
});
