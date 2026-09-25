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
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-6 py-16">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">Session complete</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {correctCount} of {hotspots.length} proven right
          </h1>
        </div>
        <Card>
          <CardContent className="flex flex-col gap-3 pt-6">
            {results.map((r) => (
              <div key={r.topic} className="flex items-center justify-between gap-4">
                <span className="text-sm">{r.topic}</span>
                <Badge variant={r.correct ? "default" : "destructive"}>
                  {r.correct ? "Understood" : "Revisit this"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground">
          Revisit the flagged topics above — each correction earlier pointed to the exact file
          and line in the real axios source.
        </p>
        <Button
          variant="outline"
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
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-6 py-16">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Topic {index + 1} of {hotspots.length}
          </span>
          <span>{hotspot.topic}</span>
        </div>
        <Progress value={((index + (phase === "feedback" ? 1 : 0)) / hotspots.length) * 100} />
      </div>

      <Card>
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
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
              <Button onClick={handleSubmit} disabled={!guess.trim()}>
                Submit guess
              </Button>
            </>
          )}

          {phase === "feedback" && (
            <>
              <Separator />
              <div className="flex items-center gap-2">
                <Badge variant={lastCorrect ? "default" : "destructive"}>
                  {lastCorrect ? "Correct" : "Not quite"}
                </Badge>
                <span className="text-sm font-medium">{hotspot.correctSummary}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {hotspot.explanation}
              </p>
              <div className="flex flex-col gap-2 rounded-md border p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Proof, not opinion
                </p>
                {hotspot.citations.map((c) => (
                  <div key={c.where} className="flex flex-col text-sm sm:flex-row sm:justify-between sm:gap-4">
                    <span className="text-muted-foreground">{c.what}</span>
                    <code className="text-xs">{c.where}</code>
                  </div>
                ))}
              </div>
              <Button onClick={handleNext}>{isLast ? "See summary" : "Next topic"}</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
