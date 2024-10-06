import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="h-16 w-full border-t">
      <div className="p-10 bg-card ">

        <section className="flex items-center gap-3 justify-center">
          <p>
            &copy; 2024 Designed and developed by{" "}
            <Link
              className="px-1 underline underline-offset-2"
              to="https://github.com/YohanGH"
            >
              YohanGH
            </Link>
            &
            <Link
              className="px-1 underline underline-offset-2"
              to="https://github.com/bertrandbuild"
            >
              BertrandBuild
            </Link>
            - The source code is available on{" "}
            <Link
              className="px-1 underline underline-offset-2"
              to="https://github.com/1xBuild/supayield"
            >
              GitHub
            </Link>
          </p>
        </section>
      </div>
    </footer>
  );
}
