'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../components/ui/card';
import { type Post } from '../../types/feed';
import { CommentsModal } from './CommentsModal';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
  onShare?: (postId: string) => void;
  onReport?: (postId: string) => void;
}

export function PostCard({
  post,
  onLike,
  onComment,
  onShare,
  onReport,
}: PostCardProps) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{post.author.name}</span>
            {post.isAnnouncement && (
              <Badge variant="secondary">Announcement</Badge>
            )}
            {post.isLostFound && (
              <Badge variant="destructive">Lost & Found</Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            <span>{post.author.role}</span>
            {post.author.role && post.author.university && ' • '}
            <span>{post.author.university}</span>
          </div>
        </div>
        <span className="ml-auto text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
        </span>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="whitespace-pre-line">{post.content}</p>
        {post.images && post.images.length > 0 && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={post.images[0]}
              alt="Post image"
              className="object-cover"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'flex items-center gap-1',
              post.isLiked && 'text-red-500'
            )}
            onClick={() => onLike?.(post.id)}
          >
            <Heart className={cn('h-5 w-5', post.isLiked && 'fill-current')} />
            <span>{post.likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setIsCommentsOpen(true)}
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments.length}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => onShare?.(post.id)}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => onReport?.(post.id)}
        >
          <AlertTriangle className="h-5 w-5" />
        </Button>
      </CardFooter>

      <CommentsModal
        post={post}
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        onComment={onComment}
      />
    </Card>
  );
} 