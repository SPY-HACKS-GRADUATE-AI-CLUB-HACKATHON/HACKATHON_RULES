"use client";

import React, { useState, useEffect } from "react";
import { HackerSim } from "@/components/hacker-sim";
import { IntroSequence } from "@/components/intro-sequence";
import { MainSite } from "@/components/main-site";
import { X } from "lucide-react";

type Stage = "simulation" | "interact" | "exiting_sim" | "intro" | "main";

export default function Home() {
  const [stage, setStage] = useState<Stage>("simulation");

  useEffect(() => {
    if (stage === "simulation") {
      const timer = setTimeout(() => {
        setStage("interact");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleContinue = () => {
    if (stage === "interact") {
      setStage("exiting_sim");
      // Give the terminal time to show "Exit" logs
      setTimeout(() => {
        setStage("intro");
      }, 2500);
    }
  };

  if (stage === "simulation" || stage === "interact" || stage === "exiting_sim") {
    return (
      <main 
        className="relative h-screen w-full bg-[#008080] overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/bliss/1920/1080')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
        
        <HackerSim isExiting={stage === "exiting_sim"} />
        
        {stage === "interact" && (
          <div className="absolute z-[100] animate-in fade-in zoom-in duration-200">
            <div className="xp-window w-[420px]">
              <div className="xp-title-bar">
                <span>Security Authorization Required</span>
                <button onClick={handleContinue} className="xp-title-btn">
                  <X size={12} strokeWidth={4} />
                </button>
              </div>
              <div className="p-6 bg-[#ece9d8] flex flex-col gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-[#d33a16] border-2 border-white rounded-full flex items-center justify-center text-white text-2xl font-black flex-shrink-0 shadow-md">
                    X
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-black">
                      System Privacy Breach Detected.
                    </p>
                    <p className="text-[12px] text-black leading-tight">
                      Unauthorized extraction of core data detected at STEVENS-SERVER-04. 
                      To finalize mission parameters and secure the transmission, please click OK.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={handleContinue}
                    className="xp-btn min-w-[100px]"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Windows XP Taskbar */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-[#245ddb] to-[#0e44ad] border-t border-[#1b439c] flex items-center px-1 z-50">
          <div className="h-full bg-gradient-to-b from-[#388e3c] to-[#2e7d32] px-4 flex items-center rounded-r-lg shadow-lg cursor-pointer hover:brightness-110 active:brightness-90 transition-all">
            <span className="text-white font-black italic text-sm tracking-tighter">start</span>
          </div>
          <div className="flex-grow" />
          <div className="h-full bg-gradient-to-b from-[#1c98e0] to-[#0e44ad] px-4 flex items-center border-l border-[#00000033]">
            <span className="text-white font-medium text-[11px] opacity-90">12:00 PM</span>
          </div>
        </div>
      </main>
    );
  }

  if (stage === "intro") {
    return <IntroSequence onComplete={() => setStage("main")} />;
  }

  return <MainSite />;
}
