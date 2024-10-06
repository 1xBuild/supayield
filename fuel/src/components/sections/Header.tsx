import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "./theme-toggle";
import { useState } from "react";
import { Github, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const NAVLINKS = [
  {
    title: "Benefits",
    href: "/#benefits",
  },
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "Services",
    href: "/#services",
  },
  {
    title: "Team",
    href: "/#team",
  },
  {
    title: "-",
    href: "/",
  },
  {
    title: "Earn",
    href: "/earn",
  },
  {
    title: "Portfolio",
    href: "/portfolio",
  },
  {
    title: "Documentation",
    href: "/docs",
  },
  // Add others navigation
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-1 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link to="/" className="font-bold text-lg flex items-center">
        Supayield
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link to="/" className="flex items-center">
                    Supayield
                  </Link>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Navigation */}
              <div className="flex flex-col gap-2">
                {NAVLINKS.map(({ href, title }) => {
                  const isAnchorLink = href.startsWith("/#");

                  return (
                    <Button
                      key={href}
                      onClick={() => setIsOpen(false)}
                      asChild
                      variant="ghost"
                      className="justify-start text-base"
                    >
                      {isAnchorLink ? (
                        <a href={href}>{title}</a>
                      ) : (
                        <Link to={href}>{title}</Link>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <ModeToggle />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem></NavigationMenuItem>

          <NavigationMenuItem>
            {NAVLINKS.map(({ href, title }) => {
              const isAnchorLink = href.startsWith("/#");

              return (
                <NavigationMenuLink key={href} asChild>
                  {isAnchorLink ? (
                    <a href={href} className="text-base px-2">
                      {title}
                    </a>
                  ) : (
                    <Link to={href} className="text-base px-2">
                      {title}
                    </Link>
                  )}
                </NavigationMenuLink>
              );
            })}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <ModeToggle />

        <Button asChild size="sm" variant="ghost" aria-label="View on GitHub">
          <Link
            aria-label="View on GitHub"
            to="https://github.com/1xBuild/supayield"
            target="_blank"
          >
            <Github className="size-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
