import RoundState from "./models/enums";
import { Message } from "./models/types";
import Round from "./Round";
import User from "./User";
import * as SocketIO from "socket.io";
class Room {
  id: string;
  userRefs: Map<string, User>;
  io: SocketIO.Socket;
  round: Round;
  private constructor(roomId: string, io: SocketIO.Socket) {
    this.id = roomId;
    this.io = io;
    this.userRefs = new Map();
  }

  static create(roomId: string, io: SocketIO.Socket): Room {
    return new Room(roomId, io);
  }

  addUserRef(user: User) {
    this.userRefs.set(user.id, user);
    const r: { id: string; username: string }[] = [];
    this.userRefs.forEach((val) => r.push(val.describe()));
    this.broadcastEvent("user-join", { users: r, id: this.id });
  }
  removeUserRef(user: User) {
    this.userRefs.delete(user.id);
    const r: { id: string; username: string }[] = [];
    this.userRefs.forEach((val) => r.push(val.describe()));
    this.broadcastEvent("user-leave", r);
  }

  broadcast(message: Message) {
    this.io.to(this.id).emit("chat-message", message);
  }
  broadcastEvent(event: string, message: unknown) {
    this.io.to(this.id).emit(event, message);
  }

  startRound() {
    if (this.round.state === RoundState.running) return;
    this.round = new Round();
    this.round.startRound();
  }
}

export default Room;
