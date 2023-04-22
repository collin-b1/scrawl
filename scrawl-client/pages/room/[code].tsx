import Link from "next/link";
import { useRouter } from "next/router";

export default function Room() {
  const router = useRouter();
  const { code } = router.query;
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
      <main className="flex flex-col md:mx-auto md:flex-row md:p-2">
        <div className="p-2 bg-slate-700 hidden">
          <h2 className="font-bold">Users</h2>
          <ul>
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
            <li>User 4</li>
            <li>User 5</li>
          </ul>
        </div>
        <div className="rounded flex-1 md:m-2 md:mr-0 md:p-2 max-w-3xl bg-slate-700">
          <canvas
            width="500"
            height="500"
            className="bg-white mx-auto"
          ></canvas>
        </div>
        <div className="rounded mt-2 md:m-2 p-2 bg-slate-700 text-center">
          <ul className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-2 w-full md:w-16 md:flex-col">
            <button className="w-full h-8 bg-red-500"></button>
            <button className="w-full h-8 bg-orange-500"></button>
            <button className="w-full h-8 bg-yellow-500"></button>
            <button className="w-full h-8 bg-green-500"></button>
            <button className="w-full h-8 bg-blue-500"></button>
            <button className="w-full h-8 bg-white text-black"></button>
            <button className="w-full h-8 bg-gray-500"></button>
            <button className="w-full h-8 bg-black"></button>
          </ul>
        </div>
      </main>
    </div>
  );
}
