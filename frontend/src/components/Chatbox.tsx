import React, { useContext, useEffect, useState } from "react";
import { Message } from "../types/types";
import Socket from "../utils/Socket";
import ChatMessages from "./ChatMessages";
import ChatForm from "./ChatForm";
import { GameContext } from "../providers/GameProvider";
import ListUserItem from "./ListUserItem";

const Chatbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = Socket.getSocket();
  const { users } = useContext(GameContext);
  useEffect(() => {
    socket.on("chat-message", (message: Message) => {
      setMessages([...messages, message]);
    });
  }, [messages, socket]);
  return (
    <div className="flex p-3 h-400px">
      <div className="w-full">
        <ChatMessages messages={messages} />
        <ChatForm />
      </div>
      <ul className="p-2 m-2 rounded-lg">
        Users:
        {users?.map((u, i) => (
          <ListUserItem key={i} name={u.username} />
        ))}
      </ul>
    </div>
  );
};

export default Chatbox;
