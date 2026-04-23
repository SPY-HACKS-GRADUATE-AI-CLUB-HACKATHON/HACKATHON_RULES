
"use client";

import React, { useState, useEffect } from "react";
import { HackerSim } from "@/components/hacker-sim";
import { IntroSequence } from "@/components/intro-sequence";
import { MainSite } from "@/components/main-site";

type Stage = "simulation" | "interact" | "intro" | "main";

export default function Home() {
  const [stage, setStage] = useState<Stage>("simulation");

  useEffect(() => {
    if (stage === "simulation") {
      const timer = setTimeout(() => {
        setStage("interact");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleContinue = () => {
    if (stage === "interact") {
      setStage("intro");
    }
  };

  useEffect(() => {
    const handleKeyDown = () => {
      if (stage === "interact") {
        setStage("intro");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stage]);

  if (stage === "simulation" || stage === "interact") {
    return (
      <main className="relative h-screen w-full bg-black overflow-hidden cursor-pointer" onClick={handleContinue}>
        <HackerSim />
        {stage === "interact" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            <div className="text-center animate-pulse">
              <p className="text-primary font-code text-xl tracking-[0.2em] uppercase">
                Press any button to continue
              </p>
              <p className="text-muted-foreground font-code text-sm mt-2">
                [ Waiting for agent authorization ]
              </p>
            </div>
          </div>
        )}
      </main>
    );
  }

  if (stage === "intro") {
    return <IntroSequence onComplete={() => setStage("main")} />;
  }

  return <MainSite />;
}
