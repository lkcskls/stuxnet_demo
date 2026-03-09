"use client";

import { useDemo } from "@/context/DemoContext";
import { ViewPanel } from "./ViewPanel";

export function PLCView() {
  const { phase, simState } = useDemo();
  const isModified = phase >= 3;
  const outputSpeed = Number.isFinite(Number(isModified ? simState.shownSpeed : simState.realSpeed))
  ? (isModified ? simState.shownSpeed : simState.realSpeed)
  : 1064;

  return (
    <ViewPanel title="PLC (Controller)">
      <div className="space-y-3 text-base">
        <div className="flex justify-between">
          <span className="text-zinc-500 dark:text-zinc-400">Setpoint</span>
          <span className="font-mono">1064 Hz</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500 dark:text-zinc-400">Output</span>
          <span className="font-mono font-semibold">
            {Math.round(outputSpeed)} Hz
          </span>
        </div>
        {isModified && (
          <p className="mt-2 rounded bg-amber-100 px-3 py-2 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            Logic modified
          </p>
        )}
      </div>
    </ViewPanel>
  );
}
