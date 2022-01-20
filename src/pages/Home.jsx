import GalleryPresentation from 'components/GalleryPresentation';
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {

  const galleries = useSelector(state => state.imagesReducer.galleries)

  const selectGalleryDesignPresentation = (gallery, i) => {
    if (i === 0 || i % 2 === 0)
      return (
        <GalleryPresentation swapDesign={false} gallery={gallery} />
      )
    else
      return (
        <GalleryPresentation swapDesign={true} gallery={gallery} />
      )
  }

  return (
    <div className='Home'>
      {galleries && galleries.map((gallery, i) => (
        selectGalleryDesignPresentation(gallery, i)
      ))}
    </div>
  );
};

export default Home;