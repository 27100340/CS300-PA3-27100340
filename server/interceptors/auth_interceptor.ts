import { Request, Response, NextFunction } from "express";
import Session from "../models/SessionModel";
const auth_interceptor = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.session;
    if (!token) {
        res.status(401).json({ message: "Missing token, Unauthorized" })
        return;
    }
    try {
        const session_exists = await Session.findOne({ token: token });
        if (!session_exists) {
            res.status(401).json({ message: "No session found" });
            return;
        }
        //we are using any which is the only instance the other method is very long
        (req as any).userId = session_exists.userId;
    }
    catch (err) {
        res.status(500).json({ message: "Auth error - server side" });
        return;
    }

    next();
}

export default auth_interceptor;