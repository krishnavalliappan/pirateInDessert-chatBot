"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button"; // Adjust the import path as needed

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
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-4">Main Content</h1>
          <p className="text-lg">
            This is the main content of the page, revealed after clicking the
            button.
          </p>
          <Button onClick={() => setShowContent(false)} className="mt-4">
            Back to 3D Scene
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
