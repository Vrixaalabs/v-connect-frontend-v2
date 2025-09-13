import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/useToast';

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

interface DiscussionThreadProps {
  comments?: Comment[];
}

export function DiscussionThread({ comments: initialComments = [] }: DiscussionThreadProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // TODO: Implement actual comment submission logic
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        author: {
          name: 'Current User', // TODO: Get from auth context
          avatar: undefined,
        },
        createdAt: new Date().toISOString(),
      };

      setComments([...comments, comment]);
      setNewComment('');
      toast({
        title: 'Success',
        description: 'Comment posted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to post comment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 p-4 border rounded-lg">
            <Avatar>
              <AvatarImage src={comment.author.avatar} />
              <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{comment.author.name}</h4>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitComment} className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="min-h-[100px]"
        />
        <Button type="submit" disabled={!newComment.trim()}>
          Post Comment
        </Button>
      </form>
    </div>
  );
}
