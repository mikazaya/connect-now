import React from "react";
import { DrawingBoardContextProps, Line } from "../types/interfaces";

import Socket from "../utils/Socket";
import { BoardEvent } from "../types/types";

export const DrawingBoardContext = React.createContext<
  Partial<DrawingBoardContextProps>
>({});

interface DrawingBoardProviderProps {
  children: React.ReactNode;
}

const DrawingBoardProvider = (props: DrawingBoardProviderProps) => {
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D>();
  const [color, setColor] = React.useState("#000000");
  const [brushSize, setBrushSize] = React.useState(10);
  const socket = Socket.getSocket();

  React.useEffect(() => {
    socket.on("line-draw", (line: Line) => {
      drawLine(line);
    });
  });
  const drawLine = (line: Line) => {
    if (!ctx) return;
    ctx.strokeStyle = line.color;
    ctx.lineWidth = line.brushSize;
    ctx.lineTo(line.x, line.y);
    ctx.stroke();
    if (line.isEnding) {
      ctx.beginPath();
    }
  };
  const draw = (ev: BoardEvent, isEnding = false) => {
    if (!ctx || !isDrawing) {
      return;
    }
    const newLine = {
      x: ev.clientX - ctx.canvas.offsetLeft,
      y: ev.clientY - ctx.canvas.offsetTop,
      color,
      brushSize,
      isEnding,
    };
    drawLine(newLine);
    socket.emit("line-draw", newLine);
  };
  const handleMouseMove = (ev: BoardEvent): void => {
    draw(ev);
  };
  const handleMouseDown = (ev: BoardEvent): void => {
    setIsDrawing(true);
    draw(ev);
  };
  const handleMouseUp = (ev: BoardEvent): void => {
    draw(ev, true);
    setIsDrawing(false);
  };
  return (
    <DrawingBoardContext.Provider
      value={{
        isDrawing,
        setIsDrawing,
        setColor,
        setBrushSize,
        ctx,
        setCtx,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
      }}
    >
      {props.children}
    </DrawingBoardContext.Provider>
  );
};

export default DrawingBoardProvider;
