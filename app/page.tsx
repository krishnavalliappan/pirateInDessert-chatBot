"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Home from "@/components/sections/Home";

const PirateScene = dynamic(() => import("@/components/PirateScene"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  const handleButtonClick = () => {
    setShowContent(true);
  };

  return (
    <div className="relative min-h-screen">
      {!showContent && <PirateScene onButtonClick={handleButtonClick} />}
      {showContent && (
        <div className="w-full">
          <Home />
          <Button onClick={() => setShowContent(false)} className="mt-4">
            Back to 3D Scene
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
