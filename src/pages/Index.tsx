
import React, { useState } from 'react';
import DashboardHeader from '@/components/layout/DashboardHeader';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import StudySetup from '@/components/studies/StudySetup';
import GuidingQuestions from '@/components/studies/GuidingQuestions';
import RecruitmentSetup from '@/components/studies/RecruitmentSetup';
import AnalysisPage from '@/components/analysis/AnalysisPage';
import StudiesView from '@/components/dashboard/StudiesView';
import FormReview from '@/components/studies/FormReview';
import SettingsPage from '@/components/settings/SettingsPage';
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
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                            : step.id < currentStep
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                        onClick={() => setCurrentStep(step.id)}
                      >
                        {step.id}
                      </div>
                      <span className={`ml-2 text-sm transition-colors ${
                        step.id === currentStep ? 'text-orange-600 font-medium' : 'text-gray-600'
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
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      );
    }

    if (activeTab === 'analysis') {
      return <AnalysisPage />;
    }

    if (activeTab === 'settings') {
      return <SettingsPage />;
    }

    return <StudiesView />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex w-full">
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onNewStudy={() => setShowNewStudy(true)}
        showNewStudy={showNewStudy}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeTab={activeTab}
          showNewStudy={showNewStudy}
          currentStep={currentStep}
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
