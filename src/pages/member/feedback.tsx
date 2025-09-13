import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';
import { DiscussionThread } from '@/components/feedback/DiscussionThread';
import { MemberLayout } from '@/components/layouts/MemberLayout';

interface FeedbackPageProps {}

const FeedbackPage: React.FC<FeedbackPageProps> = () => {
  return (
    <MemberLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Feedback & Discussions</h1>
        
        <Tabs defaultValue="feedback" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="feedback">Submit Feedback</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feedback">
            <Card className="p-6">
              <FeedbackForm />
            </Card>
          </TabsContent>
          
          <TabsContent value="discussions">
            <Card className="p-6">
              <DiscussionThread />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  );
};

export default FeedbackPage;
