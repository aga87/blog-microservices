import { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/PostsApiService';
import type { Post } from '../../types/posts.types';

export const useFetchPosts = () => {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      setServerError(null);
      setIsLoading(true);
      const { posts, error } = await fetchPosts();
      if (error) {
        setServerError(error);
      } else {
        setBlogPosts(posts);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    blogPosts,
    // so that we can lift the state up to display newly added posts
    setBlogPosts,
    isLoading,
    serverError
  };
};
