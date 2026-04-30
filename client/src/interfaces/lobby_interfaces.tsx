export type color = "red" | "yellow" | "green" | "blue" | "nan"
export type status = "waiting" | "playing" | "finished"

export const AVAILABLE_COLORS = ["red", "blue", "green", "yellow"] as const;

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

