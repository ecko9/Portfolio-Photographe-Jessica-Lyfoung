import { CloudinaryContext } from 'cloudinary-react';
import GalleryCard from 'components/GalleryCard';
import React from 'react';
import { useSelector } from 'react-redux';

const GalleriesList = () => {

  const galleries = useSelector(state => state.imagesReducer.galleries)

  return (
    <CloudinaryContext cloudName="projects-images" className="GalleriesList">
      {galleries && galleries.map(gallery => (
        <GalleryCard gallery={gallery} key={gallery.name} />
      ))}
    </CloudinaryContext>
  );
};

export default GalleriesList;