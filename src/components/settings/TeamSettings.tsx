
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TeamSettings = () => {
  const [teamName, setTeamName] = useState('Qwalo');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('admin');

  const collaborators = [
    { email: 'satyamguptaeie@gmail.com', role: 'Admin', status: 'Active' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <p className="text-sm text-gray-600 mb-3">Name of your team, visible to all account collaborators.</p>
            <Input 
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex justify-end pt-4">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Collaborators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Invite by email</label>
            <div className="flex gap-2 mb-4">
              <Input 
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1"
              />
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Invite
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 uppercase tracking-wide">
              <div>EMAIL</div>
              <div>ROLE</div>
              <div>STATUS</div>
            </div>
            {collaborators.map((collaborator, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 py-2 text-sm">
                <div>{collaborator.email}</div>
                <div>{collaborator.role}</div>
                <div className="text-green-600">{collaborator.status}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamSettings;
