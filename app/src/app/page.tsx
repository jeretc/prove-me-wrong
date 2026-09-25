import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { hotspots } from "@/data/hotspots";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 py-24">
        <Badge variant="secondary" className="w-fit">
          IBM Bob 2.0 Hackathon
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-balance">
          Prove Me Wrong
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Onboarding as a conversation. Guess what real code does, and let IBM Bob 2.0 prove
          you right or wrong — with the exact file and line, not an opinion. This session
          quizzes you on {hotspots.length} real, tricky spots in{" "}
          <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
            axios/axios
          </code>
          .
        </p>
        <Link href="/quiz" className="w-fit">
          <Button size="lg">Start session</Button>
        </Link>
      </main>
    </div>
  );
}
