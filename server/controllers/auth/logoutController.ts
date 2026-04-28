import { Request, Response } from "express";
import Session from "../../models/SessionModel";

const logoutController = async (req: Request, res: Response) => {
    const token = req.cookies.session;
    if (!token) {
        res.status(200).json({ message: "logged out!" });
        return;
    }

    try {
        await Session.deleteOne({ token: token });
        res.clearCookie("session");
        res.status(200).json({message:"logged out!"});
    }
    catch (err) {
        res.status(500).json("Server side error - logout failed")
    }

}

export default logoutController;