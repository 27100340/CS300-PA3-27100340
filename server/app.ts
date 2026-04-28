import express from "express";
import cors from "cors";
import auth_router from "./routes/authroutes";
import cookieParser from "cookie-parser";

export const app = express();
app.use((req, res, next) => {
    console.log("Backend recieve a hit!!")
    next();
})
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', auth_router);
