
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';

const SubscriptionSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <p className="text-gray-600">We could not find an active subscription for this account.</p>
            
            <div className="flex gap-3 justify-center">
              <div className="relative">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white opacity-50 cursor-not-allowed"
                  disabled
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Upgrade
                </Button>
                <Badge 
                  variant="outline" 
                  className="absolute -top-2 -right-2 bg-orange-100 text-orange-600 border-orange-300 text-xs"
                >
                  Coming Soon
                </Badge>
              </div>
              <Button variant="outline" className="text-gray-700 border-gray-300">
                Manage billing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionSettings;
