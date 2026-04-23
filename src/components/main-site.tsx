
"use client";

import React, { useState } from "react";
import { FAQAssistant } from "@/components/sections/faq-assistant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Unlock, ChevronRight, Globe, Terminal, FileText, Database, Shield } from "lucide-react";

export const MainSite = () => {
  const [accessCode, setAccessCode] = useState("");
  const [isActivated, setIsActivated] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.toUpperCase();
    setAccessCode(code);
    if (code === "SPYHACKS2026ALLGO") {
      setIsActivated(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden animate-reveal">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-5 bg-[linear-gradient(rgba(0,120,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,120,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]" />
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <main className="flex-grow flex flex-col items-center py-16 px-6 max-w-7xl mx-auto w-full relative">
        
        {/* Top Center Logo */}
        <div className="mb-12 flex justify-center animate-in fade-in zoom-in duration-1000">
          <img 
            src="/images/logo.png" 
            alt="SPY HACKS" 
            className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_20px_rgba(77,137,240,0.3)]"
            data-ai-hint="tech logo"
          />
        </div>

        {/* Security Status Header */}
        <div className="mb-16 flex flex-col items-center gap-6 w-full max-w-md">
          <div className={`px-8 py-3 rounded-full border flex items-center gap-3 font-mono text-xs font-black tracking-[0.3em] uppercase transition-all duration-700 shadow-2xl ${
            isActivated 
              ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-emerald-500/20" 
              : "bg-destructive/10 border-destructive/50 text-destructive shadow-destructive/20"
          }`}>
            {isActivated ? <Unlock className="w-4 h-4 animate-pulse" /> : <Lock className="w-4 h-4" />}
            SYSTEM_STATUS: {isActivated ? "ACTIVATED" : "DEACTIVATED"}
          </div>

          <div className="w-full space-y-3">
            <label className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-muted-foreground/60 block text-center">
              Input Extraction Key
            </label>
            <div className="relative group">
               <Input
                type="text"
                placeholder="____-____-____"
                value={accessCode}
                onChange={handleCodeChange}
                disabled={isActivated}
                className="bg-black/60 border-white/5 h-16 text-center font-mono tracking-[0.5em] text-2xl text-primary focus:border-primary/50 transition-all rounded-2xl placeholder:opacity-20 uppercase"
              />
              {isActivated && (
                <div className="absolute inset-0 bg-emerald-500/5 border border-emerald-500/30 rounded-2xl flex items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-500">
                  <span className="text-emerald-400 font-mono font-black tracking-widest text-sm">ACCESS_GRANTED_UID_04</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Rendering Logic */}
        {!isActivated ? (
          <div className="w-full flex flex-col items-center gap-24">
            {/* Restricted Area Preview */}
            <div className="text-center space-y-10 max-w-3xl animate-reveal">
              <div className="space-y-4">
                <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] text-white">
                  MISSION <br/> <span className="text-primary/40">LOCKED</span>
                </h1>
                <p className="text-muted-foreground/80 text-xl font-medium tracking-tight">
                  After registration, you will receive an access key which will give you all the mission briefings.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <Button size="lg" className="h-20 px-16 rounded-full text-xl font-black uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 shadow-[0_0_40px_rgba(0,84,227,0.3)] transition-all hover:scale-105 active:scale-95">
                  Register for Mission
                  <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
                <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">Awaiting Identity Verification...</span>
              </div>
            </div>

            {/* Public Intelligence Section */}
            <div className="w-full border-t border-white/5 pt-24">
              <FAQAssistant />
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {/* Activated Mission Control Header */}
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="p-6 bg-primary/10 rounded-full mb-4 animate-bounce">
                <Shield className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter uppercase leading-[0.75] text-white">
                SPY <br/> <span className="text-primary">HACKS</span>
              </h1>
              <p className="text-muted-foreground/80 text-2xl font-medium max-w-2xl leading-relaxed">
                Welcome back, Agent. All sub-networks have been decrypted. Standby for operational objectives at <span className="text-white font-bold">SPY HACKS 2026</span>.
              </p>
            </div>

            {/* Decrypted Subsystems (Static Links) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: FileText, title: "Briefing", desc: "Operational parameters and mission guidelines.", color: "text-primary" },
                { icon: Terminal, title: "Hardware", desc: "Decrypted lab access and dev kit allocation.", color: "text-accent" },
                { icon: Database, title: "Intel Vault", desc: "Exclusive resources for building the future.", color: "text-primary" },
                { icon: Globe, title: "Network", desc: "Connect with the elite Stevens.py collective.", color: "text-accent" }
              ].map((item, i) => (
                <div key={i} className="glass-card p-12 rounded-[2.5rem] border-white/5 hover:border-primary/40 transition-all group cursor-pointer flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <div className={`p-6 rounded-2xl bg-white/5 mb-8 group-hover:bg-primary/10 transition-colors`}>
                    <item.icon className={`w-12 h-12 ${item.color}`} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-white">{item.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed font-medium uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Intelligence Stream */}
            <div className="w-full border-t border-white/5 pt-24">
              <FAQAssistant />
            </div>
          </div>
        )}
      </main>

      {/* Minimalist Unit Footer */}
      <footer className="px-12 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6 text-[10px] font-mono font-black text-muted-foreground/30 uppercase tracking-[0.5em]">
          <span>© 2026 STEVENS.PY</span>
          <span className="hidden md:block">|</span>
          <span>STEVENS INSTITUTE OF TECHNOLOGY</span>
        </div>
        <div className="text-[10px] font-mono text-primary/40 uppercase tracking-[1em] animate-pulse">
          SECURE_CONNECTION_ESTABLISHED
        </div>
      </footer>
    </div>
  );
};
