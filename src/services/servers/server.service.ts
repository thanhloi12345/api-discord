import { MemberRole } from "@prisma/client";
import { db } from "../../utils/db.server";

import { v4 as uuidv4 } from "uuid";

type ServerPayload = {
  profileId: string;
  name: string;
  imageUrl: string;
};
export const insertAServer = async ({
  profileId,
  name,
  imageUrl,
}: ServerPayload) => {
  const server = await db.server.create({
    data: {
      profileId: profileId,
      name,
      imageUrl,
      inviteCode: uuidv4(),
      channels: {
        create: [{ name: "general", profileId: profileId }],
      },
      members: {
        create: [{ profileId: profileId, role: MemberRole.ADMIN }],
      },
    },
  });

  return server;
};
