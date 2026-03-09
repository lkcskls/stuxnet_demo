"use client";

import { DemoProvider } from "@/context/DemoContext";
import { PhaseContent } from "./PhaseContent";
import { PhaseNavigation } from "./PhaseNavigation";

export function StuxnetDemo() {
  return (
    <DemoProvider>
      <div className="flex min-h-screen flex-col gap-6 p-6">
        <header>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Stuxnet Demo
          </h1>
        </header>
        <PhaseNavigation />
        <PhaseContent />
      </div>
    </DemoProvider>
  );
}
