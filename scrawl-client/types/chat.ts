export type ChatMessage = {
  body: string;
  author: string;
  timestamp: Date | null;
};

export type ChatAlert = {
  body: string;
  timestamp: Date | null;
};
