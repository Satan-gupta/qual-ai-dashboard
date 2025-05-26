
import React, { useState } from 'react';
import DashboardHeader from '@/components/layout/DashboardHeader';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import StudySetup from '@/components/studies/StudySetup';
import GuidingQuestions from '@/components/studies/GuidingQuestions';
import RecruitmentSetup from '@/components/studies/RecruitmentSetup';
import AnalyticsDashboard from '@/components/analysis/AnalyticsDashboard';
import StudiesView from '@/components/dashboard/StudiesView';
import FormReview from '@/components/studies/FormReview';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNewStudy, setShowNewStudy] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: 'Project setup', component: StudySetup },
    { id: 2, label: 'Guiding questions', component: GuidingQuestions },
    { id: 3, label: 'Form review', component: FormReview },
    { id: 4, label: 'Recruitment', component: RecruitmentSetup },
  ];

  const renderMainContent = () => {
    if (showNewStudy) {
      const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component || StudySetup;
      return (
        <div>
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                onClick={() => setShowNewStudy(false)}
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
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-all ${
                          step.id === currentStep 
                            ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg' 
                            : step.id < currentStep
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                        onClick={() => setCurrentStep(step.id)}
                      >
                        {step.id}
                      </div>
                      <span className={`ml-2 text-sm transition-colors ${
                        step.id === currentStep ? 'text-blue-600 font-medium' : 'text-gray-600'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-px transition-colors ${
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
              className="border-gray-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button 
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              disabled={currentStep === steps.length}
              className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      );
    }

    if (activeTab === 'analysis') {
      return <AnalyticsDashboard />;
    }

    if (activeTab === 'settings') {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <p className="text-gray-600">Manage your account and application settings</p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        </div>
      );
    }

    return <StudiesView />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex w-full">
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onNewStudy={() => setShowNewStudy(true)}
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
