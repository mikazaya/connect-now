import React from "react";
import { GameContextProps } from "../types/interfaces";
import { User } from "../types/types";
import Socket from "../utils/Socket";

export const GameContext = React.createContext<Partial<GameContextProps>>({});

interface GameProviderProps {
  children: React.ReactNode;
  me: User;
  exitGame: () => void;
}

const GameProvider = (props: GameProviderProps) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [roomId, setRoomId] = React.useState("");
  const socket = Socket.getSocket();

  React.useEffect(() => {
    socket.on("user-join", (data: { users: User[]; id: string }) => {
      const allUsers = data.users;
      setRoomId(data.id);
      setUsers([...allUsers]);
    });
    socket.on("user-leave", (allUsers: User[]) => {
      setUsers([...allUsers]);
      console.log(allUsers);
    });

    return () => {
      socket.removeListener("user-join");
      socket.removeListener("user-leave");
    };
  }, [socket, users]);
  return (
    <GameContext.Provider
      value={{
        users: users,
        me: props.me,
        id: roomId,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
