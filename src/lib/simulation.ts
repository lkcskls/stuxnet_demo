import type { PhaseId, SimState } from "./types";

export const NORMAL_SPEED = 1064;
export const OVERSPEED_HZ = 1410;
export const UNDERSPEED_HZ = 2;
const NORMAL_TEMP = 45;

export function getPhaseDisplayState(phase: PhaseId): SimState {
  return computeSimState(phase);
}

export function computeSimState(phase: PhaseId, _elapsedMs?: number): SimState {
  switch (phase) {
    case 0:
    case 1:
    case 2:
      return {
        realSpeed: NORMAL_SPEED,
        shownSpeed: NORMAL_SPEED,
        temperature: NORMAL_TEMP,
        status: "Normal",
      };

    case 3:
      return {
        realSpeed: NORMAL_SPEED,
        shownSpeed: NORMAL_SPEED,
        temperature: NORMAL_TEMP,
        status: "PLC modified",
      };

    case 4:
      return {
        realSpeed: OVERSPEED_HZ,
        shownSpeed: NORMAL_SPEED,
        temperature: NORMAL_TEMP,
        status: "Over-speed (15 min)",
      };

    case 5:
      return {
        realSpeed: UNDERSPEED_HZ,
        shownSpeed: NORMAL_SPEED,
        temperature: NORMAL_TEMP,
        status: "Under-speed (50 min)",
      };

    case 6:
      return {
        realSpeed: NORMAL_SPEED,
        shownSpeed: NORMAL_SPEED,
        temperature: NORMAL_TEMP,
        status: "Damage accumulation",
      };

    default:
      return {
        realSpeed: NORMAL_SPEED,
        shownSpeed: NORMAL_SPEED,
        temperature: NORMAL_TEMP,
        status: "Normal",
      };
  }
}
