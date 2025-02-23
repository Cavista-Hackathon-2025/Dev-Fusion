"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";import InteractiveButton from "./InteractiveButton";
 ; // Adjust path as needed

interface Media {
  type: "video" | "image";
  src: string;
}

interface Profile {
  name: string;
  imageSrc: string;
  avatarSrc: string;
  media: Media[];
}

interface FeedModalProps {
  profile: Profile;
  initialMediaIndex: number;
  onClose: () => void;
}

const FeedModal: React.FC<FeedModalProps> = ({
  profile,
  initialMediaIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialMediaIndex);
  const media = profile.media[currentIndex];

  const goNext = () => {
    if (currentIndex < profile.media.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-90" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full h-full flex flex-col">
        {/* Media Display */}
        <div className="flex-1 relative">
          {media.type === "video" ? (
            <video
              src={media.src}
              loop
              autoPlay
              muted
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="absolute inset-0">
              <Image
                src={media.src}
                alt={`${profile.name} content`}
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
          )}
          {/* Navigation Buttons */}
          {profile.media.length > 1 && (
            <>
              {currentIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
                >
                  <ChevronLeft size={32} />
                </button>
              )}
              {currentIndex < profile.media.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                >
                  <ChevronRight size={32} />
                </button>
              )}
            </>
          )}
        </div>

        {/* Interactive Actions */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          {/* User Info & Caption */}
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image
                src={profile.avatarSrc}
                alt={`${profile.name} Avatar`}
                layout="fill"
                className="rounded-full border-2 border-white"
              />
            </div>
            <div className="text-white">
              <p className="font-bold">@{profile.name}</p>
              <p className="text-sm">This is a sample caption for the post.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <InteractiveButton icon="heart" initialCount={0} />
            <InteractiveButton icon="comment" initialCount={0} />
            <InteractiveButton icon="share" initialCount={0} />
            <button className="bg-red-600 text-white px-3 py-1 rounded-full">
              Go Live
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white"
        >
          <X size={32} />
        </button>
      </div>
    </div>
  );
};

export default FeedModal;
