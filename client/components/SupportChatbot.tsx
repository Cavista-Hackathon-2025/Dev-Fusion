import React, { useState, useEffect } from "react";
import { ChatBubbleLeftEllipsisIcon, XMarkIcon } from "@heroicons/react/24/outline";

const SupportChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls chat window visibility
  const [showPopup, setShowPopup] = useState(false); // Controls popup visibility
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Hi! How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Show popup only if it's the user's first visit
    if (!localStorage.getItem("hasVisited")) {
      setShowPopup(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowPopup(false); // Hide popup when chat is opened
  };

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { sender: "user", text: input.trim() };
      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        let botResponse = "I'm glad you shared that with me.";
        if (input.toLowerCase().includes("sad")) {
          botResponse = "I'm sorry you're feeling sad. Remember, it's okay to feel this way.";
        } else if (input.toLowerCase().includes("happy")) {
          botResponse = "That's wonderful! I'm glad you're feeling good.";
        }

        setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      }, 1000);

      setInput("");
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Popup Message */}
      {showPopup && (
        <div className="fixed bottom-24 right-5 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
          <p className="mb-2">Need someone to talk to? 😊</p>
          <button
            onClick={handleOpenChat}
            className="bg-white text-blue-500 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            Chat with us!
          </button>
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-2 right-2 text-white"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Chat Avatar */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600"
        >
          <ChatBubbleLeftEllipsisIcon className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 h-96 shadow-lg rounded-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
            <span>Emotional Support</span>
            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.sender === "bot" ? "text-left" : "text-right"}`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === "bot"
                      ? "bg-gray-200 text-black"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="p-3 border-t">
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChatbot;
