import GalleryPresentation from 'components/GalleryPresentation';
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {

  const galleries = useSelector(state => state.imagesReducer.galleries)

  return (
    <div className='Home'>
      {galleries &&
        galleries.map((gallery, i) => (
          <GalleryPresentation swapDesign={i % 2 === 0 ? false : true} gallery={gallery} key={i} index={i} />
        ))}
    </div>
  );
};

export default Home;