import { Response } from "express";
import { RequestWithAuth } from "../../../middleware/authenMiddleware";
import { db } from "../../utils/db.server";
import exp from "constants";

export const deleteMemberById = async (req: RequestWithAuth, res: Response) => {
  try {
    const profile = req.profile;

    const { memberId } = req.params;

    const { serverId } = req.query;

    if (!profile) {
      return res.status(401).json({
        message: "Unauthorization!",
      });
    }

    if (!serverId) {
      return res.status(400).json({
        message: "Server Id missing",
      });
    }

    if (!memberId) {
      return res.status(400).json({
        message: "Member ID missing",
      });
    }

    const server = await db.server.update({
      where: {
        id: serverId.toString(),
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return res.status(200).json(server);
  } catch (error: any) {
    return res.status(500).json({
      message: "internal Error",
    });
  }
};

export const updateMemberById = async (req: RequestWithAuth, res: Response) => {
  try {
    const profile = req.profile;
    const { role } = req.body;
    const { serverId }: any = req.query;
    const { memberId } = req.params;

    if (!profile) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    if (!serverId) {
      return res.status(400).json({
        message: "Server IS missing",
      });
    }

    if (!memberId) {
      return res.status(400).json({
        message: "Member ID missing",
      });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return res.status(200).json(server);
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};

