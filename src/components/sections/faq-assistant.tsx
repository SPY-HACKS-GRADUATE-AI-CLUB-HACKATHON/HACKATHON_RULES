
"use client";

import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldAlert } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What compute resources and hardware are provided?",
    answer: "We provide limited cloud credits (AWS/GCP) distributed on a first-come, first-served basis."
  },
  {
    question: "Are there network restrictions?",
    answer: "The campus network will be operational, but downloading massive datasets (like large LiDAR sets or video corpuses) during the event will throttle your bandwidth and waste your time."
  },
  {
    question: "Can we use pre-existing code, models, or open-source libraries?",
    answer: "Yes, but you must explicitly declare what was built prior to the hackathon and what was built during it."
  },
  {
    question: "Who owns the Intellectual Property (IP) of what we build?",
    answer: "You do."
  },
  {
    question: "What constitutes a valid submission?",
    answer: "A public repository (GitHub) with your code, a comprehensive README.md, and a live demo or video walkthrough."
  },
  {
    question: "What is the team size limit?",
    answer: "Teams must be minimum 2 members and maximum 3 members."
  },
  {
    question: "Can we pivot our idea halfway through?",
    answer: "Yes. You are not locked into the idea you submit at registration."
  },
  {
    question: "What are the venue access rules?",
    answer: "The designated area is open 24 hours for registered participants."
  },
  {
    question: "Are food and sleeping arrangements provided?",
    answer: "We will provide main meals (breakfast, lunch and snacks) and caffeine. We do not provide beds. Bring a sleeping bag or blanket if you intend to sleep on the floor or chairs. Plan your sleep schedule; sleep deprivation destroys code quality."
  }
];

export const FAQAssistant = () => {
  return (
    <section id="faq" className="py-24 bg-secondary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-6">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-4">Intelligence Briefing</h2>
          <p className="text-muted-foreground">Core operational guidelines for prospective agents.</p>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="border-white/5 px-4 rounded-xl transition-colors hover:bg-white/5"
              >
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline text-white">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
