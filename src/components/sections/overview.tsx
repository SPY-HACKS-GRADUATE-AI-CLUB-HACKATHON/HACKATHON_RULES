
import React from "react";
import { Cpu, Globe, Users, Zap } from "lucide-react";

export const Overview = () => {
  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: "Hardcore Hardware",
      description: "Access to state-of-the-art labs and dev kits for hardware-focused projects."
    },
    {
      icon: <Globe className="w-8 h-8 text-accent" />,
      title: "Cyber Resilience",
      description: "Focused tracks on cybersecurity, encryption, and decentralized networks."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Rapid Prototyping",
      description: "Mentors from top tech firms available 24/7 to help you scale fast."
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Elite Network",
      description: "Connect with Stevens.py club members and industry recruiters."
    }
  ];

  return (
    <section id="overview" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-4">Event Intelligence</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            SPY HACKS 2026 is designed to push the boundaries of what you can build in a single weekend. 
            Choose your mission and execute.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="glass-card p-8 rounded-2xl hover:bg-card transition-colors group"
            >
              <div className="mb-6 p-3 rounded-xl bg-background w-fit group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-headline">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
