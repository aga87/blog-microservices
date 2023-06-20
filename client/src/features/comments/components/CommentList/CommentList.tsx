import React from 'react';
import { Error, Loader } from '../../../../components';
import { useDelayedLoader } from '../../../../hooks';
import type { Comment } from '../../types/comment.types';

type CommentListProps = {
  postComments: Comment[];
  isLoading: boolean;
  serverError: string | null;
};

export const CommentList = ({
  postComments,
  isLoading,
  serverError
}: CommentListProps) => {
  const { isLoaderVisible } = useDelayedLoader({ isLoading, delay: 1000 });

  const commentListItems = postComments.map(comment => {
    return (
      <li key={comment.id} className='py-2 border-b border-slate-200'>
        {comment.content}
      </li>
    );
  });

  if (isLoaderVisible) return <Loader />;
  if (serverError) return <Error text={serverError} />;
  return <ul>{commentListItems}</ul>;
};
