import React, { useState, useRef, useEffect } from "react";
import DotPattern from "@/components/ui/dot-pattern";
import BoxReveal from "@/components/ui/box-reveal";
import ChatBot from "@/components/ChatBot/ChatBot";
import { motion, AnimatePresence } from "framer-motion";

import { Dock, DockIcon } from "@/components/ui/dock";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaBookDead,
  FaInfoCircle,
} from "react-icons/fa";

const Home = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTooltipToggle = () => {
    setShowTooltip((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 300); // 300ms delay before hiding the tooltip
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-between bg-white">
      <DotPattern className="h-screen opacity-20" />
      <div className="container mx-auto px-4 py-8 pb-20 sm:pb-24 relative z-10 flex flex-col items-center">
        <BoxReveal duration={0.5}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-center text-gray-800">
            Ahoy, I&apos;m Krishnakumar!
          </h1>
        </BoxReveal>
        <BoxReveal duration={0.7}>
          <p className="text-base sm:text-lg md:text-xl text-blue-600 mb-4 sm:mb-6 text-center">
            Your friendly neighborhood Desert Pirate, ready to set sail in the
            tech seas!
          </p>
        </BoxReveal>
        <BoxReveal duration={0.9}>
          <div className="w-full max-w-3xl bg-gray-50 rounded-lg shadow-lg p-4 relative">
            <div className="text-center mb-4 relative">
              <div className="absolute top-0 right-0">
                <div className="relative">
                  <FaInfoCircle
                    className="text-blue-500 cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleTooltipToggle}
                  />
                  <AnimatePresence>
                    {showTooltip && (
                      <motion.div
                        ref={tooltipRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 w-64 p-2 mt-2 text-xs bg-white border border-gray-200 rounded shadow-xl z-10"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        This pirate-themed website was created to showcase my
                        skills and alignment with 1851 Labs&apos; vision.
                        <Link
                          href="https://krishna98.notion.site/My-Pirate-Themed-ChatBot-App-Brief-Documenation-125d2e8e605280a7b8fdd5ec90b3ac10?pvs=4"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-1 text-blue-500 hover:underline"
                        >
                          Learn more about the project
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm pt-6 sm:pt-0">
                Ahoy, matey! I&apos;m here to spill the beans about our Desert
                Pirate.
                <br />
                <span className="text-gray-800">
                  Try asking: &quot;What are your top skills?&quot;
                </span>
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <ChatBot />
            </motion.div>
          </div>
        </BoxReveal>
      </div>
      <Dock className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-100/80 backdrop-blur-lg p-2 rounded-full shadow-lg">
        <DockIcon>
          <Link
            href="https://github.com/krishnavalliappan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
          >
            <FaGithub className="text-xl" />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link
            href="https://www.linkedin.com/in/krishnavalliappan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-300"
          >
            <FaLinkedin className="text-xl" />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link
            href="https://www.krishnakumar.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-600 text-white hover:bg-amber-500 transition-colors duration-300"
          >
            <FaGlobe className="text-xl" />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link
            href="https://krishna98.notion.site/My-Pirate-Themed-ChatBot-App-Brief-Documenation-125d2e8e605280a7b8fdd5ec90b3ac10?pvs=4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-colors duration-300"
          >
            <FaBookDead className="text-xl" />
          </Link>
        </DockIcon>
      </Dock>
    </main>
  );
};

export default Home;
