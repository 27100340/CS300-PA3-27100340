import dotenv from "dotenv"
import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app";
dotenv.config({ path: "./config.env" });
import mongoose from "mongoose";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false,
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

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
