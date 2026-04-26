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
// if (!mongouri) {
//   console.log("error");
// }
// else {
//   mongoose.connect(mongouri, { serverSelectionTimeoutMS: 5000 }).then(() => {
//     console.log("Connected to Mongo DB");
//   }).catch((err) => {
//     console.log("mongo db connection failed due to: " + err);
//   })
// }

console.log("MONGO_URI value:", mongouri, "type:", typeof mongouri);
console.log("about to enter if block");
if (mongouri) {
  console.log("inside if block, calling connect");
  mongoose.connect(mongouri, { serverSelectionTimeoutMS: 5000 })
    .then(() => console.log("Connected to Mongo DB"))
    .catch(err => console.log("mongo connect FAILED:", err));
} else {
  console.log("MONGO URI NOT SET IN ENV");
}
// config({
//   path: "./config.env",
// });

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
