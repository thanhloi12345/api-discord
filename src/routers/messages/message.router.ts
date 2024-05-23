import { Router } from "express";
import { authentication } from "../../../middleware/authenMiddleware";
import { getCurrentProfile } from "../../../middleware/getCurrentProfile";
import { getMessages } from "../../controllers/messages/message.controller";

export const messageRouter = Router();

messageRouter.use(authentication as any);

messageRouter.get("/", getCurrentProfile as any, getMessages as any);
