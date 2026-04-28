import crypto from "crypto";
import Session from "../models/SessionModel";
import { UserI } from "../models/UserModel";
import { Response } from "express";

const createSession = async (res: Response, user: UserI) => {
    const token = crypto.randomBytes(32).toString("hex");
    await Session.create({ token: token, userId: user._id });
    res.cookie("session", token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
    })
}

export default createSession;