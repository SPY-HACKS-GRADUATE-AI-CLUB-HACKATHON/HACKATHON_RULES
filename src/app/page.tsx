
"use client";

import React, { useState, useEffect } from "react";
import { HackerSim } from "@/components/hacker-sim";
import { IntroSequence } from "@/components/intro-sequence";
import { MainSite } from "@/components/main-site";
import { Terminal } from "lucide-react";

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
      // Give the exit sequence enough time to type out and fade before switching to cinematic intro
      setTimeout(() => {
        setStage("intro");
      }, 2500);
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
      <main className="relative h-screen w-full bg-black overflow-hidden cursor-pointer" onClick={handleContinue}>
        {/* Retro Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-30" />
        
        <HackerSim isExiting={stage === "exiting_sim"} />
        
        {stage === "interact" && (
          <div className="absolute inset-0 flex items-center justify-center z-50 p-6 animate-in fade-in zoom-in duration-500">
            <div className="max-w-md w-full glass-card border-primary/40 p-8 rounded-none shadow-[0_0_50px_rgba(77,137,240,0.2)]">
              <div className="flex items-center gap-3 mb-6 border-b border-primary/20 pb-4">
                <Terminal className="text-primary w-5 h-5" />
                <span className="text-xs font-code uppercase tracking-[0.3em] text-primary/80">User Authentication Required</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-primary font-code text-sm">
                  <span className="opacity-50">#</span>
                  <span>Agent credentials detected. Protocol mismatch.</span>
                </div>
                
                <div className="p-4 bg-primary/5 border border-primary/10 text-center space-y-3">
                  <p className="text-primary font-code text-lg font-bold tracking-[0.1em] uppercase">
                    Verification Pending
                  </p>
                  <p className="text-white font-code text-xs animate-pulse">
                    &gt; PRESS ANY KEY TO INITIALIZE DECRYPTION _
                  </p>
                </div>
                
                <div className="flex justify-between text-[10px] font-code text-primary/40 uppercase tracking-widest pt-2">
                  <span>Port: 9002</span>
                  <span>Node: Stevens_PY</span>
                </div>
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
