import React from 'react';
import { Error, Loader } from '../../../../components';
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
  const commentListItems = postComments.map(comment => {
    return (
      <li key={comment.id} className='py-2 border-b border-slate-200'>
        {comment.content}
      </li>
    );
  });

  if (isLoading) return <Loader />;
  if (serverError) return <Error text={serverError} />;
  return <ul>{commentListItems}</ul>;
};
