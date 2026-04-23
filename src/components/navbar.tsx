
"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const REGISTRATION_LINK = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=7GkajbUDRUOuIdrREvX7T4hgFkTHiG9DqlLEVj27WSZUQzJWVUhTNjlUQVJCOEpETlhVVTM4WFU5Qi4u";

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: "Overview", href: "#overview" },
    { name: "Schedule", href: "#schedule" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="font-headline text-xl font-bold tracking-tight">
              SPY<span className="text-primary">HACKS</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 rounded-full px-6">
              <a href={REGISTRATION_LINK} target="_blank" rel="noopener noreferrer">
                Register Now
              </a>
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2 focus:outline-none"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden absolute w-full bg-card border-b border-border transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-base font-medium text-muted-foreground hover:text-accent"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="w-full bg-primary hover:bg-primary/90 rounded-full">
            <a href={REGISTRATION_LINK} target="_blank" rel="noopener noreferrer">
              Register Now
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};
