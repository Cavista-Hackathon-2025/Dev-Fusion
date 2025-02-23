import { useState, useEffect } from "react";
import { Send, Bot, X } from "lucide-react"; // Import icons

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

const SupportChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Controls chat visibility

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendBotMessage("Hello! 😊 How are you feeling today?");
    }
  }, [isOpen]);

  const sendBotMessage = (content: string) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: true,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      isBot: false,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    processUserResponse(userInput.toLowerCase());
    setUserInput("");
  };

  const processUserResponse = (response: string) => {
    const positiveResponses = ["good", "great", "happy", "fine", "awesome"];
    const negativeResponses = ["sad", "tired", "bad", "not good", "depressed"];
    const concerningResponses = ["suicide", "kill myself", "death", "ending it", "no hope"];
    const testingResponses = ["test suicide", "test death", "test therapist"]; // Specific test words

    if (positiveResponses.some((word) => response.includes(word))) {
      sendBotMessage("That's wonderful to hear! 😊 Keep up the positivity! 💪");
    } else if (negativeResponses.some((word) => response.includes(word))) {
      sendBotMessage("I'm sorry you're feeling that way. 💙 Do you want to talk about it?");
    } else if (concerningResponses.some((word) => response.includes(word))) {
      sendBotMessage(
        "I'm really sorry you're feeling this way. 😔 You're not alone, and help is available. Please consider talking to a professional therapist. 💙"
      );
    } else if (testingResponses.some((word) => response.includes(word))) {
      sendBotMessage(
        "It looks like you're testing sensitive words. If you or someone you know is struggling, please reach out to a professional therapist. 💙"
      );
    } else {
      sendBotMessage("I see. Could you tell me more about how you're feeling?");
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Bot Icon (Click to Open Chat) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {/* Chatbox (Only Visible When Open) */}
      {isOpen && (
        <div className="flex flex-col w-80 border rounded-lg shadow-md bg-white">
          {/* Chat Header */}
          <div className="p-4 bg-blue-500 text-white font-bold flex justify-between items-center rounded-t-lg">
            <span className="flex items-center">
              <Bot className="mr-2" /> Support Chat
            </span>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex flex-col p-4 space-y-2 h-80 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-center space-x-2 ${
                  msg.isBot ? "self-start" : "self-end"
                }`}
              >
                {msg.isBot && <Bot className="text-gray-500" />}
                <div
                  className={`p-2 rounded-lg text-sm ${
                    msg.isBot ? "bg-gray-200" : "bg-blue-500 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex p-2 border-t">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l-lg focus:outline-none"
              placeholder="Type a message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 flex items-center"
              onClick={handleSendMessage}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;
