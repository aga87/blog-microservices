import React, { useState } from 'react';
import { CommentList } from './components/CommentList/CommentList';
import { CreateComment } from './components/CreateComment/CreateComment';
import type { Comment } from './types/comment.types';

type CommentsProps = {
  postId: string;
  comments: Comment[];
};

export const Comments = ({ postId, comments }: CommentsProps) => {
  const [postComments, setPostComments] = useState(comments || []);
  /* Before the query service was implemented we fetched the comments separately
   const { postComments, setPostComments, isLoading, serverError } =
     useFetchComments(postId); 
  */

  const handleCreateComment = (comment: Comment) => {
    setPostComments([...postComments, comment]);
  };

  return (
    <>
      <div className='mb-2'>
        <CommentList
          postComments={postComments}
          // isLoading={isLoading}
          // serverError={serverError}
        />
      </div>
      <CreateComment
        postId={postId}
        handleCreateComment={handleCreateComment}
      />
    </>
  );
};
