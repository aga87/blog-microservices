import { createApiInstance, getError } from '../../../libs/axios';
import type { NewComment, Comment } from '../types/comment.types';

const getApiInstance = () => {
  const baseURL = process.env.COMMENTS_API_BASE_URL || 'http://localhost:4001';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  return createApiInstance(baseURL, headers);
};

export const fetchComments = async (postId: string) => {
  try {
    const res = await getApiInstance().get(`/posts/${postId}/comments`);
    const comments: Comment[] = res.data;
    return { comments, error: null };
  } catch (err: unknown) {
    return { comments: [], error: getError(err) };
  }
};
