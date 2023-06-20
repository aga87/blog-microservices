import React from 'react';
import { capitalize } from '../../utils';

interface HeadingProps {
  text: string;
  level: 1 | 2 | 3;
}

export const Heading = ({ text, level }: HeadingProps) => {
  if (level === 2)
    return <h2 className='pb-2 font-sans text-2xl'>{capitalize(text)}</h2>;
  if (level === 3)
    return (
      <h3 className='pb-1 font-sans text-xl font-bold'>{capitalize(text)}</h3>
    );
  return (
    <h1 className='font-sans text-5xl font-semibold underline'>
      {capitalize(text)}
    </h1>
  );
};
