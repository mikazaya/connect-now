import * as express from "express";
import * as SocketIO from "socket.io";
import { v4 as uuidv4 } from "uuid";
import Room from "./Room";
import User from "./User";
import { Line, Message } from "./models/types";
import ShortUniqueId from "short-unique-id";

const app = express();
const PORT = 5000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

const io: SocketIO.Socket = require("socket.io")(server);

const users: Map<string, Room> = new Map();
const rooms: Map<string, Room> = new Map();

const { randomUUID } = new ShortUniqueId({ length: 10 });

rooms.set("test", Room.create("test", io));
console.log(rooms["test"]);

const getRoom = (roomId?: string): Room | undefined => {
  let r: Room | undefined;
  if (roomId) {
    r = rooms.get(roomId);
  } else {
    const newRoomId: string = randomUUID();
    r = Room.create(newRoomId, io);
  }
  return r;
};
io.on("connection", (socket: SocketIO.Socket): void => {
  socket.onAny((event, message) => console.log(event, message));
  const user = new User(
    socket.handshake.query.id!.toString(), //Implement server side later
    socket,
    socket.handshake.query.username!.toString()
  );

  const room = getRoom(socket.handshake.query.roomId?.toString());
  if (!room) {
    socket.emit("error", "No room found");
    return;
  } else {
    socket.join(room.id);
    users.set(user.id, room);
    room.addUserRef(user);
    rooms.set(room.id, room);
  }
  socket.on("chat-message", (message: Message) => {
    room.broadcast(message);
  });

  socket.on("line-draw", (line: Line) => {
    room.broadcastEvent("line-draw", line);
  });

  socket.on("disconnect", (): void => {
    room.removeUserRef(user);
    users.delete(user.id);
    socket.leave(room.id);
  });
});
