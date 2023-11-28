const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, "public")));

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (data) => {
    console.log(Buffer.from(data).toString("base64"));

    const base64Image = "data:image/jpeg;base64," + Buffer.from(data).toString("base64");
    ws.send(base64Image);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
