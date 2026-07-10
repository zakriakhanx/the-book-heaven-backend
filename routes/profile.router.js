import { Router } from "express";
import { getProfileByUsername } from "../controllers/profile.controller.js";

const profileRouter = Router();

profileRouter.get('/:username', getProfileByUsername);

export default profileRouter;
