import { useState } from 'react';
import Link from 'next/link'; // Import Next.js Link
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  label: string;
  to: string;
}

const Navigation: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const dropdownItems: DropdownItem[] = [
    { label: 'Section 1', to: '/community/section1' },
    { label: 'Section 2', to: '/community/section2' },
    { label: 'Section 3', to: '/community/section3' },
    { label: 'Section 4', to: '/community/section4' },
    { label: 'Section 5', to: '/community/section5' },
    { label: 'Section 6', to: '/community/section6' },
    { label: 'Section 7', to: '/community/section7' },
  ];

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Pages', to: '/pages' },
    { label: 'Blog', to: '/blog' },
    { label: 'Therapist', to: '/shop' },
    { label: 'Connect', to: '/courses' },
  ];

  return (
    <nav className="flex gap-4 text-xl font-nunito font-semibold">
      {navLinks.map(link => (
        <Link key={link.label} href={link.to} className="text-gray-700 hover:text-purple-400">
          {link.label}
        </Link>
      ))}

      <div className="relative">
        <button onClick={toggleDropdown} className="text-gray-700 flex gap-1 items-center hover:text-purple-400">
          Community <ChevronDown />
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md w-48">
            {dropdownItems.map(item => (
              <Link key={item.label} href={item.to} className="flex   px-4 py-2 text-gray-700 hover:bg-purple-100">
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
