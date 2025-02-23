"use client"
import { Moon, Sun, Users, Mail } from  "lucide-react";
import Image from "next/image";
import { useState } from "react";  
import Link from "next/link";
const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleToggle = (): void => {
    setIsDarkMode(!isDarkMode);
  };
    return (
      <header className="flex  sticky items-center w-full justify-between p-4 bg-white shadow">
        <Link href="/Auth" className="flex justify-between items-center gap-1">
          <Image src="/logo.svg" alt="Logo"  width={50} height={50} className="object-contain " />
            <p className="text-3xl hidden md:flex text-blue-800 font-edu font-bold">SafeSpace</p>
        </Link>         
        <div className="flex items-center gap-4">
          <div className={`app ${isDarkMode ? "dark" : "light"}`}>
            <a href="#" className="toggle-icon" onClick={handleToggle}>
              {isDarkMode ? <Moon /> : <Sun />}
            </a>
          </div>
          <Link href="/pages/Messages" className="">
          <Mail />
          </Link>
          <a href="" className="">
          <Users />
          </a>
            <Link href="/pages/suscription" className="btn-grad">
              Upgrage</Link>
         <Image
            src="/avatar.jpg"
            alt="User"
             width={50} height={50}
            className="h-12 w-12 rounded-full border border-gray-400"
          />  
        </div>
      </header>
    );
  };
  
  export default Header;
  