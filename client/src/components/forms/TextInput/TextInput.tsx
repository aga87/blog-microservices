import React, { useId } from 'react';

type TextInputProps = {
  id: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  errorMsg?: string;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      value,
      handleChange,
      type = 'text',
      placeholder = '',
      required = true,
      maxLength,
      errorMsg = ''
    },
    ref
  ) => {
    const errorId = useId();

    return (
      <>
        <input
          ref={ref}
          className='block w-full px-2 py-2 border-2 rounded-md border-slate-400 focus:border-emerald-500 focus:outline-none'
          id={id}
          placeholder={placeholder}
          type={type}
          size={30}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          required={required}
          aria-describedby={errorMsg && errorId}
          aria-invalid={errorMsg !== ''}
        />
        {errorMsg && (
          <div
            id={errorId}
            role='alert'
            aria-live='assertive'
            className='text-sm text-pink-700'
          >
            {errorMsg}
          </div>
        )}
      </>
    );
  }
);

TextInput.displayName = 'TextInput';
