
import React, { useState } from 'react';
import { Users, Network, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';

const RecruitmentSetup = () => {
  const [audienceType, setAudienceType] = useState('b2c');
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [respondentCount, setRespondentCount] = useState(50);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recruitment</h2>
          <p className="text-gray-600">Select the type of audience you want to recruit. The price may vary depending on the audience.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="text-center">
                <Network className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Managed recruitment</h3>
                <p className="text-sm text-gray-600">
                  Integrate with a panel of respondents to recruit participants for your study
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
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
        </div>

        <div>
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cost estimator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  The cost of the recruitment will be estimated based on the selected options. The final price may be higher or lower.
                </p>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Estimated cost for 0 B2C respondents (30 min):</p>
                  <p className="text-3xl font-bold text-gray-900">$0</p>
                </div>
                
                <p className="text-sm text-gray-600">
                  We will contact you with the final price before proceeding.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentSetup;
