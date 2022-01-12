import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const NavGalleryButton = ({ index }) => {

  const galleries = useSelector(state => state.imagesReducer.galleries)

  return (
    <div className='NavGalleryButton'>
      <Link to={`/galleries/${galleries[index].name.split(" ").join("-").toLowerCase()}`} >
        {galleries[index].name}
      </Link>
    </div>
  );
};

export default NavGalleryButton;