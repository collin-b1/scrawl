import { NextApiRequest } from "next";
import { Server as HTTPServer } from "http";
import { Server as IOServer } from "socket.io";
import NextApiResponseServerIO from "@/types/next";

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpServer: HTTPServer = res.socket.server as any;
    const io = new IOServer(httpServer, {
      path: "/api/socket",
    });
    res.socket.server.io = io;
  }
  res.end();
};

export const config = {
  api: {
    bodyParse: false,
  },
};

export default SocketHandler;
