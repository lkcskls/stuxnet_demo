import type { PhaseConfig, PhaseId } from "./types";

export const PHASE_COUNT = 7;

export const phases: PhaseConfig[] = [
  { id: 0 as PhaseId, label: "Initial state – All good" },
  { id: 1 as PhaseId, label: "USB connected" },
  { id: 2 as PhaseId, label: "Dormant phase" },
  { id: 3 as PhaseId, label: "PLC logic modified", stuxnetActive: true },
  { id: 4 as PhaseId, label: "Sequence One (over-speed)", chartDiverges: true, stuxnetActive: true },
  { id: 5 as PhaseId, label: "Sequence Two (under-speed)", chartDiverges: true, stuxnetActive: true },
  { id: 6 as PhaseId, label: "Alternating sequences – Damage accumulation", chartDiverges: true, stuxnetActive: true },
];
