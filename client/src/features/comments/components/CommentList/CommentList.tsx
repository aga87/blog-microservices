import React from 'react';
import type { Comment } from '../../types/comment.types';

type CommentListProps = {
  postComments: Comment[];
};

export const CommentList = ({ postComments }: CommentListProps) => {
  const commentListItems = postComments.map(comment => {
    return (
      <li key={comment.id} className='py-2 border-b border-slate-200'>
        {comment.content}
      </li>
    );
  });

  return <ul>{commentListItems}</ul>;
};
