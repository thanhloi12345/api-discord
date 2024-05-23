import { Router } from "express";
import { authentication } from "../../../middleware/authenMiddleware";
import { getCurrentProfile } from "../../../middleware/getCurrentProfile";
import { getDirectMessages } from "../../controllers/direct-messages/direct-message.controller";

export const directMessageRouter = Router();

directMessageRouter.use(authentication as any);

directMessageRouter.get(
  "/",
  getCurrentProfile as any,
  getDirectMessages as any
);
