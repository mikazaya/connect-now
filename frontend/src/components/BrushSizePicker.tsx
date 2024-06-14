import React, { useContext } from "react";
import { DrawingBoardContext } from "../providers/DrawingBoardProvider";

const BrushSizePicker = () => {
  const { setBrushSize } = useContext(DrawingBoardContext);
  return (
    <div>
      <ul>
        <li onClick={() => setBrushSize!(1)}>1</li>
        <li onClick={() => setBrushSize!(2)}>2</li>
        <li onClick={() => setBrushSize!(3)}>3</li>
      </ul>
    </div>
  );
};

export default BrushSizePicker;
