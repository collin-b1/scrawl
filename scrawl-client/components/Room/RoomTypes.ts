import { Socket } from "socket.io-client";

interface RoomTypes {
  code: String;
  io: Socket;
  chat: String[];
}

export default RoomTypes;
