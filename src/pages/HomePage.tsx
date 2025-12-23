import React, { useState, useEffect, useMemo } from "react";
import { AppSidebar, type ActiveTab } from "@/components/app-sidebar";
import { RiskTable } from "@/components/risk/RiskTable";
import { RiskDrawer } from "@/components/risk/RiskDrawer";
import { ControlTable } from "@/components/controls/ControlTable";
import { RiskHeatmap } from "@/components/dashboard/RiskHeatmap";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { SAQView } from "@/components/saq/SAQView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { Plus, Loader2, Search, FilterX } from "lucide-react";
import { api } from "@/lib/api-client";
import { Risk, RiskBoard, Control } from "@shared/types";
import { MOCK_CONTROLS } from "@shared/mock-data";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
export function HomePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [board, setBoard] = useState<RiskBoard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchBoard = async () => {
    try {
      const data = await api<RiskBoard>('/api/board');
      setBoard(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load risk register");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBoard();
  }, []);
  const filteredRisks = useMemo(() => {
    if (!board) return [];
    const query = searchQuery.toLowerCase();
    return board.risks.filter(r =>
      r.title.toLowerCase().includes(query) ||
      r.owner.toLowerCase().includes(query) ||
      r.category.toLowerCase().includes(query)
    );
  }, [board, searchQuery]);
  const filteredControls = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return MOCK_CONTROLS.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.owner.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  const handleCreateOrUpdate = async (data: Partial<Risk>) => {
    try {
      if (selectedRisk) {
        const updated = await api<RiskBoard>(`/api/risks/${selectedRisk.id}`, {
          method: 'PUT',
          body: JSON.stringify(data)
        });
        setBoard(updated);
        toast.success("Risk updated successfully");
      } else {
        const updated = await api<RiskBoard>('/api/risks', {
          method: 'POST',
          body: JSON.stringify(data)
        });
        setBoard(updated);
        toast.success("Risk registered successfully");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this risk entry?")) return;
    try {
      const updated = await api<RiskBoard>(`/api/risks/${id}`, { method: 'DELETE' });
      setBoard(updated);
      toast.info("Risk removed");
    } catch (err) {
      toast.error("Failed to delete risk");
    }
  };
  const pageTitle = {
    'dashboard': 'Risk Dashboard',
    'risk-register': 'Risk Register',
    'controls': 'Control Library',
    'saq': 'Self Assessment'
  }[activeTab];
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <SidebarInset>
        <div className="flex h-16 items-center border-b px-4 bg-background/50 backdrop-blur-md sticky top-0 z-20">
          <SidebarTrigger />
          <div className="ml-4 flex items-center gap-2 overflow-hidden">
            <h2 className="text-lg font-semibold tracking-tight whitespace-nowrap">
              {pageTitle}
            </h2>
            <span className="text-muted-foreground/40 px-2">/</span>
            <span className="text-sm text-muted-foreground truncate max-w-[200px]">{board?.name ?? 'Loading...'}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab === 'controls' ? 'controls' : 'risks'}...`}
                className="pl-8 w-[200px] lg:w-[300px] h-9 bg-secondary border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {(activeTab !== 'controls' && activeTab !== 'saq') && (
              <Button size="sm" onClick={() => { setSelectedRisk(null); setDrawerOpen(true); }}>
                <Plus className="mr-2 h-4 w-4" /> Add Risk
              </Button>
            )}
          </div>
        </div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="py-8 md:py-10 lg:py-12">
            {isLoading ? (
              <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Risks</p>
                          <h3 className="text-4xl font-black mt-2">{board?.risks.length ?? 0}</h3>
                        </div>
                        <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Critical Exposure</p>
                          <h3 className="text-4xl font-black mt-2 text-rose-600">
                            {board?.risks.filter(r => r.score >= 20).length ?? 0}
                          </h3>
                        </div>
                        <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Controls</p>
                          <h3 className="text-4xl font-black mt-2 text-blue-600">
                            {MOCK_CONTROLS.filter(c => c.status === 'Active').length}
                          </h3>
                        </div>
                      </div>
                      <div className="grid gap-6 lg:grid-cols-5">
                        <div className="lg:col-span-3">
                          <RiskHeatmap risks={board?.risks ?? []} />
                        </div>
                        <div className="lg:col-span-2 space-y-6">
                           <div className="bg-card border rounded-xl p-6 shadow-sm">
                              <h4 className="text-sm font-bold uppercase mb-4 opacity-70">Governance Health</h4>
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                Organizational control coverage is at <span className="text-foreground font-semibold">
                                {Math.round((MOCK_CONTROLS.filter(c => c.status === 'Active').length / MOCK_CONTROLS.length) * 100)}%</span>.
                                New compliance updates available for GDPR/NIST frameworks.
                              </p>
                           </div>
                           <div className="bg-card border rounded-xl p-6 shadow-sm">
                              <h4 className="text-sm font-bold uppercase mb-4 opacity-70">Risk Summary</h4>
                              <div className="space-y-3">
                                {board?.risks.slice(0, 3).map(r => (
                                  <div key={r.id} className="text-xs flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                                    <span className="truncate pr-2">{r.title}</span>
                                    <span className="text-muted-foreground whitespace-nowrap">Score: {r.score}</span>
                                  </div>
                                ))}
                              </div>
                           </div>
                        </div>
                      </div>
                      <DashboardCharts risks={board?.risks ?? []} />
                    </div>
                  )}
                  {activeTab === 'risk-register' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h1 className="text-3xl font-bold tracking-tight">Risk Register</h1>
                          <p className="text-muted-foreground">Comprehensive inventory of identified organizational risks.</p>
                        </div>
                        {searchQuery && (
                          <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
                            <FilterX className="mr-2 h-4 w-4" /> Clear Search
                          </Button>
                        )}
                      </div>
                      <RiskTable
                        risks={filteredRisks}
                        onEdit={(r) => { setSelectedRisk(r); setDrawerOpen(true); }}
                        onDelete={handleDelete}
                      />
                    </div>
                  )}
                  {activeTab === 'controls' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h1 className="text-3xl font-bold tracking-tight">Control Library</h1>
                          <p className="text-muted-foreground">A catalog of internal controls mapped to governance frameworks.</p>
                        </div>
                        {searchQuery && (
                          <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
                            <FilterX className="mr-2 h-4 w-4" /> Clear Search
                          </Button>
                        )}
                      </div>
                      <ControlTable controls={filteredControls} />
                    </div>
                  )}
                  {activeTab === 'saq' && (
                    <SAQView boardId={board?.id ?? 'default-board'} />
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </main>
        <RiskDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          onSubmit={handleCreateOrUpdate}
          initialData={selectedRisk}
        />
        <Toaster position="bottom-right" richColors />
      </SidebarInset>
    </SidebarProvider>
  );
}