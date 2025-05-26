
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BrandingSettings = () => {
  const [fontFamily, setFontFamily] = useState('Soehne, sans-serif');
  const [activeBackground, setActiveBackground] = useState('#4299e1');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <p className="text-sm text-gray-600">Settings to customize the look and feel of the respondent experience.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font family</label>
            <p className="text-sm text-gray-600 mb-3">Font(s) used for respondent experience.</p>
            <Input 
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Active background</label>
            <p className="text-sm text-gray-600 mb-3">The background color to use for active elements, e.g. microphone control, submit button.</p>
            <Input 
              value={activeBackground}
              onChange={(e) => setActiveBackground(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandingSettings;
