import  { useContext } from "react";
import DrawingBoardProvider from "../providers/DrawingBoardProvider";
import DrawingBoard from "./DrawingBoard";
import Chatbox from "./Chatbox";
import BrushSizePicker from "./BrushSizePicker";
import { GameContext } from "../providers/GameProvider";
import ColorPicker from "./ColorPicker";
import ResetBoard from "./ResetBoard";

const Area = () => {
  const { id, me } = useContext(GameContext);
  const height = 400;
  const width = 600;
  return (
    <div className="border bg-gray-300">
      <h2 className="text-center">
        Hello {me?.username}, the room id is {id}. Invite your friends!
      </h2>
      <div className="flex justify-center items-end">
        <DrawingBoardProvider
          children={
            <div>
              <DrawingBoard height={height} width={width} />
              <BrushSizePicker />
              <ColorPicker />
              <ResetBoard cheight={height} cwidth={width} />
            </div>
          }
        ></DrawingBoardProvider>

        <Chatbox />
      </div>
    </div>
  );
};

export default Area;
