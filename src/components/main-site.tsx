
"use client";

import React, { useState } from "react";
import { FAQAssistant } from "@/components/sections/faq-assistant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Lock, 
  Unlock, 
  ChevronRight, 
  Globe, 
  Terminal, 
  FileText, 
  Database, 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Calendar,
  MapPin,
  Mail,
  MessageSquare
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const REGISTRATION_LINK = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=7GkajbUDRUOuIdrREvX7T4hgFkTHiG9DqlLEVj27WSZUQzJWVUhTNjlUQVJCOEpETlhVVTM4WFU5Qi4u";
const DISCORD_LINK = "https://discord.gg/Cm9uXwgvwV";
const EXTRACTION_KEY = "2026SPYHACKS_$$_";

const AGENDA_DATA = [
  { time: "04/30/26 9:00 am", activity: "Registration, Team Formation & Breakfast", location: "Howe 409, Bissinger" },
  { time: "04/30/26 10:00 am", activity: "Event Kickstart, Keynote Speaker Speech", location: "Howe 409, Bissinger" },
  { time: "04/30/26 11:30 am", activity: "Hackathon Timer Start", location: "Howe 409, Bissinger" },
  { time: "04/30/26 1:30 pm", activity: "Lunch", location: "Howe 409, Bissinger" },
  { time: "04/30/26 2:30 pm", activity: "Hacking Continues", location: "Howe 409, Bissinger" },
  { time: "04/30/26 4:30 pm", activity: "Hacking Continues", location: "Gateway North TED Stairs" },
  { time: "04/30/26 6:00 pm", activity: "Snacks", location: "Gateway North TED Stairs" },
  { time: "04/30/26 9:00 pm", activity: "Hacking Continues (Dinner not Included)", location: "Gateway North TED Stairs" },
  { time: "05/01/26 12:00 am to 7:30 am", activity: "Hacking Continues (Overnight)", location: "Gateway North TED Stairs" },
  { time: "05/01/26 7:30 am to 8:30 am", activity: "Final Submission", location: "Online" },
  { time: "05/01/26 9:00 am", activity: "Breakfast", location: "Gateway North 204" },
  { time: "05/01/26 10:00 am", activity: "Keynote Speech & Project Showcase", location: "Gateway North 204" },
  { time: "05/01/26 12:00 pm", activity: "Winners Announcement (End of Event)", location: "Gateway North 204" },
];

const LOCATION_DATA = [
  { day: "Day 1 (30th April)", time: "9:00 am to 4:30 pm", location: "Howe 409, Bissinger" },
  { day: "Day 1 (30th April)", time: "4:30 pm to Midnight", location: "Gateway North TED Stairs" },
  { day: "Day 2 (1st May)", time: "Midnight to 9:00 am", location: "Gateway North TED Stairs" },
  { day: "Day 2 (1st May)", time: "9:00 to 12:00 pm", location: "Gateway North 204" },
];

