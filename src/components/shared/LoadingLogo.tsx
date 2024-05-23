import React from 'react';
import Image from 'next/image';

type LoadingLogoProps = {
  size?: number;
};

function LoadingLogo({ size = 100 }: LoadingLogoProps) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Image
        width={size}
        height={size}
        src="/logo.svg"
        className="animate-pulse duration-800"
        alt="Logo"
      />
    </div>
  );
}

export default LoadingLogo;
