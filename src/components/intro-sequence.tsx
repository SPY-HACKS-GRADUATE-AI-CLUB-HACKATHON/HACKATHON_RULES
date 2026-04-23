
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

    const showDuration = 4000;
    const fadeDuration = 1500;

    const runSequence = async () => {
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
        "relative z-10 transition-all duration-[1500ms] ease-out flex flex-col items-center",
        visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
      )}>
        {current.isLogo ? (
          <div className="flex flex-col items-center">
            <div className="relative mb-16 flex items-center justify-center">
               <div className="absolute inset-0 bg-primary/30 rounded-full blur-[120px] animate-pulse" />
               <div className="relative z-10 w-64 h-64 md:w-[28rem] md:h-[28rem] flex items-center justify-center">
                  <img 
                    src={clubLogo?.imageUrl || "/images/logo.png"} 
                    alt="STEVENS.PY" 
                    className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,84,227,0.5)]"
                    data-ai-hint="tech logo"
                  />
               </div>
            </div>
            <p className="text-4xl md:text-8xl text-primary font-black tracking-[1em] uppercase text-center animate-pulse ml-[1em]">
              {current.sub}
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-7xl md:text-[14rem] font-black text-center mb-10 tracking-tighter text-white uppercase leading-none max-w-7xl">
              {current.title}
            </h2>
            <p className="text-2xl md:text-6xl text-primary/40 font-bold text-center max-w-4xl tracking-[0.6em] uppercase">
              {current.sub}
            </p>
          </>
        )}
      </div>

      <div className="absolute bottom-16 left-16 right-16 flex justify-between text-[11px] font-mono text-primary/10 uppercase tracking-[1.2em] pointer-events-none">
        <span>INITIALIZING_CINEMATIC_BUFFER</span>
        <span>STREAM_SECURE_STVNS_02</span>
      </div>
    </div>
  );
};
