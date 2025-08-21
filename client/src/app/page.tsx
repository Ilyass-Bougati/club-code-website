import Footer from "@/components/Footer/Footer";
import { JoinUs } from "@/components/Footer/JoinUs";
import About from "@/components/home/about";
import About2 from "@/components/home/about2";
import Hero from "@/components/home/hero";
import MeetTheTeam from "@/components/home/meet-the-team";

export default function Home() {
  return (
    <main className="w-full flex-1">
      <Hero />
      <About2 />
      <About />
      <MeetTheTeam />
      <JoinUs />
      <Footer />
    </main>
  );
}
