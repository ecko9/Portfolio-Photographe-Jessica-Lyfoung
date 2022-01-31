import React from 'react';
import { useNavigate } from 'react-router-dom';

const GalleryTransition = ({ setIsLoading, isLoading, loadingGalleryUrl }) => {

  const navigate = useNavigate()

  return (
    <div className={isLoading ? 'GalleryTransition animation-transition' : 'GalleryTransition'}
      onAnimationIteration={e => navigate(loadingGalleryUrl)} onAnimationEnd={e => setIsLoading(false)} />
  );
};

export default GalleryTransition;