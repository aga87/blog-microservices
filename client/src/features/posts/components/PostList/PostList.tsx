import React from 'react';
import { Error, Heading, Loader } from '../../../../components';
import { useDelayedLoader } from '../../../../hooks';
import { Comments } from '../../../comments';
import type { Post } from '../../types/posts.types';

type PostListProps = {
  blogPosts: Post[];
  isLoading: boolean;
  serverError: string | null;
};

export const PostList = ({
  blogPosts,
  isLoading,
  serverError
}: PostListProps) => {
  const { isLoaderVisible } = useDelayedLoader({ isLoading, delay: 1000 });

  const postListItems = blogPosts.map(post => {
    return (
      <div key={post.id} className='p-2 mb-10 shadow-lg'>
        <Heading level={3} text={post.title} />
        <div className='pl-4'>
          <Comments postId={post.id} />
        </div>
      </div>
    );
  });

  if (isLoaderVisible) return <Loader />;
  if (serverError) return <Error text={serverError} />;
  return <div>{postListItems}</div>;
};
