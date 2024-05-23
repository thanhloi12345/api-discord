import { ChannelType, MemberRole } from "@prisma/client";
import { db } from "../../utils/db.server";

type ServerPayload = {
  serverId: string;
  profileId: string;
  name: string;
  type: ChannelType;
};

export const updateServerbyId = async ({
  serverId,
  profileId,
  name,
  type,
}: ServerPayload) => {
  const server = await db.server.update({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profileId,
          role: {
            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
          },
        },
      },
    },
    data: {
      channels: {
        create: {
          profileId: profileId,
          name,
          type,
        },
      },
    },
  });

  return server;
};
