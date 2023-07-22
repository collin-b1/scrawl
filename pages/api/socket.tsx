import { NextApiRequest } from "next";
import { Server as HTTPServer } from "http";
import { Server as IOServer } from "socket.io";
import NextApiResponseServerIO from "@/lib/next";
import { CanvasEvent, GameEvent } from "@/lib/event";
import { Room } from "@/lib/types/game";
import Player from "@/models/player";

const rooms: Map<string, Room> = new Map<string, Room>();

const SocketHandler = async (
  req: NextApiRequest,
  res: NextApiResponseServerIO
) => {
  if (!res.socket.server.io) {
    console.log("Initializing socket server...");
    const httpServer: HTTPServer = res.socket.server as any;
    const io = new IOServer(httpServer, {
      path: "/api/socket",
    });

    io.on("connect", socket => {
      console.log(`Socket ${socket.id} connected.`);

      socket.on(CanvasEvent.STROKE, data => {
        socket.broadcast.emit(CanvasEvent.STROKE, data);
      });

      socket.on(CanvasEvent.CLEAR, () => {
        socket.broadcast.emit(CanvasEvent.CLEAR);
      });

      socket.on(GameEvent.JOIN_ROOM, (code: string, name: string) => {
        if (rooms.has(code)) {
          let player = new Player(name);
          socket.join(code);
        }
      });

      socket.on(GameEvent.LEAVE_ROOM, (code: string) => {
        if (rooms.has(code)) {
          socket.leave(code);
        }
      });

      socket.on(GameEvent.CREATE_ROOM, () => {
        let code: string = "";
        while (rooms.has(code) || code === "") {
          code = Math.random().toString().slice(2, 8); // Random padded 6 digit number (as string)
        }
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default SocketHandler;
