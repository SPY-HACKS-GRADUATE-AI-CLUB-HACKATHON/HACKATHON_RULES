
"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin } from "lucide-react";

export const Schedule = () => {
  const days = [
    {
      id: "day1",
      label: "Day 01 - Deployment",
      events: [
        { time: "09:00 AM", title: "Agent Check-in", location: "Babbio Atrium" },
        { time: "11:00 AM", title: "Opening Ceremony & Mission Briefing", location: "Main Auditorium" },
        { time: "12:00 PM", title: "Hacking Begins", location: "Mission Control" },
        { time: "02:00 PM", title: "Workshop: Advanced Cryptography", location: "Lab 204" },
        { time: "07:00 PM", title: "Dinner & Lightning Talks", location: "Dining Hall" },
      ]
    },
    {
      id: "day2",
      label: "Day 02 - Intelligence Gathering",
      events: [
        { time: "08:00 AM", title: "Breakfast & Strategy Sync", location: "Dining Hall" },
        { time: "10:00 AM", title: "Tech Talk: AI in Espionage", location: "Main Auditorium" },
        { time: "01:00 PM", title: "Lunch & Relax Session", location: "Outdoor Lounge" },
        { time: "04:00 PM", title: "Midpoint Submission", location: "Online Portal" },
        { time: "09:00 PM", title: "Midnight Code Jam", location: "Mission Control" },
      ]
    },
    {
      id: "day3",
      label: "Day 03 - Extraction",
      events: [
        { time: "08:00 AM", title: "Final Commits", location: "Mission Control" },
        { time: "12:00 PM", title: "Hacking Ends & Project Demos", location: "Showcase Hall" },
        { time: "02:00 PM", title: "Judging Rounds", location: "Private Suite" },
        { time: "04:00 PM", title: "Closing Ceremony & Rewards", location: "Main Auditorium" },
      ]
    }
  ];

  return (
    <section id="schedule" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-4">Mission Timeline</h2>
          <p className="text-muted-foreground">The sequence of operations for SPY HACKS 2026.</p>
        </div>

        <Tabs defaultValue="day1" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-secondary/50 p-1 rounded-full h-14">
            {days.map(day => (
              <TabsTrigger 
                key={day.id} 
                value={day.id}
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white font-headline transition-all"
              >
                {day.label.split(' - ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {days.map(day => (
            <TabsContent key={day.id} value={day.id} className="space-y-4 animate-reveal">
              {day.events.map((event, idx) => (
                <div 
                  key={idx} 
                  className="glass-card flex items-center p-6 rounded-2xl hover:translate-x-2 transition-transform border-l-4 border-l-primary"
                >
                  <div className="w-32 flex-shrink-0">
                    <div className="flex items-center gap-2 text-primary font-code font-bold">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg font-bold font-headline">{event.title}</h4>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
