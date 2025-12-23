import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { QuestionSchema } from "@shared/assessment-schemas";
import { Assessment, AssessmentResponse, ComplianceStatus, MaturityLevel } from "@shared/types";
import { CheckCircle2, ChevronDown, FileText, Info, Save } from "lucide-react";
import { cn } from "@/lib/utils";
interface QuestionnaireFormProps {
  type: string;
  schema: QuestionSchema[];
  initialData?: Assessment;
  onSave: (responses: AssessmentResponse[]) => void;
}
export function QuestionnaireForm({ schema, initialData, onSave }: QuestionnaireFormProps) {
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  useEffect(() => {
    if (initialData?.responses) {
      setResponses(initialData.responses);
    } else {
      setResponses(schema.map(q => ({
        questionId: q.id,
        status: 'Non-Compliant' as ComplianceStatus,
        maturity: 1 as MaturityLevel,
        comments: '',
        evidence: ''
      })));
    }
  }, [initialData, schema]);
  const updateResponse = (id: string, updates: Partial<AssessmentResponse>) => {
    setResponses(prev => prev.map(r => r.questionId === id ? { ...r, ...updates } : r));
  };
  const getResponse = (id: string) => responses.find(r => r.questionId === id);
  const completionPercent = Math.round((responses.filter(r => r.status !== 'Non-Compliant').length / schema.length) * 100) || 0;
  return (
    <div className="space-y-6">
      <div className="bg-secondary/30 rounded-lg p-4 flex items-center justify-between border">
        <div className="flex-1 max-w-md">
          <div className="flex justify-between mb-1 text-xs font-semibold">
            <span>Assessment Progress</span>
            <span>{completionPercent}%</span>
          </div>
          <Progress value={completionPercent} className="h-1.5" />
        </div>
        <Button size="sm" onClick={() => onSave(responses)} className="ml-4">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>
      <div className="space-y-4">
        {schema.map((q) => {
          const resp = getResponse(q.id);
          if (!resp) return null;
          return (
            <Card key={q.id} className="overflow-hidden border-border/50 group hover:border-primary/50 transition-colors">
              <CardHeader className="py-4 bg-muted/20">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">{q.category}</Badge>
                      <span className="text-[10px] font-mono text-muted-foreground">{q.id}</span>
                    </div>
                    <CardTitle className="text-base font-bold">{q.title}</CardTitle>
                    <p className="text-xs text-muted-foreground leading-relaxed">{q.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroup 
                      value={resp.status} 
                      onValueChange={(v: ComplianceStatus) => updateResponse(q.id, { status: v })}
                      className="flex bg-background border rounded-lg p-1"
                    >
                      {['Compliant', 'Partial', 'Non-Compliant'].map((s) => (
                        <div key={s} className="flex items-center">
                          <RadioGroupItem value={s} id={`${q.id}-${s}`} className="sr-only" />
                          <Label 
                            htmlFor={`${q.id}-${s}`}
                            className={cn(
                              "px-3 py-1.5 text-[10px] font-bold uppercase rounded-md cursor-pointer transition-all",
                              resp.status === s 
                                ? (s === 'Compliant' ? "bg-emerald-500 text-white" : s === 'Partial' ? "bg-amber-500 text-white" : "bg-rose-500 text-white")
                                : "text-muted-foreground hover:bg-muted"
                            )}
                          >
                            {s === 'Non-Compliant' ? 'Non' : s}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-4 border-t border-border/40">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-between h-8 text-[11px] font-semibold text-muted-foreground hover:text-foreground">
                      <span>Comments & Evidence</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Explanatory Comments</Label>
                      <Textarea 
                        placeholder="Provide details on how this control is implemented..." 
                        className="text-xs min-h-[80px]"
                        value={resp.comments}
                        onChange={(e) => updateResponse(q.id, { comments: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Evidence Link / File Reference</Label>
                      <Input 
                        placeholder="e.g. Sharepoint Link or Internal Wiki URL" 
                        className="text-xs"
                        value={resp.evidence}
                        onChange={(e) => updateResponse(q.id, { evidence: e.target.value })}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}