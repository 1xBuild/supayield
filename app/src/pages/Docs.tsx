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
            <Input
              placeholder="Coming soon..."
              className="pl-8 bg-gray-100 text-gray-500 cursor-not-allowed"
              disabled
            />
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
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  CLI Commands
                </Button>
              </li>
            </ul>
          </nav>
        </ScrollArea>
      </aside>

      {/* Main content */}
      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to the Documentation
        </h1>
        <p className="mb-4">
          This documentation will guide you through the features and usage of
          our product. Use the sidebar to navigate between different sections.
        </p>

        <a href="https://docs.fuel.network/" target="_blank" rel="noreferrer">
          <button className="flex items-center bg-secondary text-primary font-semibold py-2 px-4 rounded-md hover:bg-primary-dark">
            <img
              src="./logo_white.png"
              alt="Fuel Logo"
              className="w-[124px]"
            />
            View Fuel Documentation
          </button>
        </a>

        <h2 className="text-2xl font-semibold mb-2 mt-8">Quick Start</h2>
        <p className="mb-4">To get started, follow these simple steps:</p>
        <ol className="list-decimal list-inside mb-4">
          <li>
            Install the package via npm, yarn, or pnpm (see installation
            section)
          </li>
          <li>Import the necessary components into your project</li>
          <li>Configure the options according to your needs</li>
          <li>Start using the features in your application</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-2">Installation</h2>
        <p className="mb-4">
          You can install the package using one of the following package
          managers:
        </p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Using npm</h3>
          <code className="block bg-gray-100 p-2 rounded mb-2">
            npm install your-package-name
          </code>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Using yarn</h3>
          <code className="block bg-gray-100 p-2 rounded mb-2">
            yarn add your-package-name
          </code>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Using pnpm</h3>
          <code className="block bg-gray-100 p-2 rounded mb-2">
            pnpm add your-package-name
          </code>
        </div>

        <h2 className="text-2xl font-semibold mb-2">CLI Commands</h2>
        <p className="mb-4">
          Below are some common commands you will use when working with the CLI:
        </p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Change directory</h3>
          <code className="block bg-gray-100 p-2 rounded mb-2">
            cd your-project-directory
          </code>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Run the development server</h3>
          <code className="block bg-gray-100 p-2 rounded mb-2">
            npm run dev
          </code>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Build the project</h3>
          <code className="block bg-gray-100 p-2 rounded mb-2">
            npm run build
          </code>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Need help?</h2>
        <p>
          If you have any questions or encounter issues, feel free to check our
          FAQ or contact our support team.
        </p>
      </main>
    </div>
  );
}
