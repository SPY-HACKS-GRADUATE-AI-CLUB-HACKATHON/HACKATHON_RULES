
"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";

interface IntroSequenceProps {
  onComplete: () => void;
}

const CHARS = "ABCDEFGHIKLMNOPQRSTUVWXYZ0123456789#@$%&*";

const DecodingText = ({ text, active, delay = 0 }: { text: string; active: boolean; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const iterations = useRef(0);

  useEffect(() => {
    if (!active) {
      setDisplayText("");
      iterations.current = 0;
      return;
    }

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iterations.current) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iterations.current >= text.length) {
          clearInterval(interval);
        }

        iterations.current += 1 / 3;
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [active, text, delay]);

  return <span>{displayText}</span>;
};

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
      text: "SPY HACKS",
      subtext: "MISSION: AUTHORIZED",
    },
  ];

  useEffect(() => {
    const intervalTime = 4000; // Total time per statement
    
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
      }, 400); // Quick sharp glitch transition
      
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, statements.length]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden px-4 relative font-code">
      {/* Background Matrix/Grid pattern */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,255,100,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,100,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
      
      {/* High-speed scanline sweep during transition */}
      <div className={`absolute inset-0 z-50 pointer-events-none transition-opacity duration-300 ${isTransitioning ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_20px_theme('colors.primary.DEFAULT')] animate-scan" />
      </div>

      {statements.map((stmt, index) => (
        <div
          key={index}
          className={`absolute flex flex-col items-center transition-all duration-500 ${
            step === index && !isTransitioning
              ? "opacity-100 scale-100 translate-x-0" 
              : "opacity-0 scale-95 translate-x-8 pointer-events-none"
          }`}
        >
          {stmt.isLogo && (
            <div className="relative mb-12 animate-in zoom-in duration-1000">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <ShieldCheck className="w-48 h-48 text-primary relative z-10 filter drop-shadow-[0_0_15px_rgba(77,137,240,0.6)]" />
            </div>
          )}
          
          <h2 className="text-3xl md:text-7xl font-headline font-bold text-center mb-6 tracking-tight text-white uppercase">
            <DecodingText text={stmt.text} active={step === index && !isTransitioning} />
          </h2>
          
          <p className="text-lg md:text-2xl text-primary/60 font-code text-center max-w-2xl tracking-widest uppercase">
             <DecodingText text={stmt.subtext} active={step === index && !isTransitioning} delay={800} />
          </p>
          
          <div className="mt-12 flex gap-4">
            <div className={`h-1 w-24 bg-primary/20 transition-all duration-1000 ${step === index ? "w-48" : "w-0"}`} />
          </div>
        </div>
      ))}

      {/* Retro Status Footer */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between text-[10px] font-code text-primary/30 uppercase tracking-[0.4em]">
        <span>Protocol: STEVENS_PY_V6</span>
        <span>Decrypting... {Math.round((step + 1) / statements.length * 100)}%</span>
      </div>
    </div>
  );
};
