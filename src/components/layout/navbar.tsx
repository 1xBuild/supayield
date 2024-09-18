"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./theme-toggle";

export const NAVLINKS = [
  {
    title: "Benefits",
    href: "#benefits",
  },
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Services",
    href: "#services",
  },
  {
    title: "Feedback",
    href: "#feedback",
  },
  {
    title: "Team",
    href: "#team",
  },
  {
    title: "community",
    href: "#community"
  },
  {
    title: "pricing",
    href: "#pricing"
  },
  {
    title: "Contact",
    href: "#contact",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
  {
    
    title: "Documentation",
    href: "/Docs",
  },
]

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-16 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-5">
          <Logo />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-4">
          <NavMenu />
        </div>

        {/* Mobile Menu and Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="md:hidden">
            Menu
          </Button>
        </div>
         <ModeToggle />
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="text-xl font-bold">1xBuild</span>
    </Link>
  );
}

export function NavMenu() {
  return (
    <>
      {NAVLINKS.map((item) => (
        <Link key={item.title} href={item.href}>
          <Button variant="ghost" className="text-sm font-medium">
            {item.title}
          </Button>
        </Link>
      ))}
    </>
  );
}
