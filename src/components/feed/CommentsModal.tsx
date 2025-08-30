'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { ScrollArea } from '../../components/ui/scroll-area';
import { type Post } from '../../types/feed';

interface CommentsModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onComment?: (postId: string, comment: string) => void;
}

const commentAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function CommentsModal({
  post,
  isOpen,
  onClose,
  onComment,
}: CommentsModalProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment?.(post.id, newComment);
      setNewComment('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <ScrollArea className="h-[400px] pr-4">
            <AnimatePresence mode="popLayout">
              {post.comments.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-muted-foreground"
                >
                  No comments yet. Be the first to comment!
                </motion.p>
              ) : (
                <motion.div layout className="space-y-4">
                  {post.comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      variants={commentAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      layout
                      className="flex gap-3"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={comment.author.avatar}
                          alt={comment.author.name}
                        />
                        <AvatarFallback>
                          {comment.author.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {comment.author.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.timestamp), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm"
                        >
                          {comment.content}
                        </motion.p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>

          <motion.form
            onSubmit={handleSubmit}
            className="flex gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!newComment.trim()}
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </motion.form>
        </div>
      </DialogContent>
    </Dialog>
  );
} 