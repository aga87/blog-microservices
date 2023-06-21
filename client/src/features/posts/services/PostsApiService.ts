import { createApiInstance, getError } from '../../../libs/axios';
import type { NewPost, Post } from '../types/posts.types';

const getApiInstance = (service: 'posts' | 'query') => {
  let baseURL;
  if (service === 'posts') {
    baseURL = process.env.POSTS_SERVICE_BASE_URL || 'http://localhost:4000';
  } else {
    baseURL = process.env.QUERY_SERVICE_BASE_URL || 'http://localhost:4002';
  }
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  return createApiInstance(baseURL, headers);
};

export const fetchPosts = async () => {
  try {
    const res = await getApiInstance('query').get('/posts');
    const posts: Post[] = res.data;
    return { posts, error: null };
  } catch (err: unknown) {
    return { posts: [], error: getError(err) };
  }
};

export const createPost = async (newPost: NewPost) => {
  try {
    const res = await getApiInstance('posts').post('/posts', newPost);
    const post: Post = res.data;
    return { post, error: null };
  } catch (err: unknown) {
    return { post: null, error: getError(err) };
  }
};
