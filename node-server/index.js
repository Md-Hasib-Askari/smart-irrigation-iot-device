// const cors = require("cors");
const WebSocket = require("ws");

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8000 }, () => {
    console.log("WebSocket server started on port 8000");
});
const wss2 = new WebSocket.Server(
    { port: 8001 },
    {
        cors: {
            origin: "*",
        },
    }
);

wss.on("connection", (ws) => {
    console.log("NodeMCU connected");

    // Receive data from NodeMCU
    ws.on("message", (message, isBinary) => {
        if (isBinary) {
            console.log("Binary data received");
            return;
        }
        try {
            const buffer = new Buffer.from(message);
            console.log("New Message: ", buffer.toString());

            // console.log('Received:', JSON.parse(message));

            // Example: Send a response back
            // ws.send("Message received: " + message);

            // Send data to React
            wss2.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(buffer.toString());
                }
            });
        } catch (error) {
            console.log(error);
        }
    });

    ws.on("error", (error) => {
        console.log("Error lasjfklaj: ");

        console.log(error);
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
        console.log("React Message: ", buffer.toString());

        // console.log('Received:', JSON.parse(message));

        // Example: Send a response back
        const data = JSON.parse(buffer.toString());
        console.log(data);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(buffer.toString());
            }
        });
    });

    ws.on("error", (error) => {
        console.log("Error lasjfklaj: ");

        console.log(error);
    });

    ws.on("close", () => {
        console.log("React disconnected");
    });
});

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "process.env.OPENAI_API_KEY",
// });

// const completion = openai.chat.completions.create({
//   model: "gpt-4o-mini",
//   store: true,
//   messages: [
//     {"role": "user", "content": "write a haiku about ai"},
//   ],
// });

// completion.then((result) => console.log(result.choices[0].message));
