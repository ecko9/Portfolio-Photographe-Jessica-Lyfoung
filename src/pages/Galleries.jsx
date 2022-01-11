import GalleryList from 'components/GalleryList';
import NavGalleries from 'components/navigation/NavGalleries';
import React from 'react';



const Galleries = () => {

  return (
    <div className='Galleries'>
      <NavGalleries />
      <GalleryList />
    </div>
  );
};

export default Galleries;