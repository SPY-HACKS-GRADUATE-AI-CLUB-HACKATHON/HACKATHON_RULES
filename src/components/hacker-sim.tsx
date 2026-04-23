"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const INITIAL_LINES = [
  "[BOOT_SEQUENCE]: STEVENS_PY_OS_v2.6",
  "ESTABLISHING SECURE CONNECTION...",
  "BYPASSING KERNEL FIREWALL... [DONE]",
  "INJECTING PAYLOAD... 0x7FFD2E",
  "DECRYPTING MISSION DATA...",
  "ACCESS GRANTED: LEVEL ALPHA",
  "INITIALIZING AGENT_INTEL_STREAM",
];

const EXIT_LINES = [
  "DECRYPTION_SUCCESSFUL",
  "TUNNEL_RE-ROUTED_TO_MISSION_CONTROL",
  "ERASING_TRACES...",
  "WELCOME, AGENT.",
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
    }, 600);

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
          setTimeout(() => setIsFadingOut(true), 1000);
        }
      }, 400);
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
        "h-full w-full bg-black p-8 md:p-16 font-code text-primary transition-all duration-1000 flex flex-col justify-center items-center",
        isFadingOut ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="max-w-6xl w-full space-y-4 text-center md:text-left">
        {lines.map((line, i) => (
          <div 
            key={i} 
            className="animate-reveal opacity-0 [animation-fill-mode:forwards] text-2xl md:text-5xl font-black tracking-tight"
          >
            <span className="text-primary/20 mr-4 select-none">#</span>
            {line}
          </div>
        ))}
        {!isExiting && lines.length === INITIAL_LINES.length && (
          <div className="pt-12 text-accent animate-pulse text-2xl md:text-5xl font-black">
            {">"} AWAITING_AUTHORIZED_INPUT_
          </div>
        )}
      </div>
    </div>
  );
};
