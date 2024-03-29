import Canvas from "@/components/Canvas/Canvas";
import Chat from "@/components/Chat/Chat";
import GamePanel from "@/components/GamePanel/GamePanel";
import { PlayerList } from "@/components/GamePanel/Player/PlayerTypes";
import { GameStatus } from "@/lib/types/game";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const testPlayers: PlayerList = [
  {
    id: 0,
    displayName: "joe",
    score: 1423,
  },
  {
    id: 1,
    displayName: "sally",
    score: 100,
  },
  {
    id: 2,
    displayName: "buddy",
    score: 3200,
    admin: true,
  },
  {
    id: 3,
    displayName: "bobbert",
    score: 0,
  },
];

export default function Room() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.CONFIG);

  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    console.log("Attempting socket connection...");
    setSocket(io({ path: "/api/socket" }));
  }, []);

  if (socket) {
    socket.on("connect", async () => {
      console.log(`Connected as ${socket.id}.`);
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex w-full bg-slate-700 p-2">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-auto h-full"
            aria-label="Exit Room"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </Link>
        <h2 className="ml-auto">
          <span className="font-bold">{code}</span>
        </h2>
      </header>
      <main className="flex flex-col h-full max-h-screen-lg w-full max-w-screen-xl md:mx-auto md:flex-row md:p-2">
        <GamePanel players={testPlayers} />
        <Canvas socket={socket} />
        <Chat />
      </main>
      <footer></footer>
    </div>
  );
}
