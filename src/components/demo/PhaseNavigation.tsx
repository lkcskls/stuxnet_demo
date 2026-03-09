"use client";

import { useDemo } from "@/context/DemoContext";
import type { PhaseId } from "@/lib/types";
import { motion } from "framer-motion";

export function PhaseNavigation() {
  const { phase, setPhase, phases: phaseList } = useDemo();

  const goPrev = () => setPhase((phase - 1) as PhaseId);
  const goNext = () => setPhase((phase + 1) as PhaseId);

  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-panel bg-panel p-4"
      aria-label="Phase navigation"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={phase === 0}
          aria-label="Previous phase"
          className="rounded bg-zinc-200 px-5 py-3 text-base font-medium text-zinc-800 transition hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={phase === 6}
          aria-label="Next phase"
          className="rounded bg-zinc-200 px-5 py-3 text-base font-medium text-zinc-800 transition hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
        >
          Next
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-base text-zinc-600 dark:text-zinc-400">
          Step {phase + 1} of 7
        </span>
        <span
          className="rounded bg-zinc-100 px-3 py-1 text-base font-medium dark:bg-zinc-800"
          aria-live="polite"
        >
          {phaseList[phase]?.label ?? ""}
        </span>
      </div>
      <div className="flex gap-1">
        {phaseList.map((_, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => setPhase(i as PhaseId)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === phase
                ? "bg-zinc-800 dark:bg-zinc-200"
                : "bg-zinc-300 dark:bg-zinc-600"
            }`}
            aria-label={`Go to phase ${i + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </nav>
  );
}
