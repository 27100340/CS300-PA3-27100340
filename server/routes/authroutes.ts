import {Router} from "express";
import signupController from "../controllers/auth/signupController";

const auth_router = Router();

auth_router.post('/signup',signupController);

export default auth_router;
