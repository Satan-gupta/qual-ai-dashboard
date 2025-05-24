
import React, { useState } from 'react';
import DashboardHeader from '@/components/layout/DashboardHeader';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import StudySetup from '@/components/studies/StudySetup';
import GuidingQuestions from '@/components/studies/GuidingQuestions';
import RecruitmentSetup from '@/components/studies/RecruitmentSetup';
import AnalyticsDashboard from '@/components/analysis/AnalyticsDashboard';
import InterviewViewer from '@/components/studies/InterviewViewer';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('studies');
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: 'Study setup', component: StudySetup },
    { id: 2, label: 'Guiding questions', component: GuidingQuestions },
    { id: 3, label: 'Configure reporting', component: AnalyticsDashboard },
    { id: 4, label: 'Recruitment', component: RecruitmentSetup },
    { id: 5, label: 'Review', component: InterviewViewer },
  ];

  const renderMainContent = () => {
    if (activeTab === 'analysis') {
      return <AnalyticsDashboard />;
    }
    
    if (activeTab === 'studies') {
      const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component || StudySetup;
      return (
        <div>
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
                onClick={() => setActiveTab('dashboard')}
              >
                <ChevronLeft className="h-4 w-4" />
                Back to dashboard
              </Button>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer ${
                          step.id === currentStep 
                            ? 'bg-blue-500 text-white' 
                            : step.id < currentStep
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                        onClick={() => setCurrentStep(step.id)}
                      >
                        {step.id}
                      </div>
                      <span className={`ml-2 text-sm ${
                        step.id === currentStep ? 'text-blue-600 font-medium' : 'text-gray-600'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-px ${
                        step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <CurrentStepComponent />
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button 
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button 
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              disabled={currentStep === steps.length}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Welcome to your AI Research Platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Studies</h3>
            <p className="text-3xl font-bold text-blue-600 mb-2">3</p>
            <p className="text-sm text-gray-600">2 in progress, 1 completed</p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Participants</h3>
            <p className="text-3xl font-bold text-green-600 mb-2">247</p>
            <p className="text-sm text-gray-600">Across all studies</p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Insights Generated</h3>
            <p className="text-3xl font-bold text-purple-600 mb-2">42</p>
            <p className="text-sm text-gray-600">This month</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
