import { JoinUs } from "@/components/home/join-us";
import About from "@/components/home/about";
import { Activities } from "@/components/home/activities";
import { FAQ } from "@/components/home/faq";
import Hero from "@/components/home/hero";
import MeetTheTeam from "@/components/home/meet-the-team";
import WhyUs from "@/components/home/why-us";
import EventsSection from "@/components/events/events-section";

export default function Home() {
  return (
    <main className="w-full flex-1">
      <Hero />
      <About />
      <Activities />
      <EventsSection />
      <WhyUs />
      <MeetTheTeam />
      <FAQ />
      <JoinUs />
    </main>
  );
}
