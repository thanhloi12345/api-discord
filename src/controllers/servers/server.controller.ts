import { Response } from "express";
import { RequestWithAuth } from "../../../middleware/authenMiddleware";
import { insertAServer } from "../../services/servers/server.service";
import { db } from "../../utils/db.server";
import { v4 as uuidv4 } from "uuid";

export const createAServer = async (req: RequestWithAuth, res: Response) => {
  try {
    const { name, imageUrl } = await req.body;
    const profile = req.profile;

    if (!profile) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }

    const server = await insertAServer({
      profileId: profile.id,
      name,
      imageUrl,
    });

    return res.status(200).json(server);
  } catch (error: any) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getAServer = async (req: RequestWithAuth, res: Response) => {
  try {
    const profile = req.profile;

    if (!profile) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }

    const server = await db.server.findFirst({
      where: {
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    return res.status(200).json(server);
  } catch (error: any) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export async function deleteServer(req: RequestWithAuth, res: Response) {
  try {
    const profile = await req.profile;
    const serverId = req.params.serverId as string;

    if (!profile) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const server = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    });
    return res.status(200).json(server);
  } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}

export async function updateServer(req: RequestWithAuth, res: Response) {
  try {
    const profile = req.profile;
    const { name, imageUrl } = req.body;
    const serverId = req.params.serverId as string;

    if (!profile) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return res.status(200).json(server);
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}

export async function updateInviteCode(req: RequestWithAuth, res: Response) {
  try {
    const profile = await req.profile;
    const serverId = req.params.serverId as string;

    if (!profile) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!serverId) {
      return res.status(400).json({ message: "Server ID Missing" });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return res.status(200).json(server);
  } catch (error) {
    console.log("[SERVER_ID]", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function leaveServer(req: RequestWithAuth, res: Response) {
  try {
    const profile = req.profile;
    const serverId = req.params.serverId as string;

    if (!profile) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!serverId) {
      return res.status(400).json({ message: "Server ID Missing" });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: {
          not: profile.id,
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });

    return res.status(200).json(server);
  } catch (error) {
    console.log("[SERVER_ID_LEAVE]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
