'use client'

import React from 'react';
import * as Progress from '@radix-ui/react-progress';

// Define a type for the props
type Props = {
  currentIndex: number;
  totalGuides: number;
};

const ProgressBar: React.FC<Props> = ({ currentIndex, totalGuides }) => {
  // Calculating progress based on the current guide index
  const progress = ((currentIndex + 1) / totalGuides) * 100;

  return (
    <Progress.Root
      className="z-10 relative overflow-hidden bg-indigo-50/80 rounded-full w-full h-[25px]"
      style={{
        transform: 'translateZ(0)',
      }}
      value={progress}
    >
      <Progress.Indicator
        className="z-9 bg-blue-500 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
