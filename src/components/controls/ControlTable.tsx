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
import { Control } from "@shared/types";
import { ShieldCheck, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface ControlTableProps {
  controls: Control[];
}
export function ControlTable({ controls }: ControlTableProps) {
  const getStatusColor = (status: Control['status']) => {
    switch (status) {
      case 'Active': return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400";
      case 'Draft': return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
      case 'Retired': return "bg-muted text-muted-foreground border-border";
      default: return "";
    }
  };
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[120px] font-bold">ID</TableHead>
            <TableHead className="font-bold">Control Name</TableHead>
            <TableHead className="font-bold">Category</TableHead>
            <TableHead className="font-bold">Description</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold">Owner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {controls.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-64 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground space-y-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 opacity-40" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">No controls found</p>
                    <p className="text-sm">Try adjusting your filters.</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            controls.map((control) => (
              <TableRow key={control.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {control.id}
                </TableCell>
                <TableCell className="font-medium whitespace-nowrap">
                  {control.name}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal text-[10px] uppercase tracking-wider bg-background/50">
                    {control.category}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[250px]">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-xs text-muted-foreground truncate block cursor-help">
                          {control.description}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">{control.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <Badge className={cn("border font-semibold text-[10px]", getStatusColor(control.status))}>
                    {control.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {control.owner}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}