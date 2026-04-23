"use client";

import React from "react";
import { ShieldCheck, Terminal, Cpu, Globe, Lock, ChevronRight } from "lucide-react";

export const MainSite = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-5 bg-[linear-gradient(rgba(0,120,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,120,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]" />
      
      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-md px-12 h-24 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <span className="font-headline text-2xl font-black tracking-tighter uppercase">
            SPY<span className="text-primary">HACKS</span>
          </span>
        </div>
        <div className="flex gap-12 text-[11px] font-code font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
          <span className="hover:text-primary transition-colors cursor-pointer">Briefing</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Intel</span>
          <span className="hover:text-primary transition-colors cursor-pointer underline underline-offset-8 decoration-primary text-primary">Live Status</span>
        </div>
      </nav>
      
      <main className="flex-grow flex items-center justify-center p-12 relative">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12 animate-reveal">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-black text-primary tracking-[0.2em] uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Secure Node: Established
            </div>
            
            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase text-white">
              CORE <br/>
              <span className="text-primary">ACTIVE</span>
            </h1>
            
            <p className="text-muted-foreground/80 text-xl font-medium leading-relaxed max-w-md">
              The decryption is complete. The mission parameters are now synchronized. Welcome to the elite unit at <span className="text-white font-bold">SPY HACKS 2026</span>.
            </p>
            
            <button className="group relative px-8 py-4 bg-primary text-white font-headline font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:pr-12">
              <span className="relative z-10">Access Dashboard</span>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
            </button>
          </div>

          <div className="relative group">
            {/* Fancy UI Frame */}
            <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] blur-2xl" />
            <div className="glass-card p-16 rounded-[2rem] relative border-primary/20 flex flex-col items-center justify-center space-y-16 animate-reveal [animation-delay:400ms]">
               <div className="grid grid-cols-2 gap-16 w-full max-w-sm opacity-60">
                  <div className="flex flex-col items-center gap-6 group/icon">
                    <Terminal className="w-10 h-10 group-hover/icon:text-primary transition-colors" />
                    <span className="text-[10px] font-code font-black uppercase tracking-[0.4em]">Subsystem_01</span>
                  </div>
                  <div className="flex flex-col items-center gap-6 group/icon">
                    <Cpu className="w-10 h-10 group-hover/icon:text-primary transition-colors" />
                    <span className="text-[10px] font-code font-black uppercase tracking-[0.4em]">Subsystem_02</span>
                  </div>
                  <div className="flex flex-col items-center gap-6 group/icon">
                    <Globe className="w-10 h-10 group-hover/icon:text-primary transition-colors" />
                    <span className="text-[10px] font-code font-black uppercase tracking-[0.4em]">Network_Sync</span>
                  </div>
                  <div className="flex flex-col items-center gap-6 group/icon">
                    <Lock className="w-10 h-10 group-hover/icon:text-primary transition-colors" />
                    <span className="text-[10px] font-code font-black uppercase tracking-[0.4em]">Vault_Access</span>
                  </div>
               </div>
               
               <div className="text-center space-y-4 pt-12 border-t border-white/10 w-full relative">
                  <p className="text-[11px] font-code text-primary/60 font-black uppercase tracking-[0.8em]">Operational Readiness</p>
                  <p className="text-5xl font-black text-white text-glow">100% SECURE</p>
               </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-12 py-10 border-t border-white/5 flex justify-between items-center text-[10px] font-code font-bold text-muted-foreground/40 uppercase tracking-[0.5em]">
        <div className="flex items-center gap-6">
          <span>© 2026 STEVENS.PY</span>
          <span className="h-4 w-[1px] bg-white/10" />
          <span>ELITE HACKING COLLECTIVE</span>
        </div>
        <div className="flex gap-8">
          <span className="hover:text-primary cursor-pointer transition-colors">Protocol_X</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Emergency_Exit</span>
        </div>
      </footer>
    </div>
  );
};
