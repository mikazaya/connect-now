import  { useContext } from "react";
import { DrawingBoardContext } from "../providers/DrawingBoardProvider";

const ResetBoard = ({
  cheight,
  cwidth,
}: {
  cheight: number;
  cwidth: number;
}) => {
  const { ctx } = useContext(DrawingBoardContext);
  return (
    <div
      className=" bg-yellow-300 text-red-500 text-center text-lg"
      onClick={() => ctx?.clearRect(0, 0, cwidth, cheight)}
    >
      Reset
    </div>
  );
};

export default ResetBoard;
