import React from 'react';
import { useSelector } from 'react-redux';

const GalleryTitle = ({ index }) => {

  const galleries = useSelector(state => state.imagesReducer.galleries)

  return (
    <div className='GalleryTitle'>
      {index !== null && <h2>{galleries[index].name}</h2>}
    </div>
  );
};

export default GalleryTitle;