import React from "react";
import DotPattern from "@/components/ui/dot-pattern";
import BoxReveal from "@/components/ui/box-reveal";
import ChatBot from "@/components/ChatBot/ChatBot";

const Home = () => {
  return (
    <main className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-gray-100">
      <DotPattern className="h-screen opacity-40" />
      <div className="container mx-auto px-4 py-8 sm:py-16 relative z-10 flex flex-col items-center">
        <BoxReveal duration={0.5}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
            Ahoy, I&apos;m Krishnakumar!
          </h1>
        </BoxReveal>
        <BoxReveal duration={0.7}>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-600 mb-6 sm:mb-8 text-center">
            Building AI-powered solutions to simplify life, one line of code at
            a time.
          </p>
        </BoxReveal>
        <BoxReveal duration={0.7}>
          <div className="w-full max-w-5xl">
            <ChatBot />
          </div>
        </BoxReveal>
      </div>
    </main>
  );
};

export default Home;
