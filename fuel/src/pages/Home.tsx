import WalletConnect from "@/components/sections/walletConnect"
import HeroSection from "@/components/sections/Hero"
import BenefitsSection from "@/components/sections/Benefits"
import Features from "@/components/sections/Features"
import Services from "@/components/sections/Services"
import Team from "@/components/sections/Team"
import SponsorsSection from "@/components/sections/Sponsors"

export default function Home() {
  return (
    <>
      <SponsorsSection />
      <WalletConnect />
      <HeroSection />
      <BenefitsSection />
      <Features />
      <Services />
      <Team />
    </>
  );
}
