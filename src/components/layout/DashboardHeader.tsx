
import React, { useState } from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ThemeToggle from './ThemeToggle';

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  activeTab: string;
  showNewStudy: boolean;
  currentStep?: number;
}

const DashboardHeader = ({ onToggleSidebar, activeTab, showNewStudy, currentStep }: DashboardHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const getHeaderTitle = () => {
    if (showNewStudy) {
      const steps = ['Project Setup', 'Guiding Questions', 'Form Review', 'Recruitment'];
      return `New Project - ${steps[currentStep - 1] || 'Setup'}`;
    }
    
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'analysis':
        return 'Analysis';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality here
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="hover:bg-orange-50 dark:hover:bg-gray-700">
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="font-semibold text-gray-900 dark:text-white">{getHeaderTitle()}</h1>
          {!showNewStudy && (
            <p className="text-sm text-orange-600 dark:text-orange-400">Active Project</p>
          )}
        </div>
      </div>
      
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search projects, insights, participants..." 
            className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="sm" className="relative hover:bg-orange-50 dark:hover:bg-gray-700">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
        </Button>
        <Button variant="ghost" size="sm" className="hover:bg-orange-50 dark:hover:bg-gray-700">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
