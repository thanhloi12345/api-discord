import { Request, Response } from "express";
import cleck from "@clerk/clerk-sdk-node";
import { RequestWithAuth } from "../../../middleware/authenMiddleware";
import { db } from "../../../core/config";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Profile } from ".././../../types/type";
import "dotenv/config";
import { StreamChat } from "stream-chat";

const { STREAM_API_KEY, STREAM_API_SECRET } = process.env;
const client = StreamChat.getInstance(STREAM_API_KEY!, STREAM_API_SECRET);

const createAProfile = async (request: RequestWithAuth, respone: Response) => {
  const { userId } = request.auth;
  console.log(userId);
  const user = await cleck.users.getUser(userId);
  console.log(user);
  if (!user) {
    return respone.status(401).json({
      message: "Unauthorization!",
    });
  }
  const profile = await getProfileByUserId(user.id);
  if (profile) {
    const users = await client.queryUsers({ id: user.id });

    if (users.users.length <= 0) {
      await client.upsertUser({
        id: profile.userId,
        email: profile.email,
        image: profile.imageUrl,
        name: profile.name,
      });
    }

    const token = client.createToken(user.id);
    return respone.status(200).json({
      profile,
      token: token,
    });
  }
  const name = user.firstName
    ? // @ts-ignore
      `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
    : // @ts-ignore
      user.id;

  const newProfile = await createProfile({
    userId: user.id,
    name: name,
    imageUrl: user?.imageUrl,
    email: user.emailAddresses[0].emailAddress,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  await client.upsertUser({
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    image: user?.imageUrl,
    name: name,
  });

  const token = client.createToken(user.id);
  return respone.status(201).json({
    profile: newProfile,
    token: token,
  });
};

const initialProfile = async (request: RequestWithAuth, respone: Response) => {
  const { userId } = request.auth;

  const user = await cleck.users.getUser(userId);

  if (!user) {
    return respone.status(401).json({
      message: "Unauthorization!",
    });
  }
  const profile = await getProfileByUserId(user.id);
  if (profile) {
    const users = await client.queryUsers({ id: user.id });

    if (users.users.length <= 0) {
      await client.upsertUser({
        id: profile.userId,
        email: profile.email,
        image: profile.imageUrl,
        name: profile.name,
      });
    }

    const token = client.createToken(user.id);
    console.log(token);
    return respone.status(200).json({
      profile,
      token: token,
    });
  }
  const name = user.firstName
    ? // @ts-ignore
      `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
    : // @ts-ignore
      user.id;

  const newProfile = await createProfile({
    userId: user.id,
    name: name,
    imageUrl: user?.imageUrl,
    email: user.emailAddresses[0].emailAddress,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  await client.upsertUser({
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    image: user?.imageUrl,
    name: name,
  });

  const token = client.createToken(user.id);
  return respone.status(201).json({
    profile: newProfile,
    token: token,
  });
};

export async function getProfileByUserId(
  userId: string
): Promise<Profile | null> {
  try {
    const profileRef = collection(db, "profiles");
    const q = query(profileRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const profileDoc = querySnapshot.docs[0];
      return profileDoc.data() as Profile;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

async function createProfile(profile: Profile): Promise<Profile> {
  try {
    const docRef = doc(db, "profiles", profile.userId);
    await setDoc(docRef, profile);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Profile;
    } else {
      throw new Error("Error retrieving created profile");
    }
  } catch (error) {
    throw error;
  }
}

export { initialProfile };
