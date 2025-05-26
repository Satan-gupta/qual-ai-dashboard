
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Lock, BarChart3, FileText, Users, Database, TrendingUp, Video } from 'lucide-react';

const AnalysisPage = () => {
  const [activeSubTab, setActiveSubTab] = useState('summary');
  const [aiQuery, setAiQuery] = useState('');

  const subTabs = [
    { id: 'summary', label: 'Summary', icon: BarChart3, description: 'Summary stats of the whole research' },
    { id: 'questions', label: 'Questions', icon: FileText, description: 'Question-wise analysis breakdown, including reference to text from transcripts' },
    { id: 'interviews', label: 'Interviews', icon: Users, description: 'Individual interview analysis' },
    { id: 'data', label: 'Data', icon: Database, description: 'Raw data and export options' },
  ];

  const comingSoonFeatures = [
    { id: 'sentiment', label: 'Sentiment analysis', icon: TrendingUp },
    { id: 'highlights', label: 'AI Highlight reel', icon: Video },
    { id: 'actionable', label: 'Actionable items', icon: FileText },
  ];

  const handleAiQuery = () => {
    if (aiQuery.trim()) {
      console.log('AI Query:', aiQuery);
      // Handle AI query processing here
    }
  };

  const renderContent = () => {
    switch (activeSubTab) {
      case 'summary':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Research Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">24</div>
                    <div className="text-sm text-gray-600">Total Responses</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">18.5 min</div>
                    <div className="text-sm text-gray-600">Avg Duration</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">87%</div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'questions':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Question Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Detailed question-wise breakdown will appear here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'interviews':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interview Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Individual interview analysis will appear here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'data':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Export</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Data export options will appear here.</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Analysis Options</h3>
            <div className="space-y-1">
              {subTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                    activeSubTab === tab.id
                      ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Coming Soon</h3>
            <div className="space-y-1">
              {comingSoonFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="relative w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg text-gray-400 cursor-not-allowed"
                >
                  <feature.icon className="h-4 w-4" />
                  <span className="text-sm">{feature.label}</span>
                  <Lock className="h-3 w-3 ml-auto" />
                  <Badge 
                    variant="outline" 
                    className="absolute -top-1 -right-1 bg-orange-100 text-orange-600 border-orange-300 text-xs scale-75"
                  >
                    Soon
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analysis</h2>
            <p className="text-gray-600">Comprehensive analysis of your research data</p>
          </div>

          {/* AI Query Bar */}
          <Card className="border-orange-200">
            <CardContent className="p-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Ask AI about your data... (e.g., 'What are the main pain points mentioned?')"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    className="pl-10 border-orange-200 focus:border-orange-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAiQuery()}
                  />
                </div>
                <Button 
                  onClick={handleAiQuery}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                >
                  Ask AI
                </Button>
              </div>
            </CardContent>
          </Card>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
