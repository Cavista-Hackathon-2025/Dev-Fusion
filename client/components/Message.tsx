"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, CheckCircle, Phone, Video, Send, Timer } from "lucide-react";

interface ChatMessage {
  id: number;
  type: "conversation" | "group";
  text: string;
  timestamp: number;
}

const Message: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Messages" | "Groups">("Messages");
  const [currentConversation, setCurrentConversation] = useState<number | null>(null);
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [disappearingDuration, setDisappearingDuration] = useState(10000);

  const conversations = [
    {
      id: 1,
      name: "Dr. Jenny Wilson",
      avatar: "/thera2.jpg",
      lastMessage: "Looking forward to our chat.",
      verified: true,
    },
    {
      id: 2,
      name: "Dr. Freya Davies",
      avatar: "/thera3.jpg",
      lastMessage: "Here to assist you anytime.",
      verified: true,
    },
  ];

  const groupChats = [
    {
      id: 3,
      name: "Mental Health Support Group",
      avatar: "/group 2.jpg",
      lastMessage: "Welcome to the group chat!",
    },
  ];

  const automatedResponses: Record<number, string> = {
    1: "Hello, I’m Dr. Jenny Wilson. How can I assist you today?",
    2: "Hello, I’m Dr. Freya Davies. How are you feeling today?",
  };

  // Handle automated response when conversation starts
  useEffect(() => {
    if (currentConversation && !isGroupChat) {
      const autoResponse = automatedResponses[currentConversation];
      if (autoResponse) {
        const message: ChatMessage = {
          id: currentConversation,
          type: "conversation",
          text: autoResponse,
          timestamp: Date.now(),
        };
        setChatHistory((prev) => [...prev, message]);
      }
    }
  }, [currentConversation, isGroupChat]);

  // Send message
  const handleSendMessage = () => {
    if (messageInput.trim() && currentConversation !== null) {
      const message: ChatMessage = {
        id: currentConversation,
        type: isGroupChat ? "group" : "conversation",
        text: messageInput,
        timestamp: Date.now(),
      };

      setChatHistory((prev) => [...prev, message]);
      setMessageInput("");

      // Automatically remove the message after the disappearing duration
      setTimeout(() => {
        setChatHistory((prev) =>
          prev.filter((msg) => msg.timestamp !== message.timestamp)
        );
      }, disappearingDuration);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/3 md:flex flex-col hidden bg-white border-r border-gray-200 p-4">
        {/* Search */}
        <div className="mb-4">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow bg-transparent outline-none text-sm text-gray-700"
            />
            <Search className="w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => {
              setActiveTab("Messages");
              setCurrentConversation(null);
              setIsGroupChat(false);
            }}
            className={`flex-grow text-center py-2 rounded-lg ${
              activeTab === "Messages" ? "bg-blue-500 text-white" : "text-gray-600"
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => {
              setActiveTab("Groups");
              setCurrentConversation(null);
              setIsGroupChat(true);
            }}
            className={`flex-grow text-center py-2 rounded-lg ${
              activeTab === "Groups" ? "bg-blue-500 text-white" : "text-gray-600"
            }`}
          >
            Groups
          </button>
        </div>

        {/* Conversations */}
        {activeTab === "Messages" &&
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => {
                setCurrentConversation(conversation.id);
                setIsGroupChat(false);
              }}
              className={`flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg ${
                currentConversation === conversation.id ? "bg-gray-200" : ""
              }`}
            >
              <Image
                src={conversation.avatar}
                alt={conversation.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-grow">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-800">{conversation.name}</span>
                  {conversation.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                </div>
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
              </div>
            </div>
          ))}

        {/* Group Chats */}
        {activeTab === "Groups" &&
          groupChats.map((group) => (
            <div
              key={group.id}
              onClick={() => {
                setCurrentConversation(group.id);
                setIsGroupChat(true);
              }}
              className={`flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg ${
                currentConversation === group.id ? "bg-gray-200" : ""
              }`}
            >
              <Image
                src={group.avatar}
                alt={group.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-grow">
                <span className="font-semibold text-gray-800">{group.name}</span>
                <p className="text-sm text-gray-500 truncate">{group.lastMessage}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Right Content */}
      <div className="flex-grow flex flex-col h-full">
        {/* Chat Header */}
        {currentConversation && (
          <div className="flex items-center justify-between bg-white p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Image
                src={
                  activeTab === "Messages"
                    ? conversations.find((conv) => conv.id === currentConversation)?.avatar || ""
                    : groupChats.find((group) => group.id === currentConversation)?.avatar || ""
                }
                alt=""
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-semibold text-gray-800 text-lg">
                {activeTab === "Messages"
                  ? conversations.find((conv) => conv.id === currentConversation)?.name || "Therapist"
                  : groupChats.find((group) => group.id === currentConversation)?.name || "Group"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Phone />
              <Video />
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto bg-white p-4 border border-gray-200">
          {chatHistory
            .filter((msg) => msg.id === currentConversation)
            .map((msg) => (
              <div
                key={msg.timestamp}
                className={`mb-2 p-3 rounded-lg ${
                  msg.type === "group" ? "bg-green-100" : "bg-blue-100"
                } max-w-xs`}
              >
                {msg.text}
              </div>
            ))}
        </div>

        {/* Input */}
        {currentConversation && (
          <div className="flex items-center bg-white p-4 border-t border-gray-200">
            <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-grow bg-gray-100 px-3 py-2 rounded-lg text-gray-700 focus:outline-none"
            />
            <button onClick={handleSendMessage} className="ml-4 text-blue-500">
              <Send />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
