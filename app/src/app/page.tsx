import Link from "next/link";
import { Button } from "@/components/ui/button";
import { hotspots } from "@/data/hotspots";

export default function Home() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6">
      <div className="hero-bg" aria-hidden="true" />
      <main className="relative mx-auto flex w-full max-w-xl flex-col gap-8 py-24">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-primary">●</span>
          IBM Bob 2.0 Hackathon
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-semibold tracking-tight text-balance">
            Prove Me Wrong
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            Guess what real code does. When you&apos;re wrong, Bob shows you why,
            with the exact file and line, not an opinion.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-md border border-border bg-card p-4 font-mono text-sm shadow-[0_8px_30px_-12px_rgba(79,211,196,0.25)]">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>target</span>
            <span className="text-foreground">axios/axios</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>topics</span>
            <span className="text-foreground">{hotspots.length}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>engine</span>
            <span className="text-foreground">IBM Bob 2.0</span>
          </div>
        </div>

        <Link href="/quiz" className="w-fit">
          <Button size="lg" className="font-mono">
            Start session →
          </Button>
        </Link>
      </main>
    </div>
  );
}
