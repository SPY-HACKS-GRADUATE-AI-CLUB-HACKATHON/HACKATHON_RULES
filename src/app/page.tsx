
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Overview } from "@/components/sections/overview";
import { Schedule } from "@/components/sections/schedule";
import { FAQAssistant } from "@/components/sections/faq-assistant";
import { Sponsors } from "@/components/sections/sponsors";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Overview />
      <Schedule />
      <Sponsors />
      <FAQAssistant />
      <Footer />
    </main>
  );
}
