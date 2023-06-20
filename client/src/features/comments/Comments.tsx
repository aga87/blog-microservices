import React from 'react';
import { CommentList } from './components/CommentList/CommentList';
import { CreateComment } from './components/CreateComment/CreateComment';
import { useFetchComments } from './components/CommentList/useFetchComments';
import type { Comment } from './types/comment.types';

type CommentsProps = {
  postId: string;
};

export const Comments = ({ postId }: CommentsProps) => {
  const { postComments, setPostComments, isLoading, serverError } =
    useFetchComments(postId);

  const handleCreateComment = (comment: Comment) => {
    setPostComments([...postComments, comment]);
  };

  return (
    <>
      <div className='mb-2'>
        <CommentList
          postComments={postComments}
          isLoading={isLoading}
          serverError={serverError}
        />
      </div>
      <CreateComment
        postId={postId}
        handleCreateComment={handleCreateComment}
      />
    </>
  );
};
