
"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";

const INITIAL_LINES = [
  "C:\\WINDOWS\\system32> INITIALIZING BREACH PROTOCOL 'VOID-SENTINEL'...",
  "C:\\WINDOWS\\system32> Scanning local area network for PII...",
  "C:\\WINDOWS\\system32> FOUND: node_ID 'STEVENS_USER_DB'...",
  "C:\\WINDOWS\\system32> Injecting SQL-v4 payload into port 443...",
  "C:\\WINDOWS\\system32> WARNING: Firewall 'KAS_PRO' detected. Bypassing...",
  "C:\\WINDOWS\\system32> ACCESS GRANTED. Extracting global user keys...",
  "C:\\WINDOWS\\system32> Decrypting encrypted_private_vault.db...",
];

const EXIT_LINES = [
  "C:\\WINDOWS\\system32> SUCCESS: 4,209 records exfiltrated.",
  "C:\\WINDOWS\\system32> Clearing system logs to avoid detection...",
  "C:\\WINDOWS\\system32> Disconnecting secure tunnel...",
  "C:\\WINDOWS\\system32> MISSION_COMPLETE: Redirecting to extraction...",
];

interface HackerSimProps {
  isExiting?: boolean;
}

export const HackerSim = ({ isExiting }: HackerSimProps) => {
  const [lines, setLines] = useState<string[]>([]);
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
    <div className={cn(
      "transition-all duration-1000 w-[95%] max-w-5xl",
      isExiting && "scale-105 opacity-0"
    )}>
      <div className="xp-window w-full">
        {/* Windows XP Title Bar */}
        <div className="xp-title-bar">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-white" />
            <span className="font-bold">C:\WINDOWS\system32\cmd.exe</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-[#0058e6] border border-white/30 flex items-center justify-center text-xs font-bold shadow-[inset_1px_1px_rgba(255,255,255,0.2)]">_</div>
            <div className="w-5 h-5 bg-[#0058e6] border border-white/30 flex items-center justify-center text-xs font-bold shadow-[inset_1px_1px_rgba(255,255,255,0.2)]">□</div>
            <div className="w-5 h-5 bg-[#d33a16] border border-white/30 flex items-center justify-center text-xs font-bold shadow-[inset_1px_1px_rgba(255,255,255,0.2)]">X</div>
          </div>
        </div>
        
        {/* Terminal Content */}
        <div 
          ref={containerRef}
          className="bg-black p-5 h-[450px] font-mono text-white text-lg md:text-xl overflow-y-auto"
        >
          <div className="space-y-1">
            <p className="mb-6 opacity-80">Microsoft(R) Windows DOS<br/>(C)Copyright Microsoft Corp 1990-2001.</p>
            {lines.map((line, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-white font-black whitespace-pre-wrap">{line}</span>
              </div>
            ))}
            {lines.length === INITIAL_LINES.length && !isExiting && (
              <div className="flex gap-1 items-center mt-2">
                <span className="font-black text-white">C:\WINDOWS\system32{'>'}</span>
                <span className="w-3 h-5 bg-white animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
