import React from 'react';

type LabelProps = {
  text: string;
  inputId: string;
  required?: boolean;
};

export const Label = ({ text, inputId, required = true }: LabelProps) => {
  return (
    <label htmlFor={inputId} className='text-slate-400'>
      {text}
      {!required && (
        <span>
          <i>Optional</i>
        </span>
      )}
    </label>
  );
};
