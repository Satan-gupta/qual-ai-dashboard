
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TeamSettings from './TeamSettings';
import ProfileSettings from './ProfileSettings';
import BrandingSettings from './BrandingSettings';
import SubscriptionSettings from './SubscriptionSettings';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('team');

  const tabs = [
    { id: 'team', label: 'Team' },
    { id: 'profile', label: 'Profile' },
    { id: 'branding', label: 'Branding' },
    { id: 'subscription', label: 'Subscription' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'team':
        return <TeamSettings />;
      case 'profile':
        return <ProfileSettings />;
      case 'branding':
        return <BrandingSettings />;
      case 'subscription':
        return <SubscriptionSettings />;
      default:
        return <TeamSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Manage your account and application settings</p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsPage;
