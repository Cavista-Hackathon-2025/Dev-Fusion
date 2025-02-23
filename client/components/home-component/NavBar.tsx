import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-black">Logo</div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 text-gray-600 font-medium">
        <li>
          <Link href="#" className="hover:text-gray-900 transition">
            Services
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-gray-900 transition flex items-center">
            Pricing <span className="ml-1">▼</span>
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-gray-900 transition">
            Portfolio
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-gray-900 transition">
            Contact us
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-gray-900 transition">
            About us
          </Link>
        </li>
      </ul>

      {/* Register/Login Button */}
      <Link
        href="#"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition font-semibold"
      >
        Register / Login
      </Link>
    </nav>
  );
};

export default Navbar;
