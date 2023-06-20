import React, { useId } from 'react';
import {
  Error,
  Form,
  Label,
  Loader,
  TextInput,
  SubmitButton
} from '../../../../components';
import { useDelayedLoader } from '../../../../hooks';
import { useCreateComment } from './useCreateComment';
import type { Comment } from '../../types/comment.types';

type CommentCreateProps = {
  postId: string;
  handleCreateComment: (comment: Comment) => void;
};

export const CreateComment = ({
  postId,
  handleCreateComment
}: CommentCreateProps) => {
  const inputId = useId();

  const { content, handleSubmit, formErrors, serverError, isLoading } =
    useCreateComment({ postId, handleCreateComment });

  const { isLoaderVisible } = useDelayedLoader({ isLoading, delay: 1000 });

  return (
    <Form handleSubmit={handleSubmit} formLabel='Create new comment'>
      {isLoaderVisible && <Loader />}
      {serverError && <Error text={serverError} />}
      <Label inputId={inputId} text='New Comment' required />
      <div className='mb-2'>
        <TextInput
          id={inputId}
          value={content.value}
          handleChange={content.handleChange}
          errorMsg={formErrors.content}
        />
      </div>
      <div className='flex justify-end'>
        <SubmitButton />
      </div>
    </Form>
  );
};
