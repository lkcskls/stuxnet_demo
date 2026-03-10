"use client";

import { useDemo } from "@/context/DemoContext";
import { ViewPanel } from "./ViewPanel";

interface StuxnetPhaseMeta {
  label: string;
  notes: string[];
}

const stuxnetPhaseConfig: Record<number, StuxnetPhaseMeta> = {
  0: {
    label: "Normal operation",
    notes: ["No infection detected in control network."],
  },
  1: {
    label: "Initial compromise (USB infection)",
    notes: ["Malicious code introduced via removable media.", "Reconnaissance on PLC and project files begins."],
  },
  2: {
    label: "Dormant presence & reconnaissance",
    notes: ["Stuxnet hides in normal traffic and processes.", "System fingerprinting and timing analysis in progress."],
  },
  3: {
    label: "PLC logic subversion",
    notes: [
      "PLC program modified without engineering alarms.",
      "Attack primitives for speed manipulation are now resident.",
    ],
  },
  4: {
    label: "Sabotage cycle A – overspeed",
    notes: [
      "Mechanical stress induced via brief over-speed bursts.",
      "Real speed diverges from reported value.",
    ],
  },
  5: {
    label: "Sabotage cycle B – underspeed",
    notes: [
      "Under-speed cycle accelerates wear and quality loss.",
      "Operator view remains within expected thresholds.",
    ],
  },
  6: {
    label: "Alternating cycles – progressive damage",
    notes: [
      "Rapid alternation drives bearings and rotors toward failure.",
      "Physical process diverges completely from operator perception.",
    ],
  },
};

function getPhaseMeta(phase: number): StuxnetPhaseMeta {
  return (
    stuxnetPhaseConfig[phase] ?? {
      label: "Unknown phase",
      notes: ["Phase metadata missing. Check demo configuration."],
    }
  );
}

export function StuxnetView() {
  const { phase } = useDemo();
  const meta = getPhaseMeta(phase);
  const isAlertPhase = phase >= 1;

  return (
    <ViewPanel title="Stuxnet module">
      <div
        className={`flex-1 space-y-3 rounded-md border p-3 text-base transition-colors ${
          isAlertPhase
            ? "border-red-800/70 bg-red-950/40"
            : "border-zinc-700/40 bg-zinc-950/5 dark:border-zinc-700/60"
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-3 w-3 rounded-full ${
              isAlertPhase ? "bg-red-500" : "bg-zinc-400"
            }`}
          />
          <span className="font-medium">{meta.label}</span>
        </div>
        {meta.notes.length > 0 && (
          <ul className="list-inside list-disc text-sm text-zinc-700 dark:text-zinc-200/80">
            {meta.notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        )}
      </div>
    </ViewPanel>
  );
}
