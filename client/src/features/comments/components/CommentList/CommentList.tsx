import React from 'react';
import type { Comment } from '../../types/comment.types';

type CommentListProps = {
  postComments: Comment[];
};

export const CommentList = ({ postComments }: CommentListProps) => {
  const commentListItems = postComments.map(comment => {
    const { id, content, status } = comment;

    let commentContent = content;
    if (status === 'pending') {
      commentContent = 'This comment is awaiting moderation.';
    }

    if (status === 'rejected') return null;
    return (
      <li
        key={id}
        className={`py-2 border-b border-slate-200 ${
          status === 'pending' ? 'italic text-slate-500 font-light' : ''
        }`}
      >
        {commentContent}
      </li>
    );
  });

  return <ul>{commentListItems}</ul>;
};
