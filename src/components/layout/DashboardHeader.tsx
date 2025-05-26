
import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  projectName?: string;
}

const DashboardHeader = ({ onToggleSidebar, projectName = "Product feedback for new Smart Watch" }: DashboardHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="hover:bg-blue-50">
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="font-semibold text-gray-900">{projectName}</h1>
          <p className="text-sm text-orange-600">Active Project</p>
        </div>
      </div>
      
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search projects, insights, participants..." 
            className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="relative hover:bg-blue-50">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
        </Button>
        <Button variant="ghost" size="sm" className="hover:bg-blue-50">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
