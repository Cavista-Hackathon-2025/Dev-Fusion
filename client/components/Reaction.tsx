"use client";
import { useState } from "react";

type Reaction = {
  emoji: string;
  label: string;
  count: number;
};

const reactionsData: Reaction[] = [
  { emoji: "👍", label: "Like", count: 0 },
  { emoji: "❤️", label: "Love", count: 0 },
  { emoji: "😂", label: "Haha", count: 0 },
  { emoji: "😮", label: "Wow", count: 0 },
  { emoji: "😢", label: "Sad", count: 0 },
  { emoji: "😡", label: "Angry", count: 0 },
];

const Reaction = () => {
  const [reactions, setReactions] = useState<Reaction[]>(reactionsData);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  const handleReactionClick = (label: string) => {
    setReactions((prevReactions) =>
      prevReactions.map((reaction) =>
        reaction.label === label
          ? { ...reaction, count: reaction.count + 1 }
          : reaction
      )
    );
    setSelectedReaction(label);
  };

  return (
    <div className="relative flex items-center">
      {/* Default emoji shown */}
      <div className="relative group">
        <button
          className="text-xl p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          aria-label="Reactions"
        >
          👍
        </button>

        {/* Additional emojis shown on hover */}
        <div className="absolute top-0 left-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {reactions.map((reaction) => (
            <button
              key={reaction.label}
              onClick={() => handleReactionClick(reaction.label)}
              className={`flex flex-col items-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 ${
                selectedReaction === reaction.label ? "bg-blue-100" : ""
              }`}
            >
              <span className="text-xl">{reaction.emoji}</span>
              <span className="text-sm">{reaction.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reaction;
