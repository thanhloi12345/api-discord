import { Router } from "express";
import { authentication } from "../../middleware/authenMiddleware";
import { getCurrentProfile } from "../../middleware/getCurrentProfile";
import {
  createMessage,
  deleteOrUpdateMessage,
} from "../controllers/messages/message.controller";
import {
  createDirectMessage,
  updateOrDeleteDirectMessage,
} from "../controllers/direct-messages/direct-message.controller";

export const socketRouter = Router();

socketRouter.use(authentication as any);

socketRouter.use("/messages/", getCurrentProfile as any, createMessage as any);
socketRouter.use(
  "/messages/:messageId",
  getCurrentProfile as any,
  deleteOrUpdateMessage as any
);
socketRouter.use(
  "/direct-messages/",
  getCurrentProfile as any,
  createDirectMessage as any
);
socketRouter.use(
  "/direct-messages/:directMessageId",
  getCurrentProfile as any,
  updateOrDeleteDirectMessage as any
);
