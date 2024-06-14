import { useContext } from "react";
import { DrawingBoardContext } from "../providers/DrawingBoardProvider";

const ColorPicker = () => {
  const { setColor } = useContext(DrawingBoardContext);
  return (
    <div>
      <ul className="flex flex-wrap justify-evenly border border-green-100 p-2">
        <li
          className="bg-red-600 size-4"
          onClick={() => setColor!("#FF0000")}
        ></li>
        <li
          className="bg-green-600 size-4"
          onClick={() => setColor!("#008000")}
        ></li>
        <li
          className="bg-black size-4"
          onClick={() => setColor!("#000000")}
        ></li>
        <li
          className="bg-gray-600 size-4"
          onClick={() => setColor!("#808080")}
        ></li>
        <li
          className="bg-blue-600 size-4"
          onClick={() => setColor!("#0000FF")}
        ></li>
        <li
          className="bg-black size-4"
          onClick={() => setColor!("#00000")}
        ></li>
      </ul>
    </div>
  );
};

export default ColorPicker;
