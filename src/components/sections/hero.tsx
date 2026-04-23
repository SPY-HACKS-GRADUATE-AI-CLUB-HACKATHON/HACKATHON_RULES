
import React from "react";
import { Button } from "@/components/ui/button";
import { Terminal, Lock, ChevronRight } from "lucide-react";

const REGISTRATION_LINK = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=7GkajbUDRUOuIdrREvX7T4hgFkTHiG9DqlLEVj27WSZUQzJWVUhTNjlUQVJCOEpETlhVVTM4WFU5Qi4u";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-accent/10 blur-[100px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-reveal [animation-delay:200ms]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 tracking-widest uppercase">
              <Lock className="w-3 h-3" /> Mission Status: Active
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-headline tracking-tighter">
              Innovate. <span className="text-gradient">Decrypt.</span> Build.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Join the elite hacker unit at <span className="text-foreground font-semibold">SPY HACKS 2026</span>. 
              36 hours of code, caffeine, and cutting-edge challenges in the heart of Stevens Institute of Technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 group">
                <a href={REGISTRATION_LINK} target="_blank" rel="noopener noreferrer">
                  Register for the Mission
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary rounded-full px-8 h-14">
                View Agent Briefing
              </Button>
            </div>
          </div>

          <div className="relative animate-reveal [animation-delay:400ms]">
            <div className="relative glass-card p-1 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-background rounded-xl overflow-hidden aspect-square md:aspect-video flex items-center justify-center relative group">
                <img 
                  src="https://picsum.photos/seed/spytech2/800/600" 
                  alt="Spy Hacks Tech" 
                  className="object-cover w-full h-full opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4 text-sm text-accent font-code">
                    <span className="flex items-center gap-1"><Terminal className="w-4 h-4" /> root@spy-hacks-2026</span>
                    <span className="h-1 w-1 bg-accent rounded-full" />
                    <span>04.15.2026 - 04.17.2026</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating UI Elements */}
            <div className="absolute -top-6 -right-6 glass-card p-4 rounded-xl hidden md:block animate-bounce shadow-xl border-accent/20">
              <p className="text-xs font-bold text-accent mb-1">DATA ENCRYPTION</p>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-1 bg-accent rounded-full" />)}
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 glass-card p-6 rounded-xl hidden md:block border-primary/20">
              <p className="text-3xl font-bold font-headline">$10k+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Prize Pool</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
