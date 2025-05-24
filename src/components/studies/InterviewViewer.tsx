
import React, { useState } from 'react';
import { Play, Pause, Volume2, MoreHorizontal, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const InterviewViewer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const conversations = [
    {
      id: 1,
      speaker: 'AI Interviewer',
      message: "Thank you for participating in this study. Before we begin, I'd like to remind you to share detailed answers, stories, and experiences to help us better understand your social media habits. Are you ready to begin?",
      timestamp: "0:00",
      tags: []
    },
    {
      id: 2,
      speaker: 'Participant',
      message: "Yes, I'm ready.",
      timestamp: "0:15",
      tags: []
    },
    {
      id: 3,
      speaker: 'AI Interviewer', 
      message: "Great! To start, can you tell me about your general social media habits?",
      timestamp: "0:18",
      tags: ['socialmediahabits', 'general usage']
    },
    {
      id: 4,
      speaker: 'Participant',
      message: "I don't use social media that much, maybe 30 minutes to an hour a day. I mostly use LinkedIn for professional networking and occasionally browse Reddit.",
      timestamp: "0:25",
      tags: ['socialmediahabits', 'LinkedIn', 'Reddit']
    },
    {
      id: 5,
      speaker: 'AI Interviewer',
      message: "You mentioned using LinkedIn for professional networking. Can you tell me a specific experience where LinkedIn was useful for professional networking? Now, you mentioned using social media for 30 minutes to an hour a day. Can you tell me more about when you use social media during the day?",
      timestamp: "0:45",
      tags: ['workhabits', 'worktime']
    },
    {
      id: 6,
      speaker: 'Participant', 
      message: "Absolutely, I recently changed jobs, and I used LinkedIn to connect with people in my new industry. I reached out to a few connections who work in similar roles, and they provided valuable insights and advice that helped me prepare for my interview. I usually check my accounts during my lunch break or when I have some downtime at work. I find it a good way to stay informed and connected without taking too much time away from my other responsibilities.",
      timestamp: "0:55",
      tags: ['socialmediahabits', 'workhabits', 'LinkedIn']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Interview with synthetic@conveo.ai</h2>
          <div className="flex gap-4 mt-2">
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
              Analysed transcript
            </Button>
            <Button variant="outline" size="sm">
              Original transcript
            </Button>
          </div>
        </div>
        <Button variant="outline">
          Regenerate
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analysed Transcript</CardTitle>
          <p className="text-sm text-gray-600">The chat showing questions and answers.</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversations.map((conv) => (
              <div key={conv.id} className="flex gap-4 p-4 rounded-lg bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                  {conv.speaker === 'AI Interviewer' ? 'AI' : 'P'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">{conv.speaker}</span>
                    <span className="text-sm text-gray-500">{conv.timestamp}</span>
                    {conv.speaker === 'AI Interviewer' && (
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Volume2 className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{conv.message}</p>
                  {conv.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {conv.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewViewer;
