import WalletConnect from "@/components/sections/walletConnect"
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
      <BenefitsSection />
      <Features />
      <Services />
      <Team />
    </>
  );
}
