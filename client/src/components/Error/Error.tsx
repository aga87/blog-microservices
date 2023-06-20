import React from 'react';

type ErrorProps = {
  text: string;
};

export const Error = ({ text }: ErrorProps) => {
  return (
    <div
      role='alert'
      aria-live='assertive'
      className='flex text-pink-700 p-2 border-2 border-pink-700 rounded-md'
    >
      <div className='flex items-center justify-center w-6 h-6 border-2 border-pink-700 rounded-full mr-2'>
        <span className='font-bold'>!</span>
      </div>
      {text}
    </div>
  );
};
