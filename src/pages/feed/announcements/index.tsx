'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { PostCard } from '../../../components/feed/PostCard';
import mockData from '../../../data/mock-feed.json';
import { type Post } from '../../../types/feed';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AnnouncementsPage() {
  const [posts, setPosts] = useState<Post[]>(
    mockData.posts.filter((post) => post.isAnnouncement)
  );

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
    toast.success('Post liked!');
  };

  const handleComment = (postId: string, comment: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `c${post.comments.length + 1}`,
                  author: {
                    id: 'current-user',
                    name: 'Current User',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
                  },
                  content: comment,
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : post
      )
    );
    toast.success('Comment added!');
  };

  const handleShare = () => {
    toast.success('Share dialog opened!');
  };

  const handleReport = () => {
    toast.success('Report submitted!');
  };

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <h2 className="text-2xl font-semibold mb-2">No Announcements</h2>
        <p className="text-muted-foreground">
          There are no announcements at the moment.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="max-w-2xl mx-auto space-y-6"
    >
      <AnimatePresence mode="popLayout">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            variants={fadeInUp}
            layout
            layoutId={post.id}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PostCard
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              onReport={handleReport}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
} 