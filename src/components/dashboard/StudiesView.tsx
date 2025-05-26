
import React, { useState } from 'react';
import { Grid, List, Calendar, Users, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Study {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'draft';
  respondents: number;
  createdAt: string;
  updatedAt: string;
  description: string;
}

const StudiesView = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  const demoStudies: Study[] = [
    {
      id: '1',
      name: 'Product feedback for new Smart Watch',
      status: 'active',
      respondents: 45,
      createdAt: '2024-05-20',
      updatedAt: '2024-05-25',
      description: 'Gathering user feedback on our latest smartwatch design and features'
    },
    {
      id: '2',
      name: 'Mobile App User Experience Study',
      status: 'completed',
      respondents: 32,
      createdAt: '2024-05-15',
      updatedAt: '2024-05-22',
      description: 'Understanding user pain points in our mobile application'
    },
    {
      id: '3',
      name: 'E-commerce Checkout Process Research',
      status: 'active',
      respondents: 28,
      createdAt: '2024-05-18',
      updatedAt: '2024-05-24',
      description: 'Analyzing the effectiveness of our new checkout flow'
    },
    {
      id: '4',
      name: 'Brand Perception Survey',
      status: 'draft',
      respondents: 0,
      createdAt: '2024-05-23',
      updatedAt: '2024-05-23',
      description: 'Research on how customers perceive our brand identity'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Studies</h2>
          <p className="text-gray-600">Manage and review your research studies</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoStudies.map((study) => (
            <Card key={study.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={getStatusColor(study.status)}>
                    {study.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {study.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {study.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{study.respondents} respondents</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Created {formatDate(study.createdAt)}</span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Last updated {formatDate(study.updatedAt)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-700">
            <div className="col-span-4">Study Name</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Respondents</div>
            <div className="col-span-2">Created</div>
            <div className="col-span-2">Last Updated</div>
          </div>
          
          {demoStudies.map((study) => (
            <div key={study.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 cursor-pointer">
              <div className="col-span-4">
                <div className="font-medium text-gray-900">{study.name}</div>
                <div className="text-sm text-gray-600 truncate">{study.description}</div>
              </div>
              <div className="col-span-2">
                <Badge className={getStatusColor(study.status)}>
                  {study.status}
                </Badge>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <Users className="h-4 w-4 text-gray-400" />
                <span>{study.respondents}</span>
              </div>
              <div className="col-span-2 text-sm text-gray-600">
                {formatDate(study.createdAt)}
              </div>
              <div className="col-span-2 text-sm text-gray-600">
                {formatDate(study.updatedAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudiesView;
