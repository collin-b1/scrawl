import { NextApiRequest } from "next";
import { Server as HTTPServer } from "http";
import { Server as IOServer } from "socket.io";
import NextApiResponseServerIO from "@/types/next";

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

      socket.on("stroke", data => {
        socket.broadcast.emit("stroke", data);
      });

      socket.on("clear", () => {
        socket.broadcast.emit("clear");
      });
    });

    //console.log(io);

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
