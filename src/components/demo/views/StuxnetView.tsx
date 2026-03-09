"use client";

import { useDemo } from "@/context/DemoContext";
import { ViewPanel } from "./ViewPanel";

const phaseLabels: Record<number, string> = {
  0: "Idle",
  1: "USB connected",
  2: "Dormant",
  3: "PLC logic modified",
  4: "Sequence One (over-speed)",
  5: "Sequence Two (under-speed)",
  6: "Alternating – Damage",
};

export function StuxnetView() {
  const { phase } = useDemo();
  const status = phaseLabels[phase] ?? "Unknown";

  return (
    <ViewPanel title="Stuxnet module">
      <div className="space-y-3 text-base">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-3 w-3 rounded-full ${
              phase >= 3 ? "bg-red-500" : "bg-zinc-400"
            }`}
          />
          <span className="font-medium">{status}</span>
        </div>
        {phase >= 3 && (
          <ul className="list-inside list-disc text-sm text-zinc-600 dark:text-zinc-400">
            <li>Modifies PLC logic</li>
            <li>Manipulates sensor data</li>
            <li>Hides attack from operator</li>
          </ul>
        )}
      </div>
    </ViewPanel>
  );
}
