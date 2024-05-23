import { Profile } from "@prisma/client";
import { db } from "../../utils/db.server";

const findAllProfile = async (): Promise<Profile[]> => {
  return db.profile.findMany();
};

const findProfileById = async (id: string): Promise<Profile | null> => {
  return db.profile.findUnique({
    where: {
      id: id,
    },
  });
};

const findProfileByUserId = async (userId: string): Promise<Profile | null> => {
  return db.profile.findUnique({
    where: {
      userId: userId,
    },
  });
};

export { findAllProfile, findProfileById, findProfileByUserId };
