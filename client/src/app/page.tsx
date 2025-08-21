import { JoinUs } from "@/components/Footer/JoinUs";
import About from "@/components/home/about";
import { Activities } from "@/components/home/activities";
import { FAQ } from "@/components/home/faq";
import SecondFooter from "@/components/home/footer2";
import Hero from "@/components/home/hero";
import MeetTheTeam from "@/components/home/meet-the-team";
import CreativeWhyUs from "@/components/home/why-us2";

export default function Home() {
  return (
    <main className="w-full flex-1">
      <Hero />
      <About />
      <Activities />
      <CreativeWhyUs />
      <MeetTheTeam />
      <FAQ />
      <JoinUs />
      <SecondFooter />
    </main>
  );
}
