import React, { useEffect, useState } from 'react';
import Message from '@/components/Message';

const Page = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetch('https://r5txq7sz-5000.asse.devtunnels.ms/get_chats')
      .then(response => response.json())
      .then(data => setChats(data.chats))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  return (
    <div className="flex flex-col space-y-4 p-4">
      {chats.map((chat) => (
        <div key={chat.chat_id} className="space-y-6">
          {chat.messages.map((msg) => (
            <div key={msg.message_id} className="flex flex-col space-y-2">
              <div className="text-left bg-gray-200 p-2 rounded-lg">{msg.prompt}</div>
              <div className="text-left bg-blue-200 p-2 rounded-lg">{msg.ai_response}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Page;
