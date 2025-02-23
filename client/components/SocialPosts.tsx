import React, { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";

interface PostProps {
  userAvatar: string;
  userName: string;
  timeAgo: string;
  content: string;
  images: string[];
  video?: string;
  reactions: string;
  comments: string[];
}

const SocialPost: React.FC<PostProps> = ({
  userAvatar,
  userName,
  timeAgo,
  content,
  images,
  video,
  reactions,
  comments,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="w-full max-w-xl bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-50">
            <Image
              src={userAvatar}
              alt={userName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 leading-none">{userName}</h3>
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>

      {/* Media Content */}
      {images.length > 0 && (
        <div className={`grid ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-0.5`}>
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`relative ${
                images.length === 3 && index === 0 ? 'col-span-2' : ''
              } ${
                images.length === 1 ? 'h-96' : 'h-72'
              }`}
            >
              <Image
                src={image}
                alt={`Post content ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {video && (
        <div className="relative w-full h-96">
          <video 
            controls 
            className="w-full h-full object-cover"
            poster="/video-thumbnail.jpg"
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" />
            </div>
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" />
            </div>
          </div>
          <span>{reactions}</span>
        </div>
        <div className="flex gap-4">
          <span>{comments.length} comments</span>
          <span>3 shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex border-y border-gray-100">
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-50 transition-colors ${
            isLiked ? 'text-blue-500' : 'text-gray-600'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span className="font-medium">Like</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 text-gray-600 hover:bg-gray-50 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 text-gray-600 hover:bg-gray-50 transition-colors">
          <Share className="w-5 h-5" />
          <span className="font-medium">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      <div className="p-4 space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="flex gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/avatar.jpg"
                alt="Commenter"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-2xl px-4 py-2">
                <h4 className="font-semibold text-sm text-gray-900">Commenter</h4>
                <p className="text-sm text-gray-700">{comment}</p>
              </div>
              <div className="flex gap-4 mt-1 ml-4">
                <button className="text-xs font-medium text-gray-500 hover:text-gray-700">Like</button>
                <button className="text-xs font-medium text-gray-500 hover:text-gray-700">Reply</button>
                <span className="text-xs text-gray-500">4h</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input */}
      <div className="p-4 flex gap-3 border-t border-gray-100">
        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={userAvatar}
            alt="Your avatar"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Write a comment..."
            className="w-full px-4 py-2 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialPost;