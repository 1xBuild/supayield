import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="h-16 w-full border-t">
      <div className="p-10 bg-card ">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <h3 className="text-2xl">Supayield</h3>
          </div>
        </div>
        <Separator className="my-6" />

        <section className="flex items-center gap-3 justify-center">
          <p>
            &copy; 2024 Designed and developed by{" "}
            <Link
              className="px-1 underline underline-offset-2"
              href="https://github.com/YohanGH"
            >
              YohanGH
            </Link>
            &
            <Link
              className="px-1 underline underline-offset-2"
              href="https://github.com/bertrandbuild"
            >
              BertrandBuild
            </Link>
            - The source code is available on{" "}
            <Link
              className="px-1 underline underline-offset-2"
              href="https://github.com/1xBuild/supayield"
            >
              GitHub
            </Link>
          </p>
        </section>
      </div>
    </footer>
  );
}
