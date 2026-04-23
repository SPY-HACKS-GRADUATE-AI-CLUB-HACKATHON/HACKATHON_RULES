"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const statements = [
    {
      text: "AN IDEA BEGINS HERE.",
      subtext: "THE THRILL ISN’T THE CODE.",
    },
    {
      text: "IT’S WATCHING IT COME ALIVE.",
      subtext: "AND KNOWING YOU BUILT IT.",
    },
    {
      isLogo: true,
      text: "STEVENS.PY",
      subtext: "PRESENTS",
    },
  ];

  useEffect(() => {
    const intervalTime = 6000; // 6 seconds per statement for a slow, classy feel
    
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setStep((prev) => {
          if (prev >= statements.length - 1) {
            clearInterval(timer);
            setTimeout(onComplete, 3000);
            return prev;
          }
          return prev + 1;
        });
        setIsTransitioning(false);
      }, 2500); // Very slow, gentle transition
      
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, statements.length]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden px-4 relative font-headline">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,#4D89F0_0%,transparent_70%)]" />

      {statements.map((stmt, index) => (
        <div
          key={index}
          className={cn(
            "absolute flex flex-col items-center transition-all duration-[2500ms] ease-in-out",
            step === index && !isTransitioning
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-105 -translate-y-4 pointer-events-none"
          )}
        >
          {stmt.isLogo && (
            <div className="relative mb-16">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px]" />
              <ShieldCheck className="w-48 h-48 text-primary relative z-10" />
            </div>
          )}
          
          <h2 className="text-6xl md:text-[10rem] font-black text-center mb-8 tracking-tighter text-white uppercase leading-none max-w-7xl">
            {stmt.text}
          </h2>
          
          <p className="text-xl md:text-3xl text-primary/40 font-code font-bold text-center max-w-4xl tracking-[0.5em] uppercase">
             {stmt.subtext}
          </p>
        </div>
      ))}

      <div className="absolute bottom-16 left-16 right-16 flex justify-between text-[11px] font-code text-primary/10 uppercase tracking-[0.8em]">
        <span>SYSTEM_SYNC_ACTIVE</span>
        <span>LEVEL_ALPHA_CLEARANCE</span>
      </div>
    </div>
  );
};
