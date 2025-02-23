"use client";

import { postsData } from "@/app/data/postData";
import Active from "@/components/Active";
import LatestActivities from "@/components/LatestActivities";
import Responsive from "@/components/ProfileCard";  
import SocialPost from "@/components/SocialPosts";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col gap-4 p-6">
        {/* Profile Card */}
        <Responsive />

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Main Content: Social Posts */}
          <div className="flex-1 w-full">
            {postsData.map((post, index) => (
              <SocialPost
                key={index}
                userAvatar={post.userAvatar}
                userName={post.userName}
                timeAgo={post.timeAgo}
                content={post.content}
                images={post.images}
                video={post.video}
                reactions={post.reactions}
                comments={post.comments}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:flex flex-col gap-6 w-1/3 sticky top-6 h-full">
            <Active />
            <LatestActivities />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
