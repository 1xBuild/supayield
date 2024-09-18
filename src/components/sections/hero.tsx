"use client";
import Link from "next/link"

export const HeroSection = () => {
  return (
    <div className="flex min-h-[88vh] flex-col items-center justify-center px-2 py-8 text-center sm:min-h-[91vh]">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="mb-4 text-3xl font-bold sm:text-7xl">
          Welcome to <strong>1xBuild</strong>
        </h1>
      </div>
      <div className="flex flex-row items-center gap-5">
        <Link
          href="https://github.com/bertrandbuild/template-next-web3"
          target="_blank"
          className="mb-5 flex items-center gap-2 underline underline-offset-4 sm:text-lg"
        >
          Checkout the code on GitHub{" "}
        </Link>
      </div>
    </div>
  );
}