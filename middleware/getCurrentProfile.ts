import { NextFunction, Response } from "express";
import { RequestWithAuth } from "./authenMiddleware";
import { db } from "../src/utils/db.server";

export const getCurrentProfile = async (
  request: RequestWithAuth,
  respone: Response,
  next: NextFunction
) => {
  const { userId } = request.auth;
  if (!userId) {
    request.profile = null;
    next();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });
  request.profile = profile;
  next();
};
