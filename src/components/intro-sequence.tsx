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
    const intervalTime = 4000; // Faster transition (4s total per step)
    
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setStep((prev) => {
          if (prev >= statements.length - 1) {
            clearInterval(timer);
            setTimeout(onComplete, 2000);
            return prev;
          }
          return prev + 1;
        });
        setIsTransitioning(false);
      }, 800);
      
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, statements.length]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden px-4 relative font-headline">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,#4D89F0_0%,transparent_70%)]" />
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(transparent_0%,rgba(0,255,255,0.1)_50%,transparent_100%)] animate-scan h-20 w-full z-10 pointer-events-none" />

      {statements.map((stmt, index) => (
        <div
          key={index}
          className={cn(
            "absolute flex flex-col items-center transition-all duration-[1000ms] ease-out",
            step === index && !isTransitioning
              ? "opacity-100 scale-100 translate-y-0 filter-none" 
              : "opacity-0 scale-110 translate-y-0 blur-xl pointer-events-none"
          )}
        >
          {stmt.isLogo && (
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px]" />
              <ShieldCheck className="w-48 h-48 text-primary relative z-10 filter drop-shadow-[0_0_30px_rgba(56,136,255,0.5)]" />
            </div>
          )}
          
          <h2 className={cn(
            "text-5xl md:text-9xl font-black text-center mb-8 tracking-[0.1em] text-white uppercase text-glow leading-none max-w-5xl",
            step === index && !isTransitioning && "animate-glitch"
          )}>
            {stmt.text}
          </h2>
          
          <p className="text-lg md:text-2xl text-primary/60 font-code font-bold text-center max-w-2xl tracking-[0.6em] uppercase">
             {stmt.subtext}
          </p>
          
          <div className="mt-12 flex items-center gap-4">
            <div className={cn(
              "h-1 bg-primary/40 transition-all duration-[3000ms]",
              step === index ? "w-64" : "w-0"
            )} />
          </div>
        </div>
      ))}

      {/* Retro Status Footer */}
      <div className="absolute bottom-12 left-12 right-12 flex justify-between text-[10px] font-code text-primary/30 uppercase tracking-[0.8em]">
        <span>STEVENS_PY_ESTABLISHED</span>
        <span>ENCRYPTION: ACTIVE</span>
      </div>
    </div>
  );
};
