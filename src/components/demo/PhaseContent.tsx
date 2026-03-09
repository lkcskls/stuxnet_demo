"use client";

import { useDemo } from "@/context/DemoContext";
import { ChartView } from "./views/ChartView";
import { FactoryView } from "./views/FactoryView";
import { PLCView } from "./views/PLCView";
import { SCADAView } from "./views/SCADAView";
import { StuxnetView } from "./views/StuxnetView";

export function PhaseContent() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FactoryView />
      <PLCView />
      <SCADAView />
      <StuxnetView />
      <div className="md:col-span-2">
        <ChartView />
      </div>
    </div>
  );
}
