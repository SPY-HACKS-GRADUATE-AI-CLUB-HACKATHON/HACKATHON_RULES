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
          // Allow for final fade out
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
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(77,137,240,0.05)_0%,_transparent_70%)]" />
      
      {statements.map((stmt, index) => (
        <div
          key={index}
          style={{ 
            willChange: "opacity, transform, filter",
            transitionDuration: "4000ms", // Super smooth long transition
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
          }}
          className={`absolute flex flex-col items-center transition-all ${
            step === index 
              ? "opacity-100 scale-100 blur-0 translate-y-0" 
              : step > index 
                ? "opacity-0 scale-110 blur-3xl -translate-y-10" // Fly out
                : "opacity-0 scale-90 blur-3xl translate-y-10" // Fly in
          }`}
        >
          {stmt.isLogo && (
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
              <ShieldCheck className="w-32 h-32 text-primary relative z-10 animate-pulse" />
            </div>
          )}
          
          <h2 className={`text-4xl md:text-8xl font-headline font-bold text-center mb-8 tracking-tighter text-white ${
            stmt.isLogo ? "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40" : ""
          }`}>
            {stmt.text}
          </h2>
          
          <p className="text-xl md:text-3xl text-muted-foreground font-body text-center max-w-2xl tracking-wide opacity-80">
            {stmt.subtext}
          </p>
          
          {/* Subtle line decoration for statement 1 & 2 */}
          {!stmt.isLogo && (
            <div className="mt-12 h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          )}
        </div>
      ))}
    </div>
  );
};
