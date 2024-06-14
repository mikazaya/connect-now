import React from "react";
import { Message } from "../types/types";

const ChatMessages = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="h-4/5 overflow-auto bg-white flex flex-col justify-center rounded-lg w-full">
      {messages.map((m, i) => (
        <div key={i}>
          <b>{m.author}</b> : {m.body}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
