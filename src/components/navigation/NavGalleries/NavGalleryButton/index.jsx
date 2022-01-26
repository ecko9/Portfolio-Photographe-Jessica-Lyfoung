import React from 'react';
import { useSelector } from 'react-redux';

const NavGalleryButton = ({ index }) => {

  const galleries = useSelector(state => state.imagesReducer.galleries)

  return (
    <>
      {galleries && <div className='NavGalleryButton' >
        <h3>{galleries[index].name}</h3>
      </div>}
    </>
  );
};

export default NavGalleryButton;