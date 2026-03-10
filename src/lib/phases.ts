import type { PhaseConfig, PhaseId } from "./types";

export const PHASE_COUNT = 7;

export const phases: PhaseConfig[] = [
  { id: 0 as PhaseId, label: "Normal operation" },
  { id: 1 as PhaseId, label: "Initial compromise (USB infection)" },
  { id: 2 as PhaseId, label: "Dormant presence & reconnaissance" },
  { id: 3 as PhaseId, label: "PLC logic subversion", stuxnetActive: true },
  { id: 4 as PhaseId, label: "Sabotage cycle A – overspeed", chartDiverges: true, stuxnetActive: true },
  { id: 5 as PhaseId, label: "Sabotage cycle B – underspeed", chartDiverges: true, stuxnetActive: true },
  { id: 6 as PhaseId, label: "Alternating cycles – progressive damage", chartDiverges: true, stuxnetActive: true },
];
