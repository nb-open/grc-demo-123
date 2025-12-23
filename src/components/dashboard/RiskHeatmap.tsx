import React from "react";
import { Risk } from "@shared/types";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface RiskHeatmapProps {
  risks: Risk[];
}
export function RiskHeatmap({ risks }: RiskHeatmapProps) {
  const levels = [5, 4, 3, 2, 1];
  const impacts = [1, 2, 3, 4, 5];
  const getCellRisks = (l: number, i: number) => {
    return risks.filter((r) => r.likelihood === l && r.impact === i);
  };
  const getCellColor = (l: number, i: number) => {
    const score = l * i;
    if (score >= 20) return "bg-rose-500/90 hover:bg-rose-600";
    if (score >= 12) return "bg-orange-400/90 hover:bg-orange-500";
    if (score >= 6) return "bg-amber-300/90 hover:bg-amber-400";
    return "bg-emerald-400/90 hover:bg-emerald-500";
  };
  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Risk Exposure Matrix</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Visualization of risk severity distribution</p>
        </div>
        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-tighter">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" /> Low</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-amber-300 rounded-sm" /> Med</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-orange-400 rounded-sm" /> High</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-rose-500 rounded-sm" /> Crit</div>
        </div>
      </div>
      <div className="flex">
        {/* Y-Axis Label */}
        <div className="flex flex-col justify-center pr-6 py-2">
          <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Likelihood
          </span>
        </div>
        <div className="flex-1 space-y-2">
          <div className="grid grid-cols-5 gap-2">
            {levels.map((l) =>
              impacts.map((i) => {
                const cellRisks = getCellRisks(l, i);
                return (
                  <TooltipProvider key={`${l}-${i}`}>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "aspect-square rounded-md transition-all duration-300 cursor-pointer flex items-center justify-center relative shadow-sm hover:scale-[1.02] active:scale-95",
                            getCellColor(l, i)
                          )}
                        >
                          {cellRisks.length > 0 && (
                            <span className="text-white font-black text-base drop-shadow-md">
                              {cellRisks.length}
                            </span>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="p-3 shadow-xl border-border/50">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center border-b pb-2">
                            <p className="font-black text-sm">Zone: {l * i}</p>
                            <p className="text-[10px] font-mono opacity-50">L:{l} / I:{i}</p>
                          </div>
                          {cellRisks.length > 0 ? (
                            <div className="space-y-1.5">
                              {cellRisks.slice(0, 4).map(r => (
                                <div key={r.id} className="text-[11px] leading-tight max-w-[180px]">
                                  <span className="text-muted-foreground">•</span> {r.title}
                                </div>
                              ))}
                              {cellRisks.length > 4 && (
                                <p className="text-[10px] font-medium text-primary">
                                  + {cellRisks.length - 4} more records
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-[10px] italic text-muted-foreground">No risks identified</p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })
            )}
          </div>
          {/* X-Axis Label */}
          <div className="pt-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Impact Magnitude
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}