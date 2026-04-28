import {Router} from "express";
import signupController from "../controllers/auth/signupController";
import loginController from "../controllers/auth/loginController";
import auth_interceptor from "../interceptors/auth_interceptor";
import sessionCheckController from "../controllers/auth/sessionCheckController";
import logoutController from "../controllers/auth/logoutController";

const auth_router = Router();

auth_router.post('/signup',signupController);
auth_router.post('/login',loginController);
auth_router.get('/me',auth_interceptor,sessionCheckController);
auth_router.post('/logout',logoutController);
export default auth_router;
