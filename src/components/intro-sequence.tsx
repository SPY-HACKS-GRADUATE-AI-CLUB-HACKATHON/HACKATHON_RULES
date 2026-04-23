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
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= statements.length - 1) {
          clearInterval(timer);
          // Wait for the last fade out before completing
          setTimeout(onComplete, 2000);
          return prev + 1; // Move past the last index to trigger fade out
        }
        return prev + 1;
      });
    }, 2000); // 2 second interval as requested

    return () => clearInterval(timer);
  }, [onComplete, statements.length]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden px-4">
      {statements.map((stmt, index) => (
        <div
          key={index}
          className={`absolute flex flex-col items-center transition-all duration-1000 ease-in-out ${
            step === index 
              ? "opacity-100 scale-100 blur-0" 
              : "opacity-0 scale-95 blur-md pointer-events-none"
          }`}
        >
          {stmt.isLogo && (
            <ShieldCheck className="w-20 h-20 text-primary mb-8 animate-pulse" />
          )}
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-center mb-6 tracking-tighter">
            {stmt.text}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-body text-center max-w-lg">
            {stmt.subtext}
          </p>
        </div>
      ))}
    </div>
  );
};
