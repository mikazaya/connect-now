import React, { useContext, useLayoutEffect, useRef } from "react";
import { DrawingBoardContext } from "../providers/DrawingBoardProvider";
import { DrawingBoardContextProps } from "../types/interfaces";

interface DrawingBoardProps {
  width: number;
  height: number;
}
const DrawingBoard = (props: DrawingBoardProps) => {
  const context = useContext(DrawingBoardContext) as DrawingBoardContextProps;
  const ref = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    canvas.height = props.height;
    canvas.width = props.width;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    context.setCtx(ctx);
  }, [props.height, props.width]);
  return (
    <canvas
      className="border m-5 bg-white"
      ref={ref}
      onMouseDown={context.handleMouseDown}
      onMouseUp={context.handleMouseUp}
      onMouseMove={context.handleMouseMove}
    ></canvas>
  );
};

export default DrawingBoard;
