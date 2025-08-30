export interface Author {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  university?: string;
}

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role?: string;
    university?: string;
  };
  content: string;
  images?: string[];
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  timestamp: string;
  isAnnouncement?: boolean;
  categories?: string[];
  isLostFound?: boolean;
  isEvent?: boolean;
}

export interface FeedData {
  posts: Post[];
} 