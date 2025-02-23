"use client"; 
import Header from "@/components/Header";  
import Slider from "@/components/Slider"
import SupportChatbot from "@/components/SupportChatbot";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100"> 
      <Header /> 
      <div className="flex flex-grow"> 
        <Slider/> 
        <div className="flex-grow flex flex-col gap-4 overflow-hidden"> 
          {children}
        </div> 
        <SupportChatbot/>
      </div> 
    </div>
  );
}
