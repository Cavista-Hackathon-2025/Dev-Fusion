import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 p-10 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 className="text-white font-bold text-lg">Logo</h3>
          <p className="mt-2 text-sm">
            We are a lorem ipsum dolor sit amet, consectetur adipiscing elit. Read More
          </p>
          <div className="flex space-x-3 mt-4">
            <FaFacebook size={20} />
            <FaTwitter size={20} />
            <FaInstagram size={20} />
            <FaLinkedin size={20} />
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold">About</h4>
          <ul className="text-sm space-y-2 mt-2">
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Jobs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold">Support</h4>
          <ul className="text-sm space-y-2 mt-2">
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">Online Chat</Link></li>
            <li><Link href="#">WhatsApp</Link></li>
            <li><Link href="#">Telegram</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold">FAQ</h4>
          <ul className="text-sm space-y-2 mt-2">
            <li><Link href="#">Account</Link></li>
            <li><Link href="#">Manage Deliveries</Link></li>
            <li><Link href="#">Orders</Link></li>
            <li><Link href="#">Payments</Link></li>
          </ul>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mt-8">&copy; 2000-2024, All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
