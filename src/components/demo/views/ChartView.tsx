"use client";

import { useEffect, useState } from "react";
import { GLOBAL_PHASE_DURATION_MS, useDemo } from "@/context/DemoContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ViewPanel } from "./ViewPanel";

export function ChartView() {
  const { chartDataByPhase, phase } = useDemo();
  const [visibleCount, setVisibleCount] = useState(chartDataByPhase.length);

  useEffect(() => {
    const totalPoints = chartDataByPhase.length;

    if (phase < 6 || totalPoints === 0) {
      setVisibleCount(totalPoints);
      return;
    }

    const firstPhase7Idx = chartDataByPhase.findIndex((p) => p.phase === 6);
    const baseCount = firstPhase7Idx === -1 ? totalPoints : firstPhase7Idx;
    const phase7Points = totalPoints - baseCount;

    if (phase7Points <= 0) {
      setVisibleCount(totalPoints);
      return;
    }

    setVisibleCount(baseCount);

    const intervalMs = GLOBAL_PHASE_DURATION_MS / phase7Points;

    const id = window.setInterval(() => {
      setVisibleCount((current) => {
        if (current >= totalPoints) {
          window.clearInterval(id);
          return current;
        }
        return current + 1;
      });
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [phase, chartDataByPhase]);

  const mapped = chartDataByPhase.map((p) => ({
    phase: p.phase,
    phaseLabel: p.phaseLabel,
    xValue: p.xValue ?? p.phase,
    realSpeed: Number.isFinite(Number(p.realSpeed)) ? Math.round(Number(p.realSpeed)) : 0,
    shownSpeed: Number.isFinite(Number(p.shownSpeed)) ? Math.round(Number(p.shownSpeed)) : 0,
  }));

  let data =
    phase >= 6
      ? mapped.slice(0, Math.max(0, Math.min(visibleCount, mapped.length)))
      : mapped;

  if (data.length === 1) {
    data = [
      { ...data[0], phase: 0, phaseLabel: data[0].phaseLabel, xValue: 0 },
      { ...data[0], phase: 1, phaseLabel: data[0].phaseLabel, xValue: 1 },
    ];
  }

  const formatStepLabel = (xValue: number) => `Step ${Math.floor(xValue) + 1}`;

  return (
    <ViewPanel title="Real vs shown speed">
      <div className="h-72 min-h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
            <XAxis
              dataKey="xValue"
              domain={[0, 7]}
              tick={false}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 1500]}
              tick={{ fontSize: 13 }}
              className="text-zinc-600 dark:text-zinc-400"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--panel)",
                border: "1px solid var(--panel-border)",
                borderRadius: "8px",
              }}
              labelFormatter={(value) => formatStepLabel(Number(value))}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="realSpeed"
              name="Real speed (Hz)"
              stroke="#dc2626"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="shownSpeed"
              name="Shown speed (Hz)"
              stroke="#ffffff"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ViewPanel>
  );
}
