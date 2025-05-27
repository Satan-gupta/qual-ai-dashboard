import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, MessageSquare, Mic, Video, Type, Share2, Image, Globe, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
const FormReview = () => {
  const [selectedResponseType, setSelectedResponseType] = useState<'text' | 'voice' | 'video'>('text');
  const demoQuestions = [{
    id: 1,
    type: 'multiple-choice',
    question: 'How would you rate your overall experience with our smartwatch?',
    options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'],
    required: true,
    media: [{
      type: 'image',
      url: '/lovable-uploads/2f07911a-86af-4ccd-a91d-84bf490a65c5.png'
    }]
  }, {
    id: 2,
    type: 'open-ended',
    question: 'What features do you find most useful in a smartwatch?',
    required: true,
    responseTypes: ['text', 'voice', 'video']
  }, {
    id: 3,
    type: 'rating-scale',
    question: 'Rate the importance of battery life (1-10)',
    scale: '1-10',
    required: true
  }, {
    id: 4,
    type: 'multiple-choice',
    question: 'Which smartwatch brands have you used before?',
    options: ['Apple Watch', 'Samsung Galaxy Watch', 'Fitbit', 'Garmin', 'Other', 'None'],
    required: false,
    media: [{
      type: 'video',
      url: '#'
    }]
  }, {
    id: 5,
    type: 'voice-response',
    question: 'Tell us about your unboxing experience in your own words',
    required: false,
    responseTypes: ['voice', 'video'],
    media: [{
      type: 'webpage',
      url: '#'
    }]
  }];
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
    return <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg border border-blue-200">
        <div className="text-xs font-medium text-gray-600 mb-2">Response Options:</div>
        <div className="flex gap-2">
          {responseTypes.map((type: string) => <div key={type} className="flex items-center gap-1 px-2 py-1 bg-white rounded border">
              {type === 'text' && <Type className="h-3 w-3 text-blue-500" />}
              {type === 'voice' && <Mic className="h-3 w-3 text-green-500" />}
              {type === 'video' && <Video className="h-3 w-3 text-orange-500" />}
              <span className="text-xs capitalize">{type}</span>
            </div>)}
        </div>
      </div>;
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Form Review</h2>
          <p className="text-gray-600">Review your project questions and form structure</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" className="flex items-center gap-2 border-orange-200 text-orange-600 hover:bg-orange-50">
            <Edit className="h-4 w-4" />
            Edit Questions
          </Button>
          
        </div>
      </div>

      <Card className="border-l-4 border-l-blue-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50">
          <CardTitle className="flex items-center gap-2">
            <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
            Interactive Form Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-orange-50 border border-blue-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-900">Project Overview</h3>
              <Badge className="bg-gradient-to-r from-blue-500 to-orange-500 text-white">Interactive</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p><strong className="text-blue-800">Project Name:</strong> Product feedback for new Smart Watch</p>
                <p><strong className="text-blue-800">Total Questions:</strong> {demoQuestions.length}</p>
              </div>
              <div className="space-y-2">
                <p><strong className="text-blue-800">Required Questions:</strong> {demoQuestions.filter(q => q.required).length}</p>
                <p><strong className="text-blue-800">Estimated Duration:</strong> 15-20 minutes</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 text-lg">Interactive Questions Preview</h4>
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
            
            {demoQuestions.map((question, index) => <Card key={question.id} className="border-l-4 border-l-gradient shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`${getQuestionTypeColor(question.type)} border`}>
                          {question.type.replace('-', ' ')}
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
                    {getQuestionIcon(question.type)}
                  </div>
                  
                  <h5 className="font-semibold text-gray-900 mb-4 text-lg">{question.question}</h5>
                  
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
                      {question.options.map((option, optIndex) => <label key={optIndex} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                          <div className="w-5 h-5 border-2 border-blue-400 rounded-sm bg-white"></div>
                          <span className="text-gray-700">{option}</span>
                        </label>)}
                    </div>}
                  
                  {question.type === 'open-ended' && <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[100px] relative">
                      <span className="text-sm text-gray-500 italic">Open-ended response area</span>
                      {renderResponseOptions(question)}
                    </div>}

                  {question.type === 'voice-response' && <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50 min-h-[100px] relative">
                      <div className="flex items-center gap-2 mb-2">
                        <Mic className="h-5 w-5 text-orange-600" />
                        <span className="text-sm text-orange-700 font-medium">Voice/Video Response</span>
                      </div>
                      {renderResponseOptions(question)}
                    </div>}
                  
                  {question.type === 'rating-scale' && question.scale && <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Scale: {question.scale}</span>
                      </div>
                      <div className="flex gap-2">
                        {[...Array(10)].map((_, i) => <button key={i} className="w-10 h-10 border-2 border-purple-300 rounded-lg flex items-center justify-center text-sm font-medium hover:bg-purple-100 hover:border-purple-400 transition-all">
                            {i + 1}
                          </button>)}
                      </div>
                    </div>}
                </CardContent>
              </Card>)}
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default FormReview;