import {Router} from "express";
import signupController from "../controllers/auth/signupController";
import loginController from "../controllers/auth/loginController";
const auth_router = Router();

auth_router.post('/signup',signupController);
auth_router.post('/login',loginController);
export default auth_router;
