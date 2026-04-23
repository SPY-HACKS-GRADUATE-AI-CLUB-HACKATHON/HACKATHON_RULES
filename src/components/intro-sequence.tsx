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
      }, 40);

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
    const intervalTime = 5000;
    
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setStep((prev) => {
          if (prev >= statements.length - 1) {
            clearInterval(timer);
            setTimeout(onComplete, 2500);
            return prev;
          }
          return prev + 1;
        });
        setIsTransitioning(false);
      }, 600);
      
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, statements.length]);

  return (
    <div className="h-screen w-full bg-[#020408] flex items-center justify-center overflow-hidden px-4 relative font-code">
      {/* Background Matrix/Grid pattern */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,120,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,120,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px]" />

      {statements.map((stmt, index) => (
        <div
          key={index}
          className={`absolute flex flex-col items-center transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            step === index && !isTransitioning
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-95 translate-y-4 pointer-events-none"
          }`}
        >
          {stmt.isLogo && (
            <div className="relative mb-16">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />
              <ShieldCheck className="w-40 h-40 text-primary relative z-10 filter drop-shadow-[0_0_20px_rgba(56,136,255,0.4)]" />
            </div>
          )}
          
          <h2 className="text-2xl md:text-6xl font-headline font-bold text-center mb-6 tracking-tight text-white uppercase text-glow">
            <DecodingText text={stmt.text} active={step === index && !isTransitioning} />
          </h2>
          
          <p className="text-sm md:text-xl text-primary/40 font-code text-center max-w-2xl tracking-[0.4em] uppercase">
             <DecodingText text={stmt.subtext} active={step === index && !isTransitioning} delay={1000} />
          </p>
          
          <div className="mt-16 flex items-center gap-4">
            <div className={`h-[1px] bg-primary/20 transition-all duration-2000 ${step === index ? "w-48" : "w-0"}`} />
          </div>
        </div>
      ))}

      {/* Retro Status Footer */}
      <div className="absolute bottom-12 left-12 right-12 flex justify-between text-[10px] font-code text-primary/20 uppercase tracking-[0.6em]">
        <span>Protocol: STEVENS_PY_V6</span>
        <span>Secure Channel: Active</span>
      </div>
    </div>
  );
};
