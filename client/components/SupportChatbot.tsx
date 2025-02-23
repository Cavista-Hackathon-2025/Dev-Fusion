import React, { useEffect, useState } from 'react';
import { ChatBubbleLeftEllipsisIcon, XMarkIcon } from "@heroicons/react/24/outline";

const SupportChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("hasVisited")) {
      setShowPopup(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  useEffect(() => {
    fetch('https://your-api-url.com/messages')
      .then(response => response.json())
      .then(data => setMessages(data.chats.flatMap(chat => chat.messages)))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  return (
    <div className="fixed bottom-5 right-5">
      {showPopup && (
        <div className="fixed bottom-24 right-5 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
          <p className="mb-2">Need someone to talk to? 😊</p>
          <button
            onClick={() => setIsOpen(true)}
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

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600"
        >
          <ChatBubbleLeftEllipsisIcon className="w-8 h-8 text-white" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-80 h-96 shadow-lg rounded-lg flex flex-col overflow-hidden">
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
            <span>Emotional Support</span>
            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === "bot" ? "text-left" : "text-right"}`}>
                <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "bot" ? "bg-gray-200 text-black" : "bg-blue-500 text-white"}`}>
                  {msg.prompt || msg.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChatbot;
