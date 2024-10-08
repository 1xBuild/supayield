import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Container",
    title: "DeFi for everyone",
    description:
      "Get access to the best yields in DeFi without needing a PhD to understand what you’re looking at.",
  },
  {
    icon: "Container",
    title: "Simple, accessible interface",
    description:
      "Manage your DeFi yields easily with an intuitive interface inspired by UX best practice.",
  },
  {
    icon: "Container",
    title: "First Fuel and NeoX Yield Aggregator",
    description:
      "Maximise your returns by diversifying your investments across several new chains and new strategies.",
  },
  {
    icon: "Container",
    title: "Transparent and immediate follow-up",
    description:
      "Track your investments in real time with transparent, accurate reports that you can access at any time.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why a new Yield Aggregator?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            DeFi offers some of the best yields available on the planet, but they’re often hidden behind complex UIs designed for tech people. <br />
            <br />
            <strong>Supayield is here to fix that.</strong>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="var(--primary)"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
