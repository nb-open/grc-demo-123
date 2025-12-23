import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Risk } from "@shared/types";
import { Edit2, Trash2, Shield, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface RiskTableProps {
  risks: Risk[];
  onEdit: (risk: Risk) => void;
  onDelete: (id: string) => void;
}
export function RiskTable({ risks, onEdit, onDelete }: RiskTableProps) {
  const getScoreBadge = (score: number) => {
    if (score >= 20) return "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400";
    if (score >= 12) return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400";
    if (score >= 6) return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400";
  };
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 h-12">
            <TableHead className="w-[80px] font-bold text-xs uppercase tracking-wider">ID</TableHead>
            <TableHead className="min-w-[280px] font-bold text-xs uppercase tracking-wider">Risk Description</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider">Category</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider w-[120px]">
              <div className="flex items-center gap-1.5">
                Score
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><Info className="h-3 w-3 text-muted-foreground/60" /></TooltipTrigger>
                    <TooltipContent>Likelihood (1-5) x Impact (1-5)</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider">Status</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider">Custodian</TableHead>
            <TableHead className="text-right font-bold text-xs uppercase tracking-wider w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {risks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-72 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground space-y-4">
                  <div className="h-14 w-14 rounded-full bg-muted/50 flex items-center justify-center">
                    <Shield className="h-7 w-7 opacity-30" />
                  </div>
                  <div className="max-w-[280px]">
                    <p className="font-bold text-foreground">Registry is dormant</p>
                    <p className="text-xs mt-1 text-muted-foreground/80 leading-relaxed">No risks currently meet your criteria. Use the search or adjust filters to view data.</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            risks.map((risk) => (
              <TableRow key={risk.id} className="group hover:bg-accent/40 transition-all duration-150">
                <TableCell className="font-mono text-[10px] text-muted-foreground/60 group-hover:text-foreground/80 transition-colors">
                  {risk.id.slice(0, 8)}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col space-y-0.5">
                    <span className="font-bold text-sm text-foreground/90 group-hover:text-foreground">{risk.title}</span>
                    <span className="text-[11px] text-muted-foreground/70 line-clamp-1">{risk.description}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-bold text-[9px] uppercase tracking-widest bg-background/50 border-border/60">
                    {risk.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={cn("border font-black tabular-nums shadow-sm px-2.5", getScoreBadge(risk.score))}>
                    {risk.score}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      risk.status === 'Closed' ? 'bg-zinc-300' :
                      risk.status === 'Mitigating' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 
                      'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                    )} />
                    <span className="text-xs font-semibold text-foreground/80">{risk.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-medium text-foreground/70">
                  {risk.owner}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => onEdit(risk)}
                      className="h-8 w-8 hover:bg-primary hover:text-primary-foreground shadow-sm"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => onDelete(risk.id)}
                      className="h-8 w-8 text-destructive hover:bg-destructive hover:text-destructive-foreground shadow-sm"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}