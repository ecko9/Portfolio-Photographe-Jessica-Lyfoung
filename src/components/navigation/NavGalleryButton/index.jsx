import React from 'react';
import { useSelector } from 'react-redux';

const NavGalleryButton = ({ index }) => {

  const galleries = useSelector(state => state.imagesReducer.galleries)

  return (
    <>
      {galleries && <div className='NavGalleryButton' >
        <p>{galleries[index].name}</p>
      </div>}
    </>
  );
};

export default NavGalleryButton;