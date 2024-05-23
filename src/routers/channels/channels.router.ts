import { Router } from "express";

import { authentication } from "../../../middleware/authenMiddleware";
import { getCurrentProfile } from "../../../middleware/getCurrentProfile";

import {
  deleteChannel,
  updateChannel,
  createChannelByServerId,
  getChannel,
} from "../../controllers/channels/channels.controller";

export const channelRouter = Router();

channelRouter.use(authentication as any);

channelRouter.post(
  "/",
  getCurrentProfile as any,
  createChannelByServerId as any
);
channelRouter.patch(
  "/:channelId",
  getCurrentProfile as any,
  updateChannel as any
);
channelRouter.delete(
  "/:channelId",
  getCurrentProfile as any,
  deleteChannel as any
);

channelRouter.get("/:channelId", getCurrentProfile as any, getChannel as any);
