
import React from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const Sponsors = () => {
  const sponsors = PlaceHolderImages.filter(img => img.id.startsWith("sponsor-"));

  return (
    <section id="sponsors" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-4">Strategic Partners</h2>
          <p className="text-muted-foreground">The entities powering our mission objectives.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sponsors.map((sponsor, idx) => (
            <div 
              key={idx} 
              className="glass-card p-8 rounded-2xl flex items-center justify-center hover:bg-card transition-all group grayscale hover:grayscale-0"
            >
              <img 
                src={sponsor.imageUrl} 
                alt={sponsor.description} 
                className="max-h-12 w-auto object-contain transition-transform group-hover:scale-110"
                data-ai-hint={sponsor.imageHint}
              />
            </div>
          ))}
        </div>

        <div className="mt-20 glass-card p-12 rounded-3xl text-center bg-gradient-to-br from-primary/10 to-accent/10 border-white/5">
          <h3 className="text-2xl font-bold font-headline mb-4">Interested in Partnering?</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Become a part of the SPY HACKS 2026 intelligence network. Support the next generation of engineers and innovators.
          </p>
          <a 
            href="mailto:sponsors@spyhacks.com" 
            className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors"
          >
            Download Sponsorship Prospectus →
          </a>
        </div>
      </div>
    </section>
  );
};
