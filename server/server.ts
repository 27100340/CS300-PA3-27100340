import dotenv from "dotenv"
import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app";
dotenv.config({ path: "./config.env" });
import mongoose from "mongoose";
import socket_auth_interceptor from "./interceptors/socket/auth_interceptor";
import { joinLobby, getRoom, leaveLobby } from "./utils/rooms";
import { connectionHandler, disconnectOrRemoveHandler } from "./utils/socket_utils";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const port = process.env.PORT;
//test db
const mongouri = process.env.MONGO_URI
if (!mongouri) {
  console.log("error");
}
else {
  mongoose.connect(mongouri, { serverSelectionTimeoutMS: 5000 }).then(() => {
    console.log("Connected to Mongo DB");
  }).catch((err) => {
    console.log("mongo db connection failed due to: " + err);
  })
}

io.use(socket_auth_interceptor);
io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);
  socket.on("room:join", async () => {
    connectionHandler(socket, io);
  })

  socket.on("room:leave", async () => {
    disconnectOrRemoveHandler(socket, io);
  })

  socket.on("disconnect", async () => {
    disconnectOrRemoveHandler(socket, io);
  })
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
