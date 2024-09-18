import { CommunitySection } from "@/components/sections/community";
import { ContactSection } from "@/components/sections/contact";
import { FAQSection } from "@/components/sections/faq";
import HeroSection from "@/components/sections/hero";
import { PricingSection } from "@/components/sections/pricing";
import { SponsorsSection } from "@/components/sections/sponsors";
import { TeamSection } from "@/components/sections/team";

export default function Home() {
  return (
    <>
      <SponsorsSection />
      <HeroSection />
      <TeamSection />
      <CommunitySection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
    </>
  );
}
