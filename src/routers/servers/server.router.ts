import { Router } from "express";
import { authentication } from "../../../middleware/authenMiddleware";
import { getCurrentProfile } from "../../../middleware/getCurrentProfile";
import {
  createAServer,
  deleteServer,
  getAServer,
  leaveServer,
  updateInviteCode,
} from "../../controllers/servers/server.controller";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

export const serverRouter = Router();

serverRouter.use(ClerkExpressWithAuth() as any);

serverRouter.post("/", getCurrentProfile as any, createAServer as any);
serverRouter.delete(
  "/:serverId",
  getCurrentProfile as any,
  deleteServer as any
);
serverRouter.patch("/:serverId", getCurrentProfile as any, deleteServer as any);
serverRouter.patch(
  "/:serverId/invite-code",
  getCurrentProfile as any,
  updateInviteCode as any
);
serverRouter.patch(
  "/:serverId/leave",
  getCurrentProfile as any,
  leaveServer as any
);

serverRouter.get("/", getCurrentProfile as any, getAServer as any);
