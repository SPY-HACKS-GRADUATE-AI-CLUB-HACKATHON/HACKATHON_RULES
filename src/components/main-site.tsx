"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";

export const MainSite = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center">
          <div className="p-12 glass-card rounded-3xl max-w-3xl animate-reveal">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6">
              MAIN TERMINAL <span className="text-primary">ONLINE</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Decryption complete. Mission parameters are being loaded into your local environment.
              Prepare for elite innovation at SPY HACKS 2026.
            </p>
            <div className="flex gap-4 justify-center">
              <div className="h-1 w-12 bg-primary rounded-full animate-pulse" />
              <div className="h-1 w-12 bg-accent rounded-full animate-pulse [animation-delay:200ms]" />
              <div className="h-1 w-12 bg-primary rounded-full animate-pulse [animation-delay:400ms]" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
