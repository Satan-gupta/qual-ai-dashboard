
import React, { useState } from 'react';
import { Upload, Clock, Mail, Globe, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const StudySetup = () => {
  const [selectedLanguages, setSelectedLanguages] = useState(['English', 'Hindi', 'Bengali', 'Gujarati']);
  const [askEmail, setAskEmail] = useState(true);

  const allLanguages = [
    'English', 'Hindi', 'Bengali', 'Gujarati', 'Tamil', 'Telugu', 'Odia', 'Marathi',
    'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Arabic', 'Persian', 'Turkish',
    'Indonesian', 'Malay', 'Thai', 'Vietnamese', 'Tagalog'
  ];

  const removeLanguage = (language: string) => {
    setSelectedLanguages(prev => prev.filter(lang => lang !== language));
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    );
  };

  const displayedLanguages = selectedLanguages.slice(0, 4);
  const additionalCount = selectedLanguages.length - 4;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">New Project</h2>
          <p className="text-gray-600">Configure the basic settings for your project</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white">Test project</Button>
      </div>

      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
            Project Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project name</label>
            <Input 
              defaultValue="Product feedback for new Smart Watch" 
              className="w-full focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Textarea 
              placeholder="Provide a brief description of the project to the respondent. (max 1000 characters)"
              className="w-full min-h-[100px] focus:border-blue-500"
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
              className="w-full focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="askEmail" 
              checked={askEmail}
              onChange={(e) => setAskEmail(e.target.checked)}
              className="w-4 h-4 text-blue-600 accent-blue-500"
            />
            <label htmlFor="askEmail" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail className="h-4 w-4 text-orange-500" />
              Ask respondent's email
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4 text-orange-500" />
              Respondent languages
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {displayedLanguages.map((language) => (
                <Badge key={language} variant="secondary" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
                  {language}
                  <button onClick={() => removeLanguage(language)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {additionalCount > 0 && (
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  + {additionalCount} more
                </Badge>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                  Add Languages
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto">
                {allLanguages.map((language) => (
                  <DropdownMenuCheckboxItem
                    key={language}
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={() => toggleLanguage(language)}
                  >
                    {language}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Welcome page image</label>
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-gradient-to-br from-blue-50 to-orange-50">
              <Upload className="h-8 w-8 text-orange-500 mx-auto mb-2" />
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
