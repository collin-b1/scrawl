import express, { Express, Request, Response } from "express";
import * as http from "http";
import next, { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as socketio from "socket.io";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app: Express = express();
  const server: http.Server = http.createServer(app);
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  app.get("/test", async (_: Request, res: Response) => {
    res.send("Hello");
  });

  app.all("*", (req: any, res: any) => nextHandler(req, res));
});
