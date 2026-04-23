
"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

export const MainSite = () => {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-8 animate-reveal">
      <div className="flex flex-col items-center gap-6 max-w-2xl text-center">
        <ShieldCheck className="w-20 h-20 text-primary animate-pulse" />
        <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter text-white">
          SPY<span className="text-primary">HACKS</span> 2026
        </h1>
        <div className="h-1 w-24 bg-primary rounded-full" />
        <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
          The mission has been authorized. This is your terminal for elite innovation.
        </p>
        
        <div className="mt-16 text-[10px] font-code text-primary/30 uppercase tracking-[0.5em] animate-pulse">
          // STANDBY FOR MISSION PARAMETERS //
        </div>
      </div>
    </main>
  );
};
