import mongoose from "mongoose";

interface SessionI {
    token: string,
    userId: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
};

const sessionSchema = new mongoose.Schema<SessionI>({
    token:
        { type: String, required: true, unique: true },
    userId:
        { type: mongoose.Schema.Types.ObjectId, required: true },
    createdAt:
        { type: Date, required: true, default: Date.now },
})

const Session = mongoose.model<SessionI>('Session', sessionSchema);

export default Session;