
"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const sequenceLock = useRef(false);

  const clubLogo = PlaceHolderImages.find(img => img.id === "club-logo");

  const sequences = [
    {
      title: "AN IDEA BEGINS HERE.",
      sub: "THE THRILL ISN’T THE CODE.",
    },
    {
      title: "IT’S WATCHING IT COME ALIVE.",
      sub: "AND KNOWING YOU BUILT IT.",
    },
    {
      isLogo: true,
      sub: "PRESENTS",
    }
  ];

  useEffect(() => {
    if (sequenceLock.current) return;
    sequenceLock.current = true;

    const runSequence = async () => {
      const showDuration = 3500;
      const fadeDuration = 1000;

      for (let i = 0; i < sequences.length; i++) {
        setStep(i);
        setVisible(true);
        await new Promise(r => setTimeout(r, showDuration));
        setVisible(false);
        await new Promise(r => setTimeout(r, fadeDuration));
      }
      onComplete();
    };

    runSequence();
  }, [onComplete]);

  const current = sequences[step];

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center overflow-hidden font-headline p-6">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#0054e3_0%,transparent_70%)]" />

      <div className={cn(
        "relative z-10 transition-all duration-[1000ms] ease-out flex flex-col items-center w-full max-w-7xl",
        visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
      )}>
        {current.isLogo ? (
          <div className="flex flex-col items-center">
            <div className="relative mb-12 flex items-center justify-center">
               <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
               <div className="relative z-10 w-48 h-48 md:w-80 md:h-80 flex items-center justify-center">
                  <img 
                    src="/images/logo.png" 
                    alt="STEVENS.PY" 
                    className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,84,227,0.5)]"
                  />
               </div>
            </div>
            <p className="text-3xl md:text-6xl text-primary font-black tracking-[1.5em] uppercase text-center animate-pulse ml-[1.5em]">
              {current.sub}
            </p>
          </div>
        ) : (
          <div className="text-center w-full">
            <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-white uppercase leading-tight">
              {current.title}
            </h2>
            <p className="text-xl md:text-4xl text-primary/60 font-bold tracking-[0.4em] uppercase">
              {current.sub}
            </p>
          </div>
        )}
      </div>

      <div className="absolute bottom-16 left-16 right-16 flex justify-between text-[10px] font-mono text-primary/10 uppercase tracking-[1em] pointer-events-none">
        <span>ESTABLISHING_MISSION_PROTOCOL</span>
        <span>STVNS_RECRUITMENT_2026</span>
      </div>
    </div>
  );
};
