import React, { useId } from 'react';
import {
  Error,
  Form,
  Label,
  Loader,
  SubmitButton,
  TextInput
} from '../../../../components';
import { useDelayedLoader } from '../../../../hooks';
import { useCreatePost } from './useCreatePost';
import type { Post } from '../../types/posts.types';

type CreatePostProps = {
  handleCreatePost: (post: Post) => void;
};

export const CreatePost = ({ handleCreatePost }: CreatePostProps) => {
  const inputId = useId();

  const { title, handleSubmit, formErrors, serverError, isLoading } =
    useCreatePost({ handleCreatePost });

  const { isLoaderVisible } = useDelayedLoader({ isLoading, delay: 1000 });

  return (
    <div>
      <Form handleSubmit={handleSubmit} formLabel='Create new post'>
        {isLoaderVisible && <Loader />}
        {serverError && <Error text={serverError} />}
        <Label text='Title' inputId={inputId} required />
        <div className='mb-2'>
          <TextInput
            id={inputId}
            value={title.value}
            handleChange={title.handleChange}
            errorMsg={formErrors.title}
          />
        </div>
        <div className='flex justify-end'>
          <SubmitButton />
        </div>
      </Form>
    </div>
  );
};
