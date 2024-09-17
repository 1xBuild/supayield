import Link from "next/link";

export function Footer() {
  return (
    <footer className="h-16 w-full border-t">
      <div className="text-muted-foreground container flex h-full flex-wrap items-center justify-center gap-4 py-3 text-sm sm:justify-between sm:gap-0 sm:py-0">
        <div className="flex items-center gap-3">
          <p className="text-center">
            Build by{" "}
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
              href="https://github.com/"
            >
              GitHub
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}