"use client";

import React, { useEffect, useState, useRef } from "react";

const INITIAL_LINES = [
  "> INITIALIZING HANDSHAKE PROTOCOL...",
  "> TUNNEL ESTABLISHED VIA PORT 8080",
  "> DETECTING FIREWALL: IDS-ALPHA-9",
  "> BYPASSING SSL VERIFICATION...",
  "> ACCESS GRANTED TO SECURE NODE [192.168.1.1]",
  "> EXTRACTING CLASSIFIED PACKAGES...",
  "> CORE MODULE DECRYPTED SUCCESSFULLY",
  "> SCANNING FOR VULNERABILITIES...",
  "> SYSTEM OVERRIDE INITIATED",
  "> STEVENS.PY SECURITY PROTOCOL ENGAGED",
  "> AUTHORIZING AGENT ACCESS...",
];

const EXIT_LINES = [
  "> VERIFICATION COMPLETE.",
  "> DECRYPTION PROTOCOL SUCCESSFUL.",
  "> REDIRECTING TO MISSION BRIEFING...",
  "> DISCONNECTING SECURE TUNNEL...",
  "> EXITING SHELL...",
];

interface HackerSimProps {
  isExiting?: boolean;
}

export const HackerSim = ({ isExiting }: HackerSimProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Initial Sequence
  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < INITIAL_LINES.length) {
        setLines((prev) => [...prev, INITIAL_LINES[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Handle Exit Sequence
  useEffect(() => {
    if (isExiting) {
      let exitIdx = 0;
      const interval = setInterval(() => {
        if (exitIdx < EXIT_LINES.length) {
          setLines((prev) => [...prev, EXIT_LINES[exitIdx]]);
          exitIdx++;
        } else {
          clearInterval(interval);
        }
      }, 300);
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
      className="h-full w-full bg-black p-8 font-code text-primary overflow-hidden transition-opacity duration-1000"
    >
      <div className="max-w-4xl mx-auto space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="animate-reveal opacity-0 [animation-fill-mode:forwards] text-sm md:text-base">
            <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span> {line}
          </div>
        ))}
        {lines.length === INITIAL_LINES.length && !isExiting && (
          <div className="mt-8 animate-pulse text-accent font-bold tracking-[0.3em]">
            _ MISSION DATA LOADED
          </div>
        )}
      </div>
    </div>
  );
};
