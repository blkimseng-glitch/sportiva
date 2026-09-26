import AboutFooter from "./AboutFooter";
import AboutHeroSection from "./AboutHeroSection";
import ContactSection from "./ContactSection";
import MissionSection from "./MissionSection";
import TeamSection from "./TeamSection";
import VisionSection from "./VisionSection";
import WhoWeAreSection from "./WhoWeAreSection";
import WhySportivaSection from "./WhySportivaSection";

export default function AboutPage() {
  return (
    <main className="flex-1 bg-slate-50 text-slate-800 dark:bg-[#0b1322] dark:text-slate-200">
      <AboutHeroSection />
      <WhoWeAreSection />
      <MissionSection />
      <VisionSection />
      <TeamSection />
      <WhySportivaSection />

    </main>
  );
}