import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [
      ...messages,
      { role: "user", text: input }
    ];
    setMessages(newMessages);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        { query: input },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessages([
        ...newMessages,
        { role: "bot", text: res.data.answer }
      ]);

    } catch (err) {
      console.error(err);

      setMessages([
        ...newMessages,
        { role: "bot", text: "⚠️ Unauthorized / Error" }
      ]);
    }

    setInput("");
  };

  return (
    <Layout>
      <div className="flex flex-col h-full justify-between">

        {/* Messages */}
        <div className="p-6 space-y-4 overflow-y-auto h-[80vh]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[70%] ${
                msg.role === "user"
                  ? "ml-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 flex gap-3">
          <input
            className="flex-1 p-3 rounded-lg bg-gray-800 text-white outline-none"
            placeholder="Ask ML question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button
            onClick={sendMessage}
            className="bg-purple-600 px-5 rounded-lg text-white"
          >
            Send
          </button>
        </div>

      </div>
    </Layout>
  );
}