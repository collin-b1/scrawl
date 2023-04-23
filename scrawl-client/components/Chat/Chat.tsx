import { useState } from "react";

interface ChatProps {}

const Chat = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col rounded p-2 bg-slate-700">
      <ul className="flex-1">
        <li>Chat 1</li>
      </ul>
      <div className="flex w-full shadow">
        <input
          type="text"
          minLength={1}
          maxLength={100}
          onChange={e => setMessage(e.target.value)}
          className="appearance-none border rounded-l flex-1 py-1 px-2 text-slate-700 leading-tight focus:outline-none"
          name="message"
        />
        <input
          type="button"
          className="w-16 h-full rounded-r bg-teal-500 hover:bg-teal-600 disabled:bg-slate-500"
          value="Send"
        ></input>
      </div>
    </div>
  );
};

export default Chat;
