
import React, { useState } from 'react';
import { Plus, Image, Upload, Video, Globe, Trash2, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProjectStore, Question, MediaItem } from '@/store/projectStore';

const GuidingQuestions = () => {
  const { projectData, addQuestion, updateQuestion, removeQuestion, saveProject } = useProjectStore();
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    followUpType: 'AI decides',
    media: [] as MediaItem[]
  });

  const handleAddQuestion = () => {
    if (newQuestion.title.trim()) {
      const question: Question = {
        id: Date.now(),
        ...newQuestion,
        type: 'open-ended',
        required: false,
        responseTypes: ['text']
      };
      addQuestion(question);
      setNewQuestion({
        title: '',
        content: '',
        followUpType: 'AI decides',
        media: []
      });
      setShowAddQuestion(false);
    }
  };

  const addMediaToQuestion = (questionId: number, mediaType: 'image' | 'video' | 'webpage') => {
    const mockUrl = mediaType === 'image' ? '/lovable-uploads/2f07911a-86af-4ccd-a91d-84bf490a65c5.png' : '#';
    const mockName = `${mediaType}_${Date.now()}`;
    
    const currentQuestion = projectData.questions.find(q => q.id === questionId);
    if (currentQuestion) {
      const updatedMedia = [...(currentQuestion.media || []), {type: mediaType, url: mockUrl, name: mockName}];
      updateQuestion(questionId, { media: updatedMedia });
    }
  };

  const removeMediaFromQuestion = (questionId: number, mediaIndex: number) => {
    const currentQuestion = projectData.questions.find(q => q.id === questionId);
    if (currentQuestion && currentQuestion.media) {
      const updatedMedia = currentQuestion.media.filter((_, index) => index !== mediaIndex);
      updateQuestion(questionId, { media: updatedMedia });
    }
  };

  const handleSaveQuestions = () => {
    saveProject();
    // Show success toast
    const event = new CustomEvent('show-toast', {
      detail: { 
        title: 'Success', 
        description: 'Questions saved successfully!',
        type: 'success'
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Guiding questions</h2>
          <p className="text-gray-600 dark:text-gray-300">Write out your guiding questions that structure the interview and add context for each question to help the AI ask the right follow-ups</p>
        </div>
        <Button 
          onClick={handleSaveQuestions}
          className="bg-gradient-to-r from-royal-blue to-orange hover:from-royal-blue-dark hover:to-orange-dark text-white flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Questions
        </Button>
      </div>

      <div className="space-y-4">
        {projectData.questions.map((question, index) => (
          <Card key={question.id} className="border-l-4 border-l-royal-blue shadow-lg">
            <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-8 h-8 bg-gradient-to-r from-royal-blue to-orange text-white rounded flex items-center justify-center font-medium text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Question {index + 1}</h3>
                    <Input 
                      value={question.title}
                      onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                      className="font-medium text-gray-900 dark:text-white mb-3 focus:border-royal-blue"
                      placeholder="Enter your question..."
                    />
                    
                    {/* Media Display */}
                    {question.media && question.media.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {question.media.map((media, mediaIndex) => (
                          <div key={mediaIndex} className="relative group">
                            {media.type === 'image' && (
                              <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 relative">
                                <img src={media.url} alt={media.name} className="w-full h-full object-cover" />
                                <button 
                                  onClick={() => removeMediaFromQuestion(question.id, mediaIndex)}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-2 h-2" />
                                </button>
                              </div>
                            )}
                            {media.type === 'video' && (
                              <div className="w-16 h-16 rounded bg-blue-100 flex items-center justify-center relative group">
                                <Video className="h-6 w-6 text-royal-blue" />
                                <button 
                                  onClick={() => removeMediaFromQuestion(question.id, mediaIndex)}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-2 h-2" />
                                </button>
                              </div>
                            )}
                            {media.type === 'webpage' && (
                              <div className="w-16 h-16 rounded bg-orange-100 flex items-center justify-center relative group">
                                <Globe className="h-6 w-6 text-orange" />
                                <button 
                                  onClick={() => removeMediaFromQuestion(question.id, mediaIndex)}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-2 h-2" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Media Upload Buttons */}
                    <div className="flex gap-2 mb-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => addMediaToQuestion(question.id, 'image')}
                        className="text-royal-blue border-royal-blue/20 hover:bg-blue-50"
                      >
                        <Image className="h-4 w-4 mr-1" />
                        Image
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => addMediaToQuestion(question.id, 'video')}
                        className="text-royal-blue border-royal-blue/20 hover:bg-blue-50"
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Video
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => addMediaToQuestion(question.id, 'webpage')}
                        className="text-orange border-orange/20 hover:bg-orange-50"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        Webpage
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={question.followUpType} onValueChange={(value) => updateQuestion(question.id, { followUpType: value })}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Surface scan (0-1 follow-ups)">Surface scan</SelectItem>
                        <SelectItem value="In-depth analysis (2-4 follow-ups)">In-depth analysis</SelectItem>
                        <SelectItem value="AI decides">AI decides</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm" onClick={() => removeQuestion(question.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                  <Textarea 
                    value={question.content}
                    onChange={(e) => updateQuestion(question.id, { content: e.target.value })}
                    className="w-full min-h-[80px] focus:border-royal-blue"
                    placeholder="Add context to help the AI ask the right follow-ups"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {showAddQuestion ? (
          <Card className="border-2 border-dashed border-royal-blue/30 bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Input 
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                  placeholder="Enter your question..."
                  className="font-medium focus:border-royal-blue"
                />
                <Textarea 
                  value={newQuestion.content}
                  onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
                  placeholder="Add context to help the AI ask the right follow-ups"
                  className="min-h-[80px] focus:border-royal-blue"
                />
                <div className="flex items-center gap-2">
                  <Select value={newQuestion.followUpType} onValueChange={(value) => setNewQuestion({...newQuestion, followUpType: value})}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Surface scan (0-1 follow-ups)">Surface scan</SelectItem>
                      <SelectItem value="In-depth analysis (2-4 follow-ups)">In-depth analysis</SelectItem>
                      <SelectItem value="AI decides">AI decides</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddQuestion} className="bg-royal-blue hover:bg-royal-blue-dark text-white">
                    Add Question
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddQuestion(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button 
            variant="outline" 
            className="w-full border-dashed border-royal-blue/30 h-12 text-royal-blue hover:bg-blue-50"
            onClick={() => setShowAddQuestion(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        )}
      </div>
    </div>
  );
};

export default GuidingQuestions;
