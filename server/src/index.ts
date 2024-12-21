import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import path from "path";
import cors from "cors";

const CLIENT_PORT = process.env.CLIENT_PORT;
const SERVER_PORT = process.env.SERVER_PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${CLIENT_PORT}`,
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"],
  },
});

app.use(
  cors({
    origin: `http://localhost:${CLIENT_PORT}`,
  }),
);

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat message", (msg: string) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

server.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
