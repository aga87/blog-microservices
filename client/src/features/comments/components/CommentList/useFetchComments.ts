/* We used this hook to fetch comments separately before the query service was implemented

import { useEffect, useState } from 'react';
import { fetchComments } from '../../services/CommentsApiService';
import type { Comment } from '../../types/comment.types';

export const useFetchComments = (postId: string) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      setServerError(null);
      setIsLoading(true);
      const { comments, error } = await fetchComments(postId);
      if (error) {
        setServerError(error);
      } else {
        setPostComments(comments);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [postId]);

  return {
    postComments,
    // so that we can lift the state up to display newly added comments
    setPostComments,
    isLoading,
    serverError
  };
};

*/

export {};
