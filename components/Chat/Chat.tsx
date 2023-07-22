import { ChatMessage } from "@/lib/chat";
import { useState } from "react";

const Chat = () => {
  const [messageContent, setMessageContent] = useState<string>("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);

  const addChat = (author: string, body: string): void => {
    let timestamp: Date = new Date();
    setChatLog([...chatLog, { body, author, timestamp }]);
  };

  const addAlert = (body: string): void => {};

  const sendMessage = () => {
    addChat("User", messageContent);
    setMessageContent("");
  };

  return (
    <div className="flex flex-col flex-1 overflow-none rounded p-2 bg-slate-700">
      <h2 className="font-bold text-center mb-2">Chat</h2>
      <div id="chat-log" className="flex-col flex-1 overflow-y-scroll">
        {chatLog.map((message: ChatMessage, i) => (
          <p key={i} className="whitespace-normal break-all">
            <span className="font-bold">{message.author}: </span>
            {message.body}
          </p>
        ))}
      </div>
      <div className="flex w-full shadow">
        <input
          type="text"
          minLength={1}
          maxLength={100}
          onChange={e => setMessageContent(e.target.value)}
          className="appearance-none border rounded-l flex-1 py-1 px-2 text-slate-700 leading-tight focus:outline-none"
          name="message"
          value={messageContent}
        />
        <input
          type="button"
          className="w-16 h-full rounded-r bg-teal-500 hover:bg-teal-600 disabled:bg-slate-500"
          value="Send"
          onClick={sendMessage}
        ></input>
      </div>
    </div>
  );
};

export default Chat;
