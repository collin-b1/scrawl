import Link from "next/link";
import { useEffect, useReducer, useState } from "react";

export default function Home() {
  const [displayName, setDisplayName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (
      roomCode.length === 6 &&
      /^\d+$/.test(roomCode) &&
      displayName.length >= 3 &&
      displayName.length <= 20
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [valid, roomCode, displayName]);

  return (
    <main className="flex min-h-screen flex-col pt-24 px-4 md:px-24">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-2">scrawl</h1>

        <div className="w-full sm:max-w-sm">
          <form className="bg-slate-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <label htmlFor="roomCode" className="block text-sm font-bold mb-2">
              Room Code
            </label>
            <input
              type="text"
              maxLength={6}
              onChange={e => setRoomCode(e.target.value)}
              placeholder="123456"
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-slate-700 leading-tight focus:outline-none"
              name="roomCode"
              id="roomCode"
            />
            <label
              htmlFor="displayName"
              className="block text-sm font-bold mb-2"
            >
              Display Name
            </label>
            <input
              type="text"
              minLength={3}
              maxLength={20}
              onChange={e => setDisplayName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-slate-700 leading-tight focus:outline-none"
              name="displayName"
              id="displayName"
            />
            <Link href={`/room/${roomCode}`}>
              <input
                type="button"
                disabled={!valid}
                className="font-bold w-full h-12 rounded bg-teal-500 hover:bg-teal-600 disabled:bg-slate-500 focus:outline outline-2"
                value="Join Room"
              ></input>
            </Link>
          </form>
        </div>

        <p className="mb-4 text-center">or</p>

        <div className="w-full max-w-sm">
          <form className="bg-slate-700 shadow-md rounded px-8 pt-6 pb-6">
            <input
              type="button"
              className="font-bold w-full h-12 rounded bg-teal-500 hover:bg-teal-600 focus:outline outline-2"
              value="Create Room"
            />
          </form>
        </div>
      </div>
    </main>
  );
}
