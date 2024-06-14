import React from "react";
import Socket from "../utils/Socket";

interface HomeProps {
  setUserName: (username: string) => void;
}

const Home = ({ setUserName }: HomeProps) => {
  const [usernameInput, setUserNameInput] = React.useState("");
  const [roomIdInput, setRoomIdInput] = React.useState("");
  return (
    <div>
      <form
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
          type="text"
          placeholder="Enter your username"
          value={usernameInput}
          onChange={(e) => setUserNameInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter room id if you have one"
          value={roomIdInput}
          onChange={(e) => setRoomIdInput(e.target.value)}
        />
        <input type="submit" value="Enter" />
      </form>
    </div>
  );
};

export default Home;
