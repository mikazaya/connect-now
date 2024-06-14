import React from "react";
import Socket from "../utils/Socket";

interface HomeProps {
  setUserName: (username: string) => void;
}

const Home = ({ setUserName }: HomeProps) => {
  const [usernameInput, setUserNameInput] = React.useState("");
  const [roomIdInput, setRoomIdInput] = React.useState("");
  return (
    <div className="bg-gray-300 p-6">
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          if (usernameInput === "") {
            return;
          }
          setUserName(usernameInput);
          Socket.initializeSocket(usernameInput, roomIdInput);
        }}
      >
        <input
          className="p-1 m-1  border-b-2 focus-visible:outline-none"
          type="text"
          placeholder="Enter your username"
          value={usernameInput}
          onChange={(e) => setUserNameInput(e.target.value)}
        />
        <input
          className="p-1  m-1 border-b-2 focus-visible:outline-none"
          type=""
          placeholder="Enter room id if you have one"
          value={roomIdInput}
          onChange={(e) => setRoomIdInput(e.target.value)}
        />
        <input
          className="p-1  m-1 bg-yellow-300 text-red-400 hover:cursor-pointer"
          type="submit"
          value="Enter"
        />
      </form>
    </div>
  );
};

export default Home;
