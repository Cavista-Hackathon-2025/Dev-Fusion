 
import Image from "next/image";

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
  return (
    <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg mb-6">
      {/* Post Header */}
      <div className="flex items-center  mb-4">
        <Image
          src={userAvatar}
          alt={`${userName} Avatar`}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-3">
          <h3 className="font-semibold text-sm">{userName}</h3>
          <p className="text-xs text-gray-500">posted an update • {timeAgo}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="mb-4 text-sm text-gray-800">{content}</p>

      {/* Post Images */}
      {images.length > 0 && (
        <div className={`flex flex-wrap gap-2 w-full mb-4`}>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Post Image ${index + 1}`}
              width={200}
              height={200}
              className="rounded-md object-contain w-[40%]"
            />
          ))}
        </div>
      )}

      {/* Post Video */}
      {video && (
        <div className=" flex items-center justify-centermb-4">
          <video controls className="w-1/2 rounded-md">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Reactions and Comments */}
      <div className="text-sm text-gray-600 mb-4">{reactions}</div>

      {/* Comment Section */}
      <div className="border-t pt-4">
        {comments.map((comment, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <Image
                src="/avatar.jpg"
                alt="Commenter Avatar"
                width={30}
                height={30}
                className="rounded-full"
              />
              <div className="ml-3">
                <h4 className="font-semibold text-sm">Commenter</h4>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <p className="text-sm text-gray-800">{comment}</p>
          </div>
        ))}
      </div>

      {/* Like, Comment, and Share Buttons */}
      <div className="flex items-center space-x-4">
        <button className="text-blue-500 text-sm font-semibold">Like</button>
        <button className="text-blue-500 text-sm font-semibold">Comment</button>
        <button className="text-blue-500 text-sm font-semibold">Share</button>
      </div>
    </div>
  );
};

export default SocialPost;
