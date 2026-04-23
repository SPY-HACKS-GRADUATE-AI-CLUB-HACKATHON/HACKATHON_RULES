"use client";

import React from "react";
import { ShieldCheck, Terminal, Cpu, Globe, Lock } from "lucide-react";

export const MainSite = () => {
  return (
    <div className="min-h-screen bg-[#020408] text-foreground flex flex-col">
      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-md px-8 h-20 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <span className="font-headline text-xl font-bold tracking-tighter uppercase">
            SPY<span className="text-primary">HACKS</span>
          </span>
        </div>
        <div className="flex gap-8 text-[10px] font-code uppercase tracking-widest text-muted-foreground">
          <span className="hover:text-primary transition-colors cursor-pointer">Mission Briefing</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Sponsors</span>
          <span className="hover:text-primary transition-colors cursor-pointer underline underline-offset-8 text-primary">Standby</span>
        </div>
      </nav>
      
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary tracking-widest uppercase">
              <Lock className="w-3 h-3" /> Secure Node Online
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter leading-none">
              TERMINAL <span className="text-primary">STBY</span>
            </h1>
            <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-sm">
              Extraction protocol complete. Mission parameters are being finalized. Prepare for elite innovation at SPY HACKS 2026.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="h-[1px] w-20 bg-primary/40" />
              <div className="h-[1px] w-8 bg-accent/40" />
            </div>
          </div>

          <div className="glass-card p-12 aspect-square flex flex-col items-center justify-center space-y-12 animate-reveal delay-300">
             <div className="grid grid-cols-2 gap-12 w-full max-w-xs opacity-40">
                <div className="flex flex-col items-center gap-4">
                  <Terminal className="w-6 h-6" />
                  <span className="text-[10px] font-code uppercase tracking-widest">Code</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Cpu className="w-6 h-6" />
                  <span className="text-[10px] font-code uppercase tracking-widest">Hardware</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Globe className="w-6 h-6" />
                  <span className="text-[10px] font-code uppercase tracking-widest">Network</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Lock className="w-6 h-6" />
                  <span className="text-[10px] font-code uppercase tracking-widest">Security</span>
                </div>
             </div>
             
             <div className="text-center space-y-2 pt-8 border-t border-white/5 w-full">
                <p className="text-[10px] font-code text-primary uppercase tracking-[0.5em]">System Status</p>
                <p className="text-xl font-headline font-bold text-white">OPERATIONAL</p>
             </div>
          </div>
        </div>
      </main>

      <footer className="p-12 border-t border-white/5 flex justify-between items-center text-[10px] font-code text-muted-foreground uppercase tracking-widest">
        <span>© 2026 STEVENS.PY CLUB</span>
        <div className="flex gap-6">
          <span>Encrypted: AES-256</span>
          <span>Location: Classified</span>
        </div>
      </footer>
    </div>
  );
};
