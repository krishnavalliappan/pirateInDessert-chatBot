import React, { useState, useEffect } from "react";

const TerminalOutput: React.FC = () => {
  const [output, setOutput] = useState("");
  const fullOutput = `$ whoami
> Hi, I'm Krishnakumar— a developer with an insatiable passion for coding and mathematics. I believe in the power of AI to simplify life's complexities. No matter the challenge, my determination drives me to build and deliver solutions swiftly.

$ mission
> My mission is to leverage code and AI to transform complex problems into simple, impactful solutions. Embracing a builder's mindset, I thrive in fast-paced settings where innovation and speed are key.

$ skills
> Full Stack Development
> AI/ML Integration
> Scalable Architecture`;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setOutput(fullOutput.slice(0, i));
      i++;
      if (i > fullOutput.length) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-sm md:text-base bg-black text-green-400 p-4 rounded-lg overflow-hidden relative">
      <div className="flex items-center mb-2">
        <div className="flex space-x-2 absolute left-2 top-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="w-full text-center text-sm text-gray-500">Terminal</div>
      </div>
      <pre className="mt-4 whitespace-pre-wrap">{output}</pre>
    </div>
  );
};

export default TerminalOutput;
