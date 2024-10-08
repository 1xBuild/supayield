import { Github, Linkedin, Twitter } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialNetworkProps[];
}
interface SocialNetworkProps {
  name: string;
  url: string;
}

const TeamSection = () => {
  const teamList: TeamProps[] = [
    {
      imageUrl: "/images/eth-btc-blue.png",
      firstName: "YohanGH",
      lastName: "Build",
      positions: ["Developer", "Creator Of This Website"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "www.linkedin.com/in/yohan-regnier-5a2505254/",
        },
        {
          name: "Github",
          url: "https://github.com/YohanGH",
        },
        {
          name: "Twitter",
          url: "https://x.com/",
        },
      ],
    },
    {
      imageUrl: "/images/eth-btc-blue.png",
      firstName: "Bertrand",
      lastName: "Build",
      positions: ["UI/UX Designer"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/",
        },
        {
          name: "Github",
          url: "https://github.com/bertrandbuild",
        },
        {
          name: "Twitter",
          url: "https://x.com/",
        },
      ],
    },
  ];

  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case "LinkedIn":
        return <Linkedin />;
      case "Github":
        return <Github />;
      case "Twitter":
        return <Twitter />;
    }
  };

  return (
    <section id="team" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Team
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          The Company Dream Team
        </h2>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamList.map(
            (
              { imageUrl, firstName, lastName, positions, socialNetworks },
              index
            ) => (
              <Card
                key={index}
                className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg"
              >
                <CardHeader className="p-0 gap-0">
                  <div className="h-full overflow-hidden">
                    <img
                      src={imageUrl}
                      alt=""
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover saturate-0 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
                    />
                  </div>
                  <CardTitle className="py-6 pb-4 px-6">
                    {firstName}
                    <span className="text-primary ml-2">{lastName}</span>
                  </CardTitle>
                </CardHeader>
                {positions.map((position, index) => (
                  <CardContent
                    key={index}
                    className={`pb-0 text-muted-foreground ${
                      index === positions.length - 1 && "pb-6"
                    }`}
                  >
                    {position}
                    {index < positions.length - 1 && <span>,</span>}
                  </CardContent>
                ))}

                <CardFooter className="space-x-4 mt-auto">
                  {socialNetworks.map(({ name, url }, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      className="hover:opacity-80 transition-all"
                    >
                      {socialIcon(name)}
                    </a>
                  ))}
                </CardFooter>
              </Card>
            )
          )}
      </div>
    </section>
  );
};

export default TeamSection;