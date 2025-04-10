import { Router } from "express";
import { signIn, signUp, getAllUsers } from "../controllers/auth.controller.js";
import { authorize, authorizeRole } from '../middleware/auth.middleware.js';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.get('/users',authorize, authorizeRole('admin'), getAllUsers);

export default authRouter;