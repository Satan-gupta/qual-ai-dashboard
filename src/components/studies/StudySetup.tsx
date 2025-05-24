
import React, { useState } from 'react';
import { Upload, Clock, Mail, Globe, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const StudySetup = () => {
  const [selectedLanguages, setSelectedLanguages] = useState(['English', 'Dutch', 'French', 'German']);
  const [askEmail, setAskEmail] = useState(true);

  const removeLanguage = (language: string) => {
    setSelectedLanguages(prev => prev.filter(lang => lang !== language));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Study Setup</h2>
          <p className="text-gray-600">Configure the basic settings for your study</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">Test study</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
            Study Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Study name</label>
            <Input 
              defaultValue="Product feedback for new Smart Watch" 
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Textarea 
              placeholder="Provide a brief description of the study to the respondent. (max 1000 characters)"
              className="w-full min-h-[100px]"
              maxLength={1000}
            />
            <div className="text-right text-sm text-gray-500 mt-1">0 / 1000 characters</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How long should each interview (approximately) take?
            </label>
            <Input 
              defaultValue="20 minutes" 
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="askEmail" 
              checked={askEmail}
              onChange={(e) => setAskEmail(e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
            <label htmlFor="askEmail" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Ask respondent's email
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Respondent languages
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedLanguages.map((language) => (
                <Badge key={language} variant="secondary" className="flex items-center gap-1">
                  {language}
                  <button onClick={() => removeLanguage(language)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Welcome page image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-1">Drag files</p>
              <p className="text-sm text-gray-500">Click to upload files (must be under 10 MB.)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudySetup;
