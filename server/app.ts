import express from "express";
import cors from "cors";
import auth_router from "./routes/authroutes";

export const app = express();
app.use((req,res,next)=>{
    console.log("Backend recieve a hit!!")
    next();
})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth',auth_router);
