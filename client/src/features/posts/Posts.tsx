import React from 'react';
import { Heading } from '../../components';
import { CreatePost } from './components/CreatePost/CreatePost';
import { PostList } from './components/PostList/PostList';
import { useFetchPosts } from './components/PostList/useFetchPosts';
import type { Post } from './types/posts.types';

export const Posts = () => {
  const { blogPosts, setBlogPosts, isLoading, serverError } = useFetchPosts();

  const handleCreatePost = (post: Post) => {
    setBlogPosts([post, ...blogPosts]);
  };

  return (
    <div>
      <div className='max-w-2xl ml-auto mr-auto'>
        <Heading level={2} text='Create Post' />
        <div className='mb-8'>
          <CreatePost handleCreatePost={handleCreatePost} />
        </div>
        <hr className='mb-8 border-t-2 border-emerald-600' />
        <div className='mb-4'>
          <Heading level={2} text='Posts' />
        </div>
        <PostList
          blogPosts={blogPosts}
          isLoading={isLoading}
          serverError={serverError}
        />
      </div>
    </div>
  );
};
