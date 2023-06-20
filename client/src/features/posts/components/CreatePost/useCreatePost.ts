import { useState } from 'react';
import { useTextInput } from '../../../../components';
import { createPost } from '../../services/PostsApiService';
import { hasNonEmptyValue, validateRequiredField } from '../../../../utils';
import type { Post } from '../../types/posts.types';

export const useCreatePost = ({
  handleCreatePost
}: {
  handleCreatePost: (post: Post) => void;
}) => {
  const title = useTextInput('');

  const initialFormErrors = {
    title: ''
  };
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [serverError, setServerError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Clear form errors from previous submission, if any
    if (hasNonEmptyValue(formErrors)) {
      setFormErrors(initialFormErrors);
    }
    // Validate
    const errors = {
      title: validateRequiredField(title.value)
    };

    if (hasNonEmptyValue(errors)) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);
      const { post, error } = await createPost({
        title: title.value
      });
      if (error) {
        setServerError(error);
      } else if (post) {
        handleCreatePost(post);
        title.clearValue();
      }
      setIsLoading(false);
    }
  };

  return { title, handleSubmit, formErrors, serverError, isLoading };
};
