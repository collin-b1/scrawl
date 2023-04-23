import type { NextApiResponse } from "next";
import type { Server as NetServer, Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";

type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: NetServer & {
      io: IOServer;
    };
  };
};

export default NextApiResponseServerIO;
