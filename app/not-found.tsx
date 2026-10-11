import Link from "next/link";
import { Jp } from "@/components/Jp";

export default function NotFound() {
  return (
    <main id="main" className="surface-crimson pad-x relative grid min-h-svh place-items-center overflow-hidden text-center">
      <div aria-hidden="true" className="absolute size-[min(90vw,80vmin)] rounded-full bg-ink" />
      <div className="relative">
        <p className="t-label flex items-center justify-center gap-3">
          <Jp className="text-base">第404話</Jp>
          <span>episode 404</span>
        </p>
        <h1 className="t-giant mt-4 !text-[clamp(5rem,20vw,14rem)]">404</h1>
        <p className="mt-4 text-xl font-semibold">this episode does not exist.</p>
        <Link href="/" className="btn btn-solid mt-8">
          back to episode 01
        </Link>
      </div>
    </main>
  );
}
