import { Request, Response } from "express";
import User from "../../models/UserModel";
import createSession from "../../utils/createSession";

const loginController = async (req: Request, res: Response) => {
    const name = req.body.username;
    const pw = req.body.password;
    if (name.length < 2 || name.length > 20 || name.length == 0) {
        res.status(400).json({ message: "Username format invalid" })
        return;
    }

    try {
        const userexists = await User.findOne({ username: name });
        if (userexists) {
            const truepw = userexists.password;
            if (truepw == pw) {
                await createSession(res,userexists);
                res.status(200).json({ message: "login success" });
                return;
            }
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        res.status(404).json({ message: "User not found" });
    } catch (err) {
        res.status(500).json({ message: "Backend database error!" })
    }
}

export default loginController;