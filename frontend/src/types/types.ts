export type User = {
  id: string;
  username: string;
};

export type RoundScore = {
  userId: string;
  username: string;
  score: number;
};

export type RoundTime = {
  timeToComplete: number;
  startTime: number;
};

export type Message = {
  body: string;
  author: string;
};

export type MessageRequest = {
  message: Message;
  id: string;
};
export type BoardEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>;
