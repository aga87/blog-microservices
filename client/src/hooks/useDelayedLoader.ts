import { useState, useEffect } from 'react';

export const useDelayedLoader = ({
  isLoading,
  delay
}: {
  isLoading: boolean;
  delay: number;
}) => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setTimeout(() => {
        setIsLoaderVisible(true);
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return { isLoaderVisible };
};
