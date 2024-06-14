import React, { useContext } from "react";
import DrawingBoardProvider from "../providers/DrawingBoardProvider";
import DrawingBoard from "./DrawingBoard";
import Chatbox from "./Chatbox";
import BrushSizePicker from "./BrushSizePicker";
import { GameContext } from "../providers/GameProvider";

const Area = () => {
  const { id, me } = useContext(GameContext);
  return (
    <>
      <h2>
        Hello {me?.username}, the room id is {id}. Invite your friends!
      </h2>
      <DrawingBoardProvider
        children={
          <div>
            <DrawingBoard height={400} width={600} />
            <BrushSizePicker />
          </div>
        }
      ></DrawingBoardProvider>

      <Chatbox />
    </>
  );
};

export default Area;
