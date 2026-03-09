"use client";

import { useDemo } from "@/context/DemoContext";
import { ViewPanel } from "./ViewPanel";

export function SCADAView() {
  const { simState } = useDemo();
  const shownSpeed = Number.isFinite(Number(simState.shownSpeed))
    ? simState.shownSpeed
    : 1064;
  const temperature = Number.isFinite(Number(simState.temperature))
    ? simState.temperature
    : 45;
  return (
    <ViewPanel title="SCADA (Operator View)">
      <div className="crt-screen rounded bg-black p-4 text-green-400">
        <div className="grid grid-cols-2 gap-4 text-base">
          <div>
            <span className="text-sm uppercase tracking-wider text-green-600">
              Rotor Speed
            </span>
            <p className="text-xl font-bold text-green-400">
              {Math.round(Number(shownSpeed))}{" "}
              <span className="text-base font-normal text-green-600">Hz</span>
            </p>
          </div>
          <div>
            <span className="text-sm uppercase tracking-wider text-green-600">
              Temperature
            </span>
            <p className="text-xl font-bold text-green-400">
              {Math.round(Number(temperature))}{" "}
              <span className="text-base font-normal text-green-600">°C</span>
            </p>
          </div>
        </div>

        <div className="mt-3 border-t border-green-900/50 pt-3">
          <span className="text-sm uppercase tracking-wider text-green-600">
            System Status
          </span>
          <p className="text-base font-bold text-green-300">[ HEALTHY ]</p>
        </div>

        <div className="mt-3 border-t border-green-900/50 pt-2 text-sm tracking-wide text-green-700">
          SYS.OK &gt; ALL PARAMETERS NOMINAL{" "}
          <span className="animate-pulse">█</span>
        </div>
      </div>
    </ViewPanel>
  );
}
