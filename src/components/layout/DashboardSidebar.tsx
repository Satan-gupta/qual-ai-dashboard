
import React from 'react';
import { Home, FileText, BarChart3, Users, Settings, Plus, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: number;
}

interface DashboardSidebarProps {
  isCollapsed: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardSidebar = ({ isCollapsed, activeTab, onTabChange }: DashboardSidebarProps) => {
  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { id: 'studies', label: 'Studies', icon: <FileText className="h-5 w-5" />, badge: 3 },
    { id: 'analysis', label: 'Analysis', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'participants', label: 'Participants', icon: <Users className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-gray-900">Research Platform</span>
          </div>
        )}
        
        <Button 
          className={cn(
            "w-full justify-start gap-2 mb-4 bg-blue-500 hover:bg-blue-600",
            isCollapsed && "px-2"
          )}
        >
          <Plus className="h-4 w-4" />
          {!isCollapsed && "New Study"}
        </Button>
      </div>

      <nav className="flex-1 px-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 mb-1 h-12",
              isCollapsed && "px-3",
              activeTab === item.id && "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
            )}
            onClick={() => onTabChange(item.id)}
          >
            {item.icon}
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
