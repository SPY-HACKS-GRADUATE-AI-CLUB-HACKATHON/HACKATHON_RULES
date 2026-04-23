
"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

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
    const showDuration = 4000;
    const fadeDuration = 1500;

    const runSequence = async () => {
      // Step 0
      setStep(0);
      setVisible(true);
      await new Promise(r => setTimeout(r, showDuration));
      setVisible(false);
      await new Promise(r => setTimeout(r, fadeDuration));

      // Step 1
      setStep(1);
      setVisible(true);
      await new Promise(r => setTimeout(r, showDuration));
      setVisible(false);
      await new Promise(r => setTimeout(r, fadeDuration));

      // Step 2 (Logo)
      setStep(2);
      setVisible(true);
      await new Promise(r => setTimeout(r, showDuration));
      setVisible(false);
      await new Promise(r => setTimeout(r, fadeDuration));

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
            <div className="relative mb-12">
               <div className="absolute inset-0 bg-primary/30 rounded-full blur-[100px] animate-pulse" />
               <img 
                src={clubLogo?.imageUrl} 
                alt="STEVENS.PY" 
                className="w-64 h-64 md:w-96 md:h-96 object-contain relative z-10 rounded-full border-8 border-primary/20 shadow-2xl"
                data-ai-hint="tech logo"
               />
            </div>
            <p className="text-4xl md:text-7xl text-primary font-black tracking-[0.8em] uppercase text-center animate-pulse">
              {current.sub}
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-7xl md:text-[12rem] font-black text-center mb-8 tracking-tighter text-white uppercase leading-none max-w-7xl">
              {current.title}
            </h2>
            <p className="text-2xl md:text-5xl text-primary/40 font-bold text-center max-w-4xl tracking-[0.5em] uppercase">
              {current.sub}
            </p>
          </>
        )}
      </div>

      <div className="absolute bottom-16 left-16 right-16 flex justify-between text-[10px] font-mono text-primary/10 uppercase tracking-[1em]">
        <span>INITIALIZING_CINEMATIC_BUFFER</span>
        <span>STREAM_SECURE_STVNS_02</span>
      </div>
    </div>
  );
};
