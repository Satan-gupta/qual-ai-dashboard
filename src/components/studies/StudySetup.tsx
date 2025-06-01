
import React, { useState, useRef } from 'react';
import { Upload, Clock, Mail, Globe, X, ChevronDown, FileImage, Trash2 } from 'lucide-react';
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
import { useProjectStore } from '@/store/projectStore';
import { handleFileUpload, formatFileSize, UploadedFile } from '@/utils/fileUpload';

const StudySetup = () => {
  const { projectData, updateProject } = useProjectStore();
  const [selectedLanguages, setSelectedLanguages] = useState(projectData.languages);
  const [askEmail, setAskEmail] = useState(projectData.askEmail);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allLanguages = [
    'English', 'Hindi', 'Bengali', 'Gujarati', 'Tamil', 'Telugu', 'Odia', 'Marathi',
    'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Arabic', 'Persian', 'Turkish',
    'Indonesian', 'Malay', 'Thai', 'Vietnamese', 'Tagalog'
  ];

  const removeLanguage = (language: string) => {
    const newLanguages = selectedLanguages.filter(lang => lang !== language);
    setSelectedLanguages(newLanguages);
    updateProject({ languages: newLanguages });
  };

  const toggleLanguage = (language: string) => {
    const newLanguages = selectedLanguages.includes(language) 
      ? selectedLanguages.filter(lang => lang !== language)
      : [...selectedLanguages, language];
    setSelectedLanguages(newLanguages);
    updateProject({ languages: newLanguages });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const newFiles = await handleFileUpload(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      updateProject({ welcomeImage: newFiles[0]?.url });
    } catch (error) {
      console.error('Upload failed:', error);
      alert(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const newFiles = await handleFileUpload(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      updateProject({ welcomeImage: newFiles[0]?.url });
    } catch (error) {
      console.error('Upload failed:', error);
      alert(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const displayedLanguages = selectedLanguages.slice(0, 4);
  const additionalCount = selectedLanguages.length - 4;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Project</h2>
          <p className="text-gray-600 dark:text-gray-300">Configure the basic settings for your project</p>
        </div>
        <Button className="bg-gradient-to-r from-royal-blue to-orange hover:from-royal-blue-dark hover:to-orange-dark text-white">
          Test project
        </Button>
      </div>

      <Card className="border-l-4 border-l-royal-blue shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20">
          <CardTitle className="flex items-center gap-2">
            <span className="w-6 h-6 bg-gradient-to-r from-royal-blue to-orange text-white rounded-full flex items-center justify-center text-sm">1</span>
            Project Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project name</label>
            <Input 
              value={projectData.name}
              onChange={(e) => updateProject({ name: e.target.value })}
              className="w-full focus:border-royal-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <Textarea 
              value={projectData.description}
              onChange={(e) => updateProject({ description: e.target.value })}
              placeholder="Provide a brief description of the project to the respondent. (max 1000 characters)"
              className="w-full min-h-[100px] focus:border-royal-blue"
              maxLength={1000}
            />
            <div className="text-right text-sm text-gray-500 mt-1">{projectData.description.length} / 1000 characters</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How long should each interview (approximately) take?
            </label>
            <Input 
              value={projectData.duration}
              onChange={(e) => updateProject({ duration: e.target.value })}
              className="w-full focus:border-royal-blue"
            />
          </div>

          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="askEmail" 
              checked={askEmail}
              onChange={(e) => {
                setAskEmail(e.target.checked);
                updateProject({ askEmail: e.target.checked });
              }}
              className="w-4 h-4 text-royal-blue accent-royal-blue"
            />
            <label htmlFor="askEmail" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Mail className="h-4 w-4 text-orange" />
              Ask respondent's email
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4 text-orange" />
              Respondent languages
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {displayedLanguages.map((language) => (
                <Badge key={language} variant="secondary" className="flex items-center gap-1 bg-blue-50 text-royal-blue border-royal-blue/20">
                  {language}
                  <button onClick={() => removeLanguage(language)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {additionalCount > 0 && (
                <Badge variant="outline" className="text-orange border-orange/20">
                  + {additionalCount} more
                </Badge>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 border-royal-blue/20 text-royal-blue hover:bg-blue-50">
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Welcome page image</label>
            <div 
              className="border-2 border-dashed border-royal-blue/30 rounded-lg p-8 text-center bg-gradient-to-br from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20 cursor-pointer hover:border-royal-blue/50 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-orange mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                {isUploading ? 'Uploading...' : 'Drag files or click to upload'}
              </p>
              <p className="text-sm text-gray-500">Files must be under 10 MB</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploaded Files:</h4>
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileImage className="h-5 w-5 text-royal-blue" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudySetup;
