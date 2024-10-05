import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[88vh] flex-col items-center justify-center px-2 py-8 text-center sm:min-h-[91vh]">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h2 className="mb-4 text-3xl font-bold sm:text-7xl">Page not found</h2>
      </div>
        <p className="mb-4 text-3xl font-bold sm:text-5xl">404</p>
      <div className="flex flex-row items-center gap-5">
        <Link href="/" className={buttonVariants({})} >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
