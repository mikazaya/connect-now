import React, { useContext, useState } from "react";
import { Message } from "../types/types";
import Socket from "../utils/Socket";
import { GameContext } from "../providers/GameProvider";

const ChatForm = () => {
  const [chatInput, setChatInput] = useState("");
  const socket = Socket.getSocket();
  const { me } = useContext(GameContext);
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatInput === "") return;
    const message: Message = {
      body: chatInput,
      author: me!.username,
    };

    socket.emit("chat-message", message);
  };
  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        sendMessage(e);
        setChatInput("");
      }}
    >
      <input
        className="p-1 m-1 border-b-2 focus-visible:outline-none"
        type="text"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
      />
    </form>
  );
};

export default ChatForm;
