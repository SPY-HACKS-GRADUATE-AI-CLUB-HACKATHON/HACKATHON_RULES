
"use client";

import React, { useState, useEffect } from "react";
import { FAQAssistant } from "@/components/sections/faq-assistant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  MessageSquare,
  LifeBuoy,
  Clock,
  User,
  Trash2,
  Settings
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase";

const REGISTRATION_LINK = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=7GkajbUDRUOuIdrREvX7T4hgFkTHiG9DqlLEVj27WSZUQzJWVUhTNjlUQVJCOEpETlhVVTM4WFU5Qi4u";
const DISCORD_LINK = "https://discord.gg/Cm9uXwgvwV";
const EXTRACTION_KEY = "2026SPYHACKS_$$_";
const ADMIN_KEY = "SPYHACKSADMIN__123";

const AGENDA_DATA = [
  { date: "04/30/26", time: "9:00 am", activity: "Registration, Team Formation & Breakfast", location: "Howe 409, Bissinger" },
  { date: "04/30/26", time: "10:00 am", activity: "Event Kickstart, Keynote Speaker Speech", location: "Howe 409, Bissinger" },
  { date: "04/30/26", time: "11:30 am", activity: "Hackathon Timer Start", location: "Howe 409, Bissinger" },
  { date: "04/30/26", time: "1:30 pm", activity: "Lunch", location: "Howe 409, Bissinger" },
  { date: "04/30/26", time: "2:30 pm", activity: "Hacking Continues", location: "Howe 409, Bissinger" },
  { date: "04/30/26", time: "4:30 pm", activity: "Hacking Continues", location: "Gateway North TED Stairs" },
  { date: "04/30/26", time: "6:00 pm", activity: "Snacks", location: "Gateway North TED Stairs" },
  { date: "04/30/26", time: "9:00 pm", activity: "Hacking Continues (Dinner not Included)", location: "Gateway North TED Stairs" },
  { date: "05/01/26", time: "12:00 am - 7:30 am", activity: "Hacking Continues (Overnight)", location: "Gateway North TED Stairs" },
  { date: "05/01/26", time: "7:30 am - 8:30 am", activity: "Final Submission", location: "Online" },
  { date: "05/01/26", time: "9:00 am", activity: "Breakfast", location: "Gateway North 204" },
  { date: "05/01/26", time: "10:00 am", activity: "Keynote Speech & Project Showcase", location: "Gateway North 204" },
  { date: "05/01/26", time: "12:00 pm", activity: "Winners Announcement (End of Event)", location: "Gateway North 204" },
];

const LOCATION_DATA = [
  { day: "Day 1", time: "9:00 am - 4:30 pm", location: "Howe 409, Bissinger" },
  { day: "Day 1", time: "4:30 pm - Midnight", location: "Gateway North TED Stairs" },
  { day: "Day 2", time: "Midnight - 9:00 am", location: "Gateway North TED Stairs" },
  { day: "Day 2", time: "9:00 am - 12:00 pm", location: "Gateway North 204" },
];

type Request = {
  id: string;
  team_number: string;
  issue: string;
  created_at: string;
};

