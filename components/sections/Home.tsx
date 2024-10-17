import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import TerminalOutput from "@/components/ui/terminal-output";
import DotPattern from "@/components/ui/dot-pattern";
import BoxReveal from "@/components/ui/box-reveal";

const Home = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      <DotPattern className="opacity-40" />
      <div className="container mx-auto px-4 py-16 relative z-10 flex flex-col items-center">
        <BoxReveal duration={0.5}>
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            I build AI-powered solutions to simplify life.
          </h1>
        </BoxReveal>
        <BoxReveal duration={0.7}>
          <p className="text-xl md:text-3xl text-primary mb-12 text-center">
            Self-Taught Developer Relentlessly Building the Future
          </p>
        </BoxReveal>
        <BoxReveal duration={0.9}>
          <Card className="w-full max-w-3xl mx-auto bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <TerminalOutput />
            </CardContent>
          </Card>
        </BoxReveal>
      </div>
    </main>
  );
};

export default Home;
