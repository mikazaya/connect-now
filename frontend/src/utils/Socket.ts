import * as SocketIOClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
class Socket {
  static socket: SocketIOClient.Socket | undefined;
  private static id?: string;
  public static initializeSocket(username: string, roomId?: string): void {
    if (!this.id) this.id = uuidv4();
    Socket.socket = SocketIOClient.io("http://localhost:5000", {
      transports: ["websocket"],
      query: {
        id: this.id,
        username: username,
        roomId: roomId,
      },
    });
  }
  public static getSocket(): SocketIOClient.Socket {
    return this.socket as SocketIOClient.Socket;
  }
  public static getId() {
    return this.id;
  }
}

export default Socket;
