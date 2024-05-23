export type DataRespone = {
  message: string;
  data: any;
};

type Profile = {
  userId: string;
  name: string;
  imageUrl?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  favoriteColor?: string;
};

type Server = {
  id: string;
  name: string;
  imageUrl: string;
  inviteCode: string;
  profileId: string;
  members?: Member[];
  channels?: Channel[];
  createdAt: string;
  updatedAt: string;
};

type Member = {
  id: string;
  role: string;
  profileId: string;
  serverId: string;
  createdAt: string;
  updatedAt: string;
  profile?: Profile;
};

type Channel = {
  id: string;
  name: string;
  type: string;
  profileId: string;
  serverId: string;
  messages?: Message[];
  createdAt: string;
  updatedAt: string;
  description?: string;
};

type Message = {
  id: string;
  content?: string;
  fileUrls?: fileType[];
  memberId?: string;
  channelId: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  member?: Member;
};

type fileType = {
  type: string;
  url: string;
  fileName?: string;
  size?: number;
};

type Conversation = {
  memberOneId: string;
  memberTwoId: string;
  createdAt: string;
  updatedAt: string;
};

type DirectMessage = {
  content: string;
  fileUrl?: string;
  memberId: string;
  conversationId: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
};

enum MemberRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  GUEST = "GUEST",
}
enum ChannelType {
  TEXT = "TEXT",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
}
enum MessageType {
  TEXT = "TEXT",
  RECORD = "RECORD",
  PDF = "PDF",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  FILE = "FILE",
}
export {
  DirectMessage,
  Conversation,
  Message,
  Channel,
  Member,
  Server,
  Profile,
  ChannelType,
  MemberRole,
  MessageType,
  fileType,
};
