"use client";
 
import AuthForm from "@/components/Auth-comp/authForm";
import Carousel from "@/components/Auth-comp/carousel";
import React from "react"; 

const Registration: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Carousel />
      <AuthForm />
    </div>
  );
};

export default Registration;