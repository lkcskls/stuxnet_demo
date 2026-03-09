export type PhaseId = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface SimState {
  realSpeed: number;
  shownSpeed: number;
  temperature: number;
  status: string;
}

export interface ChartPhasePoint {
  phase: number;
  phaseLabel: string;
  realSpeed: number;
  shownSpeed: number;
  xValue?: number;
}

export interface PhaseConfig {
  id: PhaseId;
  label: string;
  shortLabel?: string;
  chartDiverges?: boolean;
  stuxnetActive?: boolean;
}
