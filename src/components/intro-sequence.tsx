
"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [step, setStep] = useState(0);

  const statements = [
    {
      text: "An idea begins here.",
      subtext: "The thrill isn’t the code.",
    },
    {
      text: "It’s watching it come alive.",
      subtext: "And knowing you built it.",
    },
    {
      isLogo: true,
      text: "SPY HACKS",
      subtext: "Presents",
    },
  ];

  useEffect(() => {
    // 6000ms interval for overall timing
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= statements.length - 1) {
          clearInterval(timer);
          // Wait for final statement to finish its long settle before completing
          setTimeout(onComplete, 5000);
          return prev + 1;
        }
        return prev + 1;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [onComplete, statements.length]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden px-4 relative">
      {/* Background Ambience - No Blur on content, just soft radial for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(77,137,240,0.08)_0%,_transparent_70%)]" />
      
      {statements.map((stmt, index) => (
        <div
          key={index}
          style={{ 
            willChange: "opacity, transform",
            transitionDuration: "5000ms", // Long duration for smoothness
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" // Quart ease out: fast start, very long settle
          }}
          className={`absolute flex flex-col items-center transition-all ${
            step === index 
              ? "opacity-100 scale-100 translate-y-0" 
              : step > index 
                ? "opacity-0 scale-110 -translate-y-24" // Float up
                : "opacity-0 scale-90 translate-y-24" // Float in from bottom
          }`}
        >
          {stmt.isLogo && (
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/20 rounded-full scale-[2] animate-pulse" />
              <ShieldCheck className="w-40 h-40 text-primary relative z-10" />
            </div>
          )}
          
          <h2 className={`text-4xl md:text-8xl font-headline font-bold text-center mb-8 tracking-tighter text-white ${
            stmt.isLogo ? "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/30" : ""
          }`}>
            {stmt.text}
          </h2>
          
          <p className="text-xl md:text-3xl text-muted-foreground font-body text-center max-w-2xl tracking-wide opacity-80">
            {stmt.subtext}
          </p>
          
          {!stmt.isLogo && (
            <div className="mt-16 h-px w-32 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          )}
        </div>
      ))}
    </div>
  );
};
