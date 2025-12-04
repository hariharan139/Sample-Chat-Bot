import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import "./Bot.css";

function Bot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3005/bot/v1/message", // ✅ correct port & path
        { text: input },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("RESPONSE:", res.data); // 👈 check this in browser console

      if (res.status === 200) {
        setMessages((prev) => [
          ...prev,
          { text: res.data.userMessage, sender: "user" },
          { text: res.data.botMessage, sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="nav-content">
          <h1>BotGPT</h1>
          <FaUserCircle size={30} className="user-icon" />
        </div>
      </header>

      <main className="chat-body">
        <div className="messages-box">
          {messages.length === 0 ? (
            <div className="welcome-text">
              👋 Hi, I'm <span className="highlight">BotSpoof</span>.
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${
                    msg.sender === "user" ? "user" : "bot"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && <div className="message bot">Bot is typing...</div>}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </main>

      <footer className="chat-footer">
        <div className="input-box">
          <input
            type="text"
            placeholder="Ask BotGPT..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </footer>
    </div>
  );
}

export default Bot;
