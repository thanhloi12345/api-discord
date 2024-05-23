import { NextFunction, Router } from "express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { initialProfile } from "../../controllers/profile/profile.controller";

export const profileRouter = Router();
profileRouter.use(ClerkExpressWithAuth() as any);
profileRouter.get("/initial-profile", initialProfile as any);
