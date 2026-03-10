import type { PhaseId, SimState } from "./types";

export const NORMAL_SPEED = 1064;
export const OVERSPEED_HZ = 1410;
export const UNDERSPEED_HZ = 2;
const NORMAL_TEMP = 45;

export function getPhaseDisplayState(phase: PhaseId): SimState {
  return computeSimState(phase);
}

export function getStatusFromHealth(healthPercent: number): string {
  if (healthPercent > 90) return "Good";
  if (healthPercent > 80) return "Normal";
  if (healthPercent > 40) return "Service needed";
  return "Critical";
}

export function computeSimState(phase: PhaseId, _elapsedMs?: number): SimState {
  switch (phase) {
    case 0:
    case 1:
    case 2: {
      const healthPercent = 99;
      return {
        realSpeed: NORMAL_SPEED,
        shownSpeed: NORMAL_SPEED,
        temperature: NORMAL_TEMP,
        status: getStatusFromHealth(healthPercent),
        healthPercent,
      };
    }

    case 3: {
      const healthPercent = 99;
      return {
        realSpeed: NORMAL_SPEED,
        shownSpeed: NORMAL_SPEED,
        temperature: NORMAL_TEMP,
        status: getStatusFromHealth(healthPercent),
        healthPercent,
      };
    }

    case 4: {
      const healthPercent = 97;
      return {
        realSpeed: OVERSPEED_HZ,
        shownSpeed: NORMAL_SPEED,
        temperature: NORMAL_TEMP,
        status: getStatusFromHealth(healthPercent),
        healthPercent,
      };
    }

    case 5: {
      const healthPercent = 94;
      return {
        realSpeed: UNDERSPEED_HZ,
        shownSpeed: NORMAL_SPEED,
        temperature: NORMAL_TEMP,
        status: getStatusFromHealth(healthPercent),
        healthPercent,
      };
    }

    case 6: {
      const healthPercent = 28;
      return {
        realSpeed: NORMAL_SPEED,
        shownSpeed: NORMAL_SPEED,
        temperature: NORMAL_TEMP,
        status: getStatusFromHealth(healthPercent),
        healthPercent,
      };
    }

    default: {
      const healthPercent = 99;
      return {
        realSpeed: NORMAL_SPEED,
        shownSpeed: NORMAL_SPEED,
        temperature: NORMAL_TEMP,
        status: getStatusFromHealth(healthPercent),
        healthPercent,
      };
    }
  }
}