export const MainSite = () => {
  const [accessCode, setAccessCode] = useState("");
  const [isActivated, setIsActivated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPolicyDialog, setShowPolicyDialog] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [teamNumber, setTeamNumber] = useState("");
  const [issue, setIssue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isActivated || isAdmin) {
      fetchRequests();
      const channel = supabase
        .channel('requests_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'requests' }, () => {
          fetchRequests();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isActivated, isAdmin]);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error("Error fetching requests:", error);
    } else {
      setRequests(data || []);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setAccessCode(code);
    if (code === EXTRACTION_KEY) {
      setShowPolicyDialog(true);
    } else if (code === ADMIN_KEY) {
      setIsAdmin(true);
      setIsActivated(false);
    }
  };

  const handleAcceptPolicies = () => {
    setIsActivated(true);
    setIsAdmin(false);
    setShowPolicyDialog(false);
  };

  const handleDeclinePolicies = () => {
    setAccessCode("");
    setShowPolicyDialog(false);
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamNumber || !issue) return;

    setIsSubmitting(true);
    const { error } = await supabase
      .from('requests')
      .insert([{ team_number: teamNumber, issue: issue }]);

    if (error) {
      console.error("Error submitting request:", error);
    } else {
      setTeamNumber("");
      setIssue("");
    }
    setIsSubmitting(false);
  };

  const handleResolveRequest = async (id: string) => {
    const { error } = await supabase
      .from('requests')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error resolving request:", error);
    }
    // Real-time channel will trigger fetchRequests
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
                <TableHead className="text-primary font-black uppercase tracking-widest text-[11px]">Date</TableHead>
                <TableHead className="text-primary font-black uppercase tracking-widest text-[11px]">Time</TableHead>
                <TableHead className="text-primary font-black uppercase tracking-widest text-[11px]">Operational Activity</TableHead>
                <TableHead className="text-primary font-black uppercase tracking-widest text-[11px]">Sector Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {AGENDA_DATA.map((item, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="font-mono text-[12px] text-white/80">{item.date}</TableCell>
                  <TableCell className="font-mono text-[12px] text-white/80 whitespace-nowrap">{item.time}</TableCell>
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
                <TableHead className="text-accent font-black uppercase tracking-widest text-[11px]">Day</TableHead>
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

  // --- ADMIN VIEW ---
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="w-full flex justify-between items-center mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/30">
              <Settings className="w-8 h-8 text-accent animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Admin Command Center</h1>
              <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase opacity-60">Real-time Assistance Queue Monitoring</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => { setIsAdmin(false); setAccessCode(""); }}
            className="text-muted-foreground hover:text-white"
          >
            Logout Mission Control
          </Button>
        </div>

        <div className="w-full glass-card p-12 rounded-[2.5rem] border-white/5 bg-black/40">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 text-white flex items-center gap-3">
            <Clock className="text-primary w-8 h-8" />
            Active Tactical Requests ({requests.length})
          </h3>
          <div className="space-y-6">
            {requests.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4 opacity-20" />
                <p className="text-muted-foreground text-sm font-mono tracking-[0.3em] uppercase">No active distress signals</p>
              </div>
            ) : (
              requests.map((req, idx) => (
                <div key={req.id} className="p-8 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-primary/50 transition-all shadow-2xl">
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-black text-2xl shadow-inner">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-4 h-4 text-accent" />
                        <span className="text-sm font-mono font-black text-accent uppercase tracking-[0.2em]">TEAM_{req.team_number}</span>
                        <span className="text-[10px] font-mono text-muted-foreground/40 bg-white/5 px-2 py-1 rounded">
                          {new Date(req.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-white text-lg font-medium max-w-2xl leading-relaxed">{req.issue}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleResolveRequest(req.id)}
                    className="h-14 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Resolve Request
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

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
                { id: "briefing", icon: FileText, title: "Briefing", desc: "Operational parameters and mission guidelines.", color: "text-primary" },
                { id: "hardware", icon: Terminal, title: "Hardware", desc: "Decrypted lab access and dev kit allocation.", color: "text-accent" },
                { id: "vault", icon: Database, title: "Intel Vault", desc: "Exclusive resources for building the future.", color: "text-primary" },
                { id: "assistance", icon: LifeBuoy, title: "Request Assistance", desc: "Operational support for building your mission.", color: "text-accent" }
              ].map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedSection(item.id)}
                  className="glass-card p-12 rounded-[2.5rem] border-white/5 hover:border-primary/40 transition-all group cursor-pointer flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                >
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

            {/* Assistance Queue Section */}
            <div className="w-full space-y-12 py-12">
              <div className="flex flex-col md:flex-row gap-12">
                {/* Form Side */}
                <div className="w-full md:w-1/3 glass-card p-8 rounded-[2rem] border-white/5 bg-black/40">
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 text-white flex items-center gap-2">
                    <LifeBuoy className="text-accent" />
                    Deploy Request
                  </h3>
                  <form onSubmit={handleRequestSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Team Number</label>
                      <Input 
                        value={teamNumber}
                        onChange={(e) => setTeamNumber(e.target.value)}
                        placeholder="e.g. 42"
                        className="bg-black/60 border-white/10 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Operational Issue</label>
                      <Textarea 
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        placeholder="Brief description of the roadblock..."
                        className="bg-black/60 border-white/10 min-h-[120px]"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-black uppercase tracking-widest hover:brightness-110"
                    >
                      {isSubmitting ? "TRANSMITTING..." : "SEND REQUEST"}
                    </Button>
                  </form>
                </div>

                {/* Queue Side */}
                <div className="w-full md:w-2/3 glass-card p-8 rounded-[2rem] border-white/5 bg-black/40">
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 text-white flex items-center gap-2">
                    <Clock className="text-primary" />
                    Mission Support Queue
                  </h3>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {requests.length === 0 ? (
                      <div className="h-40 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl">
                        <p className="text-muted-foreground text-sm font-mono tracking-widest">NO_ACTIVE_REQUESTS</p>
                      </div>
                    ) : (
                      requests.map((req, idx) => (
                        <div key={req.id} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all">
                          <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-black text-xl">
                              {idx + 1}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <User className="w-3 h-3 text-accent" />
                                <span className="text-xs font-mono font-black text-accent uppercase tracking-widest">Team {req.team_number}</span>
                              </div>
                              <p className="text-white font-medium mt-1">{req.issue}</p>
                            </div>
                          </div>
                          <div className="text-[10px] font-mono text-muted-foreground/40 group-hover:text-primary transition-colors">
                            {new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {renderIntelligenceTables()}

            <div className="w-full border-t border-white/5 pt-24">
              <FAQAssistant />
            </div>
          </div>
        )}

        {/* Content Dialogs for Cards */}
        <Dialog open={!!selectedSection && selectedSection !== 'assistance'} onOpenChange={() => setSelectedSection(null)}>
          <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                {selectedSection === 'briefing' && <><FileText className="text-primary" /> Mission Briefing</>}
                {selectedSection === 'hardware' && <><Terminal className="text-accent" /> Hardware Intelligence</>}
                {selectedSection === 'vault' && <><Database className="text-primary" /> Intel Vault Access</>}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest">
                Classified Intelligence Segment // SECURE_CLEARANCE_UID_04
              </DialogDescription>
            </DialogHeader>
            <div className="py-8">
              {selectedSection === 'briefing' && (
                <div className="space-y-6">
                  <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
                    <h4 className="text-xl font-black text-primary uppercase mb-4">Target Objective: Topic</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Build a solution that addresses real-world espionage or security challenges using modern tech. 
                      Specific mission parameters and sub-tracks will be announced at kick-off.
                    </p>
                  </div>
                </div>
              )}
              {selectedSection === 'hardware' && (
                <div className="space-y-6">
                  <div className="p-8 rounded-2xl bg-accent/5 border border-accent/20">
                    <h4 className="text-xl font-black text-accent uppercase mb-4">Compute/Hardware Details Allowed</h4>
                    <ul className="space-y-3 text-muted-foreground list-disc pl-4">
                      <li>Personal Laptops & Workstations</li>
                      <li>Standard Microcontrollers (Arduino, ESP32, Raspberry Pi)</li>
                      <li>Limited Cloud Credit Allocation (AWS/GCP)</li>
                      <li>Bring your own hardware kits for specific builds</li>
                    </ul>
                  </div>
                </div>
              )}
              {selectedSection === 'vault' && (
                <div className="space-y-6">
                  <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
                    <h4 className="text-xl font-black text-primary uppercase mb-4">Encrypted Repositories</h4>
                    <div className="space-y-4">
                      <p className="text-sm font-mono text-muted-foreground italic tracking-widest opacity-60">FETCHING_LINKS...</p>
                      <div className="grid gap-3">
                        {["Mission SDK", "Dataset Vault 01", "Encryption Templates"].map((link) => (
                          <div key={link} className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                            <span className="font-bold text-white uppercase text-xs tracking-widest">{link}</span>
                            <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
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
