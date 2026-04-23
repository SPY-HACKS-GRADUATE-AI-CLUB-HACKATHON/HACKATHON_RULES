
"use client";

import React from "react";
import { faqAssistant } from "@/ai/flows/faq-assistant-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldAlert, Send, Sparkles, User, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const FAQAssistant = () => {
  const [messages, setMessages] = React.useState<Message[]>([
    { role: "assistant", content: "Agent identified. I am your mission briefing assistant. How can I help you prepare for SPY HACKS 2026?" }
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isFirstRender = React.useRef(true);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await faqAssistant({ question: userMessage });
      setMessages(prev => [...prev, { role: "assistant", content: result.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Error retrieving intelligence. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    // Prevent auto-scrolling on initial mount to avoid page jumps
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  return (
    <section id="faq" className="py-24 bg-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-6">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-4">Support & Intelligence</h2>
          <p className="text-muted-foreground">Instant answers for prospective agents.</p>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[500px]">
          <div className="p-4 border-b border-border bg-card/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">AI Intelligence Stream</span>
            </div>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>

          <ScrollArea className="flex-grow p-6">
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "flex gap-4 max-w-[85%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                    msg.role === "user" ? "bg-primary text-white" : "bg-accent text-accent-foreground"
                  )}>
                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" ? "bg-primary/20 text-foreground" : "bg-secondary text-foreground"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 max-w-[85%] animate-pulse">
                  <div className="w-8 h-8 rounded-lg bg-accent/20" />
                  <div className="p-4 rounded-2xl bg-secondary h-12 w-32" />
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="p-6 bg-card/40 border-t border-border">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-3"
            >
              <Input 
                placeholder="Ask about prizes, eligibility, or the venue..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="rounded-full bg-background border-border h-12 px-6 focus-visible:ring-accent"
              />
              <Button 
                type="submit" 
                size="icon" 
                className="rounded-full h-12 w-12 bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={isLoading}
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
