import { Profile } from "@prisma/client";
import { db } from "../src/utils/db.server";

const seed = async () => {
  const profile = await db.profile.findMany();

  console.log(profile);

  return profile;
};

seed();
