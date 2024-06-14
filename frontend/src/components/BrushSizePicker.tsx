import React, { useContext } from "react";
import { DrawingBoardContext } from "../providers/DrawingBoardProvider";

const BrushSizePicker = () => {
  const { setBrushSize } = useContext(DrawingBoardContext);
  return (
    <div className="p-2 m-2">
      <ul className="flex justify-evenly items-center border border-green-100">
        <li
          className="bg-black size-2 rounded-lg"
          onClick={() => setBrushSize!(2)}
        ></li>
        <li
          className="bg-black size-4 rounded-lg"
          onClick={() => setBrushSize!(4)}
        ></li>
        <li
          className="bg-black size-6 rounded-lg"
          onClick={() => setBrushSize!(6)}
        ></li>
      </ul>
    </div>
  );
};

export default BrushSizePicker;
