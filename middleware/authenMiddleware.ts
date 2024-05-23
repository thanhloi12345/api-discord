import { NextFunction, Request, Response } from "express";

export interface RequestWithAuth extends Request {
  auth: any;
  profile?: any;
}

export const authentication = (
  req: RequestWithAuth,
  res: Response,
  next: NextFunction
) => {
  req.auth = {
    sessionClaims: null,
    sessionId: null,
    session: null,
    userId: "user_2dvtXTjqpDQYoVDb8qBji0qOayu",
    user: null,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    organization: null,
    claims: null,
  };
  next();
};
