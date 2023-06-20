import { useState } from 'react';
import { useTextInput } from '../../../../components';
import { createComment } from '../../services/CommentsApiService';
import type { NewComment, Comment } from '../../types/comment.types';
import { hasNonEmptyValue, validateRequiredField } from '../../../../utils';

export const useCreateComment = ({
  postId,
  handleCreateComment
}: {
  postId: string;
  handleCreateComment: (comment: Comment) => void;
}) => {
  const content = useTextInput('');
  const [formErrors, setFormErrors] = useState({
    content: ''
  });
  const [serverError, setServerError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = {
      content: validateRequiredField(content.value)
    };

    if (hasNonEmptyValue(errors)) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);
      const newComment: NewComment = {
        content: content.value
      };
      const { comment, error } = await createComment({
        postId,
        newComment
      });

      if (error) {
        setServerError(error);
      } else if (comment) {
        content.clearValue();
        handleCreateComment(comment);
      }
      setIsLoading(false);
    }
  };

  return { content, handleSubmit, formErrors, serverError, isLoading };
};