export const MainSite = () => {
  const [accessCode, setAccessCode] = useState("");
  const [isActivated, setIsActivated] = useState(false);
  const [showPolicyDialog, setShowPolicyDialog] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setAccessCode(code);
    if (code === EXTRACTION_KEY) {
      setShowPolicyDialog(true);
    }
  };

  const handleAcceptPolicies = () => {
    setIsActivated(true);
    setShowPolicyDialog(false);
  };

  const handleDeclinePolicies = () => {
    setAccessCode("");
    setShowPolicyDialog(false);
  };

  const renderIntelligenceTables = () => (
    <div className="w-full space-y-16 animate-reveal mt-24">
      <div className="space-y-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3 text-white">
          <Calendar className="text-primary w-8 h-8" />
          Mission Agenda
        </h2>
        <div className="rounded-2xl border border-white/5 bg-black/40 overflow-hidden shadow-2xl">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="hover:bg-transparent border-white/5">
                <TableHead className="text-primary font-black uppercase tracking-widest text-[11px]">Time Period</TableHead>
                <TableHead className="text-primary font-black uppercase tracking-widest text-[11px]">Operational Activity</TableHead>
                <TableHead className="text-primary font-black uppercase tracking-widest text-[11px]">Sector Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {AGENDA_DATA.map((item, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="font-mono text-[12px] text-white/80">{item.time}</TableCell>
                  <TableCell className="font-bold text-white text-sm">{item.activity}</TableCell>
                  <TableCell className="text-muted-foreground text-xs italic">{item.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3 text-white">
          <MapPin className="text-accent w-8 h-8" />
          Tactical Locations
        </h2>
        <div className="rounded-2xl border border-white/5 bg-black/40 overflow-hidden shadow-2xl">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="hover:bg-transparent border-white/5">
                <TableHead className="text-accent font-black uppercase tracking-widest text-[11px]">Deployment Day</TableHead>
                <TableHead className="text-accent font-black uppercase tracking-widest text-[11px]">Time Window</TableHead>
                <TableHead className="text-accent font-black uppercase tracking-widest text-[11px]">Assigned Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {LOCATION_DATA.map((item, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="font-bold text-white text-sm">{item.day}</TableCell>
                  <TableCell className="font-mono text-[12px] text-white/80">{item.time}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{item.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 py-12">
        <Button 
          variant="outline" 
          size="lg"
          asChild
          className="h-16 px-8 rounded-full border-primary/30 bg-primary/5 hover:bg-primary/20 text-primary font-black uppercase tracking-widest group shadow-[0_0_20px_rgba(77,137,240,0.1)] transition-all"
        >
          <a href="mailto:spy@stevens.edu">
            <Mail className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
            Email Command
          </a>
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          asChild
          className="h-16 px-8 rounded-full border-accent/30 bg-accent/5 hover:bg-accent/20 text-accent font-black uppercase tracking-widest group shadow-[0_0_20px_rgba(132,237,246,0.1)] transition-all"
        >
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            <MessageSquare className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
            Join Discord
          </a>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden animate-reveal">
      <div className="absolute inset-0 -z-10 opacity-5 bg-[linear-gradient(rgba(0,120,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,120,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]" />
      
      <main className="flex-grow flex flex-col items-center py-16 px-6 max-w-7xl mx-auto w-full relative">
        
        {/* Centered Logo */}
        <div className="mb-12 flex justify-center animate-in fade-in zoom-in duration-1000">
          <img 
            src="/images/logo.png" 
            alt="SPY HACKS" 
            className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_20px_rgba(77,137,240,0.3)]"
          />
        </div>

        <div className="mb-16 flex flex-col items-center gap-6 w-full max-w-md">
          <div className={`px-8 py-3 rounded-full border flex items-center gap-3 font-mono text-xs font-black tracking-[0.3em] uppercase transition-all duration-700 shadow-2xl ${
            isActivated 
              ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-emerald-500/20" 
              : "bg-destructive/10 border-destructive/50 text-destructive shadow-destructive/20"
          }`}>
            {isActivated ? <Unlock className="w-4 h-4 animate-pulse" /> : <Lock className="w-4 h-4" />}
            SYSTEM_STATUS: {isActivated ? "ACTIVATED" : "DEACTIVATED"}
          </div>

          <div className="w-full space-y-4">
            <label className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-primary/70 block text-center">
              Awaiting Extraction Key
            </label>
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-white/5 to-primary/20 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
               <Input
                type="text"
                placeholder="____-____-____"
                value={accessCode}
                onChange={handleCodeChange}
                disabled={isActivated}
                className="relative bg-black/80 border-white/40 h-20 text-center font-mono tracking-[0.2em] text-2xl text-primary focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all rounded-2xl placeholder:opacity-20 shadow-2xl"
              />
              {isActivated && (
                <div className="absolute inset-0 bg-emerald-500/10 border-2 border-emerald-500/50 rounded-2xl flex items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-500 z-10">
                  <span className="text-emerald-400 font-mono font-black tracking-[0.3em] text-sm uppercase">Access Granted: UID_04_SECURED</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {!isActivated ? (
          <div className="w-full flex flex-col items-center gap-24">
            <div className="text-center space-y-10 max-w-3xl animate-reveal">
              <div className="space-y-4">
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                  MISSION <br/> <span className="text-primary/40">LOCKED</span>
                </h1>
                <p className="text-muted-foreground/80 text-xl font-medium tracking-tight">
                  After registration, you will receive an access key which will give you all the mission briefings.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <Button 
                  size="lg" 
                  asChild
                  className="h-20 px-16 rounded-full text-xl font-black uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 shadow-[0_0_40px_rgba(0,84,227,0.3)] transition-all hover:scale-105 active:scale-95"
                >
                  <a href={REGISTRATION_LINK} target="_blank" rel="noopener noreferrer">
                    Register for Mission
                    <ChevronRight className="ml-2 w-6 h-6" />
                  </a>
                </Button>
                <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">Awaiting Identity Verification...</span>
              </div>
            </div>

            {renderIntelligenceTables()}

            <div className="w-full border-t border-white/5 pt-24">
              <FAQAssistant />
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="p-6 bg-primary/10 rounded-full mb-4 animate-bounce">
                <Shield className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-8xl md:text-9xl font-black tracking-tighter uppercase leading-[0.75] text-white">
                SPY <br/> <span className="text-primary">HACKS</span>
              </h1>
              <p className="text-muted-foreground/80 text-2xl font-medium max-w-2xl leading-relaxed">
                Welcome back, Agent. All sub-networks have been decrypted. Standby for operational objectives at <span className="text-white font-bold">SPY HACKS 2026</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: FileText, title: "Briefing", desc: "Operational parameters and mission guidelines.", color: "text-primary" },
                { icon: Terminal, title: "Hardware", desc: "Decrypted lab access and dev kit allocation.", color: "text-accent" },
                { icon: Database, title: "Intel Vault", desc: "Exclusive resources for building the future.", color: "text-primary" },
                { icon: Globe, title: "Network", desc: "Connect with the elite Stevens.py collective.", color: "text-accent" }
              ].map((item, i) => (
                <div key={i} className="glass-card p-12 rounded-[2.5rem] border-white/5 hover:border-primary/40 transition-all group cursor-pointer flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <div className={`p-6 rounded-2xl bg-white/5 mb-8 group-hover:bg-primary/10 transition-colors`}>
                    <item.icon className={`w-12 h-12 ${item.color}`} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-white">{item.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed font-medium uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {renderIntelligenceTables()}

            <div className="w-full border-t border-white/5 pt-24">
              <FAQAssistant />
            </div>
          </div>
        )}
      </main>

      <footer className="px-12 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6 text-[10px] font-mono font-black text-muted-foreground/30 uppercase tracking-[0.5em]">
          <span>© 2026 STEVENS.PY</span>
          <span className="hidden md:block">|</span>
          <span>STEVENS INSTITUTE OF TECHNOLOGY</span>
        </div>
        <div className="text-[10px] font-mono text-primary/40 uppercase tracking-[1em] animate-pulse">
          SECURE_CONNECTION_ESTABLISHED
        </div>
      </footer>

      {/* Policy Acknowledgement Dialog */}
      <AlertDialog open={showPolicyDialog} onOpenChange={setShowPolicyDialog}>
        <AlertDialogContent className="max-w-2xl bg-[#0a0a0a] border-white/10 text-white shadow-[0_0_50px_rgba(0,0,0,1)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
              <AlertTriangle className="text-primary w-6 h-6" />
              Mission Protocol & Conduct
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm font-medium">
              Awaiting biometric confirmation. You must acknowledge and adhere to the following protocols to access the mission-critical systems.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <ScrollArea className="h-[450px] pr-4 mt-4">
            <div className="space-y-8 text-sm">
              <section className="space-y-3">
                <h4 className="flex items-center gap-2 text-primary font-black uppercase tracking-widest">
                  <XCircle className="w-4 h-4" /> 🚫 No-Show Policy
                </h4>
                <ul className="space-y-2 text-muted-foreground font-medium list-disc pl-4">
                  <li>Registered but didn’t check in by 10:00 AM (April 30) → <span className="text-white font-bold">Automatic disqualification</span></li>
                  <li>No prior notice of absence → <span className="text-white font-bold">Blacklisted from future SPY events</span></li>
                </ul>
              </section>

              <section className="space-y-4">
                <h4 className="flex items-center gap-2 text-primary font-black uppercase tracking-widest">
                  <AlertTriangle className="w-4 h-4" /> ⚠️ Disqualification Criteria
                </h4>
                
                <div className="space-y-4 pl-2">
                  <div className="space-y-2">
                    <p className="text-white font-bold">1. Attendance & Participation</p>
                    <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Leaving the venue for extended periods without approval</li>
                      <li>Entire team not present during final submission or judging</li>
                      <li>Proxy participation (someone else building/submitting for you)</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-white font-bold">2. Fair Play Violations</p>
                    <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Submitting pre-built / previously developed projects</li>
                      <li>Using external help beyond publicly available resources (e.g., getting someone outside your team to code)</li>
                      <li>Copying another team’s idea, code, or UI</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-white font-bold">3. Submission Rules</p>
                    <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Missing the final submission deadline</li>
                      <li>Failing to provide required deliverables (code, demo, presentation)</li>
                      <li>Broken or non-functional demo at judging time</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-white font-bold">4. Conduct & Integrity</p>
                    <ul className="text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Plagiarism (code, content, presentation)</li>
                      <li>Any form of cheating, manipulation, or misrepresentation</li>
                      <li>Disruptive, disrespectful, or inappropriate behavior</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel 
              onClick={handleDeclinePolicies}
              className="bg-transparent border-white/10 hover:bg-destructive/20 hover:text-destructive text-white rounded-full px-8"
            >
              Decline & Exit
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleAcceptPolicies}
              className="bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-full px-8 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Accept Protocol
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
