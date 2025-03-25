import { Router } from "express";
import { signIn, signUp, getAllUsers } from "../controllers/auth.controller.js";
import { get } from "node:http";

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.get('/users', getAllUsers);

export default authRouter;