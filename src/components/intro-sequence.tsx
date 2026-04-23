
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
          setTimeout(onComplete, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [onComplete, statements.length]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden px-4">
      {statements.map((stmt, index) => (
        <div
          key={index}
          className={`absolute flex flex-col items-center transition-all duration-1000 ease-in-out ${
            step === index ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {stmt.isLogo && (
            <ShieldCheck className="w-16 h-16 text-primary mb-6 animate-pulse" />
          )}
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-center mb-4 tracking-tight">
            {stmt.text}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-body text-center">
            {stmt.subtext}
          </p>
        </div>
      ))}
    </div>
  );
};
