import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        query: input
      });

      console.log("API Response:", res.data);

      const botMessage = {
        role: "bot",
        text: res.data.answer
      };

      // Append bot message (IMPORTANT FIX)
      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error fetching response" }
      ]);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full justify-between">

        {/* Chat messages */}
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

          {/* Loading indicator */}
          {loading && (
            <div className="bg-gray-800 text-white p-3 rounded-lg w-fit">
              Typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 flex gap-3">
          <input
            className="flex-1 p-3 rounded-lg bg-gray-800 text-white outline-none"
            placeholder="Ask ML question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}

            // ✅ ENTER KEY SUPPORT
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-purple-600 px-5 rounded-lg text-white disabled:opacity-50"
          >
            Send
          </button>
        </div>

      </div>
    </Layout>
  );
}