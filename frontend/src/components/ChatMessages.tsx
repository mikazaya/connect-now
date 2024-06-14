import React from "react";
import { Message } from "../types/types";

const ChatMessages = ({ messages }: { messages: Message[] }) => {
  return (
    <div>
      {messages.map((m, i) => (
        <div key={i}>
          <b>{m.author}</b> : {m.body}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
