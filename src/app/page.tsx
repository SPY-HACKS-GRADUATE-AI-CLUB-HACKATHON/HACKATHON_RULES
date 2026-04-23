"use client";

import React, { useState, useEffect } from "react";
import { HackerSim } from "@/components/hacker-sim";
import { IntroSequence } from "@/components/intro-sequence";
import { MainSite } from "@/components/main-site";

type Stage = "simulation" | "interact" | "exiting_sim" | "intro" | "main";

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
      setStage("exiting_sim");
      setTimeout(() => {
        setStage("intro");
      }, 2000);
    }
  };

  useEffect(() => {
    const handleKeyDown = () => {
      if (stage === "interact") {
        handleContinue();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stage]);

  if (stage === "simulation" || stage === "interact" || stage === "exiting_sim") {
    return (
      <main 
        className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center cursor-crosshair"
        onClick={handleContinue}
      >
        <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />
        
        <HackerSim isExiting={stage === "exiting_sim"} />
        
        {stage === "interact" && (
          <div className="absolute z-50 animate-in fade-in zoom-in duration-1000">
            <div className="glass-card p-12 rounded-none border-primary/40 text-center space-y-6">
              <h2 className="text-xs font-code uppercase tracking-[0.5em] text-primary/60 mb-4">Authorization Required</h2>
              <p className="text-2xl md:text-3xl font-headline font-bold tracking-widest text-white">
                CLICK TO INITIALIZE
              </p>
              <div className="flex justify-center pt-6">
                <div className="w-16 h-0.5 bg-primary/40 animate-pulse" />
              </div>
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
