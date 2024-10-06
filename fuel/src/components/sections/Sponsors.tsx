import { Icon } from "../ui/icon";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { icons } from "lucide-react";

interface sponsorsProps {
  icon: string;
  name: string;
}

const sponsors: sponsorsProps[] = [
  {
    icon: "Container",
    name: "Hackathon",
  },
  {
    icon: "Container",
    name: "Encode",
  },
  {
    icon: "Container",
    name: "Fuel",
  },
  {
    icon: "Container",
    name: "Mira Ly",
  },
  {
    icon: "Container",
    name: "Supayield",
  },
];

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="max-w-[75%] mx-auto mt-2">
      {/* TODO : Change visuel for indicate sponsors */}
      {/* <h2 className="text-lg md:text-xl text-center mb-6">
        Sponsors
      </h2> */}

      <div className="mx-auto">
        <Marquee
          className="gap-[3rem]"
          fade
          innerClassName="gap-[3rem]"
          pauseOnHover
        >
          {sponsors.map(({ icon, name }) => (
            <div
              key={name}
              className="flex items-center text-xl md:text-2xl font-medium"
            >
              <Icon
                name={icon as keyof typeof icons}
                size={32}
                color="white"
                className="mr-2"
              />
              {name}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default SponsorsSection;