import { Game } from "../models/GameModel";
type color = "red" | "yellow" | "green" | "blue" | "nan"
type status = "waiting" | "playing" | "finished"

const AVAILABLE_COLORS = ["red", "blue", "green", "yellow"] as const;

export interface PlayerI {
    username: string,
    userId: string,
    socketId: string,
    color: color,
}

export interface RoomI {
    game_id: string,
    players: PlayerI[],
    status: status,
}

const rooms: Map<string, RoomI> = new Map();

const getFreeColor = (taken: color[]): color => {
    const next_available_color = AVAILABLE_COLORS.find(c => !taken.includes(c));
    if (!next_available_color) {
        return "nan";
    }
    taken.push(next_available_color);
    return next_available_color;
}

export const getRoom = (game_id: string) => {
    return rooms.get(game_id);
}

export const joinLobby = async (username: string, user_Id: string, socket_Id: string) => {
    const available_room = [...rooms.values()].find(r => r.status === "waiting");
    if (!available_room) {
        const game = await Game.create({
            players: [
                {
                    user_id: user_Id,
                    username: username,
                    color: AVAILABLE_COLORS[0],
                },
            ],
        });
        const hostplayer: PlayerI = {
            color: AVAILABLE_COLORS[0],
            socketId: socket_Id,
            userId: user_Id,
            username: username,
        }
        const game_id = game._id.toString();
        const new_room: RoomI = { game_id: game_id, players: [hostplayer], status: "waiting" };
        rooms.set(game_id, new_room);
        return new_room;
    }
    const taken_colors = available_room.players.map(p => p.color);
    const chosen_color = getFreeColor(taken_colors);
    const new_player: PlayerI = {
        color: chosen_color,
        socketId: socket_Id,
        userId: user_Id,
        username: username,
    }
    available_room.players.push(new_player);
    return available_room;
}

export const leaveLobby = (userId: string, game_id: string) => {
    const target_room = getRoom(game_id);
    if (!target_room) {
        return null;
    }
    target_room.players = target_room.players.filter(p => p.userId !== userId);
    if (target_room.players.length == 0) {
        rooms.delete(game_id);
        return null;
    }
    return target_room;
}





