import React, { useEffect } from "react";
import Home from "./components/Home";
import Socket from "./utils/Socket";
import GameProvider from "./providers/GameProvider";
import Area from "./components/Area";

function App() {
  const [username, setUserName] = React.useState<string | null>(null);

  const socket = Socket.getSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("error", (message: string) => {
      alert(`Error : ${message}`);
      window.location.reload();
    });
  }, [socket]);

  if (!username) {
    return <Home setUserName={setUserName} />;
  } else {
    return (
      <GameProvider
        me={{ username: username, id: Socket.getId()! }}
        children={<Area />}
        exitGame={() => {
          setUserName(null);
        }}
      ></GameProvider>
    );
  }
}

export default App;
