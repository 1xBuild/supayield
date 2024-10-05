import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

export default function Docs() {
  return (
    <div className="flex h-screen overflow-hidden mt-2">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r border-gray-200 hidden md:block">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Documentation</h2>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-1rem)]">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  Introduction
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  Quick Start
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  Installation
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  Configuration
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  API Reference
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  Examples
                </Button>
              </li>
            </ul>
          </nav>
        </ScrollArea>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to the Documentation
        </h1>
        <p className="mb-4">
          This documentation will guide you through the features and usage of
          our product. Use the sidebar to navigate between different sections.
        </p>
        <a href="https://fuel.network/" target="_blank" rel="noreferrer">
          <img src="./logo_white.png" alt="Fuel Logo" className="w-[124px]" />
        </a>
        <h2 className="text-2xl font-semibold mb-2">Quick Start</h2>
        <p className="mb-4">To get started, follow these simple steps:</p>
        <ol className="list-decimal list-inside mb-4">
          <li>Install the package via npm or yarn</li>
          <li>Import the necessary components into your project</li>
          <li>Configure the options according to your needs</li>
          <li>Start using the features in your application</li>
        </ol>
        <h2 className="text-2xl font-semibold mb-2">Need help?</h2>
        <p>
          If you have any questions or encounter issues, feel free to check our
          FAQ or contact our support team.
        </p>
      </main>
    </div>
  );
}
