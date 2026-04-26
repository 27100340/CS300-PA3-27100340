import express from "express";
import cors from "cors";

export const app = express();
app.use((req,res,next)=>{
    console.log("Backend recieve a hit!!")
    next();
})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup',(req,res)=>{
    console.log(req.body);
    res.status(201).json({success:true,message:"test signup endpoint backend success"});
})
