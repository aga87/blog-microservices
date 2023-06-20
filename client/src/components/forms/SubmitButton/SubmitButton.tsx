import React from 'react';

type SubmitButtonProps = {
  text?: string;
  formId?: string; // to associate the button with a form if the button placed outside the form
};

export const SubmitButton = ({
  text = 'Submit',
  formId = undefined
}: SubmitButtonProps) => {
  return (
    <button
      type='submit'
      form={formId}
      className='px-4 py-2 font-semibold text-white rounded-md bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700'
    >
      {text}
    </button>
  );
};
