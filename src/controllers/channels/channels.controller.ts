import { RequestWithAuth } from "../../../middleware/authenMiddleware";

import { Response } from "express";
import { updateServerbyId } from "../../services/channels/channels.service";
import { db } from "../../utils/db.server";
import { MemberRole } from "@prisma/client";

export const createChannelByServerId = async (
  request: RequestWithAuth,
  respone: Response
) => {
  try {
    const profile = request.profile;
    const { name, type } = request.body;
    const serverId = request.query.serverId as string;

    if (!profile)
      return respone.status(401).json({
        message: "Authorization!",
      });

    if (!serverId) {
      return respone.status(400).json({
        message: "Server ID missing",
      });
    }
    if (name === "general") {
      return respone.status(400).json({
        message: "Name cannot be 'general'",
      });
    }

    const server = await updateServerbyId({
      serverId,
      profileId: profile.id,
      name,
      type,
    });
    return respone.status(200).json(server);
  } catch (error: any) {
    return respone.status(500).json({
      message: "Internal Error",
    });
  }
};

export const deleteChannel = async (req: RequestWithAuth, res: Response) => {
  try {
    const profile = req.profile;
    const serverId = req.query.serverId as string;
    const channelId = req.params.channelId as string;

    if (!profile) {
      return res.status(401).json({
        message: "Authorization!",
      });
    }

    if (!serverId) {
      return res.status(400).json({
        message: "Server ID missing",
      });
    }

    if (!channelId) {
      return res.status(400).json({ message: "Channel ID missing" });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return res.status(200).json(server);
  } catch (error) {
    console.log("[CHANNEL_ID_DELETE]", error);
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};

export const getChannel = async (req: RequestWithAuth, res: Response) => {
  try {
    const profile = req.profile;
    const channelId = req.params.channelId as string;

    if (!profile) {
      return res.status(401).json({
        message: "Authorization!",
      });
    }

    if (!channelId) {
      return res.status(400).json({ message: "Channel ID missing" });
    }

    const channel = await db.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    return res.status(200).json(channel);
  } catch (error) {
    console.log("[CHANNEL_ID_DELETE]", error);
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};

export const updateChannel = async (req: RequestWithAuth, res: Response) => {
  try {
    const profile = req.profile;
    const { name, type } = req.body;
    const serverId = req.query.serverId as string;

    const channelId = req.params.channelId as string;

    if (!profile) {
      return res.status(401).json({
        message: "Authorization!",
      });
    }

    if (!serverId) {
      return res.status(400).json({
        message: "Server ID missing",
      });
    }

    if (!channelId) {
      return res.status(400).json({ message: "Channel ID missing" });
    }

    if (name === "general") {
      return res.status(400).json({ message: "Name cannot be 'general'" });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return res.status(200).json(server);
  } catch (error) {
    console.log("[CHANNEL_ID_PATCH]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
};
