import { BenefitsSection } from "@/components/sections/benefits";
import { FeaturesSection } from "@/components/sections/features";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { SponsorsSection } from "@/components/sections/sponsors";
import { TeamSection } from "@/components/sections/team";

export default function Home() {
  return (
    <>
      <SponsorsSection />
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TeamSection />
    </>
  );
}
