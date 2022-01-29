import React from 'react';

const LoadingImagesList = ({ setIsLoading }) => {
  return (
    <div className='LoadingImagesList' onAnimationEnd={e => setIsLoading(false)}>

    </div>
  );
};

export default LoadingImagesList;