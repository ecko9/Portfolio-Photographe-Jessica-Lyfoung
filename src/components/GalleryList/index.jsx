import GalleryCard from 'components/GalleryCard';
import React from 'react';
import { useSelector } from 'react-redux';

const GalleryList = () => {

  const galleries = useSelector(state => state.imagesReducer.galleries)

  return (
    <div className='GalleryList'>
      {galleries ? galleries.map(gallery => (
        <GalleryCard name={gallery.name} key={gallery.name} />
      )) : ""}
    </div>
  );
};

export default GalleryList;