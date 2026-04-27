import { Request, Response } from "express";
import User from "../../models/UserModel";
const signupController = async (req: Request, res: Response) => {
    const req_body = req.body;
    const usrnm = req_body.name;
    const pw = req_body.pw;
    const dob = req_body.dob;

    const user_exists = await User.findOne({ username: usrnm });

    if (user_exists) {
        res.status(409).json({ message: "User already exists with the Username provided!" })
        return;
    }

    try {
        await User.create({ username: usrnm, password: pw, dob: dob });
        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Unable to create user with Database source = signupController.ts" })
    }
}

export default signupController;