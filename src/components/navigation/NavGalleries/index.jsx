import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavGalleries = () => {

  const galleries = useSelector(state => state.imagesReducer.galleries)

  return (
    < div className='NavGalleries' >
      {galleries ? galleries.map(gallery => (
        <Link to={`/galleries/${gallery.name.split(" ").join("-").toLowerCase()}`} key={gallery.name}>
          {gallery.name}
        </Link>
      )) : ""}
    </div >
  );
};

export default NavGalleries;