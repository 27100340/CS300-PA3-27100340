import { Request,Response } from "express";
import User from "../../models/UserModel";

const loginController = async(req:Request,res:Response)=>{
    const name = req.body.username;
    const pw = req.body.password;

    const userexists = await User.findOne({username:name});

    if(userexists)
    {
        const truepw = userexists.password;
        if(truepw==pw)
        {
            res.status(200).json({message:"login success"});
            return;
        }
        res.status(401).json({message:"Unauthorized"});
        return;
    }
    res.status(404).json({message:"User not found"});
}

export default loginController;