"use client";

import { useState } from "react";
import { hotspots, type Citation } from "@/data/hotspots";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const AXIOS_COMMIT = "961241f6c19798eff16b0869486c125430a17961";

type Phase = "question" | "feedback" | "followup-question" | "followup-feedback" | "summary";

interface Result {
  topic: string;
  correct: boolean;
  guess: string;
}

function evaluateGuess(guess: string, indicators: string[]): boolean {
  const lower = guess.toLowerCase();
  return indicators.some((i) => {
    const escaped = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`).test(lower);
  });
}

function citationUrl(where: string): string {
  const match = where.match(/^(.+):(\d+)(?:-(\d+))?$/);
  if (!match) return `https://github.com/axios/axios/blob/${AXIOS_COMMIT}`;
  const [, path, start, end] = match;
  const hash = end ? `L${start}-L${end}` : `L${start}`;
  return `https://github.com/axios/axios/blob/${AXIOS_COMMIT}/${path}#${hash}`;
}

function VerdictBadge({ correct }: { correct: boolean }) {
  return (
    <Badge
      className="font-mono text-xs"
      style={
        correct
          ? { backgroundColor: "var(--proof)", color: "var(--primary-foreground)" }
          : { backgroundColor: "var(--flag)", color: "var(--primary-foreground)" }
      }
    >
      {correct ? "correct" : "not quite"}
    </Badge>
  );
}

function CitationList({ citations }: { citations: Citation[] }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-200 fill-mode-both flex flex-col gap-2 rounded-md border border-border bg-card p-3 font-mono">
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Proof, not opinion, click to view the real source
      </p>
      {citations.map((c, i) => (
        <a
          key={c.where}
          href={citationUrl(c.where)}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-both group flex flex-col gap-0.5 border-t border-border pt-2 text-xs first:border-t-0 first:pt-0 hover:opacity-80 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          style={{ animationDelay: `${250 + i * 80}ms` }}
        >
          <span className="text-muted-foreground">{c.what}</span>
          <span className="underline-offset-2 group-hover:underline" style={{ color: "var(--proof)" }}>
            {c.where} ↗
          </span>
        </a>
      ))}
    </div>
  );
}

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [guess, setGuess] = useState("");
  const [followUpGuess, setFollowUpGuess] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [lastFollowUpCorrect, setLastFollowUpCorrect] = useState(false);

  const hotspot = hotspots[index];
  const isLast = index === hotspots.length - 1;
  const scoreSoFar = results.filter((r) => r.correct).length;

  function handleSubmit() {
    if (!guess.trim()) return;
    const correct = evaluateGuess(guess, hotspot.correctIndicators);
    setLastCorrect(correct);
    setResults((prev) => [...prev, { topic: hotspot.topic, correct, guess }]);
    setPhase("feedback");
  }

  function handleTryFollowUp() {
    setFollowUpGuess("");
    setPhase("followup-question");
  }

  function handleFollowUpSubmit() {
    if (!followUpGuess.trim()) return;
    const correct = evaluateGuess(followUpGuess, hotspot.followUp.correctIndicators);
    setLastFollowUpCorrect(correct);
    setPhase("followup-feedback");
  }

  function goToNextTopic() {
    if (isLast) {
      setPhase("summary");
      return;
    }
    setIndex((i) => i + 1);
    setGuess("");
    setPhase("question");
  }

  function submitShortcut(e: React.KeyboardEvent<HTMLTextAreaElement>, onSubmit: () => void) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  }

  if (phase === "summary") {
    const correctCount = results.filter((r) => r.correct).length;
    const understood = results.filter((r) => r.correct).map((r) => r.topic);
    const revisit = results
      .filter((r) => !r.correct)
      .map((r) => hotspots.find((h) => h.topic === r.topic))
      .filter((h): h is (typeof hotspots)[number] => !!h);

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
          <CardContent className="flex flex-col gap-4 pt-6 text-sm leading-relaxed">
            {understood.length > 0 && (
              <p>
                You showed solid understanding of{" "}
                <span className="text-foreground">{understood.join(", ")}</span>
                {understood.length === hotspots.length
                  ? ", the full request lifecycle."
                  : "."}
              </p>
            )}
            {revisit.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="font-medium text-foreground">
                  {revisit.length} area{revisit.length > 1 ? "s" : ""} worth revisiting:
                </p>
                <ul className="flex flex-col gap-2">
                  {revisit.map((h) => (
                    <li key={h.id} className="border-l-2 border-border pl-3">
                      <span className="font-mono text-xs" style={{ color: "var(--flag)" }}>
                        {h.topic}
                      </span>
                      <p className="text-muted-foreground">{h.correctSummary}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="font-mono text-xs text-muted-foreground">
              {correctCount === hotspots.length
                ? "Perfect score, you have a complete mental model of this repo."
                : `You got ${correctCount} out of ${hotspots.length}. Nail these and you'll have a complete mental model of the axios request lifecycle.`}
            </p>
          </CardContent>
        </Card>
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

  const onFollowUp = phase === "followup-question" || phase === "followup-feedback";
  const activeQuestion = onFollowUp ? hotspot.followUp.question : hotspot.question;

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 px-6 py-16">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          <span>
            topic {index + 1} / {hotspots.length}
          </span>
          <span className="flex items-center gap-3">
            {results.length > 0 && (
              <span style={{ color: "var(--proof)" }}>{scoreSoFar} correct so far</span>
            )}
            <span className="hidden text-foreground sm:inline">{hotspot.topic}</span>
          </span>
        </div>
        <Progress value={((index + (phase !== "question" ? 1 : 0)) / hotspots.length) * 100} />
      </div>

      <Card key={`${index}-${onFollowUp}`} className="animate-in fade-in slide-in-from-bottom-1 duration-300 border-border">
        <CardHeader>
          <Badge variant="secondary" className="w-fit font-mono text-xs">
            axios / axios{onFollowUp ? " · follow-up" : ""}
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-lg leading-relaxed">{activeQuestion}</p>

          {phase === "question" && (
            <>
              <Textarea
                placeholder="What do you think happens? (Ctrl/Cmd+Enter to submit)"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => submitShortcut(e, handleSubmit)}
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
                <VerdictBadge correct={lastCorrect} />
              </div>
              <p className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100 fill-mode-both text-sm font-medium">
                {hotspot.correctSummary}
              </p>
              <p className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150 fill-mode-both text-sm leading-relaxed text-muted-foreground">
                {hotspot.explanation}
              </p>
              <CitationList citations={hotspot.citations} />
              {lastCorrect ? (
                <Button
                  onClick={goToNextTopic}
                  className="animate-in fade-in duration-300 delay-500 fill-mode-both font-mono"
                >
                  {isLast ? "See summary" : "Next topic"}
                </Button>
              ) : (
                <Button
                  onClick={handleTryFollowUp}
                  className="animate-in fade-in duration-300 delay-500 fill-mode-both font-mono"
                >
                  Try an easier follow-up
                </Button>
              )}
            </div>
          )}

          {phase === "followup-question" && (
            <>
              <Textarea
                placeholder="What do you think happens? (Ctrl/Cmd+Enter to submit)"
                value={followUpGuess}
                onChange={(e) => setFollowUpGuess(e.target.value)}
                onKeyDown={(e) => submitShortcut(e, handleFollowUpSubmit)}
                rows={4}
              />
              <Button onClick={handleFollowUpSubmit} disabled={!followUpGuess.trim()} className="font-mono">
                Submit guess
              </Button>
            </>
          )}

          {phase === "followup-feedback" && (
            <div className="flex flex-col gap-4">
              <Separator />
              <div className="animate-in fade-in zoom-in-95 duration-300 flex items-center gap-2">
                <VerdictBadge correct={lastFollowUpCorrect} />
              </div>
              <p className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100 fill-mode-both text-sm font-medium">
                {hotspot.followUp.correctSummary}
              </p>
              <p className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150 fill-mode-both text-sm leading-relaxed text-muted-foreground">
                {hotspot.followUp.explanation}
              </p>
              <CitationList citations={hotspot.followUp.citations} />
              <Button
                onClick={goToNextTopic}
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
