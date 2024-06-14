import React, { useContext, useEffect, useState } from "react";
import { Message } from "../types/types";
import Socket from "../utils/Socket";
import ChatMessages from "./ChatMessages";
import ChatForm from "./ChatForm";
import { GameContext } from "../providers/GameProvider";

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
    <div>
      {users?.map((u, i) => (
        <div key={i}>{u.username}</div>
      ))}
      <ChatMessages messages={messages} />
      <ChatForm />
    </div>
  );
};

export default Chatbox;
