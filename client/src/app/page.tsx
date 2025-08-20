import Footer from "@/components/Footer/Footer";
import { JoinUs } from "@/components/Footer/JoinUs";
import About from "@/components/home/about";
import Hero from "@/components/home/hero";
import MeetTheTeam from "@/components/home/meet-the-team";

export default function Home() {
  return <main className="w-full flex-1">
    <Hero />
      <About />
         <JoinUs />
     <Footer />
  
  </main>;
} 
