import "dotenv/config";
import express, { Express } from "express";

import cors from "cors";
import { profileRouter } from "./routers/profile/profile.router";
import { channelRouter } from "./routers/channels/channels.router";
import { memberRouter } from "./routers/members/member.router";
import { serverRouter } from "./routers/servers/server.router";
import { messageRouter } from "./routers/messages/message.router";
import { directMessageRouter } from "./routers/direct-messages/direct-message.router";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketRouter } from "./routers/socket.route";
import { StreamChat } from "stream-chat";

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app: Express = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/profiles/", profileRouter);
app.use("/api/channels/", channelRouter);
app.use("/api/members/", memberRouter);
app.use("/api/servers/", serverRouter);
app.use("/api/messages/", messageRouter);
app.use("/api/direct-messages/", directMessageRouter);
app.use("/api/socket/", socketRouter);

export const io = new Server(httpServer, {
  path: "/api/socket/io",
  addTrailingSlash: false,
});

httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
