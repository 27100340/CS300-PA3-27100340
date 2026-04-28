import { Request, Response } from "express";
import User from "../../models/UserModel";

const sessionCheckController = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    if (!userId) {
        res.status(401).json({ message: "Auth error - interceptor did not fire" });
        return;
    }
    try {
        const userexists = await User.findById({ _id: userId });
        if (userexists) {
            res.status(200).json({ message: "Session is Valid", username: userexists.username, coins: userexists.coins });
            return;
        }
        res.status(404).json({ message: "User Not Found", username: null, coins: null });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "Server side exception occured during session check!" });
        return;
    }
}

export default sessionCheckController;