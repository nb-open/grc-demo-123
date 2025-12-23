import React from "react";
import { LayoutDashboard, ShieldAlert, Settings, FileText, Info, ShieldCheck, ClipboardCheck } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
export type ActiveTab = 'dashboard' | 'risk-register' | 'controls' | 'saq';
interface AppSidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}
export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps): JSX.Element {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-3 py-4">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <ShieldAlert className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">Sentinel GRC</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => onTabChange('dashboard')}
                isActive={activeTab === 'dashboard'}
                tooltip="Dashboard"
              >
                <LayoutDashboard /> <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => onTabChange('risk-register')}
                isActive={activeTab === 'risk-register'}
                tooltip="Risk Register"
              >
                <FileText /> <span>Risk Register</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => onTabChange('controls')}
                isActive={activeTab === 'controls'}
                tooltip="Control Library"
              >
                <ShieldCheck /> <span>Control Library</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => onTabChange('saq')}
                isActive={activeTab === 'saq'}
                tooltip="Self Assessment"
              >
                <ClipboardCheck /> <span>Self Assessment</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings /> <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Help">
                <Info /> <span>Help & Support</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <div className="rounded-lg bg-secondary p-3 text-xs text-secondary-foreground border border-border">
            <p className="font-semibold">Enterprise Plan</p>
            <p className="opacity-70">Sentinel v2.5.0</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}