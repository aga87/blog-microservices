import React from 'react';
import { Heading } from './components';
import { Posts } from './features/posts';

export const App = () => {
  return (
    <div className='px-4 text-base'>
      <div className='flex justify-center mb-10 text-base'>
        <Heading level={1} text='Blog' />
      </div>
      <Posts />
    </div>
  );
};
