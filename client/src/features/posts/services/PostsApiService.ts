import { getApiInstance, getError } from '../../../libs/axios';
import type { NewPost, Post } from '../types/posts.types';

// export const getApiInstance = () => {
//   const baseURL = process.env.POSTS_SERVICE_BASE_URL || 'http://posts.com';
//   const headers = {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   };
//   return createApiInstance(baseURL, headers);
// };

export const fetchPosts = async () => {
  try {
    const res = await getApiInstance().get('/posts');
    const posts: Post[] = res.data;
    return { posts, error: null };
  } catch (err: unknown) {
    return { posts: [], error: getError(err) };
  }
};

export const createPost = async (newPost: NewPost) => {
  try {
    const res = await getApiInstance().post('/posts/create', newPost);
    const post: Post = res.data;
    return { post, error: null };
  } catch (err: unknown) {
    return { post: null, error: getError(err) };
  }
};
