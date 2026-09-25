"use client";

import { useState } from "react";
import { hotspots } from "@/data/hotspots";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

type Phase = "question" | "feedback" | "summary";

interface Result {
  topic: string;
  correct: boolean;
  guess: string;
}

function evaluateGuess(guess: string, indicators: string[]): boolean {
  const lower = guess.toLowerCase();
  return indicators.some((i) => lower.includes(i));
}

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [guess, setGuess] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [lastCorrect, setLastCorrect] = useState(false);

  const hotspot = hotspots[index];
  const isLast = index === hotspots.length - 1;

  function handleSubmit() {
    if (!guess.trim()) return;
    const correct = evaluateGuess(guess, hotspot.correctIndicators);
    setLastCorrect(correct);
    setResults((prev) => [...prev, { topic: hotspot.topic, correct, guess }]);
    setPhase("feedback");
  }

  function handleNext() {
    if (isLast) {
      setPhase("summary");
      return;
    }
    setIndex((i) => i + 1);
    setGuess("");
    setPhase("question");
  }

  if (phase === "summary") {
    const correctCount = results.filter((r) => r.correct).length;
    return (
      <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 px-6 py-16">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Session complete
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {correctCount} of {hotspots.length} proven right
          </h1>
        </div>
        <Card>
          <CardContent className="flex flex-col gap-3 pt-6">
            {results.map((r) => (
              <div key={r.topic} className="flex items-center justify-between gap-4">
                <span className="text-sm">{r.topic}</span>
                <Badge
                  className="font-mono text-xs"
                  style={
                    r.correct
                      ? { backgroundColor: "var(--proof)", color: "var(--primary-foreground)" }
                      : { backgroundColor: "var(--flag)", color: "var(--primary-foreground)" }
                  }
                >
                  {r.correct ? "understood" : "revisit"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground">
          Revisit the flagged topics above, each correction pointed to the exact file and
          line in the real axios source.
        </p>
        <Button
          variant="outline"
          className="font-mono"
          onClick={() => {
            setIndex(0);
            setGuess("");
            setResults([]);
            setPhase("question");
          }}
        >
          Restart session
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 px-6 py-16">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          <span>
            topic {index + 1} / {hotspots.length}
          </span>
          <span className="text-foreground">{hotspot.topic}</span>
        </div>
        <Progress value={((index + (phase === "feedback" ? 1 : 0)) / hotspots.length) * 100} />
      </div>

      <Card key={index} className="animate-in fade-in slide-in-from-bottom-1 duration-300 border-border">
        <CardHeader>
          <Badge variant="secondary" className="w-fit font-mono text-xs">
            axios / axios
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-lg leading-relaxed">{hotspot.question}</p>

          {phase === "question" && (
            <>
              <Textarea
                placeholder="What do you think happens?"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                rows={4}
              />
              <Button onClick={handleSubmit} disabled={!guess.trim()} className="font-mono">
                Submit guess
              </Button>
            </>
          )}

          {phase === "feedback" && (
            <div className="flex flex-col gap-4">
              <Separator />
              <div className="animate-in fade-in zoom-in-95 duration-300 flex items-center gap-2">
                <Badge
                  className="font-mono text-xs"
                  style={
                    lastCorrect
                      ? { backgroundColor: "var(--proof)", color: "var(--primary-foreground)" }
                      : { backgroundColor: "var(--flag)", color: "var(--primary-foreground)" }
                  }
                >
                  {lastCorrect ? "correct" : "not quite"}
                </Badge>
              </div>
              <p className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100 fill-mode-both text-sm font-medium">
                {hotspot.correctSummary}
              </p>
              <p className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150 fill-mode-both text-sm leading-relaxed text-muted-foreground">
                {hotspot.explanation}
              </p>
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-200 fill-mode-both flex flex-col gap-2 rounded-md border border-border bg-card p-3 font-mono">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Proof, not opinion
                </p>
                {hotspot.citations.map((c, i) => (
                  <div
                    key={c.where}
                    className="animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-both flex flex-col gap-0.5 border-t border-border pt-2 text-xs first:border-t-0 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                    style={{ animationDelay: `${250 + i * 80}ms` }}
                  >
                    <span className="text-muted-foreground">{c.what}</span>
                    <span style={{ color: "var(--proof)" }}>{c.where}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleNext}
                className="animate-in fade-in duration-300 delay-500 fill-mode-both font-mono"
              >
                {isLast ? "See summary" : "Next topic"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
