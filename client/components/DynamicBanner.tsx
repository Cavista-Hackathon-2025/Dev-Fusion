'use client'  // This ensures the component is run on the client-side

import Image from 'next/image';

// Define the structure for route-specific content
type Content = {
  title: string;
  description: string;
  imgSrc: string;
};

// Props type for DynamicBanner
interface DynamicBannerProps {
  route: string;
}

const DynamicBanner: React.FC<DynamicBannerProps> = ({ route }) => {
  // Define content for each route
  const content: Record<string, Content> = {
    '/': {
      title: 'Welcome to Our Platform',
      description: 'Explore new opportunities and ideas.',
      imgSrc: '/images/home-banner.jpg',
    },
      '/community': {
        title: 'Welcome to Our Community',
        description: 'Join us in a safe and supportive space where healing and growth come first.',
        imgSrc: '/ban.jpg',
      },
    '/therapist': {
      title: 'Meet Our Therapist',
      description: 'Need some one to open up to talk to our profesional therapist ',
      imgSrc: '/ban.jpg',
    },
    '/members': {
      title: 'Member Directory',
      description: 'Good communication is the key to growing with good ideas.',
      imgSrc: '/images/members-banner.jpg',
    },
  };

  // Default content if route is not defined
  const defaultContent: Content = {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    imgSrc: '/images/default-banner.jpg',
  };

  // Select the content based on the current route
  const { title, description, imgSrc } = content[route] || defaultContent;

  return (
    <div className="relative bg-blue-800 text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imgSrc}
          alt={`${title} Banner`}
          fill
          className="object-cover object-center opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-64 md:h-80 lg:h-96 text-center px-4 md:px-8">
        <h1 className="text-3xl md:text-5xl  font-edu font-bold mb-4">{title}</h1>
        <p className="text-lg font-nunito md:text-xl">{description}</p>
      </div>
    </div>
  );
};

export default DynamicBanner;
