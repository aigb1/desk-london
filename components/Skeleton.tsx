import React from 'react';

interface Props {
  className?: string;
  circle?: boolean;
}

const Skeleton: React.FC<Props> = ({ className = "", circle = false }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 ${circle ? 'rounded-full' : 'rounded-2xl'} ${className}`}
      aria-hidden="true"
    />
  );
};

export default Skeleton;