import type Player from "@/models/player";
import { Socket } from "socket.io";

export type Room = {
  code: string;
  players: Map<string, Player>;
};

export type ChatMessage = {
  body: string;
  author: string;
  timestamp: Date | null;
};

export type ChatAlert = {
  body: string;
  timestamp: Date | null;
};
