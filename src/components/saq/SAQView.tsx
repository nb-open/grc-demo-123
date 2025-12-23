import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuestionnaireForm } from "./QuestionnaireForm";
import { AssessmentStats } from "./AssessmentStats";
import { ISM_SCHEMA, ESSENTIAL_8_SCHEMA } from "@shared/assessment-schemas";
import { Assessment, AssessmentType, ApiResponse } from "@shared/types";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import { Save, RefreshCw, FileDown, ShieldCheck } from "lucide-react";
interface SAQViewProps {
  boardId: string;
}
export function SAQView({ boardId }: SAQViewProps) {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchAssessments = async () => {
    try {
      const data = await api<Assessment[]>('/api/assessments');
      setAssessments(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load assessments");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAssessments();
  }, []);
  const handleSave = async (type: AssessmentType, responses: any[]) => {
    try {
      const compliantCount = responses.filter(r => r.status === 'Compliant').length;
      const score = responses.length > 0 ? Math.round((compliantCount / responses.length) * 100) : 0;
      const payload: Partial<Assessment> = {
        type,
        boardId,
        responses,
        score
      };
      await api<Assessment>('/api/assessments', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      toast.success(`${type} Assessment saved successfully`);
      fetchAssessments();
    } catch (err) {
      toast.error("Failed to save assessment");
    }
  };
  const getAssessmentByType = (type: AssessmentType) => {
    return assessments.find(a => a.type === type);
  };
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Self Assessment</h1>
          <p className="text-muted-foreground">Internal governance questionnaires for regulatory alignment.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <FileDown className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button variant="outline" size="sm" onClick={fetchAssessments}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <AssessmentStats assessments={assessments} />
        </div>
        <div className="lg:col-span-3">
          <Tabs defaultValue="ISM" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="ISM">ISM (Security Manual)</TabsTrigger>
              <TabsTrigger value="ASD_E8">ASD Essential 8</TabsTrigger>
            </TabsList>
            <TabsContent value="ISM">
              <QuestionnaireForm 
                type="ISM" 
                schema={ISM_SCHEMA} 
                initialData={getAssessmentByType('ISM')}
                onSave={(data) => handleSave('ISM', data)}
              />
            </TabsContent>
            <TabsContent value="ASD_E8">
              <QuestionnaireForm 
                type="ASD_E8" 
                schema={ESSENTIAL_8_SCHEMA} 
                initialData={getAssessmentByType('ASD_E8')}
                onSave={(data) => handleSave('ASD_E8', data)}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}