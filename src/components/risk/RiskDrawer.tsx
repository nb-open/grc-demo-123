import React, { useState, useEffect } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetFooter 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Risk, RiskCategory, RiskStatus, Likelihood, Impact } from "@shared/types";
import { Loader2 } from "lucide-react";
interface RiskDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Risk>) => Promise<void>;
  initialData?: Risk | null;
}
export function RiskDrawer({ open, onOpenChange, onSubmit, initialData }: RiskDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Risk>>({
    title: "",
    description: "",
    category: "Operational",
    status: "Identified",
    likelihood: 3 as Likelihood,
    impact: 3 as Impact,
    owner: ""
  });
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        description: "",
        category: "Operational",
        status: "Identified",
        likelihood: 3,
        impact: 3,
        owner: ""
      });
    }
  }, [initialData, open]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{initialData ? "Edit Risk" : "Register New Risk"}</SheetTitle>
          <SheetDescription>
            Document the risk details and assign impact/likelihood scores.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          <div className="space-y-2">
            <Label htmlFor="title">Risk Title</Label>
            <Input 
              id="title" 
              required 
              value={formData.title} 
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Data Center Power Failure"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed explanation of the risk scenario..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(v: RiskCategory) => setFormData(prev => ({ ...prev, category: v }))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Operational', 'Financial', 'Strategic', 'Compliance', 'Reputational', 'Cyber'].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(v: RiskStatus) => setFormData(prev => ({ ...prev, status: v }))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Identified', 'Assessed', 'Mitigating', 'Closed'].map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Likelihood (1-5)</Label>
              <Select 
                value={String(formData.likelihood)} 
                onValueChange={(v) => setFormData(prev => ({ ...prev, likelihood: Number(v) as Likelihood }))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Impact (1-5)</Label>
              <Select 
                value={String(formData.impact)} 
                onValueChange={(v) => setFormData(prev => ({ ...prev, impact: Number(v) as Impact }))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner">Risk Owner</Label>
            <Input 
              id="owner" 
              value={formData.owner} 
              onChange={e => setFormData(prev => ({ ...prev, owner: e.target.value }))}
              placeholder="e.g., Jane Doe / IT Security"
            />
          </div>
          <SheetFooter className="pt-4">
            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? "Update Risk" : "Create Risk"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}