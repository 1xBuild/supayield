import HeroSection from "@/components/sections/Hero"
import BenefitsSection from "@/components/sections/Benefits"
import Features from "@/components/sections/Features"
import Team from "@/components/sections/Team"
import SponsorsSection from "@/components/sections/Sponsors"

export default function Home() {
  return (
    <>
      <SponsorsSection />
      <HeroSection />
      <BenefitsSection />
      <Features />
      <Team />
    </>
  );
}
