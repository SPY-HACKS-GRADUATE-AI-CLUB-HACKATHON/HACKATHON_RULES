"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const INITIAL_LINES = [
  "> AUTH_INIT: Stevens.py Security Layer 0.1",
  "> ESTABLISHING ENCRYPTED TUNNEL...",
  "> BYPASSING VIRTUAL FIREWALL: [OK]",
  "> DETECTING AGENT CREDENTIALS: [PENDING]",
  "> SYNCING MISSION DATA...",
  "> CORE OVERRIDE ENGAGED.",
  "> ACCESS LEVEL: TOP SECRET",
];

const EXIT_LINES = [
  "> DECRYPTION SUCCESSFUL.",
  "> REDIRECTING TO SECURE CHANNEL...",
  "> TERMINATING LOCAL HANDSHAKE.",
  "> ENJOY THE MISSION.",
];

interface HackerSimProps {
  isExiting?: boolean;
}

export const HackerSim = ({ isExiting }: HackerSimProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < INITIAL_LINES.length) {
        setLines((prev) => [...prev, INITIAL_LINES[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isExiting) {
      let exitIdx = 0;
      const interval = setInterval(() => {
        if (exitIdx < EXIT_LINES.length) {
          setLines((prev) => [...prev, EXIT_LINES[exitIdx]]);
          exitIdx++;
        } else {
          clearInterval(interval);
          setTimeout(() => setIsFadingOut(true), 800);
        }
      }, 250);
      return () => clearInterval(interval);
    }
  }, [isExiting]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "h-full w-full bg-black p-12 font-code text-primary/80 transition-all duration-1000",
        isFadingOut ? "opacity-0 scale-105" : "opacity-100"
      )}
    >
      <div className="max-w-3xl mx-auto space-y-2 opacity-60">
        {lines.map((line, i) => (
          <div key={i} className="animate-reveal opacity-0 [animation-fill-mode:forwards] text-xs uppercase tracking-widest">
            {line}
          </div>
        ))}
        {!isExiting && lines.length === INITIAL_LINES.length && (
          <div className="pt-4 text-accent/60 terminal-cursor text-xs">
            AWAITING INPUT...
          </div>
        )}
      </div>
    </div>
  );
};
