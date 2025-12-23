import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Assessment, AssessmentResponse } from "@shared/types";
import { CheckCircle2, AlertTriangle, XCircle, Activity, Target, Info } from "lucide-react";
import { cn } from "@/lib/utils";
interface AssessmentStatsProps {
  assessments: Assessment[];
}
export function AssessmentStats({ assessments }: AssessmentStatsProps) {
  const avgScore = assessments.length > 0
    ? Math.round(assessments.reduce((acc, a) => acc + a.score, 0) / assessments.length)
    : 0;
  const totalQuestions = assessments.reduce((acc, a) => acc + a.responses.length, 0);
  const compliantTotal = assessments.reduce((acc, a) =>
    acc + a.responses.filter(r => r.status === 'Compliant').length, 0
  );
  const recentGaps = assessments.flatMap(a =>
    a.responses
      .filter(r => r.status === 'Non-Compliant')
      .slice(0, 2)
      .map(r => ({ ...r, type: a.type }))
  );
  return (
    <div className="space-y-6">
      <Card className="bg-primary text-primary-foreground border-none overflow-hidden relative">
        <Activity className="absolute -right-4 -bottom-4 h-24 w-24 opacity-10" />
        <CardHeader className="pb-2">
          <CardTitle className="text-xs uppercase tracking-widest opacity-80">Global Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-black mb-1">{avgScore}%</div>
          <p className="text-[10px] font-medium opacity-70">Average across all frameworks</p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-[10px] font-bold uppercase text-muted-foreground">Passed</span>
          </div>
          <div className="text-2xl font-black">{compliantTotal}</div>
        </div>
        <div className="bg-card border rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="h-3.5 w-3.5 text-rose-500" />
            <span className="text-[10px] font-bold uppercase text-muted-foreground">Failed</span>
          </div>
          <div className="text-2xl font-black">{totalQuestions - compliantTotal}</div>
        </div>
      </div>
      <Card className="border-dashed">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold uppercase flex items-center gap-2">
            <Target className="h-3.5 w-3.5" /> High Priority Gaps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentGaps.length > 0 ? (
            recentGaps.map((gap, i) => (
              <div key={i} className="text-[10px] border-l-2 border-rose-500 pl-3 py-1">
                <p className="font-bold text-foreground line-clamp-1">{gap.questionId}</p>
                <p className="text-muted-foreground uppercase opacity-70">{gap.type} Framework</p>
              </div>
            ))
          ) : (
            <div className="text-[10px] text-muted-foreground italic py-4 text-center">
              No critical gaps identified.
            </div>
          )}
        </CardContent>
      </Card>
      <div className="rounded-xl border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="h-4 w-4 text-primary mt-0.5" />
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            Compliance scores are calculated based on <span className="text-foreground font-semibold">Self-Assessment</span> results. Ensure evidence is linked for audit readiness.
          </p>
        </div>
      </div>
    </div>
  );
}