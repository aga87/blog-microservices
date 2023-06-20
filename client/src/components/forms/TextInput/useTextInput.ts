import React, { useState } from 'react';

export const useTextInput = (initialValue: string | null) => {
  const [value, setValue] = useState(initialValue === null ? '' : initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearValue = () => {
    setValue('');
  };

  return {
    value,
    clearValue,
    handleChange
  };
};
