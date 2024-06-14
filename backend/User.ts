import * as SocketIO from "socket.io";
class User {
  id: string;
  socket: SocketIO.Socket;
  username: string;

  constructor(id: string, socket: SocketIO.Socket, username: string) {
    this.id = id;
    this.socket = socket;
    this.username = username;
  }

  describe() {
    return { id: this.id, username: this.username };
  }
}

export default User;
