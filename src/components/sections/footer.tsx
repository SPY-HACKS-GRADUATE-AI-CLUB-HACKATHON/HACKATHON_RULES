
import React from "react";
import { ShieldCheck, Twitter, Github, Linkedin, Mail, Instagram } from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    { icon: <Twitter size={20} />, href: "#" },
    { icon: <Github size={20} />, href: "#" },
    { icon: <Linkedin size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "#" },
  ];

  const quickLinks = [
    { name: "Code of Conduct", href: "#" },
    { name: "Brand Assets", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Registration Form", href: "#" },
  ];

  return (
    <footer className="bg-background pt-24 pb-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <span className="font-headline text-2xl font-bold tracking-tight">
                SPY<span className="text-primary">HACKS</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
              Organized by Stevens.py (SPY) Club at Stevens Institute of Technology. 
              Dedicated to building a community of elite developers and creative problem solvers.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-4">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Contact Intelligence</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>mission@spyhacks.com</span>
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                Encrypted messages preferred. Response time within 24 standard operational hours.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 SPY HACKS. Created with &lt;3 by Stevens.py Club. All assets classified until release.
          </p>
        </div>
      </div>
    </footer>
  );
};
