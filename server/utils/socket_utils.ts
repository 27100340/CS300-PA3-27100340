import { Socket, Server } from "socket.io";
import { joinLobby, leaveLobby } from "../utils/rooms"

export const connectionHandler = async (socket: Socket, io: Server) => {
    const userId = socket.data.userId;
    const username = socket.data.username;
    const room = await joinLobby(username, userId, socket.id);
    const game_id = room.game_id;
    socket.data.game_id = game_id;
    socket.join(game_id);
    io.to(game_id).emit("lobby:state", room);
}

export const disconnectOrRemoveHandler = (socket: Socket, io: Server) => {
    const userId = socket.data.userId;
    const game_id = socket.data.game_id;
    if (!game_id) {
        return;
    }
    const updated_room_state = leaveLobby(userId, game_id);
    socket.leave(game_id)
    delete socket.data.game_id;
    if (updated_room_state) {
        io.to(game_id).emit("lobby:state", updated_room_state);
    }
}

