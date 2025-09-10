import React from 'react';
import { Link } from 'react-router-dom';
import { MemberLayout } from '@/components/layouts/MemberLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowLeft,
  Globe,
  Users,
  Lock,
  Eye,
  Search,
  MessageSquare,
  Mail,
} from 'lucide-react';

const PrivacySettingsPage: React.FC = () => {
  return (
    <MemberLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/member/settings">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Privacy Settings</h1>
            <p className="text-muted-foreground">
              Control your privacy and visibility settings
            </p>
          </div>
        </div>

        {/* Profile Visibility */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Visibility</CardTitle>
            <CardDescription>
              Control who can see your profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <Label>Public Profile</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to everyone
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Who can see your profile?</Label>
                <Select defaultValue="everyone">
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="connections">Connections Only</SelectItem>
                    <SelectItem value="alumni">Alumni Only</SelectItem>
                    <SelectItem value="none">No One</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Privacy</CardTitle>
            <CardDescription>
              Control who can contact you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <Label>Direct Messages</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allow others to send you direct messages
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <Label>Show Email Address</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Display your email address on your profile
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Search Privacy</CardTitle>
            <CardDescription>
              Control how others can find you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <Label>Search Visibility</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allow others to find you in search results
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <Label>Connection Suggestions</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Show up in "People you may know"
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Privacy</CardTitle>
            <CardDescription>
              Control what others can see about your activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <Label>Activity Status</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Show when you're online
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Who can see your activities?</Label>
                <Select defaultValue="connections">
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="connections">Connections Only</SelectItem>
                    <SelectItem value="none">No One</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Data Privacy</CardTitle>
            <CardDescription>
              Control how your data is used
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <Label>Data Collection</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allow us to collect usage data to improve your experience
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button variant="outline">Download My Data</Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Changes */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link to="/member/settings">Cancel</Link>
          </Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </MemberLayout>
  );
};

export default PrivacySettingsPage;