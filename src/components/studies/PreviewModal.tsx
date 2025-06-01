
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Globe, Image as ImageIcon, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useProjectStore } from '@/store/projectStore';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreviewModal = ({ isOpen, onClose }: PreviewModalProps) => {
  const { projectData } = useProjectStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, any>>({});

  const currentQuestion = projectData.questions[currentQuestionIndex];
  const totalQuestions = projectData.questions.length;

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleResponse = (questionId: number, response: any) => {
    setResponses(prev => ({ ...prev, [questionId]: response }));
  };

  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case 'image':
        return <ImageIcon className="h-4 w-4 text-blue-500" />;
      case 'video':
        return <Video className="h-4 w-4 text-green-500" />;
      case 'webpage':
        return <Globe className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  if (!currentQuestion) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Form Preview - Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-royal-blue to-orange h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <Card className="border-l-4 border-l-royal-blue">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-royal-blue to-orange text-white rounded-full flex items-center justify-center text-lg font-semibold">
                      {currentQuestionIndex + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {currentQuestion.title}
                      </h3>
                      {currentQuestion.required && (
                        <span className="text-red-500 text-sm">* Required</span>
                      )}
                    </div>
                  </div>
                  
                  {currentQuestion.media && currentQuestion.media.length > 0 && (
                    <div className="flex gap-2">
                      {currentQuestion.media.map((media, idx) => (
                        <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs">
                          {getMediaIcon(media.type)}
                          {media.type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Media Display */}
                {currentQuestion.media && currentQuestion.media.length > 0 && (
                  <div className="flex gap-4">
                    {currentQuestion.media.map((media, idx) => (
                      <div key={idx}>
                        {media.type === 'image' && (
                          <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 border-2 border-blue-200">
                            <img src={media.url} alt="Question media" className="w-full h-full object-cover" />
                          </div>
                        )}
                        {media.type === 'video' && (
                          <div className="w-32 h-32 rounded-lg bg-green-100 border-2 border-green-200 flex items-center justify-center">
                            <Play className="h-12 w-12 text-green-600" />
                          </div>
                        )}
                        {media.type === 'webpage' && (
                          <div className="w-32 h-32 rounded-lg bg-orange-100 border-2 border-orange-200 flex items-center justify-center">
                            <Globe className="h-12 w-12 text-orange-600" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Response Area Based on Question Type */}
                <div className="space-y-4">
                  {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, idx) => (
                        <label key={idx} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-royal-blue cursor-pointer transition-all">
                          <input 
                            type="radio" 
                            name={`question-${currentQuestion.id}`}
                            value={option}
                            onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
                            className="w-4 h-4 text-royal-blue"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {currentQuestion.type === 'open-ended' && (
                    <div className="space-y-4">
                      <textarea
                        placeholder="Enter your response here..."
                        className="w-full min-h-[120px] p-4 border border-gray-300 rounded-lg focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 resize-none"
                        onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
                      />
                      {currentQuestion.responseTypes && currentQuestion.responseTypes.length > 1 && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="text-royal-blue border-royal-blue/20">
                            🎤 Voice Response
                          </Button>
                          <Button variant="outline" size="sm" className="text-orange border-orange/20">
                            📹 Video Response
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {currentQuestion.type === 'rating-scale' && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">Scale: {currentQuestion.scale}</p>
                      <div className="flex gap-2 justify-center">
                        {[...Array(10)].map((_, i) => (
                          <button 
                            key={i}
                            onClick={() => handleResponse(currentQuestion.id, i + 1)}
                            className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                              responses[currentQuestion.id] === i + 1
                                ? 'bg-royal-blue text-white border-royal-blue'
                                : 'border-gray-300 hover:bg-blue-50 hover:border-royal-blue'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button 
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <span className="text-sm text-gray-500">
              {currentQuestionIndex + 1} of {totalQuestions}
            </span>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-royal-blue to-orange hover:from-royal-blue-dark hover:to-orange-dark text-white flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Submit
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
