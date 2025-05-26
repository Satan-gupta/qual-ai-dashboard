
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FormReview = () => {
  const demoQuestions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'How would you rate your overall experience with our smartwatch?',
      options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'],
      required: true
    },
    {
      id: 2,
      type: 'open-ended',
      question: 'What features do you find most useful in a smartwatch?',
      required: true
    },
    {
      id: 3,
      type: 'rating-scale',
      question: 'Rate the importance of battery life (1-10)',
      scale: '1-10',
      required: true
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: 'Which smartwatch brands have you used before?',
      options: ['Apple Watch', 'Samsung Galaxy Watch', 'Fitbit', 'Garmin', 'Other', 'None'],
      required: false
    },
    {
      id: 5,
      type: 'open-ended',
      question: 'What improvements would you suggest for our current design?',
      required: false
    }
  ];

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'multiple-choice':
        return 'bg-blue-100 text-blue-800';
      case 'open-ended':
        return 'bg-green-100 text-green-800';
      case 'rating-scale':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case 'multiple-choice':
        return <div className="w-4 h-4 border-2 border-blue-500 rounded-sm"></div>;
      case 'open-ended':
        return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'rating-scale':
        return <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-purple-400 rounded-full"></div>
          ))}
        </div>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Form Review</h2>
          <p className="text-gray-600">Review your study questions and form structure</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Questions
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
            Form Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Study Overview</h3>
            <div className="text-sm text-blue-800">
              <p><strong>Study Name:</strong> Product feedback for new Smart Watch</p>
              <p><strong>Total Questions:</strong> {demoQuestions.length}</p>
              <p><strong>Required Questions:</strong> {demoQuestions.filter(q => q.required).length}</p>
              <p><strong>Estimated Duration:</strong> 15-20 minutes</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Questions Preview</h4>
            
            {demoQuestions.map((question, index) => (
              <Card key={question.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">Q{index + 1}</span>
                      <Badge className={getQuestionTypeColor(question.type)}>
                        {question.type.replace('-', ' ')}
                      </Badge>
                      {question.required && (
                        <Badge variant="outline" className="text-red-600 border-red-200">
                          Required
                        </Badge>
                      )}
                    </div>
                    {getQuestionIcon(question.type)}
                  </div>
                  
                  <h5 className="font-medium text-gray-900 mb-3">{question.question}</h5>
                  
                  {question.type === 'multiple-choice' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-sm"></div>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'open-ended' && (
                    <div className="border border-gray-200 rounded-md p-3 bg-gray-50">
                      <span className="text-sm text-gray-500 italic">Open-ended text response</span>
                    </div>
                  )}
                  
                  {question.type === 'rating-scale' && question.scale && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Scale: {question.scale}</span>
                      <div className="flex gap-1 ml-4">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs">
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormReview;
