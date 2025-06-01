
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, MessageSquare, Mic, Video, Type, Image, Globe, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjectStore } from '@/store/projectStore';
import PreviewModal from './PreviewModal';

interface FormReviewProps {
  onEditQuestions?: () => void;
}

const FormReview = ({ onEditQuestions }: FormReviewProps) => {
  const { projectData } = useProjectStore();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'multiple-choice':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'open-ended':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rating-scale':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'voice-response':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case 'multiple-choice':
        return <div className="w-4 h-4 border-2 border-blue-500 rounded-sm bg-white"></div>;
      case 'open-ended':
        return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'rating-scale':
        return <div className="flex gap-1">
          {[...Array(5)].map((_, i) => <div key={i} className="w-2 h-2 bg-purple-400 rounded-full"></div>)}
        </div>;
      case 'voice-response':
        return <Mic className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case 'image':
        return <Image className="h-4 w-4 text-blue-500" />;
      case 'video':
        return <Video className="h-4 w-4 text-green-500" />;
      case 'webpage':
        return <Globe className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const renderResponseOptions = (question: any) => {
    const responseTypes = question.responseTypes || ['text'];
    return <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20 rounded-lg border border-blue-200">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">Response Options:</div>
        <div className="flex gap-2">
          {responseTypes.map((type: string) => <div key={type} className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-800 rounded border">
              {type === 'text' && <Type className="h-3 w-3 text-blue-500" />}
              {type === 'voice' && <Mic className="h-3 w-3 text-green-500" />}
              {type === 'video' && <Video className="h-3 w-3 text-orange-500" />}
              <span className="text-xs capitalize">{type}</span>
            </div>)}
        </div>
      </div>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Form Review</h2>
          <p className="text-gray-600 dark:text-gray-300">Review your project questions and form structure</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-royal-blue/20 text-royal-blue hover:bg-blue-50"
            onClick={() => setIsPreviewOpen(true)}
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-orange/20 text-orange hover:bg-orange-50"
            onClick={onEditQuestions}
          >
            <Edit className="h-4 w-4" />
            Edit Questions
          </Button>
        </div>
      </div>

      <Card className="border-l-4 border-l-royal-blue shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20">
          <CardTitle className="flex items-center gap-2">
            <span className="w-6 h-6 bg-gradient-to-r from-royal-blue to-orange text-white rounded-full flex items-center justify-center text-sm">3</span>
            Interactive Form Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-orange-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-orange-900/20 border border-blue-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-royal-blue dark:text-blue-300">Project Overview</h3>
              <Badge className="bg-gradient-to-r from-royal-blue to-orange text-white">Interactive</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p><strong className="text-royal-blue dark:text-blue-300">Project Name:</strong> {projectData.name}</p>
                <p><strong className="text-royal-blue dark:text-blue-300">Total Questions:</strong> {projectData.questions.length}</p>
              </div>
              <div className="space-y-2">
                <p><strong className="text-royal-blue dark:text-blue-300">Required Questions:</strong> {projectData.questions.filter(q => q.required).length}</p>
                <p><strong className="text-royal-blue dark:text-blue-300">Estimated Duration:</strong> {projectData.duration}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Interactive Questions Preview</h4>
              <div className="flex gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Type className="h-3 w-3" />
                  Text
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Mic className="h-3 w-3" />
                  Voice
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Video className="h-3 w-3" />
                  Video
                </Badge>
              </div>
            </div>
            
            {projectData.questions.map((question, index) => (
              <Card key={question.id} className="border-l-4 border-l-royal-blue shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-royal-blue to-orange text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`${getQuestionTypeColor(question.type || 'open-ended')} border`}>
                          {(question.type || 'open-ended').replace('-', ' ')}
                        </Badge>
                        {question.required && <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                            Required
                          </Badge>}
                        {question.media && question.media.map((media, idx) => <Badge key={idx} variant="outline" className="flex items-center gap-1">
                            {getMediaIcon(media.type)}
                            {media.type}
                          </Badge>)}
                      </div>
                    </div>
                    {getQuestionIcon(question.type || 'open-ended')}
                  </div>
                  
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">{question.title}</h5>
                  
                  {/* Media Display */}
                  {question.media && question.media.length > 0 && <div className="mb-4 flex gap-3">
                      {question.media.map((media, idx) => <div key={idx} className="relative">
                          {media.type === 'image' && <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border-2 border-blue-200">
                              <img src={media.url} alt="Question media" className="w-full h-full object-cover" />
                            </div>}
                          {media.type === 'video' && <div className="w-20 h-20 rounded-lg bg-green-100 border-2 border-green-200 flex items-center justify-center">
                              <Play className="h-8 w-8 text-green-600" />
                            </div>}
                          {media.type === 'webpage' && <div className="w-20 h-20 rounded-lg bg-orange-100 border-2 border-orange-200 flex items-center justify-center">
                              <Globe className="h-8 w-8 text-orange-600" />
                            </div>}
                        </div>)}
                    </div>}
                  
                  {question.type === 'multiple-choice' && question.options && <div className="space-y-3">
                      {question.options.map((option, optIndex) => <label key={optIndex} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-royal-blue cursor-pointer transition-all">
                          <div className="w-5 h-5 border-2 border-royal-blue rounded-sm bg-white"></div>
                          <span className="text-gray-700 dark:text-gray-300">{option}</span>
                        </label>)}
                    </div>}
                  
                  {question.type === 'open-ended' && <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 min-h-[100px] relative">
                      <span className="text-sm text-gray-500 italic">Open-ended response area</span>
                      {renderResponseOptions(question)}
                    </div>}

                  {question.type === 'voice-response' && <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50 dark:bg-orange-900/20 min-h-[100px] relative">
                      <div className="flex items-center gap-2 mb-2">
                        <Mic className="h-5 w-5 text-orange-600" />
                        <span className="text-sm text-orange-700 dark:text-orange-300 font-medium">Voice/Video Response</span>
                      </div>
                      {renderResponseOptions(question)}
                    </div>}
                  
                  {question.type === 'rating-scale' && question.scale && <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Scale: {question.scale}</span>
                      </div>
                      <div className="flex gap-2">
                        {[...Array(10)].map((_, i) => <button key={i} className="w-10 h-10 border-2 border-purple-300 rounded-lg flex items-center justify-center text-sm font-medium hover:bg-purple-100 hover:border-purple-400 transition-all">
                            {i + 1}
                          </button>)}
                      </div>
                    </div>}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <PreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </div>
  );
};

export default FormReview;
