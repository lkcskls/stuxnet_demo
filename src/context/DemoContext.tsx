"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { animate } from "framer-motion";
import { phases } from "@/lib/phases";
import {
  getPhaseDisplayState,
  NORMAL_SPEED,
  OVERSPEED_HZ,
  UNDERSPEED_HZ,
} from "@/lib/simulation";
import type { ChartPhasePoint, PhaseId, SimState } from "@/lib/types";

const ANIMATION_DURATION_S = 0.4;

interface DemoContextValue {
  phase: PhaseId;
  setPhase: (next: PhaseId) => void;
  simState: SimState;
  chartDataByPhase: ChartPhasePoint[];
  phases: typeof phases;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}

function getSafeInitialState(): SimState {
  const s = getPhaseDisplayState(0);
  return {
    realSpeed: Number(s.realSpeed) || NORMAL_SPEED,
    shownSpeed: Number(s.shownSpeed) || NORMAL_SPEED,
    temperature: Number(s.temperature) || 45,
    status: s.status || "Normal",
  };
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhaseState] = useState<PhaseId>(0);
  const [targetState, setTargetState] = useState<SimState>(getSafeInitialState);
  const [displayState, setDisplayState] = useState<SimState>(getSafeInitialState);
  const targetRef = useRef<SimState>(getSafeInitialState());

  const setPhase = useCallback((next: PhaseId) => {
    const clamped = Math.max(0, Math.min(6, next)) as PhaseId;
    setPhaseState(clamped);
    const raw = getPhaseDisplayState(clamped);
    const nextTarget: SimState = {
      realSpeed: Number(raw.realSpeed) || NORMAL_SPEED,
      shownSpeed: Number(raw.shownSpeed) || NORMAL_SPEED,
      temperature: Number(raw.temperature) || 45,
      status: raw.status || "Normal",
    };
    targetRef.current = nextTarget;
    setTargetState(nextTarget);
  }, []);

  useEffect(() => {
    const target = targetRef.current;
    setDisplayState((prev) => ({ ...prev, status: target.status }));

    const from = {
      realSpeed: Number(displayState.realSpeed) || 0,
      shownSpeed: Number(displayState.shownSpeed) || 0,
      temperature: Number(displayState.temperature) || 0,
    };
    const to = {
      realSpeed: Number(target.realSpeed) || 0,
      shownSpeed: Number(target.shownSpeed) || 0,
      temperature: Number(target.temperature) || 0,
    };

    const controls = animate(from, to, {
      duration: ANIMATION_DURATION_S,
      onUpdate: (latest) => {
        const t = targetRef.current;
        setDisplayState((prev) => ({
          ...prev,
          realSpeed: Number.isFinite(Number(latest.realSpeed)) ? Number(latest.realSpeed) : t.realSpeed,
          shownSpeed: Number.isFinite(Number(latest.shownSpeed)) ? Number(latest.shownSpeed) : t.shownSpeed,
          temperature: Number.isFinite(Number(latest.temperature)) ? Number(latest.temperature) : t.temperature,
          status: t.status,
        }));
      },
    });

    return () => controls.stop();
  }, [targetState]);

  const chartDataByPhase = useMemo<ChartPhasePoint[]>(() => {
    const result: ChartPhasePoint[] = [];
    const maxPhase = Math.min(phase, 5);
    for (let i = 0; i <= maxPhase; i++) {
      if (i === 4) {
        const phaseLabel = phases[4].label;
        result.push(
          { phase: 4, phaseLabel, realSpeed: NORMAL_SPEED, shownSpeed: NORMAL_SPEED, xValue: 4 },
          { phase: 4, phaseLabel, realSpeed: OVERSPEED_HZ, shownSpeed: NORMAL_SPEED, xValue: 4.5 },
          { phase: 4, phaseLabel, realSpeed: NORMAL_SPEED, shownSpeed: NORMAL_SPEED, xValue: 4.9 },
        );
      } else if (i === 5) {
        const phaseLabel = phases[5].label;
        result.push(
          { phase: 5, phaseLabel, realSpeed: NORMAL_SPEED, shownSpeed: NORMAL_SPEED, xValue: 5 },
          { phase: 5, phaseLabel, realSpeed: UNDERSPEED_HZ, shownSpeed: NORMAL_SPEED, xValue: 5.5 },
          { phase: 5, phaseLabel, realSpeed: NORMAL_SPEED, shownSpeed: NORMAL_SPEED, xValue: 5.9 },
        );
      } else {
        const state = getPhaseDisplayState(i as PhaseId);
        result.push({
          phase: i,
          phaseLabel: phases[i].label,
          realSpeed: state.realSpeed,
          shownSpeed: state.shownSpeed,
          xValue: i,
        });
      }
    }
    if (phase >= 6) {
      const phaseLabel = phases[6].label;
      const spikes = [OVERSPEED_HZ, UNDERSPEED_HZ, OVERSPEED_HZ, UNDERSPEED_HZ, OVERSPEED_HZ, UNDERSPEED_HZ, OVERSPEED_HZ, UNDERSPEED_HZ, OVERSPEED_HZ, UNDERSPEED_HZ, OVERSPEED_HZ, UNDERSPEED_HZ, OVERSPEED_HZ, UNDERSPEED_HZ, OVERSPEED_HZ, UNDERSPEED_HZ, OVERSPEED_HZ, UNDERSPEED_HZ, OVERSPEED_HZ, UNDERSPEED_HZ, OVERSPEED_HZ, UNDERSPEED_HZ, OVERSPEED_HZ, UNDERSPEED_HZ, OVERSPEED_HZ, ];
      for (let idx = 0; idx < spikes.length; idx++) {
        const base = 6 + idx / spikes.length;
        const mid = base + 0.5 / spikes.length;
        const end = base + 0.9 / spikes.length;
        result.push(
          { phase: 6, phaseLabel, realSpeed: NORMAL_SPEED, shownSpeed: NORMAL_SPEED, xValue: base },
          { phase: 6, phaseLabel, realSpeed: spikes[idx], shownSpeed: NORMAL_SPEED, xValue: mid },
          { phase: 6, phaseLabel, realSpeed: NORMAL_SPEED, shownSpeed: NORMAL_SPEED, xValue: end },
        );
      }
    }
    return result;
  }, [phase]);

  const value = useMemo<DemoContextValue>(
    () => ({
      phase,
      setPhase,
      simState: displayState,
      chartDataByPhase,
      phases,
    }),
    [phase, setPhase, displayState, chartDataByPhase]
  );

  return (
    <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
  );
}
