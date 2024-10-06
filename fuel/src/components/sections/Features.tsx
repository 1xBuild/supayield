import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "TabletSmartphone",
    title: "Mobile Friendly",
    description:
      "Our app is designed to be accessible from any device, although we're still working on optimizing the mobile experience. You can already track and manage your DeFi investments, but for the best experience we recommend using a desktop computer for the time being.",
  },
  {
    icon: "BadgeCheck",
    title: "Social Proof",
    description:
      "All transactions and interactions are secured and validated on the blockchain, guaranteeing the transparency and reliability of your funds. Our smart contracts are inspired by the best practices used by leaders like Beefy.",
  },
  {
    icon: "Goal",
    title: "Targeted Content",
    description:
      "Nous fournissons des tutoriels et des guides adaptés à tous les niveaux, que vous soyez débutant en DeFi ou investisseur expérimenté, pour vous aider à maximiser vos rendements.",
  },
  {
    icon: "PictureInPicture",
    title: "Strong Visuals",
    description:
      "Our uncluttered interface lets you navigate easily between your strategies, see the evolution of your returns and adjust your positions effortlessly.",
  },
  {
    icon: "MousePointerClick",
    title: "Clear CTA",
    description:
      "We guide you every step of the way with clear directions and calls to action that help you navigate quickly and without confusion.",
  },
  {
    icon: "Newspaper",
    title: "Clear Headline",
    description:
      "Our sections are organised to give you essential information in a concise way, so you can make informed decisions about your investments.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        What Makes Us Different
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Why choose us and not someone else ?
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="var(--primary)"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
