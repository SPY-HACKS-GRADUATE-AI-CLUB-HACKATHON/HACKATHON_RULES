
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
    // 6000ms interval (300% slower than 2s)
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= statements.length - 1) {
          clearInterval(timer);
          // Wait for the final fade-out to finish before completing
          setTimeout(onComplete, 4500);
          return prev + 1;
        }
        return prev + 1;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [onComplete, statements.length]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden px-4 relative">
      {statements.map((stmt, index) => (
        <div
          key={index}
          style={{ 
            willChange: "opacity, transform, filter",
            transitionDuration: "4000ms" 
          }}
          className={`absolute flex flex-col items-center transition-all ease-in-out ${
            step === index 
              ? "opacity-100 scale-100 blur-0" 
              : "opacity-0 scale-95 blur-2xl pointer-events-none"
          }`}
        >
          {stmt.isLogo && (
            <ShieldCheck className="w-24 h-24 text-primary mb-8 animate-pulse" />
          )}
          <h2 className="text-4xl md:text-7xl font-headline font-bold text-center mb-8 tracking-tighter text-white">
            {stmt.text}
          </h2>
          <p className="text-xl md:text-3xl text-muted-foreground font-body text-center max-w-2xl">
            {stmt.subtext}
          </p>
        </div>
      ))}
    </div>
  );
};
