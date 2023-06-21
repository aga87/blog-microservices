import type { Comment } from '../../comments';

export type Post = {
  id: string;
  title: string;
  comments: Comment[];
};

export type NewPost = Omit<Post, 'id' | 'comments'>;
