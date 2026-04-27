import mongoose from 'mongoose'

interface UserI{
    username : string,
    password: string,
    dob : Date
    coins : number,
    total_played : number,
}

const userSchema = new mongoose.Schema<UserI>({
    username:
        { type: String, required: true, unique: true },
    password:
        { type: String, required: true },
    dob:
        { type: Date, required: true },
    coins:
        { type: Number, default: 100 },
    total_played: { type: Number, default: 0 },
});

const User = mongoose.model<UserI>('User',userSchema);

export default User;