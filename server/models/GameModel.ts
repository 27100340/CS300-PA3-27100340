import mongoose from "mongoose";

type color = "red" | "yellow" | "green" | "blue"
type status = "waiting" | "playing" | "finished"

export interface PlayerI {
    user_id: mongoose.Schema.Types.ObjectId
    username: string,
    color: color,
    rank?: number,
    coins_earned?: number,
}

export interface GameI {
    total_players: number,
    players: PlayerI[],
    status: status,
    started_at?: Date,
    finished_at?: Date,
}

const gameSchema = new mongoose.Schema<GameI>({
    total_players: { type: Number, default: 0 },
    players: [{
        user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        username: { type: String, required: true },
        color: { type: String, enum: ["red", "yellow", "green", "blue"], required: true },
        rank: Number,
        coins_earned: Number,
    }],
    status: { type: String, enum: ["waiting", "playing", "finished"], default: "waiting" },
    started_at: Date,
    finished_at: Date,
})

export const Game = mongoose.model<GameI>('Game', gameSchema);