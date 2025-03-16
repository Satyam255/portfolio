import React from "react";
import Profile from "@/components/about-me";
import Leetcode from "@/components/leetcode";
import Skills from "@/components/skills";
import Projects from "@/components/projects";

const HomePage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white">

      <div className="w-full lg:w-2/5 xl:w-1/3 bg-gray-100 dark:bg-gray-900 flex items-center justify-center rounded-lg shadow-lg">
        <Profile />
      </div>

      <div className="w-full lg:w-3/5 xl:w-2/3 flex flex-col gap-4 mt-4 lg:mt-0">

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 flex items-center justify-center rounded-lg shadow-md">
            <Leetcode />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 flex items-center justify-center p-4 rounded-lg shadow-md">
            <Skills />
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-purple-500 dark:bg-purple-800 flex items-center justify-center p-6 rounded-lg shadow-lg">
          <Projects />
        </div>

      </div>
    </div>
  );
};

export default HomePage;
