import { createApiInstance, getError } from '../../../libs/axios';
import type { Post } from '../types/posts.types';

const getApiInstance = () => {
  const baseURL = process.env.POSTS_API_BASE_URL || 'http://localhost:4000';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  return createApiInstance(baseURL, headers);
};

export const fetchPosts = async () => {
  try {
    const res = await getApiInstance().get('/posts');
    const posts: Post[] = res.data;
    return { posts, error: null };
  } catch (err: unknown) {
    return { posts: [], error: getError(err) };
  }
};
