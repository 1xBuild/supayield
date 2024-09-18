import { BenefitsSection } from "@/components/sections/benefits";
import { CommunitySection } from "@/components/sections/community";
import { ContactSection } from "@/components/sections/contact";
import { FAQSection } from "@/components/sections/faq";
import { FeaturesSection } from "@/components/sections/features";
import { FeedbackSection } from "@/components/sections/feedback";
import { HeroSection } from "@/components/sections/hero";
import { PricingSection } from "@/components/sections/pricing";
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
      <FeedbackSection />
      <TeamSection />
      <CommunitySection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
    </>
  );
}
