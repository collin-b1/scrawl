import { NextApiResponse } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useReducer, useState } from "react";

export default function Home() {
  const [displayName, setDisplayName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [validDisplayName, setValidDisplayName] = useState(false);
  const [validCode, setValidCode] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (displayName.length >= 3 && displayName.length <= 20) {
      setValidDisplayName(true);
    } else {
      setValidDisplayName(false);
    }
  }, [validDisplayName, displayName]);

  useEffect(() => {
    if (roomCode.length === 6 && /^\d+$/.test(roomCode)) {
      setValidCode(true);
    } else {
      setValidCode(false);
    }
  }, [validCode, roomCode]);

  const handleCreateRoom = async (e: any) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ displayName }),
    };

    const response = await fetch("/api/room", options);
    const result = await response.json();

    if (response.status === 200) {
      router.push(`/room/${result.code}`);
    } else {
      window.alert("Invalid display name!");
    }
  };

  return (
    <main className="min-h-screen pt-24 px-4 md:px-24">
      <h1 className="text-3xl font-bold mb-2 text-center">scrawl</h1>
      <div className="flex flex-col sm:flex-row align-center justify-center">
        <div className="p-2">
          <div className="w-full sm:max-w-sm">
            <form className="bg-slate-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
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
            </form>
          </div>
        </div>
        <div className="p-2">
          <div className="w-full sm:max-w-sm">
            <form className="bg-slate-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <label
                htmlFor="roomCode"
                className="block text-sm font-bold mb-2"
              >
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
              <Link href={`/room/${roomCode}`}>
                <input
                  type="button"
                  disabled={!validDisplayName || !validCode}
                  className="font-bold w-full h-12 rounded bg-teal-500 hover:bg-teal-600 disabled:bg-slate-500 focus:outline outline-2"
                  value="Join Room"
                ></input>
              </Link>
            </form>
          </div>

          <p className="mb-4 text-center">or</p>

          <div className="w-full sm:max-w-sm">
            <form
              onSubmit={handleCreateRoom}
              className="bg-slate-700 shadow-md rounded px-8 pt-6 pb-6"
            >
              <input
                type="submit"
                disabled={!validDisplayName}
                className="font-bold w-full h-12 mb-4 rounded bg-teal-500 hover:bg-teal-600 focus:outline outline-2"
                value="Create Room"
              />
              <Link href={`/offline`}>
                <input
                  type="button"
                  className="font-bold w-full h-12 rounded bg-teal-500 hover:bg-teal-600 disabled:bg-slate-500 focus:outline outline-2"
                  value="Play Offline"
                ></input>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
