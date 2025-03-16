import React from "react";

const skills = [
  "C++",
  "Python",
  "JavaScript",
  "React",
  "Express.js",
  "MongoDB",
  "Next.js",
];

const Skills = () => {
  return (
    <div className="bg-black text-white py-12 px-6 rounded-2xl shadow-lg max-w-2xl ">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-500">Skills</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 font-semibold rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;
