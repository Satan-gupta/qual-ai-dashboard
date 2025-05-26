import React, { useState } from 'react';
import { Users, Network, DollarSign, Link, Share2, Instagram, MessageCircle, Facebook, Twitter, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const RecruitmentSetup = () => {
  const [recruitmentType, setRecruitmentType] = useState('self');
  const [audienceType, setAudienceType] = useState('b2c');
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [respondentCount, setRespondentCount] = useState(50);

  const socialPlatforms = [
    { name: 'WhatsApp', icon: MessageCircle, color: 'text-green-600', bgColor: 'bg-green-50', hoverColor: 'hover:bg-green-100' },
    { name: 'Instagram', icon: Instagram, color: 'text-pink-600', bgColor: 'bg-pink-50', hoverColor: 'hover:bg-pink-100' },
    { name: 'Facebook', icon: Facebook, color: 'text-blue-600', bgColor: 'bg-blue-50', hoverColor: 'hover:bg-blue-100' },
    { name: 'Twitter', icon: Twitter, color: 'text-sky-600', bgColor: 'bg-sky-50', hoverColor: 'hover:bg-sky-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recruitment</h2>
          <p className="text-gray-600">Choose how you want to recruit participants for your study.</p>
        </div>
      </div>

      {/* Recruitment Type Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card 
          className={`border-2 cursor-pointer transition-all ${
            recruitmentType === 'self' 
              ? 'border-orange-500 bg-orange-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setRecruitmentType('self')}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <Share2 className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Self-recruitment</h3>
              <p className="text-sm text-gray-600">
                Share your study link directly with your own participants and networks
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`border-2 cursor-not-allowed transition-all opacity-60 ${
            recruitmentType === 'managed' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200'
          }`}
        >
          <CardContent className="p-6 relative">
            <div className="text-center">
              <Network className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
                Managed recruitment
                <Lock className="h-4 w-4" />
              </h3>
              <p className="text-sm text-gray-600">
                Integrate with a panel of respondents to recruit participants for your study
              </p>
            </div>
            <Badge 
              variant="outline" 
              className="absolute top-2 right-2 bg-orange-100 text-orange-600 border-orange-300 text-xs"
            >
              Coming Soon
            </Badge>
          </CardContent>
        </Card>

        <Card 
          className={`border-2 cursor-pointer transition-all ${
            recruitmentType === 'combined' 
              ? 'border-purple-500 bg-purple-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setRecruitmentType('combined')}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex justify-center items-center gap-2 mb-4">
                <Network className="h-8 w-8 text-purple-500" />
                <Share2 className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Combined Study</h3>
              <p className="text-sm text-gray-600">
                Use both managed recruitment and self-sharing to maximize responses
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {recruitmentType === 'self' || recruitmentType === 'combined' ? (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Study Link</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Share this link with your participants to start collecting responses.
                    </p>
                    <div className="flex gap-2 mb-4">
                      <Input 
                        value="https://qwalo.ai/study/abc123xyz"
                        readOnly
                        className="flex-1"
                      />
                      <Button variant="outline">
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Share on Social Media</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {socialPlatforms.map((platform) => (
                        <Button
                          key={platform.name}
                          variant="outline"
                          className={`flex items-center gap-2 ${platform.bgColor} ${platform.hoverColor} border-gray-200`}
                        >
                          <platform.icon className={`h-4 w-4 ${platform.color}`} />
                          <span className="text-sm">{platform.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Target Number of Respondents</h4>
                    <Input 
                      type="number" 
                      value={respondentCount}
                      onChange={(e) => setRespondentCount(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Participant Incentives</h4>
                    <Textarea 
                      placeholder="e.g., Gift cards, discounts, early access to products..."
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="opacity-60">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Type of audience</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Select the type of audience you want to recruit. The price may vary depending on the audience.
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name="audience" 
                          value="b2c"
                          checked={audienceType === 'b2c'}
                          onChange={(e) => setAudienceType(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">General population (B2C)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name="audience" 
                          value="b2b"
                          checked={audienceType === 'b2b'}
                          onChange={(e) => setAudienceType(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Industry professionals (B2B)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option>Any</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Non-binary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <p className="text-sm text-gray-600 mb-3">The age range of the participants you want to recruit.</p>
                    <div className="px-2">
                      <Slider
                        value={ageRange}
                        onValueChange={setAgeRange}
                        max={65}
                        min={18}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>{ageRange[0]}</span>
                        <span>{ageRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of respondents</label>
                    <p className="text-sm text-gray-600 mb-3">The number of respondents you want to recruit.</p>
                    <Input 
                      type="number" 
                      value={respondentCount}
                      onChange={(e) => setRespondentCount(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Regions</label>
                    <p className="text-sm text-gray-600 mb-3">Select the regions you want to recruit from.</p>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option>Select regions</option>
                      <option>North America</option>
                      <option>Europe</option>
                      <option>Asia Pacific</option>
                      <option>Global</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Custom requirements</label>
                    <p className="text-sm text-gray-600 mb-3">
                      Describe any custom requirements you have for the participants and we will do our best to match them.
                    </p>
                    <Textarea 
                      placeholder="Any custom requirements. E.g. ambidextrous people, people who drive BMWs, etc."
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          {recruitmentType === 'self' || recruitmentType === 'combined' ? (
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Self-recruitment Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Best Practices:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Use multiple channels to reach participants</li>
                      <li>• Clearly explain the study purpose and time commitment</li>
                      <li>• Offer appropriate incentives for participation</li>
                      <li>• Send reminder messages to increase response rates</li>
                      <li>• Monitor progress and adjust strategy if needed</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Target respondents:</p>
                    <p className="text-2xl font-bold text-gray-900">{respondentCount}</p>
                    <p className="text-sm text-green-600 font-medium">No recruitment fees</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-50 opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Cost estimator
                  <Lock className="h-4 w-4 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Available soon with managed recruitment feature.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentSetup;
