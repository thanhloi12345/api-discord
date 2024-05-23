import { Router } from "express";
import { authentication } from "../../../middleware/authenMiddleware";
import { getCurrentProfile } from "../../../middleware/getCurrentProfile";
import {
  deleteMemberById,
  updateMemberById,
} from "../../controllers/members/member.controller";

export const memberRouter = Router();

memberRouter.use(authentication as any);

memberRouter.patch(
  "/:memberId",
  getCurrentProfile as any,
  updateMemberById as any
);
memberRouter.delete(
  "/:memberId",
  getCurrentProfile as any,
  deleteMemberById as any
);
