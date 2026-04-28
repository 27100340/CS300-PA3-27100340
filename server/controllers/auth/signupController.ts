import { Request, Response } from "express";
import User from "../../models/UserModel";
import createSession from "../../utils/createSession";
const signupController = async (req: Request, res: Response) => {
    const req_body = req.body;
    const usrnm = req_body.name;
    const pw = req_body.pw;
    const dob = req_body.dob;
    if (usrnm.length < 2 || usrnm.length > 20) {
        res.status(400).json({ message: "Username should be between 2 and 20 characters!" });
        return;
    }
    if (pw.length < 6) {
        res.status(400).json({ message: "Password should be atleast 6 characters" });
        return;
    }
    try {
        const user_exists = await User.findOne({ username: usrnm });

        if (user_exists) {
            res.status(409).json({ message: "User already exists with the Username provided!" })
            return;
        }

        try {
            const new_user = await User.create({ username: usrnm, password: pw, dob: dob });
            await createSession(res, new_user);
            res.status(201).json({ message: "User created successfully!" });
        } catch (err) {
            res.status(500).json({ message: "Unable to create user with Database source = signupController.ts" })
        }
    } catch (err) {
        res.status(500).json({ message: "Unable to create user with Database source = signupController.ts" })
    }
}

export default signupController;