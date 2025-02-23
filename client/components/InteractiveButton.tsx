"use client";
import React, { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface InteractiveButtonProps {
  icon: "heart" | "comment" | "share";
  initialCount: number;
}

const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  icon,
  initialCount,
}) => {
  const [count, setCount] = useState(initialCount);
  const [active, setActive] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (icon === "heart") {
      setActive(!active);
      setCount((prev) => (active ? prev - 1 : prev + 1));
    } else {
      // For comment/share, you might open a modal or perform another action
      alert(`Clicked ${icon}`);
    }
  };

  const icons = {
    heart: (
      <Heart size={32} className={active ? "text-red-500" : "text-white"} />
    ),
    comment: <MessageCircle size={32} className="text-white" />,
    share: <Share2 size={32} className="text-white" />,
  };

  return (
    <button onClick={handleClick} className="flex flex-col items-center text-white">
      {icons[icon]}
      <span className="text-xs">{count}</span>
    </button>
  );
};

export default InteractiveButton;
