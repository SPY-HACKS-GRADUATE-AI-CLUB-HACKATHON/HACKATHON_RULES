
"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

export const MainSite = () => {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8 animate-reveal">
      <div className="flex flex-col items-center gap-6 max-w-2xl text-center">
        <ShieldCheck className="w-20 h-20 text-primary" />
        <h1 className="text-6xl font-headline font-bold tracking-tighter">
          SPY<span className="text-primary">HACKS</span> 2026
        </h1>
        <div className="h-1 w-24 bg-primary rounded-full" />
        <p className="text-xl text-muted-foreground leading-relaxed">
          The mission has begun. This is your terminal for innovation.
          Build something elite.
        </p>
        <div className="mt-12 text-sm font-code text-muted-foreground border border-border/50 rounded-lg p-4 bg-card/30">
          [ SYSTEM READY FOR CONFIGURATION ]
          <br />
          Add your components here to continue building the experience.
        </div>
      </div>
    </main>
  );
};
