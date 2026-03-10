"use client";

import { useDemo } from "@/context/DemoContext";
import { motion } from "framer-motion";
import { ViewPanel } from "./ViewPanel";

function safeNum(n: number): number {
  return Number.isFinite(Number(n)) ? Number(n) : 0;
}

export function FactoryView() {
  const { simState } = useDemo();
  const { realSpeed, temperature, status, healthPercent } = simState;
  const safeSpeed = safeNum(realSpeed);
  const safeHealth = Math.min(100, Math.max(0, Number(healthPercent) || 99));
  const statusColorClass =
    safeHealth > 90
      ? "text-emerald-400"
      : safeHealth > 80
        ? "text-zinc-100"
        : safeHealth > 40
          ? "text-amber-400"
          : "text-red-400";
  const healthBarClass =
    safeHealth > 90
      ? "bg-emerald-400"
      : safeHealth > 80
        ? "bg-zinc-400"
        : safeHealth > 40
          ? "bg-amber-400"
          : "bg-red-500";
  const rotation = (safeSpeed / 1064) * 360;

  return (
    <ViewPanel title="Physical process (Factory)">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <motion.div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-zinc-400 dark:border-zinc-500"
          style={{ rotate: rotation }}
          transition={{ duration: 0.05 }}
        >
          <div className="h-3 w-3 rounded-full bg-zinc-600 dark:bg-zinc-400" />
        </motion.div>
        <div className="grid grid-cols-3 gap-3 text-base">
          <div>
            <span className="text-base text-zinc-500 dark:text-zinc-400">Real speed</span>
            <p className="font-mono text-lg font-semibold">{Math.round(safeSpeed)} Hz</p>
          </div>
          <div>
            <span className="text-base text-zinc-500 dark:text-zinc-400">Temperature</span>
            <p className="font-mono text-xl font-semibold">
              {Math.round(safeNum(temperature))} °C
            </p>
          </div>
          <div>
            <span className="text-base text-zinc-500 dark:text-zinc-400">Avg. rotor health</span>
            <p className="font-mono text-lg font-semibold">~{Math.round(safeHealth)}%</p>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <motion.div
                className={`h-full rounded-full ${healthBarClass}`}
                style={{ width: safeHealth + "%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
          <div className="col-span-3">
            <span className="text-base text-zinc-500 dark:text-zinc-400">Status</span>
            <p className={`text-lg font-semibold ${statusColorClass}`}>{status}</p>
          </div>
        </div>
      </div>
    </ViewPanel>
  );
}
