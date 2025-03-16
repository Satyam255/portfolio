"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowDownToLine, Github } from "lucide-react";
import FloatingDockDemo from "./floatingBar";

const Index = () => {
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
  {/* Background Beams positioned absolutely to cover the left side */}
  <BackgroundBeams className="absolute inset-0 z-0" />

  {/* Content Container */}
  <div className="max-w-md w-full px-6 py-12 relative z-10 text-center">
    <div className="flex flex-col items-center space-y-8">
      {/* Profile Image Section */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 "></div>
        <Avatar className="w-32 h-32 border-2 border-white/20">
          <AvatarImage 
            src="profile.jpg"
            alt="Profile"
            className="object-cover"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
      
      {/* Name and Title */}
      <div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 pb-2">
          Noty Saty
        </h1>
        <p className="text-xl text-white/60 bg-transparent">
          Full Stack Developer
        </p>
      </div>
      
      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button 
          variant="default" 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0 hover:opacity-90 transition-all duration-300"
          onClick={() => window.open('/resume.pdf', '_blank')}
        >
          <ArrowDownToLine /> Resume
        </Button>
        <Button 
          variant="outline"
          className="flex items-center border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover:text-white "
          onClick={() => window.open('https://github.com/Satyam255', '_blank')}
        >
          <Github />
          GitHub
        </Button>
      </div>

      {/* About Me Section */}
      <div className="w-full bg-transparent">
        <h2 className="text-2xl font-semibold mb-3 ">About Me</h2>
        <div className= " backdrop-blur-sm p-6 rounded-lg border border-white/10">
          <p className="text-white/80 ">
            I am a good human
          </p>
        </div>
      </div>
      <FloatingDockDemo/>
    </div>
  </div>
</div>
  );
};

export default Index;